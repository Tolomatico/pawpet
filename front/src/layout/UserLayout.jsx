import { Outlet } from "react-router";
import Footer from "../components/ui/Footer";
import Header from "../components/ui/Header";
import { useUser } from "../hooks/useUser";



export default function UserLayout() {

    const { user, handleLogout } = useUser()


    return (
        <>
            <Header user={user} handleLogout={handleLogout} />
            <Outlet />
            <Footer />
        </>
    )
}
