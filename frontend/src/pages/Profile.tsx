import {  useRecoilValueLoadable, useSetRecoilState } from "recoil"
import { tokenAtom, userAtom } from "../store/atoms/atoms"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UpdatePasswordBody, UpdateUserBody } from "@utkarsh.dev/readium";
import axios from "axios";


export function Profile(){
    const navigate = useNavigate()
    const [openModel,setOpenModel] = useState(false);
    const user = useRecoilValueLoadable(userAtom)
    let c = 0;
    const [input,setInput] = useState(false);
    if(user.state === "loading"){
        return <div className="flex justify-center p-56 bg-gradient-to-r from-black via-gray-500 to-black h-dvh">
            <div className="border-gray-300 sm:size-16 size-10 md:size-20 animate-spin rounded-full border-8 border-t-blue-600 " />
        </div>
    }
    return <div className="bg-gradient-to-r from-black via-gray-500 to-black relative"  >
        
        <div className="flex ">
            <div className="hidden md:block w-1/4"></div>
            <div className="w-full md:w-2/4 flex flex-col pb-2  gap-3 md:gap-6 h-dvh  shadow-2xl text-center md:my-10 rounded-md bg-gray-800 shadow-xl ">
            <div className="bg-gray-800 flex justify-center pt-4 pb-3  rounded-t-md">
            <div className="shadow-2xl font-mono bg-gray-900 text-white font-semibold text-9xl size-40 rounded-full text-center flex flex-col justify-center">
                {user.contents.firstName.charAt(0)}
            </div>
        </div>
                <div className="flex justify-center text-4xl font-medium font-mono text-white">
                    {user.contents.firstName} {user.contents.lastName} <svg xmlns="http://www.w3.org/2000/svg"  fill="none" viewBox="0 0 24 24" strokeWidth="1.5" onClick={()=>setInput(true)} stroke="currentColor" className="size-6 mt-3 ml-2 hover:text-red-600 hover:cursor-pointer">
  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
</svg>

                </div>
                {input?<Input edit={setInput}></Input>:null}
                <div className="text-3xl font-medium text-white font-mono">
                    {user.contents.email}
                </div>
                <div className="text-4xl font-semibold  mx-6 bg-slate-700 rounded">
                    <div className="mt-2 text-white  mb-4">Your Blogs</div>
                    {user.contents.blogs.length==0?<div className="text-lg text-gray-900">You have published no blogs</div>:null}
                    <div className=" rounded-sm p-2 bg-slate-700">
                        {user.contents.blogs.map((blog:{title:string,id:string})=><Blog id={blog.id} title={blog.title} key={c++}></Blog>)}
                    </div> 
                </div>
                <div onClick={()=>setOpenModel(true)} className="text-red-600 underline text-lg hover:cursor-pointer hover:text-red-800">
                    Change Password
                </div>
            <div className="flex justify-center ">
            <div className="bg-red-500 hover:bg-red-700 hover:cursor-pointer p-2 w-28 shadow-xl rounded-xl text-xl font-semibold text-white" onClick={()=>{
                localStorage.removeItem("token")
                toast.success("Signed Out Successfully")
                navigate("/signin")
            }}>
                Sign Out
            </div>
            </div>
            </div>
            <div className="hidden md:block w-1/4"></div>
        </div>
            {openModel?<Modal setOpenModel={setOpenModel}></Modal>:null}
    </div>
}

function Blog({title,id}:{id:string,title:string}){
    const navigate = useNavigate();
    return     <div onClick={()=>navigate("/edit?id="+id)} className=" text-2xl outline bg-white hover:bg-black hover:text-white hover:cursor-pointer my-2 py-1 rounded">
        {title}
    </div>

}

function Input({edit}:{edit:React.Dispatch<React.SetStateAction<boolean>>}){
    const [name,setName] = useState<UpdateUserBody>({
        firstName : "",
        lastName : ""
    })
    const [fullname,setFullname] = useState("");
    useEffect(()=>{
        setName({firstName: fullname.split(" ")[0],
            lastName : fullname.split(" ")[1]
        })
    },[fullname])
 return <div  className="flex justify-center gap-1"> 
 <input onChange={(e)=>setFullname(e.target.value)} className="text-xl py-1 px-4  rounded" placeholder="New Name"></input>
 <div className="bg-red-300 py-1 px-3 font-semibold rounded hover:cursor-pointer" onClick={async()=>{    
    try{
        const res = await axios.put("https://backend.utkarshmishra2410.workers.dev/api/v1/user/update",name,{
            headers : { Authorization : "Bearer "+localStorage.getItem("token")}
        })
        toast.success(res.data.message)
        edit(false)
    }catch(err:any){
        console.log(err);
        
        toast.error(err.response.data.message,{position:"top-center"})
    }
 }}>Edit</div>   
 </div>
}

function Modal({setOpenModel}:{setOpenModel:React.Dispatch<React.SetStateAction<boolean>>}){
   const [password,setPassword] = useState<UpdatePasswordBody>({
    oldPassword : "",
    newPassword : ""
   })
   
   return <div className="flex justify-center bg-transparent z-2 inset-0 absolute" >
        <div className="flex flex-col justify-center" >
    <div className="flex flex-col gap-5 bg-white shadow-2xl shadow-black  rounded-md py-20 px-4 relative" >
        <div className="bg-red-400 absolute right-0 top-0 size-8  text-xl rounded pb-0.5 text-center hover:cursor-pointer " onClick={()=>setOpenModel(false)}>x</div>
        <input onChange={(e)=>setPassword({...password,oldPassword:e.target.value})} className="text-white bg-gray-500 text-2xl px-2 py-0.5 rounded shadow" placeholder="Old Password" type="password" name="" id="" />
        <input onChange={(e)=>setPassword({...password,newPassword:e.target.value})} className="text-white bg-gray-500 text-2xl px-2 py-0.5 rounded shadow" type="password" placeholder="New Password" name="" id="" />
        <div className="flex justify-center">
        <div className="text-white text-center p-1 text-lg w-20 bg-white shadow rounded bg-green-400 hover:bg-green-600 hover:cursor-pointer" onClick={async()=>{
            try{
                const res = await axios.put("https://backend.utkarshmishra2410.workers.dev/api/v1/user/update/password",password,{
                    headers : {Authorization : "Bearer "+localStorage.getItem("token")}
                })
                toast.success(res.data.message);
                setOpenModel(false);
            }catch(err:any){
                toast.error(err.response.data.message)
            }
        }}  >Update</div>
    </div>
    </div>
</div>
</div>
}

