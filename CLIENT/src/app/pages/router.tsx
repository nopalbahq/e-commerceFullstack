import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../layout/App";
import HomePage from "./home/HomePage";
import Catalog from "./catalog/Catalog";
import AboutPage from "./about/AboutPage";
import ContactPage from "./contact/ContactPage";
import ProductDetails from "../features/ProductDetails";
import DummyPage from "./dummy/DummyPage";
import ServerError from "../error/ServerError";
import NotFound from "../error/NotFound";
import CartPage from "./cart/CartPage";
import CheckOutPage from "./checkout/CheckOutPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "/catalog", element: <Catalog /> },
      { path: "/catalog/:id", element: <ProductDetails /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/checkout", element: <CheckOutPage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/contact", element: <ContactPage /> },
      { path: "/server-error", element: <ServerError /> },
      { path: "/not-found", element: <NotFound /> },
      { path: "*", element: <Navigate replace to={"/not-found"} /> },
      { path: "/dummy", element: <DummyPage /> },
    ],
  },
]);
