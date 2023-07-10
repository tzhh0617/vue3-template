import { createRouter, createWebHistory } from "vue-router/auto";
import { setupLayouts } from "../utils/seupLayouts";

const router = createRouter({
  history: createWebHistory(),
  extendRoutes: setupLayouts,
});

export default router;
