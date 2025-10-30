import { createBrowserRouter } from "react-router-dom";
import LayoutForAdmin from "../layout/LayoutForAdmin";
import LayoutForUser from "../layout/LayoutForUser";
import Home from "../pages/User/Home";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import AdminMenu from "../pages/Admin/AdminMenu";
import CreateCategory from "../pages/Admin/CreateCategory";
import { UserMenu } from "../pages/User/Menu";

const route = createBrowserRouter([
  {
    path: "/admin",
    element: <LayoutForAdmin />,
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
    element: <LayoutForUser />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path : 'menu',
        element : <UserMenu/>
      }
    ],
  },
]);

export default route;
