// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";

// // User Routes
// import HomePage from "./pages/user/homepage";
// import About from "./pages/user/about";
// import Contact from "./pages/user/contact";
// import Login from "./pages/user/login";
// import Signup from "./pages/user/signup";
// import OccasionsPage from "./pages/user/occasionspage";
// import ProductDetail from "./pages/user/productdetails";
// import ShoppingCartPage from "./pages/user/cart";
// import Checkout from "./pages/user/checkout";
// import NotFoundPage from "./pages/user/notfound";
// import Admin from "./pages/user/admin";


// // PrivateRoute
// import PrivateRoute from "./context/PrivateRoute";

// function App() {
//   return (
//     <AuthProvider>
//       <BrowserRouter>
//         <Routes>
//           {/* User Routes */}
//           <Route path="/" element={<HomePage />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/login" element={<Login />} />

//           {/* Admin Route - Only accessible to users with isAdmin === true */}
//           <Route path="/admin" element={
//             <PrivateRoute adminOnly={true}>
//               <Admin />
//             </PrivateRoute>
//           } />
//           <Route path="/occasions" element={<OccasionsPage />} />
//           <Route path="/product/:productId" element={<ProductDetail />} />
//           <Route path="/cart" element={<ShoppingCartPage />} />
//           <Route path="/checkout" element={<Checkout />} />
//         </Routes>
//       </BrowserRouter>
//     </AuthProvider>
//   );
// }

import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDetail from "./pages/user/productdetails";
import About from "./pages/user/about";
import Contact from "./pages/user/contact";
import Login from "./pages/user/login";

import PrivateRoute from "./context/PrivateRoute";
import Signup from "./pages/user/signup";
import HomePage from "./pages/user/homepage";
import ShoppingCartPage from "./pages/user/cart";
import Shop from "./pages/user/shop";
import OccasionsPage from "./pages/user/occasionspage";
import Checkout from "./pages/user/checkout";
import Product from "./pages/admin/product";
import Complaints from "./pages/admin/complaints";
import Orders from "./pages/admin/order";
import Customers from "./pages/admin/customer";
import CalendarPage from "./pages/admin/calendar";
import NotFoundPage from "./pages/user/notfound";
import { AuthProvider } from "./context/AuthContext";
import Admin from "./pages/user/admin";

function App() {
  return (
    // Wrap the entire app in AuthProvider
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/Contact" element={<Contact />} />
          {/* Admin Route - Only accessible to users with isAdmin === true */}
          {/* <Route path="/admin" element={
            <PrivateRoute adminOnly={true}>
              <Admin />
            </PrivateRoute>
          } /> */}
          <Route path="/Login" element={<Login />} />




          <Route path="/Signup" element={<Signup />} />
          <Route path="/OccasionsPage" element={<OccasionsPage />} />
          <Route path="/cart" element={<ShoppingCartPage />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/:productId" element={<ProductDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/admin/products" element={<Product />} />
          <Route path="/admin/complaints" element={<Complaints />} />
          <Route path="/admin/orders" element={<Orders />} />
          <Route path="/admin/customers" element={<Customers />} />
          <Route path="/admin/calendar" element={<CalendarPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
