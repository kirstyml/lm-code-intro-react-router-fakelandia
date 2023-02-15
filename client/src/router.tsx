import { Routes, Route } from "react-router-dom";
import { Confession } from "./components/confession";
import { Home } from "./components/home";
import MainLayout from "./components/main_layout";
import { Misdemeanours } from "./components/misdemeanour";
import { MisdemeanoursProvider } from "./components/misdemeanour_provider";
import { NotFound } from "./components/not_found";

const SiteRouter: React.FC = () => (
    <Routes>
        <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/misdemeanours" element={<MisdemeanoursProvider><Misdemeanours /></MisdemeanoursProvider>} />
            <Route path="/confession" element={<Confession />} />
            <Route path="*" element={<NotFound />} />
        </Route>
    </Routes>
);

export default SiteRouter;