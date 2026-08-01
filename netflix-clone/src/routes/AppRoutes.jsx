import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import Search from "../pages/Search/Search";
import MyList from "../pages/MyList/MyList";
import Profile from "../pages/Profile/Profile";
import Account from "../pages/Account/Account";
import Movie from "../pages/Movie/Movie";
import NotFound from "../pages/NotFound/NotFound";

import ProtectedRoute from "../components/ProtectedRoute";

const PrivateRoute = ({ children }) => (
  <ProtectedRoute>{children}</ProtectedRoute>
);

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected Routes */}
      <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
      <Route path="/search" element={<PrivateRoute><Search /></PrivateRoute>} />
      <Route path="/mylist" element={<PrivateRoute><MyList /></PrivateRoute>} />
      <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
      <Route path="/account" element={<PrivateRoute><Account /></PrivateRoute>} />
      <Route path="/movie/:id" element={<PrivateRoute><Movie /></PrivateRoute>} />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;

/*
  import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import Search from "../pages/Search/Search";
import MyList from "../pages/MyList/MyList";
import Profile from "../pages/Profile/Profile";
import Account from "../pages/Account/Account";
import Movie from "../pages/Movie/Movie";
import NotFound from "../pages/NotFound/NotFound";

function AppRoutes() {
  return (
    <Routes>
      
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

     
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/mylist" element={<MyList />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/account" element={<Account />} />
      <Route path="/movie/:id" element={<Movie />} />

      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes; */