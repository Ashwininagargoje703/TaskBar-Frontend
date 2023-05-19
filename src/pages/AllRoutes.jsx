import { Route, Routes } from "react-router-dom";
import ListPage from "./ListPage";
import Login from "./Login";
import LoginCheck from "../components/LoginCheck";
import Register from "./Register";

export default function AllRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/"
        element={
          <LoginCheck>
            <ListPage />
          </LoginCheck>
        }
      />
    </Routes>
  );
}
