import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import "./index.css";
import router from "./routing/routes.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import AuthWrapper from "./AuthWrapper";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <AuthWrapper>
        <RouterProvider router={router} />
        <Toaster
          position="bottom-right"
          reverseOrder={false}
        />
      </AuthWrapper>
    </Provider>
  </StrictMode>,
)