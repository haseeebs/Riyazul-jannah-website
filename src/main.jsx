import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import "./index.css";
import router from "./routing/routes.jsx";
import { Provider } from "react-redux";
import store, { persister } from "./store/store.js";
import AuthWrapper from "./AuthWrapper";
import { Toaster } from "react-hot-toast";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persister}>
        <AuthWrapper>
          <RouterProvider router={router} />
          <Toaster position="bottom-right" reverseOrder={false} />
        </AuthWrapper>
      </PersistGate>
    </Provider>
  </StrictMode>,
)