import React,{useState,useEffect} from 'react'
import {Navigate} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import {checkLogin} from './Store/reducers/userReducer'
function RequireAuth({children}) {
    const dispatch = useDispatch()  
    const [isLogin,setIsLogin] = useState(true);
    const [loading,setLoading] = useState(true);
    const checkIsLogin = async() => {
        const userId = localStorage.getItem("userId"); 
        if(userId){
          const data=await dispatch(checkLogin(userId))
          // console.log("data",data.payload?.info?.data)
          if(data.payload?.info){
            setIsLogin(true)
          }else{
            setIsLogin(false);
          }
        }else{
          setIsLogin(false);
        }
        setLoading(false);
      }
    useEffect(() => {
        checkIsLogin();
      },[]);
      if(loading){
        return(
          <div>
            Loading...
          </div>
        )
      }
      if(isLogin === false){
       return <Navigate to="/login"/>
      }
  return (
    <div>{children}</div> 
  )
}

export default RequireAuth