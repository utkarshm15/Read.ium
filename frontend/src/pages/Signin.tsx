import { ChangeEvent, useState } from "react"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { Button } from "../components/Button"
import { Quote } from "../components/Quote"
import { SigninBody } from "@utkarsh.dev/readium"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

export function Signin(){
    const navigate = useNavigate()
    // const [eVal,setEVal] = useState("");
    const [signinBody,setSigninBody] = useState<SigninBody>({
        email : "",
        password : ""
    })
    return <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
    <div className="flex flex-col justify-center p-20">
    <Heading text="Sign In"></Heading>
    <SubHeading text="Do not have an account ?" to="Signup" link="/signup"></SubHeading>
    <InputBox label="Email" placeholder="johndoe@gmail.com" onChange={(e:ChangeEvent<HTMLInputElement>)=>setSigninBody({...signinBody,email : e.target.value})} />
    <InputBox label="Password" placeholder="12345678" type="password" onChange={(e:ChangeEvent<HTMLInputElement>)=>setSigninBody({...signinBody,password : e.target.value})} />
    <Button text="Sign In" onClick={async()=>{
        try{
            const res = await axios.post("https://backend.utkarshmishra2410.workers.dev/api/v1/user/signin",signinBody);
            localStorage.setItem("token",res.data.token)
            toast.success(res.data.message,{position : "bottom-center"});
            navigate("/home")
        }catch(err:any){
            if(err.response)
            {
                toast.error(err.response.data.message,{position : "bottom-center"})}
            toast.error("Something went wrong",{position : "bottom-center"})
            // setEVal(err.response.data.message)
        }
    }}></Button>
    {/* {eVal!=""?<Alert text={eVal}/>:null} */}
  </div>
  <Quote></Quote>
  </div>
}