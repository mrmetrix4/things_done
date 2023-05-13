import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import TaskList from "./Tasks/TaskList";

function App() {
    return (
        <div className="container">
            <h1>Things to do</h1>
            <FontAwesomeIcon icon={faBars} />
            <TaskList />
            <footer>
                <p>Designed and developed by Adar Arbiv</p>
            </footer>
        </div>
    );
}

export default App;
