import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Forgot from './pages/auth/Forgot';
import Reset from './pages/auth/Reset';
import NotFound from './pages/notFound/NotFound';
import LoginWithCode from './pages/auth/LoginWithCode';
import LayoutProfile from './components/layout/LayoutProfile';
import { Information, Address, ChangePassword } from './pages/profile/index';
import WelcomePage from './pages/welcome/WelcomePage';
import LayoutHome from './components/layout/LayoutHome';
import Home from './pages/home/Home';
import Deposit from './pages/deposit/Deposit';
import Transaction from './pages/transactionHistory/Transaction';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  getLoginStatus,
  getUser,
  selectIsLoggedIn,
  selectUser,
} from './redux/features/auth/authSlice';
import axios from 'axios';
import Verify from './pages/auth/Verify';

import TransactionUsers from './dashboard/transacUsers/TransactionUsers';
import Settings from './dashboard/settings/Settings';
import LayoutDashboard from './dashboard/componentsDashboard/Layout/LayoutDashboard';
import UsersList from './dashboard/dashboardList/UsersList';
import Payment from './components/methodPayment/Payment';
import Withdrawal from './pages/Withdrawal';
import Dashboard from './dashboard/home/DashboardOverViw';
import Profile from './pages/profile/Profile';
import Loader, { LoaderImage } from './components/loader/Loader';
import { getAmount } from './redux/features/amount/amountSlice';

axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(getLoginStatus());

    if (isLoggedIn && user === null) {
      dispatch(getUser());
    }
    if (isLoggedIn) {
      dispatch(getAmount());
    }
  }, [dispatch, isLoggedIn, user]);

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route
          path='/'
          element={
            <Layout>
              <WelcomePage />
            </Layout>
          }
        ></Route>
        <Route
          path='/loader'
          element={
            <>
              <LoaderImage />
              <Loader />
            </>
          }
        ></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/forgot' element={<Forgot />}></Route>
        <Route path='/reset-password/:resetToken' element={<Reset />}></Route>
        <Route
          path='/Login-with-code/:email'
          element={<LoginWithCode />}
        ></Route>
        <Route
          path='/verify/:verificationToken'
          element={
            <Layout>
              <Verify />
            </Layout>
          }
        />
        {/* ================================== */}
        <Route
          path='/home'
          element={
            <LayoutHome>
              <Home />
            </LayoutHome>
          }
        ></Route>
        <Route
          path='/deposit'
          element={
            <LayoutHome>
              <Deposit />
            </LayoutHome>
          }
        ></Route>
        <Route
          path='/transaction'
          element={
            <LayoutHome>
              <Transaction />
            </LayoutHome>
          }
        ></Route>
        <Route
          path='/withdrawal'
          element={
            <LayoutHome>
              <Withdrawal />
            </LayoutHome>
          }
        ></Route>
        {/* ----------------------------------------------- */}
        <Route
          path='/profile'
          element={
            <LayoutProfile>
              <Information />
            </LayoutProfile>
          }
        ></Route>
        <Route
          path='/profile/address'
          element={
            <LayoutProfile>
              <Address />
            </LayoutProfile>
          }
        ></Route>
        <Route
          path='/profile/change-password'
          element={
            <LayoutProfile>
              <ChangePassword />
            </LayoutProfile>
          }
        ></Route>

        <Route
          path='/profile/payment-method'
          element={
            <LayoutProfile>
              <Payment />
            </LayoutProfile>
          }
        ></Route>

        {/* ------------------------------------------ */}
        <Route
          path='/dashboard'
          element={
            <LayoutDashboard>
              <Dashboard />
            </LayoutDashboard>
          }
        ></Route>
        <Route
          path='/dashboard/transaction'
          element={
            <LayoutDashboard>
              <TransactionUsers />
            </LayoutDashboard>
          }
        ></Route>
        <Route
          path='/dashboard/users'
          element={
            <LayoutDashboard>
              <UsersList />
            </LayoutDashboard>
          }
        ></Route>
        <Route
          path='/dashboard/users/profile-user/:id'
          element={
            <LayoutDashboard>
              <Profile />
            </LayoutDashboard>
          }
        ></Route>
        <Route
          path='/dashboard/settings'
          element={
            <LayoutDashboard>
              <Settings />
            </LayoutDashboard>
          }
        ></Route>

        {/* ========================================== */}
        <Route
          path='*'
          element={
            <Layout>
              <NotFound />
            </Layout>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
