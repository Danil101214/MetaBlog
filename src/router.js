import { ABOUT_US, BLOGINFORMATION, BLOGS, CREATEPOST, LOGIN, PROFILE, REGISTRATION, USERINFORMATION } from "./Components/Constants";
import AboutUs from "./Pages/AboutUs/AboutUs";
import BlogInformation from "./Pages/BlogInformation/BlogInformation";
import Blogs from "./Pages/Blogs/Blogs";
import CreatePost from "./Pages/CreatePost/CreatePost";
import Login from "./Pages/Login/Login";
import Profile from "./Pages/Profile/Profile";
import ProfileUser from "./Pages/ProfileUser/ProfileUser";
import Registration from "./Pages/Registration/Registration";

export const authUserRouter = [
    {
        path: ABOUT_US,
        Element: AboutUs
    },
    {
        path: BLOGS,
        Element: Blogs
    },
    {
        path: PROFILE,
        Element: Profile
    },
    {
        path: BLOGINFORMATION,
        Element: BlogInformation
    },
    {
        path: CREATEPOST,
        Element: CreatePost
    },
    {
        path: USERINFORMATION,
        Element: ProfileUser
    }
]

export const userRouter = [
    {
        path: ABOUT_US,
        Element: AboutUs
    },
    {
        path: REGISTRATION,
        Element: Registration
    },
    {
        path: LOGIN,
        Element: Login
    },
    {
        path: BLOGS,
        Element: Blogs
    },
    {
        path: BLOGINFORMATION,
        Element: BlogInformation
    },
    {
        path: USERINFORMATION,
        Element: ProfileUser
    }
]