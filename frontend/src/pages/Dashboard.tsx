
import { useSetRecoilState } from "recoil";
import { Appbar } from "../components/Appbar";
import { BlogSnippet } from "../components/BlogSnippet";
import { useBlogs } from "../hooks";
import { tokenAtom } from "../store/atoms/atoms";

export function Dashboard(){
    const {blogs,loading} = useBlogs();
    const setToken = useSetRecoilState(tokenAtom);
    setToken(localStorage.getItem("token"))    

    
    if(loading){
        return <div className="flex justify-center p-56">
            <div className="border-gray-300 sm:size-16 size-10 md:size-20 animate-spin rounded-full border-8 border-t-blue-600 " />
        </div>
    
    }
    let c=0;
    return <div>
        <Appbar></Appbar> 
        <div className="flex justify-center"> 
            <div className=" lg:w-3/5 w-2/3">
                {blogs.map((blog)=><BlogSnippet key={c++} title={blog.title} author={blog.author} content={blog.content} created_at={blog.created_at} id={blog.id} ></BlogSnippet>)}
            </div>
        </div>
    </div>
}