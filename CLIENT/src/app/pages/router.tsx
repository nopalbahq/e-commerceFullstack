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
import LoginForm from "./account/LoginForm";
import RegisterForm from "./account/RegisterForm";
import RequireAuth from "./RequireAuth";
import CheckOutSuccess from "./checkout/CheckOutSuccess";
import OrderPage from "./order/OrderPage";
import OrderDetailPage from "./order/OrderDetailPage";
import InventoryPage from "./admin/InventoryPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <RequireAuth />,
        children: [
          { path: "/checkout", element: <CheckOutPage /> },
          { path: "/checkout/success", element: <CheckOutSuccess /> },
          { path: "/orders", element: <OrderPage /> },
          { path: "/orders/:id", element: <OrderDetailPage /> },
          { path: "/inventory", element: <InventoryPage /> },
        ],
      },
      { path: "", element: <HomePage /> },
      { path: "/catalog", element: <Catalog /> },
      { path: "/catalog/:id", element: <ProductDetails /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/contact", element: <ContactPage /> },
      { path: "/server-error", element: <ServerError /> },
      { path: "/not-found", element: <NotFound /> },
      { path: "/login", element: <LoginForm /> },
      { path: "/register", element: <RegisterForm /> },
      { path: "*", element: <Navigate replace to={"/not-found"} /> },
      { path: "/dummy", element: <DummyPage /> },
    ],
  },
]);
