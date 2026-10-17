import { Routes, Route } from "react-router-dom";
import RegistrationPage from "../pages/RegistrationPage/RegistrationPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import MainPage from "../pages/MainPage/MainPage";
import { PrivateRoute } from "./PrivateRoute";
import { RestrictedRoute } from "./RestrictedRoute";
import { useDispatch } from "react-redux";
import { useAuth } from "../hooks";
import { useEffect } from "react";
import { refreshUser } from "../redux/auth/operations";
import UsersPage from "../pages/UsersPage/UsersPage";
import TestsPage from "../pages/TestsPage/TestsPage";
import AddTestPage from "../pages/AddTestPage/AddTestPage";
import EditTestPage from "../pages/EditTestPage/EditTestPage";
import { RoleRoute } from "./RoleRoute";

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
          <RestrictedRoute redirectTo="/index" component={<LoginPage />} />
        }
      />
      <Route
        path="/index"
        element={
          <PrivateRoute redirectTo="/" component={<MainPage />} />
        }
      >
        <Route 
          path="add_user" 
          element={
            <RoleRoute component={<RegistrationPage/>} role="director"/>
          }
        ></Route>
        <Route 
          path="users" 
          element={
            <RoleRoute component={<UsersPage/>} role="director"/>
          }
        ></Route>
        <Route 
          path="tests" 
          element={
            <RoleRoute component={<TestsPage/>} role="teacher" secondRole="student"/>
          }
        ></Route>
        <Route 
          path="add_test" 
          element={
            <RoleRoute component={<AddTestPage/>} role="teacher"/>
          }
        ></Route>
        <Route 
          path="edit_test/:testId" 
          element={
            <RoleRoute component={<EditTestPage/>} role="teacher"/>
          }
        ></Route>
      </Route>
    </Routes>
  );
}

export default App;
