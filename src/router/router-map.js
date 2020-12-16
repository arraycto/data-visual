import { lazy } from "react";

const Dashboard = lazy(() => import("@/pages/dashboard"));
const UtilBus = lazy(() => import("@/pages/dashboard/hooks"));
const SketchRuler = lazy(() => import("@/pages/dashboard/sketchRuler"));
const Factory = lazy(() => import("@/pages/dashboard/factory"));
const IFrame = lazy(() => import("@/pages/dashboard/iframe"));
const Error = lazy(() => import("@/pages/404"));

export default [
  {
    path: "/dashboard",
    component: Dashboard
  },
  {
    path: "/utils",
    component: UtilBus
  },
  {
    path: "/sketch-ruler",
    component: SketchRuler
  },
  {
    path: "/factory",
    component: Factory
  },
  {
    path: "/iframe",
    component: IFrame
  },
  {
    path: "/error/404",
    component: Error
  }
];
