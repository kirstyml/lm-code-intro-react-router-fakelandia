import { Routes, Route } from "react-router-dom";
import { Confession } from "./pages/confession_page";
import { Home } from "./pages/home_page";
import MainLayout from "./components/main_layout";
import { Misdemeanours } from "./pages/misdemeanours_page";
import { NotFound } from "./components/not_found";

const SiteRouter: React.FC = () => (
  <Routes>
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Home />} />
      <Route path="/misdemeanours" element={<Misdemeanours />} />
      <Route path="/confession" element={<Confession />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);

export default SiteRouter;
