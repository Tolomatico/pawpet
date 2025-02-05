import { useContext } from "react"
import { userContext } from "../context/userContext"

export const useUser=()=>{
    const context=useContext(userContext)

    if(!context){
        throw new Error("No existe ningún user provider")
    }

    return context
}