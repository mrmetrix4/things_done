import "./styles.css";
import Titlebar from "./components/Titlebar/Titlebar";
import Footer from "./components/Footer/Footer";
import TaskList from "./components/TasksList/TasksList";
import MainTasks from "./components/MainTasks/MainTasks";
import { TasksProvider } from "./Tasks/TasksContext";

function App() {
    return (
        <div className="fullscreen">
            <TasksProvider>
                <Titlebar />
                <MainTasks />
                <Footer />
            </TasksProvider>
        </div>
    );
}

export default App;
