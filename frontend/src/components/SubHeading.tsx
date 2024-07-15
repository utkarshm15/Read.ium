import { Link } from "react-router-dom";

export function SubHeading({text, to, link} : {text:string,to:string,link:string} ){
    return <div className="text-gray-400 text-center my-1">
        {text}
        <Link className="underline text-sky-300" to={link}> {to}</Link>
    </div>
}