import { useNavigate } from "react-router-dom"

interface Author {
    firstName : string,
    lastName : string
}
interface Blog {
    title : string,
    content : string,
    id : string,
    created_at : Date,
    author : Author
}

export function BlogSnippet(blog:Blog){
    const navigate = useNavigate()
    const content = blog.content.length > 301 ? blog.content.substring(0,301) : blog.content
    const date = String(blog.created_at).substring(0,10)
    return <div className="flex flex-col w-full border-b-2 py-6 px-2 hover:rounded-md hover:cursor-pointer hover:shadow hover:bg-slate-100 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110"  onClick={()=>navigate("/blog/?id="+blog.id)}>
        <div className="flex">
            <div className="rounded-full bg-gray-700 sm:px-3 sm:py-1.5 text-white text-md text-center px-2.5 my-3 flex flex-col justify-center">{blog.author.firstName.charAt(0)}</div>
            <div className="mx-2 py-1 text-gray-600 flex flex-col justify-center">{blog.author.firstName} {blog.author.lastName}</div>
            <div className="py-1 text-gray-600 flex flex-col justify-center">{date}</div>
        </div>
        <div className="text-3xl font-bold">
            {blog.title}
        </div>
        <div className="text-xl">
            {content}............
        </div>
    </div>
}