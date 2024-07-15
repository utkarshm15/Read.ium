import { ChangeEvent, useState } from "react"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { Button } from "../components/Button"
import { Quote } from "../components/Quote"
import { SignupBody } from "@utkarsh.dev/readium"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

export function Signup() {
    const naviagte = useNavigate()
    const [signupBody, setSignupBody] = useState<SignupBody>({
        firstName : "",
        lastName : "",
        email : "",
        password : ""
    })
    return <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
    <div className="flex flex-col justify-center p-20">
    <Heading text="Create an Account"></Heading>
    <SubHeading text="Already have an account ?" to="Signin" link="/signin"></SubHeading>
    <InputBox label="First Name" placeholder="John" onChange={(e:ChangeEvent<HTMLInputElement>)=>setSignupBody({...signupBody,firstName : e.target.value})} />
    <InputBox label="Last Name" placeholder="Doe" onChange={(e:ChangeEvent<HTMLInputElement>)=>setSignupBody({...signupBody,lastName : e.target.value})} />
    <InputBox label="Email" placeholder="johndoe@gmail.com" onChange={(e:ChangeEvent<HTMLInputElement>)=>setSignupBody({...signupBody,email : e.target.value})} />
    <InputBox label="Password" placeholder="12345678" type="password" onChange={(e:ChangeEvent<HTMLInputElement>)=>setSignupBody({...signupBody,password : e.target.value})} />
    <Button text="Sign Up" onClick={async()=>{
        try{
            const res = await axios.post("https://backend.utkarshmishra2410.workers.dev/api/v1/user/signup",signupBody);
            localStorage.setItem("token",res.data.token);
            naviagte("/home")
        }catch(err:any){
            toast.error(err.response.data.message,{position:"bottom-center"});
        }
    }}></Button>
  </div>
  <Quote></Quote>
  </div>
}