import { Auth0Provider } from "@auth0/auth0-react";
import AOS from "aos";
import "aos/dist/aos.css";
import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { CartProvider } from "./data/cart_context";
import { ApiProvider } from "./data/context";
import { FilterProvider } from "./data/filter_context";
import { UserProvider } from "./data/user_context";
import "./index.css";


AOS.init();

const root = document.getElementById("root");
ReactDOM.createRoot(root).render(
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH_DOMAIN}
    clientId={process.env.REACT_APP_AUTH_CLIENT_ID}
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
    redirectUri={window.location.origin}
    cacheLocation='localstorage'
  >
  <UserProvider>
  <ApiProvider>
  <FilterProvider>
    <CartProvider>
     
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </CartProvider>
  </FilterProvider>
  </ApiProvider>
  </UserProvider>
  </Auth0Provider>
);
