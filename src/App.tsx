import "./styles.css";
import Titlebar from "./components/Titlebar/Titlebar";
import Footer from "./components/Footer/Footer";
import TaskList from "./components/TasksList/TasksList";
import MainTasks from "./components/MainTasks/MainTasks";

function App() {
    return (
        <div className="fullscreen">
            <Titlebar />
            <MainTasks />
            <Footer />
        </div>
    );
}

export default App;
