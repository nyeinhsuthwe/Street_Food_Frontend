import { createBrowserRouter } from "react-router-dom";
import LayoutForAdmin from '../layout/LayoutForAdmin'
import LayoutForUser from "../layout/LayoutForUser";
import Home from "../pages/User/Home";
import AdminDashboard from "../pages/Admin/AdminDashboard";



const route = createBrowserRouter([
    {
        path : "/admin",
        element: <LayoutForAdmin />,
        children : [
            {
                index : true,
                element : <AdminDashboard/>
            }
        ]
    },

    {
        path:"/user",
        element: <LayoutForUser/>,
        children: [
            {
                index: true,
                element: < Home/>
            }
        ]
    }
])

export default route