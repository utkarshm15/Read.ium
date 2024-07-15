import { CreateBlogBody } from "@utkarsh.dev/readium"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {  toast  } from "react-toastify"
import { useRecoilState } from "recoil"
import { userAtom } from "../store/atoms/atoms"


export function CreateBlog(){
    const [blogBody,setBlogBody] = useState<CreateBlogBody>({
        title: "",
        content : ""
    })
    return <div>
        <Bar title={blogBody.title} content={blogBody.content}></Bar>
    <div className="flex justify-center p-10 md:p-20 lg:px-40 lg:py-20 font-serif">
    <div className="flex flex-col w-full">
        <textarea onChange={(e)=>setBlogBody({...blogBody,title:e.target.value})}  className="text-4xl p-2 pl-6" autoFocus placeholder="Title"></textarea>
        <textarea onChange={(e)=>setBlogBody({...blogBody,content:e.target.value})} className="text-xl h-screen p-2 pl-6" placeholder="Your Story..."></textarea>
    </div>
    </div>
    </div>
}

function Bar({title,content} : CreateBlogBody){
    const [user] = useRecoilState(userAtom);
    const navigate = useNavigate();
    return  <div> 
    <div className="flex justify-between px-4 py-2 border-b-2 shadow-sm">
    <div className="text-xl font-semibold hover:cursor-pointer" onClick={()=>navigate("/home")}>
        Readium
    </div>
    
    <div className="flex" >
        <div onClick={async()=>{
            try{
                const res = await axios.post("https://backend.utkarshmishra2410.workers.dev/api/v1/blog",{title,content},{
                    headers : {
                        Authorization : "Bearer "+localStorage.getItem("token")
                    }
                })
                toast.success(res.data.message);
                navigate("/home");
                
            }catch(err:any){
                toast.error(err.response.data.message);   
            }
        }}  className="flex bg-green-600 rounded-full py-1 mx-2 text-white px-3 hover:cursor-pointer">Publish</div>
    <div className="bg-gray-700 rounded-full py-1 px-3 text-xl text-white ml-2 hover:cursor-pointer" onClick={()=>navigate("/profile")}>{user.firstName.charAt(0)}</div>
</div>
</div>
</div>
}