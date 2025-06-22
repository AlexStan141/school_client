import { Routes, Route } from "react-router-dom";
import RegistrationPage from "../pages/RegistrationPage/RegistrationPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import MainPage from "../pages/MainPage/MainPage";
import Admin from "./Admin/Admin";
import Teacher from "./Teacher/Teacher";
import Student from "./Student/Student";
import { PrivateRoute } from "./PrivateRoute";
import { RestrictedRoute } from "./RestrictedRoute";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../hooks";
import { useEffect } from "react";
import { refreshUser } from "../redux/auth/operations";

function App() {

  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch])

  return isRefreshing ? (
    <b>Refreshing user...</b>
  ) : (
    <Routes>
      <Route
        path="/"
        element={
          <RestrictedRoute redirectTo="/index" component={<RegistrationPage />} />
        }
      />
      <Route
        path="/login"
        element={
          <RestrictedRoute redirectTo="/index" component={<LoginPage />} />
        }
      />
      <Route
        path="/index"
        element={
          <MainPage />
        }
      >
        <Route
          path="admin"
          element={<Admin/>}
        />
        <Route
          path="teacher"
          element={<Teacher/>}
        />
        <Route
          path="student"
          element={<Student/>}
        />
      </Route>
    </Routes>
  );
}

export default App;
