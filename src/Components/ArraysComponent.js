import Envelope from "../../public/RegistrationAndLogin/envelope.svg"
import Lock from '../../public/RegistrationAndLogin/lock.svg'
import User from '../../public/RegistrationAndLogin/user.svg'
import { ABOUT_US, BLOGS, PROFILE } from "./Constants"

export const register = [
    {
        labelName: "Email",
        Item: Envelope,
        placeholder: "Enter your email address",
        type: "email"
    },
    {
        labelName: "First Name",
        Item: User,
        placeholder: "Enter your first name",
        type: "text"
    },
    {
        labelName: "Last Name",
        Item: User,
        placeholder: "Enter your last name",
        type: "text"
    },
    {
        labelName: "Date birthday",
        Item: User,
        placeholder: "Enter your date birthday",
        type: "date"
    },
    {
        labelName: "Image Profile",
        Item: User,
        placeholder: "Choose your image",
        type: "file"
    },
    {
        labelName: "Password",
        Item: Lock,
        placeholder: "Enter your password",
        type: "password"
    },
    {
        labelName: "Confirm Password",
        Item: Lock,
        placeholder: "Confirm your password",
        type: "password"
    }
]

export const authorization = [
    {
        labelName: "Email",
        Item: Envelope,
        placeholder: "Enter your email address",
        type: "email"
    },
    {
        labelName: "Password",
        Item: Lock,
        placeholder: "Enter your password",
        type: "password"
    },
]

export const options = [
    {id: 1, value: "Technology"},
    {id: 2, value: "Gaming"},
    {id: 3, value: "News"},
    {id: 4, value: "Sport"}
]

export const quickLink = [
    {id: 1, value: "Home", to: "#"},
    {id: 2, value: "About", to: ABOUT_US},
    {id: 3, value: "Blogs", to: BLOGS},
    {id: 4, value: "Archived", to: "#"},
    {id: 5, value: "Author", to: "#"},
    {id: 6, value: "Contact", to: "#"},
]

export const category = [
    {id: 1, value: "Lifestyle"},
    {id: 2, value: "Technology"},
    {id: 3, value: "Travel"},
    {id: 4, value: "Business"},
    {id: 5, value: "Economy"},
    {id: 6, value: "Sports"},
]