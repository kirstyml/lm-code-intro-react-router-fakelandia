import { Routes, Route } from "react-router-dom";
import { Confession } from "./components/confession";
import { Home } from "./components/home";
import { Misdemeanour } from "./components/misdemeanour";
import { NotFound } from "./components/not_found";

const SiteRouter: React.FC = () => (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/misdemeanour" element={<Misdemeanour />} />
        <Route path="/confession" element={<Confession />} />
        <Route path="*" element={<NotFound />} />
    </Routes>
);

export default SiteRouter;