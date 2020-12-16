/**
 * Updated by Aaron on 2020-06-10.
 */
import { useContext, useReducer, useRef, useEffect, useState, useImperativeHandle } from "react";
import { bind, clear } from "size-sensor";
import { onEvent, offEvent, debounce } from "@/utils";
import { Ctx, Compose } from "./context";

// 使用编辑器上下文redux
export const useEditorStore = () => {
  return useContext(Ctx);
};

// 使用编辑器容器上下文redux
export const useCompose = () => {
  return useContext(Compose);
};

// 页面标题
export function useDocumentTitle(title) {
  const prevTitleRef = useRef(title);
  useEffect(() => {
    document.title = title;
    return () => {
      // eslint-disable-next-line
      document.title = prevTitleRef.current;
    };
  }, [title]);
}

export function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes

  return ref.current;
}

// 基于redux的实现，类似于class component的setState
export const useStore = (initState) => useReducer((state, action) => ({ ...state, ...action }), initState);

// 持久化存储 sessionStorage
export const useStorage = (initState = {}, key = "_root_storage") => {
  const getStorage = () => {
    const searchStr = sessionStorage.getItem(key);
    if (searchStr) {
      try {
        return JSON.parse(searchStr);
      } catch (error) {
        return initState;
      }
    }
    return initState;
  };

  const [data, setData] = useState(getStorage());
  const setStorage = (query) => {
    setData(query);
    sessionStorage.setItem(key, JSON.stringify(query));
  };
  return [data, setStorage];
};

function observerDomResize(dom, callback) {
  const MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

  const observer = new MutationObserver(callback);

  observer.observe(dom, {
    attributes: true,
    attributeFilter: ["style"],
    attributeOldValue: true
  });

  return observer;
}

// 自动监听视窗大小容器自适应
export const useAutoResize = (ref) => {
  const [state, setState] = useState({ width: 0, height: 0 });

  const domRef = useRef(null);

  const initWH = () => {
    if (!domRef.current) return;
    const { clientWidth, clientHeight } = domRef.current;
    setState({ width: clientWidth, height: clientHeight });
  };

  useImperativeHandle(ref, () => ({ initWH }), []);

  useEffect(() => {
    const debounceSetWHHandler = debounce(initWH, 100);
    debounceSetWHHandler();
    const domObserver = observerDomResize(domRef.current, debounceSetWHHandler);

    // bind size
    if (domRef.current) {
      bind(domRef.current, (element) => {
        try {
          const resizeHandler = debounce(() => {
            const { clientWidth, clientHeight } = element;
            setState({ width: clientWidth, height: clientHeight });
          }, 100);

          resizeHandler();
        } catch (e) {
          console.warn(`监听元素dom节点失败, ${e}`);
        }
      });
    }

    onEvent(window, "resize", debounceSetWHHandler);

    return () => {
      domObserver.disconnect();
      domObserver.takeRecords();
      // clear size
      if (domRef.current) {
        try {
          clear(domRef.current);
        } catch (e) {
          console.warn(`卸载元素dom节点失败, ${e}`);
        }
      }
      offEvent(window, "resize", debounceSetWHHandler);
    };
  }, []);

  return { ...state, domRef, initWH };
};
