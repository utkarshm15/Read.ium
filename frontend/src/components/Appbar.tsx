import { useNavigate } from "react-router-dom"
import { useRecoilValue } from "recoil";
import { userAtom } from "../store/atoms/atoms";

export function Appbar(){
    const user = useRecoilValue(userAtom);
    const navigate = useNavigate();
    return <div className="flex justify-between px-4 py-2 border-b-2 shadow-sm">
        <div className="text-xl font-semibold hover:cursor-pointer" onClick={()=>navigate("/home")}>
            Readium
        </div>
        <div className="flex" >
            <div onClick={()=>navigate("/create")} className="flex bg-green-600 rounded-full py-1 mx-2 text-white px-3 hover:cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 mr-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg> Blog
        </div>
        <div className="bg-gray-700 rounded-full py-1 px-3 text-xl text-white ml-2 flex flex-col justify-center hover:cursor-pointer" onClick={()=>navigate("/profile")}>{user.firstName.charAt(0)}</div>
    </div>
    </div>
}