import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./pages/Login/Login.jsx";
import Navbar from "./pages/Home/component/Navbar.jsx";
import NavbarOrder from "./pages/Order/component/Navbar.jsx";
import Home from "./pages/Home/Home.jsx";
import Detail from "./pages/Home/component/Detail/Detail.jsx";
import Order from "./pages/Order/Order.jsx";
import PaymentType from "./pages/Order/component/paymentType.jsx";
import ChangePaymentMethod from "./pages/Order/component/ChangePaymentMethod.jsx";
import SuccessPage from "./pages/Order/component/SuccessOrder.jsx";
import OrderList from "./pages/Home/component/OrderList/OrderList.jsx";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<Navbar />}>
          <Route path="/home" element={<Home />} />
          <Route path="/detail" element={<Detail />} />
        </Route>
        <Route element={<NavbarOrder />}>
          <Route path="/order" element={<Order />} />
          <Route path="/payment" element={<PaymentType />} />
          <Route path="/change-payment" element={<ChangePaymentMethod />} />
          <Route path="/success-order" element={<SuccessPage />} />
        </Route>
        <Route element={<Navbar />}>
          <Route path="/order-list" element={<OrderList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
