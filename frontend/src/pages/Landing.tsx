import { Link } from "react-router-dom";

export function Landing(){
    return <div className="bg-gradient-to-r from-black via-gray-700 to-black">
        <div className="flex justify-center">
            <div className="h-dvh flex flex-col gap-3 justify-center text-center">
                <p className="text-5xl font-bold  text-white">Readium</p>
                <div className="px-10 text-xl md:px-40 lg:px-60 sm:px-20 text-white">Welcome to Readium, a place where you can tell your stories and find others'</div>
                <div className="flex justify-center"><Link className="text-slate-300 hover:text-blue-400  underline" to={"/signup"} >Join Now</Link></div>
                
            </div>
        </div>
    </div>
}