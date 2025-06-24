import { Routes, Route } from "react-router-dom";
import RegistrationPage from "../pages/RegistrationPage/RegistrationPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import MainPage from "../pages/MainPage/MainPage";
import Admin from "./Admin/Admin";
import Teacher from "./Teacher/Teacher";
import Student from "./Student/Student";
import AddTest from "./AddTest/AddTest";
import ViewTest from "./ViewTest/ViewTest";
import EditTest from "./EditTest/EditTest";
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
        path="/school_client"
        element={
          <RestrictedRoute redirectTo="/school_client/index" component={<RegistrationPage />} />
        }
      />
      <Route
        path="/school_client/login"
        element={
          <RestrictedRoute redirectTo="/school_client/index" component={<LoginPage />} />
        }
      />
      <Route
        path="/school_client/index"
        element={
          <PrivateRoute redirectTo="/school_client/login" component={<MainPage />} />
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
        <Route
          path="addTest"
          element={<AddTest/>}
        />
        <Route
          path="viewTest/:testId"
          element={<ViewTest/>}
        />
        <Route
          path="editTest/:testId"
          element={<EditTest/>}
        />
      </Route>
    </Routes>
  );
}

export default App;
