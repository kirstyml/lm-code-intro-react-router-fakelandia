import { ReactComponent as Logo } from "../assets/Fakelandia.svg";

export const Footer : React.FC = () => {
    return (
        <footer className="footer">
            <Logo height={100} width={100} />
            <p className="footer__copyright">© 2023 TechReturners</p>
        </footer>
    )
}