
import Home from "./resources/home"
import Login from "./resources/user/login"
import LoginAdmin from "./resources/admin/login"
import Reset from "./resources/user/reset"
import Register from "./resources/user/register"

import Cart from "./resources/user/cart"
import ChatVendor from "./resources/user/chat-to-vendor"
import ChatAdmin from "./resources/user/chat-to-admin"
import CheckOut from "./resources/user/checkout"
import OrderdItems from "./resources/user/ordered-items"
import ProductDetails from "./resources/user/product-details"
import RefudnItems from "./resources/user/refund-items"
import ShippedItems from "./resources/user/shipped-items"
import CompletedItems from "./resources/user/completed-items"
import Settings from "./resources/user/settings"
import Test from "./resources/user/test"
import ProtectPath from "./resources/user/protectpath"
import Notification from "./resources/user/notification"


import AdminDashboard from "./resources/admin/dashboard"
import SAdminDashboard from "./resources/superadmin/dashboard"
import CategoryForm from "./resources/superadmin/catalog/add-categories"


import VendorDashboard from "./resources/vendor/dashboard"
import LoginVendor from "./resources/vendor/login"
import RegisterVendor from "./resources/vendor/register"
import RestePassword from "./resources/vendor/reset-password"

import ManageProfile from "./resources/vendor/setting/manage-profile"

import UserMessages from "./resources/vendor/message/user-messages"
import AdminMessages from "./resources/vendor/message/admin-messages"
import Notifications from "./resources/vendor/message/notifications"
import ReviewMessages from "./resources/vendor/message/review-messages"


import VendorInfo from "./resources/vendor/vendor-info"








import TestOne  from "./resources/admin/testone"


import ListUsers from "./resources/admin/user/list-users"
import UserMessagesAdmin from "./resources/admin/user/user-messages"

import NewVendors from "./resources/admin/vendor/new-vendors"
import ListVendor from "./resources/admin/vendor/list-vendors"
import ManageProducts from "./resources/admin/vendor/manage-products"
import ManageOrders from "./resources/admin/vendor/manage-orders"
import VendorMessages from "./resources/admin/vendor/vendor-messages"
import ApprovePayouts from "./resources/admin/vendor/approve-payout"

import AddBanner from "./resources/admin/banner/add-banner"

import UpdatePassword from "./resources/admin/setting/update-password"


import AddProduct from "./resources/vendor/product/add-products"
import AddCoupons from "./resources/vendor/product/add-coupons"


import ControlOrder from "./resources/vendor/order/new-orders"
import CompletedOrders from "./resources/vendor/order/completed"
import Refunds from "./resources/vendor/order/refunds"
import Shipped from "./resources/vendor/order/shipped"



import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

          <Route path="/superadmin/dashboard" element={<SAdminDashboard />} />
          <Route path="/superadmin/addcategory" element={<CategoryForm />} />
          <Route path="/superadmin/login" element={<LoginAdmin />} />
          <Route path="/superadmin" element={<SAdminDashboard />} />

          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/login" element={<LoginAdmin />} />

         
          <Route path="/admin/list-users" element={<ListUsers />} />
          <Route path="/admin/user-messages" element={<UserMessagesAdmin />} />
          <Route path="/admin/new-Vendors" element={<NewVendors />} />
          <Route path="/admin/list-vendors" element={<ListVendor />} />
          <Route path="/admin/manage-products" element={<ManageProducts />} />
          <Route path="/admin/manage-orders" element={<ManageOrders />} />
          <Route path="/admin/approve-payout" element={<ApprovePayouts />} />
          <Route path="/admin/vendor-messages" element={<VendorMessages />} />

          <Route path="/admin/banners" element={<AddBanner />} />
          <Route path="/admin/manage-password" element={<UpdatePassword />} />

          <Route path="/admin/testone" element={<TestOne  />} />


          <Route path="/vendor/dashboard" element={<VendorDashboard />} />
          <Route path="/vendor" element={<VendorDashboard />} />
          <Route path="/vendor/login" element={<LoginVendor />} />
          <Route path="/vendor/register" element={<RegisterVendor />} />
          <Route path="/vendor/reset" element={<RestePassword />} />

          <Route path="/vendor/manage-profile" element={<ManageProfile />} />

          <Route path="/vendor/user-messages" element={<UserMessages />} />
          <Route path="/vendor/admin-messages" element={<AdminMessages />} />
          <Route path="/vendor/notifications" element={<Notifications />} />
          <Route path="/vendor/review-messages" element={<ReviewMessages />} />
          <Route path="/vendor/add-products" element={<AddProduct />} />
          <Route path="/vendor/add-coupons" element={<AddCoupons />} />

          <Route path="/vendor/new-orders" element={<ControlOrder />} />
          <Route path="/vendor/shipped" element={<Shipped />} />
          <Route path="/vendor/refunds" element={<Refunds />} />
          <Route path="/vendor/completed" element={<CompletedOrders />} />


          <Route path="/vendor/vendor-info" element={<VendorInfo />} />


          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/reset" element={<Reset />} />

          <Route path="/cart" element={<ProtectPath Cmp={Cart} />} />
          <Route path="/chatvendor" element={<ProtectPath Cmp={ChatVendor} />} />
          <Route path="/helpcenter" element={<ChatAdmin />} />
          <Route path="/checkout" element={<ProtectPath Cmp={CheckOut} />} />
          <Route path="/orderditems" element={<ProtectPath Cmp={OrderdItems} />} />
          <Route path="/productdetails/:product_id" element={<ProductDetails />} />
          <Route path="/refunditems" element={<ProtectPath Cmp={RefudnItems} />} />
          <Route path="/settings" element={<ProtectPath Cmp={Settings} />} />
          <Route path="/shippeditems" element={<ProtectPath Cmp={ShippedItems} />} />
          <Route path="/completeditems" element={<ProtectPath Cmp={CompletedItems} />} />
          <Route path="/notification" element={<ProtectPath Cmp={Notification} />} />
          <Route path="/test" element={<Test />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
