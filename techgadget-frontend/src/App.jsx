import React from "react";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./pages/HomePage";
import Blogs from "./pages/Blogs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RefundPolicy from "./pages/RefundPolicy";
import TermsOfService from "./pages/TermsOfService";
import ProductListPage from "./pages/ProductListPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import Test from "./pages/Test";
import NotFound from "./pages/NotFound";
import ProductsManagement from "./pages/admin/ProductsManagement";
import CustomersManagement from "./pages/admin/CustomersManagement";
// import CartsManagement from "./pages/admin/CartsManagement";
import OrdersManagement from "./pages/admin/OrdersManagement";
import CheckoutPage from "./pages/checkout/CheckoutPage";
import CheckoutSuccess from "./pages/checkout/CheckoutSuccess";
import Contact from "./pages/Contact";
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRouteAdmin from "./components/admin/ProtectedRouteAdmin";
import RedirectIfAutheticated from "./components/admin/RedirectIfAutheticated";
import AdminAuthLayout from "./layouts/auth/AdminAuthLayout";
import SignInAdmin from "./pages/auth/admin/SignInAdmin";
import SignUpAdmin from "./pages/auth/admin/SignUpAdmin";
import SignInUser from "./pages/auth/user/SignInUser";
import SignUpUser from "./pages/auth/user/SignUpUser";
import RedirectIfAutheticatedUser from "./components/RedirectIfAutheticatedUser";
import UserInformation from "./layouts/UserInformationLayout";
import ProtectedRouteUser from "./components/ProtectedRouteUser";
import AdminLayout from "./layouts/admin/AdminLayout";
import Order from "./pages/userInformation/Order";
import Address from "./pages/userInformation/Address";

//Test
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="products/:categoryName" element={<ProductListPage />} />
        <Route path="product/:id" element={<ProductDetailPage />} />
        <Route path="cart" element={<CartPage />} />

        <Route path="blogs" element={<Blogs />} />
        <Route path="customer-service/contact" element={<Contact />} />
        <Route
          path="customer-service/privacy-policy"
          element={<PrivacyPolicy />}
        />
        <Route
          path="customer-service/refund-policy"
          element={<RefundPolicy />}
        />
        <Route
          path="customer-service/terms-of-service"
          element={<TermsOfService />}
        />
        <Route path="test" element={<Test />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="checkout_success/:orderId" element={<CheckoutSuccess />} />
        <Route
          path="account"
          element={
            <ProtectedRouteUser>
              <UserInformation />
            </ProtectedRouteUser>
          }
        >
          <Route path="order" element={<Order />} />
          <Route path="address" element={<Address />} />
          <Route index element={<Address />} />
        </Route>
        <Route
          path="signin"
          element={
            <RedirectIfAutheticatedUser>
              <SignInUser />
            </RedirectIfAutheticatedUser>
          }
        />
        <Route
          path="signup"
          element={
            <RedirectIfAutheticatedUser>
              <SignUpUser />
            </RedirectIfAutheticatedUser>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route
        path="/admin_auth"
        element={
          <RedirectIfAutheticated>
            <AdminAuthLayout />
          </RedirectIfAutheticated>
        }
      >
        <Route index element={<SignInAdmin />} />
        <Route path="signup" element={<SignUpAdmin />} />
      </Route>

      <Route
        path="/admin"
        element={
          <ProtectedRouteAdmin>
            <AdminLayout />
          </ProtectedRouteAdmin>
        }
      >
        <Route index element={<ProductsManagement />} />
        <Route path="customers-management" element={<CustomersManagement />} />
        {/* <Route path="carts-management" element={<CartsManagement />} /> */}
        <Route path="orders-management" element={<OrdersManagement />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </>
  )
);

const App = () => {
  return (
    <>
      <RouterProvider router={router}>
        <ScrollToTop />
      </RouterProvider>
    </>
  );
};

export default App;
