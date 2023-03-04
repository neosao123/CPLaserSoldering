import logo from './logo.svg';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Button, Space } from 'antd'
import Login from "./components/Login"
import Dashbord from "./components/Dashbord"
// import Custmerform from "./components/Custmerform"
import Customer from "./components/Customer"
import OrderTable from "./components/OrderTable"
import "./scss/style.scss"
import Home from "./components/Home"
import Layout from "./components/Layout"
import Customerbilling from "./components/Customerbilling"
import Billhistorys from "./components/Billhistory"
import TotalOutstanding from "./components/TotalOutstanding"
import RequireAuth from "./components/requireAuth"
import Profilepage from "./components/Profilepage/profilepage"
import Changepass from "./components/Changepass/changepass"
import ForgotPassword from './components/Login/ForgotPassword';
import RecoverPassword from './components/Login/RecoverPassword';
import View from './components/View';
import ActionOutstanding from './components/Customerbilling/ActionOutstanding';
import OutstandingViewList from "./components/OutstandingViewList/index"

function App() {
  return (
    <div>
      <BrowserRouter basename={"/cplasersoldering/testing"}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/recover-password/:token?" element={<RecoverPassword />} />
          <Route path="/dashboard" element={<RequireAuth><Layout><Dashbord /></Layout></RequireAuth>} />
          <Route path="/customer" element={<RequireAuth><Layout><Customer /></Layout></RequireAuth>} />
          <Route path="/order" element={<RequireAuth><Layout><OrderTable /></Layout></RequireAuth>} />
          <Route path="/order/:Id" element={<RequireAuth><Layout><OrderTable /></Layout></RequireAuth>} />
          <Route path="/customerbilling" element={<RequireAuth><Layout><Customerbilling /></Layout></RequireAuth>} />
          <Route path="/customerbilling/actionoutstanding" element={<RequireAuth><Layout><ActionOutstanding /></Layout></RequireAuth>} />
          <Route path="/view/:Id" element={<RequireAuth><Layout><View /></Layout></RequireAuth>} />
          <Route path="/totaloutstanding" element={<RequireAuth><Layout><TotalOutstanding /></Layout></RequireAuth>} />
          <Route path="/totaloutstanding/:customerIdd" element={<RequireAuth><Layout><TotalOutstanding /></Layout></RequireAuth>} />
          <Route path="/outstandingViewList/:customerIdd" element={<RequireAuth><Layout><OutstandingViewList /></Layout></RequireAuth>} />
          <Route path="/billhistory" element={<RequireAuth><Layout><Billhistorys /></Layout></RequireAuth>} />
          <Route path="/profilepage" element={<RequireAuth><Layout><Profilepage /></Layout></RequireAuth>} />
          <Route path="/changepass" element={<RequireAuth><Layout><Changepass /></Layout></RequireAuth>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
