import {  UpdateBlogBody } from "@utkarsh.dev/readium"
import axios from "axios"
import {  useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import {  toast  } from "react-toastify"
import { useBlog } from "../hooks"
import { useRecoilState } from "recoil"
import { userAtom } from "../store/atoms/atoms"


export function Edit(){
    const [params] = useSearchParams();
    const id = params.get("id");
    if(!id){
        return <div></div>
    }
    const [blogBody,setBlogBody] = useState<UpdateBlogBody>({
        id:id,
    })
    
    
    const [edit,setEdit] = useState(true)
     
    const {blog,loading} = useBlog(id)
    if(loading){
        return <div className="flex justify-center pt-40 p-20  sm:p-56">
            <div className="border-gray-300 sm:size-16 size-10 md:size-20 animate-spin rounded-full border-8 border-t-blue-600 " />
        </div>
    }
   
    
    
    
    return <div>
        <Bar title={blogBody.title} id={blogBody.id} content={blogBody.content} edit={setEdit}></Bar>
    <div className="flex justify-center p-10 md:p-20 lg:px-40 lg:py-20 font-serif">
    <div className="flex flex-col w-full">
        <textarea onChange={(e)=>setBlogBody({...blogBody,title:e.target.value})} defaultValue={blog.title} disabled={edit} className="text-4xl p-2 pl-6" autoFocus placeholder="Title"></textarea>
        <textarea onChange={(e)=>setBlogBody({...blogBody,content:e.target.value})} disabled={edit} defaultValue={blog.content} className="text-xl h-screen p-2 pl-6" placeholder="Your Story"></textarea>
    </div>
    </div>
    </div>
}

function Bar({title,content,id ,edit} : {title?:string,content?:string,id:string,edit:React.Dispatch<React.SetStateAction<boolean>>}){
    const navigate = useNavigate();
    const [publish,setPublish] = useState(false)
    const [user] = useRecoilState(userAtom)
    return  <div> 
    <div className="flex justify-between px-4 py-2 border-b-2 shadow-sm">
    <div className="text-xl font-semibold hover:cursor-pointer" onClick={()=>navigate("/home")}>
        Readium
    </div>
    
    <div className="flex" >
        <div onClick={()=>{
            setPublish(true)
            edit(false)
        }} className="flex bg-red-600 rounded-full py-1 mx-2 text-white px-3 hover:cursor-pointer" >Edit</div>
        {publish?<div onClick={async()=>{
            try{        
                const res = await axios.put("https://backend.utkarshmishra2410.workers.dev/api/v1/blog",{id:id,title:title,content:content},{
                    headers : {Authorization: "Bearer "+localStorage.getItem("token")}
                })
                toast.success(res.data.message)
                edit(true)
                setPublish(false)
            }catch(err:any){
                toast.error(err.response.data.message)
            }
        }} className="flex bg-green-600 rounded-full py-1 mx-2 text-white px-3 hover:cursor-pointer">Publish</div>:null}
        
    <div className="bg-gray-700 rounded-full py-1 px-3 text-xl text-white ml-2 hover:cursor-pointer" onClick={()=>navigate("/profile")}>{user.firstName.charAt(0)}</div>
</div>
</div>
</div>
}