import type { RouteRecordRaw } from "vue-router/auto";

const layouts: any = {
  default: () => import("@/layouts/DefaultLayout.vue"),
};

export const setupLayouts = (routes: RouteRecordRaw[]): RouteRecordRaw[] => {
  function deepSetupLayout(routes: RouteRecordRaw[], top = true) {
    return routes.map((route) => {
      if (route.children?.length) {
        route.children = deepSetupLayout(route.children, false);
      }

      const layout = route.meta?.layout as any;

      if (top && layout !== false) {
        return {
          path: route.path,
          component: layouts[layout || "default"],
          children: [{ ...route, path: "" }],
          meta: {
            isLayout: true,
          },
        };
      }

      if (layout) {
        return {
          path: route.path,
          component: layouts[layout],
          children: [{ ...route, path: "" }],
          meta: {
            isLayout: true,
          },
        };
      }

      return route;
    });
  }

  return deepSetupLayout(routes);
};
