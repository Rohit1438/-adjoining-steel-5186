import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";



export const PrivateRoute = ({children}) => {
const [isAuth,setIsAuth]=useState(false)
   
    console.log("cheking")


    const token=localStorage.getItem("spicy_hall_token")||""
//     const authentication=()=>{
//         if(token){
//            setIsAuth(true)
//         }
//     }

// useEffect(()=>{
// authentication()
// },[])
const location=useLocation()

return token?children:<Navigate state={location.pathname} to={"/login"}/>


};
