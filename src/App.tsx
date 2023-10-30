import { Fragment } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AdminLayout from "./components/layout/AdminLayout/AdminLayout";
import SkillsPage from "./pages/skills/SkillsPage";
import MessagePage from "./pages/message/MessagePage";
import useAuth from "./store/auth";
import LoginPage from "./pages/LoginPage/LoginPage";
import "react-toastify/dist/ReactToastify.css";
import ExpriencesPage from "./pages/dashboard/Expriences";
import PortfoliosPage from "./pages/portfolios/PortfoliosPage";
import EducationPage from "./pages/Education/EducationPage";
import UserPage from "./pages/UserPage/UserPage";
import AccountPage from "./pages/account/AccountPage";
function App() {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const user = useAuth((state) => state.user);

  return (
    <Fragment>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              isAuthenticated && user?.role === "client" ? (
                <AdminLayout />
              ) :isAuthenticated ? (
                <Navigate to="/user" />
              ) : <Navigate to='/login' />
            }
          >
            <Route path="/expriences" element={<ExpriencesPage />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/portfolios" element={<PortfoliosPage />} />
            <Route path="/education" element={<EducationPage />} />
            <Route path="/message" element={<MessagePage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="*" element={<Navigate to="/expriences" />} />
          </Route>
          <Route path="/user" element={<UserPage />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
