import "./styles.css";
import Titlebar from "./components/Titlebar/Titlebar";
import Footer from "./components/Footer/Footer";
import TaskList from "./components/TaskList/TaskList";

function App() {
    return (
        <div className="fullscreen">
            <Titlebar />
            <TaskList />
            <Footer />
        </div>
    );
}

export default App;
