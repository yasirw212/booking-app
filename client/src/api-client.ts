import { RegisterFormData } from "./pages/Register";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const register = async (formData: RegisterFormData) => {
   await console.log(API_BASE_URL)
     const response = await fetch(`/api/users/register`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
     });

     const responseBody = await response.json();

     if(!response.ok){
        throw new Error(responseBody.message)
     }
}