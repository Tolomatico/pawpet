import { createContext, useEffect, useState } from "react";
import api from "../lib/axios";
import { isAxiosError } from "axios";

export const userContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading,setIsloading]=useState(false)
    useEffect(() => {
        const fetchUser = async () => {
            try {
                setIsloading(true)
                const request = await api(`/auth/user`)
                setUser(request.data)
            } catch (error) {
                if (isAxiosError(error) && error.response) {
                    console.error(error.response.data.error)
                }
            } finally {
                setIsloading(false)
            }
        };
    
        if (localStorage.getItem('pawpetToken')) {
            fetchUser()
        }
    }, [])
    
    const handleLogout = () => {
        localStorage.removeItem("pawpetToken")
        setUser(null)
        
        
      }

    return (
        <userContext.Provider value={{ user,loading, setUser,handleLogout }}>
            {children}
        </userContext.Provider>
    )
}