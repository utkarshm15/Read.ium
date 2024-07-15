import axios from "axios";
import { atom, selector } from "recoil";

export const tokenAtom = atom({
    key : "tokenAtom",
    default : localStorage.getItem("token")
})

export const userAtom = atom({
    key : "userAtom",
    default : selector({
        key : "userSelector",
        get : async({get}) :Promise<{firstName : string,lastName : string , email : string , blogs : {id : string, title : string }[]}>=>{
            const res = await axios.get("https://backend.utkarshmishra2410.workers.dev/api/v1/user",{
                headers : {
                    Authorization : "Bearer "+get(tokenAtom)
                }
            })
            return res.data
        }
    })
})