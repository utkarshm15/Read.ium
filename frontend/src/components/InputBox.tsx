import {  ChangeEventHandler } from "react"


interface InputParams {
    label : string,
    placeholder : string,
    type? : string,
    onChange : ChangeEventHandler<Element>
}
export function InputBox({label, placeholder, onChange, type}:InputParams){
    return <div className="mx-10 sm:mx-20 my-2"> 
        <div className="mb-1 text-lg sm:text-xl font-semibold">{label}</div>
        <input className="rounded shadow-md w-full text-base sm:text-md p-1" onChange={onChange} type={type || "text"}  placeholder={placeholder} />
    </div>
}