import "./Loader.css";
import { useLoader } from "../../../context/LoaderContext";

export default function Loader() {
    const { isLoading } = useLoader();
    if (!isLoading) return null;

    return (
        <div className="loader-overlay">
            <div className="loader-container">
                <div className="loader"></div>
            </div>
        </div>
    );
}
