import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Modal, Space, Button, Typography, Badge, message, Tooltip } from "antd";
import copyTOClipboard from "copy-text-to-clipboard";
import { useEditorStore, useCompose } from "~renderer/common/hooks";
import { uuid } from "@/utils";
import { generatorField, getFieldConf, getFieldOrderBy } from "~renderer/utils";

import { IconFont, MonacoEditor } from "~components";
import storage from "@/utils/storage";

const FieldConf = () => {
  const { state, setState } = useEditorStore();
  const { view, setView } = useCompose();

  // TODO: 清空
  const handleClear = () => {
    setState({
      selected: "-",
      components: [],
      undo: [],
      redo: []
    });
  };

  // TODO: 复制
  const handleCopy = () => {
    const curFieldConf = getFieldConf(state.components, state.selected);
    const { components, fieldId } = generatorField(state.components, curFieldConf);
    setState({ selected: fieldId, components: components });
  };

  // TODO: 删除
  const handleDelete = () => {
    const { index, components } = getFieldOrderBy(state.components, state.selected);
    let fieldId;
    if (components.length === 1) {
      fieldId = "-";
    } else if (index > 0) {
      fieldId = components[index - 1].uniqueId;
    } else {
      fieldId = components[index + 1].uniqueId;
    }
    components.splice(index, 1);
    setState({ selected: fieldId, components: components });
  };

  const toggleModal = () => setView({ visible: !view.visible });

  const handleCopySchema = () => {
    let displaySchemaString = JSON.stringify(
      {
        page: state.page,
        components: state.components
      },
      null,
      4
    );
    copyTOClipboard(displaySchemaString);
    message.info("复制成功");
  };

  const handledevlop = () => {
    message.info("待开发...");
  };

  return (
    <header className="gc-design__hd">
      <div className="gc-design__hd--title">
        <Typography.Title level={4} className="gc-design__hd--h1">
          Axure v2&nbsp;
          <Badge status="processing" text="Beta测试版" />
        </Typography.Title>
        <div
          className="gc-design__hd--icon"
          onClick={() => {
            setView({
              layerCollapsed: !view.layerCollapsed
            });
          }}
        >
          {!view.layerCollapsed ? (
            <Tooltip title="关闭侧边栏" key="关闭侧边栏">
              <IconFont antd={true} type="LeftSquareOutlined" />
            </Tooltip>
          ) : (
            <Tooltip title="打开侧边栏" key="打开侧边栏">
              <IconFont antd={true} type="RightSquareOutlined" />
            </Tooltip>
          )}
        </div>
      </div>
      <Space className="gc-design__hd--action">
        <Button
          disabled={state.selected === "-"}
          icon={<IconFont antd={true} type="CopyOutlined" />}
          onClick={handleCopy}
        >
          复制
        </Button>
        <Button
          disabled={state.selected === "-"}
          icon={<IconFont antd={true} type="DeleteOutlined" />}
          onClick={handleDelete}
        >
          删除
        </Button>
        <Button icon={<IconFont antd={true} type="ClearOutlined" />} onClick={handleClear}>
          清空
        </Button>
        <Button icon={<IconFont antd={true} type="UndoOutlined" />} onClick={handledevlop}>
          撤销
        </Button>
        <Button icon={<IconFont antd={true} type="RedoOutlined" />} onClick={handledevlop}>
          重做
        </Button>
      </Space>
      <div className="gc-design__hd--setting">
        <div
          className="gc-design__hd--icon"
          onClick={() => {
            setView({
              settingCollapsed: !view.settingCollapsed
            });
          }}
        >
          {!view.settingCollapsed ? (
            <Tooltip title="关闭配置" key="关闭配置">
              <IconFont antd={true} type="RightSquareOutlined" />
            </Tooltip>
          ) : (
            <Tooltip title="打开配置" key="关闭配置">
              <IconFont antd={true} type="LeftSquareOutlined" />
            </Tooltip>
          )}
        </div>
        <Space className="gc-design__hd--save">
          <Button
            icon={
              <Fragment>
                <Link
                  to={"/grid/preview/" + uuid()}
                  target="_blank"
                  onClick={() => {
                    storage.setSession("schema_grid_config", {
                      page: state.page,
                      components: state.components
                    });
                  }}
                >
                  <IconFont antd={true} type="DesktopOutlined" />
                  预览
                </Link>
              </Fragment>
            }
          ></Button>
          <Button icon={<IconFont antd={true} type="CloudOutlined" />} onClick={toggleModal}>
            保存
          </Button>
        </Space>
      </div>
      {/* 模态框 */}
      <Modal
        visible={view.visible}
        title="保存"
        width={960}
        okText="复制"
        cancelText="取消"
        onOk={handleCopySchema}
        onCancel={toggleModal}
      >
        <MonacoEditor
          height={600}
          language="json"
          value={{
            page: state.page,
            components: state.components
          }}
        />
      </Modal>
    </header>
  );
};

export default FieldConf;