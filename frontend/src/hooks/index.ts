import axios from "axios"
import { useEffect, useState } from "react"

interface AuthorName{
    firstName : string,
    lastName : string
}

interface Blogs{
    id : string,
    title : string,
    content : string,
    created_at : Date,
    author : AuthorName
}
type Blog = Pick<Blogs , "author" | "content" |"created_at"|"title" >

export function useBlogs(){
    const [blogs,setBlogs] = useState<Blogs[]>([]);
    const [loading,setLoading] = useState(true);
    useEffect(()=>{
        async function getBlogs() {
            try{
                const res = await axios.get("https://backend.utkarshmishra2410.workers.dev/api/v1/blog/bulk");
                setBlogs(res.data.blogs);
                setLoading(false);
            }catch(err){
                console.log(err);
            }
        }
        getBlogs();
    },[])
    return {blogs,loading};
}

export function useBlog(id:string){
    const [blog,setBlog] =useState<Blog>({
        title:"",
        content:"",
        created_at : new Date(),
        author : {
            firstName : "",
            lastName : ""
        }
    })
    const [loading,setLoading] = useState(true);
    useEffect(()=>{
        async function getBlog() {
            const res = await axios.get("https://backend.utkarshmishra2410.workers.dev/api/v1/blog/"+id,{
                headers :{
                    Authorization : "Bearer "+localStorage.getItem("token")
                }
            })
            setBlog(res.data);
            setLoading(false)
        }
        getBlog()
    },[])
    return {blog,loading}
}

