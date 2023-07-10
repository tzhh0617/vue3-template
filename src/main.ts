import "./public-path";
import { createApp } from "vue";
import App from "./App.vue";
import { createWebHistory, createRouter } from "vue-router/auto";
import { setupLayouts as extendRoutes } from "./router/seupLayouts";

import "@/styles/index.scss";
import "uno.css";

let router: any = null;
let instance: any = null;
let history: any = null;

function render(props = {} as any) {
  const { container } = props;
  history = createWebHistory(window.__POWERED_BY_QIANKUN__ ? "/global" : "/");
  router = createRouter({ history, extendRoutes });

  instance = createApp(App);
  instance.use(router);
  instance.mount(container ? container.querySelector("#app") : "#app");
}

if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap() {
  console.log("%c%s", "color: green;", "vue3.0 app bootstraped");
}

export async function mount(props: any) {
  render(props);
  instance.config.globalProperties.$onGlobalStateChange =
    props.onGlobalStateChange;
  instance.config.globalProperties.$setGlobalState = props.setGlobalState;
}

export async function unmount() {
  instance.unmount();
  instance._container.innerHTML = "";
  instance = null;
  router = null;
  history.destroy();
}
