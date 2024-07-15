import { useSearchParams } from "react-router-dom";
import { useBlog } from "../hooks";
import { Appbar } from "../components/Appbar";

export function Blog(){
    const [params] = useSearchParams()
    const id = params.get("id");
    if(!id)
        return <div></div>
    const {blog,loading} = useBlog(id);
    if(loading){
        return <div className="flex justify-center p-56">
            <div className="border-gray-300 sm:size-16 size-10 md:size-20 animate-spin rounded-full border-8 border-t-blue-600 " />
        </div>
    
    }  
    const date = new Date(blog.created_at);
    const published = date.toString().substring(4,16)

    // const dateAr = String(blog.created_at).substring(0,10).split("-")
    // const months = ["January","February","March","April","May","June","July"]
    return <div className="">
        <div className=" md:w-2/3 top-0 right-0 left-0">
        <Appbar></Appbar>
        </div> 
    <div className="flex bg-slate-100 relative" >
        <div className=" md:w-2/3 w-full px-4 py-8 bg-slate-100 top-0 bottom-0">
        <div className="text-5xl font-bold my-1 font-['Times']">
            {blog.title}
        </div>
        <div className="text-gray-600 pt-1">Published on - {published}</div>
        <div className="text-gray-600 pt-1 block md:hidden">Author - {blog.author.firstName} {blog.author.lastName}</div>
        <div className="text-2xl font-semibold my-1 font-serif">
            {blog.content}
        </div>
    </div>
    <div className="flex flex-col md:flex hidden fixed   right-0 top-1 bottom-0 justify-center w-1/3 bg-slate-300 ">
        <div className="flex justify-center text-2xl lg:text-4xl font-medium font-['monospace']">
            Author - {blog.author.firstName} {blog.author.lastName}
        </div>
    </div>
    </div>
    </div>   
}