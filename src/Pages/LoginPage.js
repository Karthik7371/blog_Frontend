import { enqueueSnackbar } from "notistack";
import { useContext, useState } from "react"
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";


export default function LoginPage(){

const[username,setUserName]=useState("")
const[password,setPassword]=useState('')
const[redirect,setRedirect]=useState(false)
const{setUserInfo}=useContext(UserContext)

async function login(e){
e.preventDefault();
const response=await fetch("https://blog-syj3.onrender.com/login",{
         method:"POST",
         body:JSON.stringify({username,password}),
        headers:{'Content-Type':'application/json'},
        credentials:'include'
        
//ueueSnackbar("Book Edited Successfully...",{variant:'success'})
})
if(response.ok){
    enqueueSnackbar("Login Successful...",{variant:'success'},{ autoHideDuration: 1000 })
    response.json().then(UserInfo=>{
        setUserInfo(UserInfo)
        setRedirect(true)
    })
    
}else{
    
    enqueueSnackbar("Wrong Credentials...",{variant:'error'},{ autoHideDuration: 1000 })
}

}
if(redirect){
   return  <Navigate to={'/'} />
}

    return(
        <div className="border shadow-md flex items-center justify-center flex-col rounded max-w-md mx-auto">
            <div className="md:p-6 p-3">
            <h2 className=" text-2xl font-bold">LOGIN </h2>
            </div>
           <div className="flex justify-center">
                <form className="bg-white md:p-8 p-4 rounded" onSubmit={login}>
                    <input className="block border-b-2 p-3 my-3" 
                    type="text"
                    placeholder="Username" 
                    required
                    value={username}
                    onChange={(e)=>setUserName(e.target.value)}
                    />
                    <input className="block border-b-2 p-3 my-3"
                     type="password"
                      placeholder="Password"
                      required
                      value={password}
                      onChange={(e)=>setPassword(e.target.value)}
                       />
                    <button className="bg-slate-600 md:px-4 px-2 md:py-2 py-1 my-5 rounded text-white  transition ease-in-out delay-150
                    hover:-translate-y-1 hover:scale-110 hover:bg-slate-400 duration-100" type="submit">Login</button>
                </form>

           </div>
           
        </div>
    )
}