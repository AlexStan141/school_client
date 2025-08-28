import { Routes, Route } from "react-router-dom";
import RegistrationPage from "../pages/RegistrationPage/RegistrationPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import MainPage from "../pages/MainPage/MainPage";
import { PrivateRoute } from "./PrivateRoute";
import { RestrictedRoute } from "./RestrictedRoute";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../hooks";
import { useEffect } from "react";
import { refreshUser } from "../redux/auth/operations";
import UsersPage from "../pages/UsersPage/UsersPage";
import TestsPage from "../pages/TestsPage/TestsPage";
import AddTest from "./AddTest/AddTest";
import EditTest from "./EditTest/EditTest"

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
        <Route path="users" element={<UsersPage></UsersPage>}></Route>
        <Route path="tests" element={<TestsPage></TestsPage>}></Route>
        <Route path="add_test" element={<AddTest></AddTest>}></Route>
        <Route path="edit_test/:testId" element={<EditTest></EditTest>}></Route>
      </Route>
    </Routes>
  );
}

export default App;
