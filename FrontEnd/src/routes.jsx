
import { Children } from "react"
import { LoginPage } from "./pages/loginpage"
import { UsersPage } from "./pages/usersPage"


export const routes = [
    { path: "/", element: <LoginPage />,Children: [
    {index: true, element: <LoginPage />},
 
    ],},
    {path: "users", element: <UsersPage />}
]