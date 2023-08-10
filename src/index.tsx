import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import bridge from "@vkontakte/vk-bridge";
import { RouterProvider } from "react-router-vkminiapps-updated";
import structure from "./router/structure";
import store from "./store/store";
import "@vkontakte/vkui/dist/vkui.css";

bridge.send("VKWebAppInit");
const root = createRoot(document.getElementById("root")!);
root.render(
  <Provider store={store}>
    <RouterProvider structure={structure}>
      <App></App>
    </RouterProvider>
  </Provider>
);
