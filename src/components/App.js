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
import EditTestForm from "./EditTestForm/EditTestForm";

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
        path=""
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
          <PrivateRoute redirectTo="/login" component={<MainPage />} />
        }
      >
        <Route path="users" element={<UsersPage></UsersPage>}></Route>
        <Route path="tests" element={<TestsPage></TestsPage>}></Route>
        <Route path="add_test" element={<AddTestPage></AddTestPage>}></Route>
        <Route path="edit_test/:testId" element={<EditTestForm></EditTestForm>}></Route>
      </Route>
    </Routes>
  );
}

export default App;
