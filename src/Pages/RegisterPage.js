import { enqueueSnackbar } from 'notistack';
import {useState} from 'react'
import { Navigate } from 'react-router-dom';
export default function RegisterPage(){

    const[username,setUserName]=useState('');
    const [password,setPassword]=useState('');
    const[phoneNumber,setPhoneNumber]=useState('');
    const [redirect, setRedirect] = useState(false);

    async function register(e){
            e.preventDefault();
         const response=  await fetch("https://blog-syj3.onrender.com/register",{

           method:'POST',
           body:JSON.stringify({username,password,phoneNumber}),
           headers:{'Content-Type':'application/json'}

           })

           const responseData = await response.json();
           console.log(responseData);

           if (response.ok) {
           
            //alert("Registration Successful");
            enqueueSnackbar("Registration Successful",{variant:'success'},{ autoHideDuration: 2000 });
            setRedirect(true);
            
        } else {
            
            if (responseData.error==="Username already taken") {
                //alert("Username is already taken. Please choose a different username.");
                enqueueSnackbar("Username is already taken. Please choose a different username.",{variant:'error'},{ autoHideDuration: 4000 })
            }
            else if(responseData.error==="Phone Number already taken"){
               // alert("Phone Number is already taken. Please choose a different Phone Number.");
            enqueueSnackbar("Phone Number is already taken. Please choose a different Phone Number.",{variant:'error'},{ autoHideDuration: 4000 })



            } else {
                //alert("Registration Failed");
                enqueueSnackbar("Registration Failed...",{variant:'error'},{ autoHideDuration: 2000 })
            }
        }
           

    }
    if (redirect) {
        return <Navigate to={"/login"} />;
      }
    
    return(
        <div className=" border shadow-md flex items-center justify-center flex-col rounded max-w-md mx-auto">
            <div className="p-6">
            <h2 className=" text-2xl font-bold">REGISTER</h2>
            </div>
           <div className="flex justify-center">
                <form className="bg-white md:p-8 p-4 rounded" onSubmit={register}>

                    <input className="block border-b-2 p-3 my-3"
                     type="text"
                     placeholder="Username"
                      required 
                     value={username}
                     onChange={(e)=>setUserName(e.target.value)} />

                    <input className="block border-b-2 p-3 my-3"
                     type="password" 
                     placeholder="Password"
                      required
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)} />

                    <input className="block border-b-2 p-3 my-3" 
                    type='number'
                     placeholder="Phone Number"
                      required 
                      value={phoneNumber}
                      onChange={(e)=>setPhoneNumber(e.target.value)}/>
                    <button className="bg-slate-600 md:px-4 px-2 md:py-2 py-1 my-5 rounded text-white  transition ease-in-out delay-150
                    hover:-translate-y-1 hover:scale-110 hover:bg-slate-400 duration-100" type="submit">Register</button>
                </form>

           </div>
           
        </div>
    )
}