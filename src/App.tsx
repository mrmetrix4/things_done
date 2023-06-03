import { TasksProvider } from "./Tasks/TasksContext";
import Footer from "./components/Footer/Footer";
import MainTasks from "./components/MainTasks/MainTasks";
import Titlebar from "./components/Titlebar/Titlebar";
import "./styles.css";

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
