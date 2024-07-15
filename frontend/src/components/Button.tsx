export function Button({text, onClick} : {text:string, onClick:React.MouseEventHandler<HTMLDivElement>}){
    return <div className="text-center text-white bg-gray-800 hover:bg-sky-400 p-2 font-semibold text-lg sm:text-xl rounded shadow-md mx-10 sm:mx-20 my-2 hover:cursor-pointer" onClick={onClick}> 
        {text}
    </div>
}