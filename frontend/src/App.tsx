import { FrappeProvider } from "frappe-react-sdk";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/ui/Header";
import Login from "./pages/Login";
import ShoppingCart from "./pages/ShoppingCart";
import ItemList from "./pages/ItemList";
import PaymentPage from "./pages/PaymentPages";
import HomePage from "./pages/HomePage";
import AwaitingorderPage from "./pages/AwaitingOrderPage";
import ApprovedorderPage from "./pages/ApprovedorderPage";



function AppContent() {
  const location = useLocation();

  return (
    <>
   
      {location.pathname !== "/login" && <Header />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<HomePage/>} />
        <Route path="/ürün-listesi" element={<ItemList />} />
        <Route path="/bekleyen-sipariş" element={<AwaitingorderPage />} />
        <Route path="/onaylanmış-sipariş" element={<ApprovedorderPage/>} />
        <Route path="/sepet" element={<ShoppingCart />} />
        <Route path="/ödeme" element={<PaymentPage />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <FrappeProvider
      siteName={import.meta.env.VITE_SITE_NAME}
      socketPort={import.meta.env.VITE_SOCKET_PORT}
      url='http://localhost:8001'
      tokenParams={{
        type: "token",
        useToken: true,
        // token:()=>'6af51404c58b85f:***************'
      }}
    >
      <Router>
        <AppContent />
      </Router>
    </FrappeProvider>
  );
}

export default App;
