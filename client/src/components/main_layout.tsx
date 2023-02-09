import { Header } from "./header";
import { Outlet } from "react-router-dom"

const MainLayout: React.FC = () => {
    return (
        <main>
            <Header />
            <Outlet />
        </main>
    )
}

export default MainLayout