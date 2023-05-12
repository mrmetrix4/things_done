import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

function App() {
    return (
        <div className="container">
            <h1>Things to do</h1>
            <FontAwesomeIcon icon={faBars} />
            <footer>
                <p>Designed and developed by Adar Arbiv</p>
            </footer>
        </div>
    );
}

export default App;
