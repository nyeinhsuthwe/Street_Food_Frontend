import { createBrowserRouter } from "react-router-dom";
import LayoutForAdmin from "../layout/LayoutForAdmin";
import LayoutForUser from "../layout/LayoutForUser";
import Home from "../pages/User/Home";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import AdminMenu from "../pages/Admin/AdminMenu";
import CreateCategory from "../pages/Admin/CreateCategory";
import { UserMenu } from "../pages/User/Menu";
import { ProtectedRoute } from "./ProtectedRoute";
import { Login } from "../pages/Auth/Login";
import { Register } from "../pages/Auth/Register";

const route = createBrowserRouter([
  {
    path : "/login",
    element : <Login/>
  },
  {
    path : '/register',
    element : <Register/>
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <LayoutForAdmin />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      {
        path: "menu",
        element: <AdminMenu />,
      },
      {
        path: "create-category",
        element: <CreateCategory />,
      },
    ],
  },

  {
    path: "/user",
    element:(
      <ProtectedRoute allowedRoles={['user']}>
        <LayoutForUser/> 
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "menu",
        element: <UserMenu />,
      },
    ],
  },
]);

export default route;
