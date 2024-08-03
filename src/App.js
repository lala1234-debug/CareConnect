import './App.css';
import {Route, Routes} from "react-router-dom";
import Register from "./components/Register";
import LoginPage from "./components/LoginPage";
import SearchPage from "./components/UsersList";
import UserProfilePage from "./components/UserProfilePage";
import HomePage from "./components/HomePage";
import {AuthProvider} from "./components/AuthContext";
import AdminLoginPage from "./components/admin/AdminLoginPage";
import AdminPage from "./components/admin/AdminPage";
import UserList from "./components/UsersList";
import HowToUsePage from "./components/HowToUsePage";

function App() {
  return (
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/user/:userId" element={<UserProfilePage />} />
          <Route path="/search/:userId" element={<SearchPage />} />
          <Route path="/admin" element={<AdminLoginPage />} />
          <Route path="/admin/user/:userId" element={<AdminPage />} />
          <Route path="/user-list/:userId" element={<UserList />} />
          <Route path="/how-to-use" element={<HowToUsePage />} />

        </Routes>
      </AuthProvider>
  );
}

export default App;
