import TaskList from "./Tasks/TaskList";
import { useEffect, useState } from "react";
import { appWindow } from "@tauri-apps/api/window";
import "./style/titlebar.css";
import "./styles.css";
import { getDataDir, setDataDir } from "./io/dataIo";
import { copyFile } from "@tauri-apps/api/fs";

function App() {
    const [alwaysOnTop, setAlwaysOnTop] = useState(false);

    useEffect(() => {
        appWindow.setAlwaysOnTop(alwaysOnTop);
    }, [alwaysOnTop]);

    return (
        <>
            <nav data-tauri-drag-region className="titlebar">
                <div className="left-side-menu">
                    <h1 data-tauri-drag-region className="logo">
                        ThingsDone
                    </h1>
                </div>
                <div className="right-side-menu">
                    <img
                        draggable="false"
                        className="menu-button menu-button-dark-hover"
                        alt="change path"
                        src="/assets/window_folder.svg"
                        onClick={setDataDir}
                    />
                    <img
                        draggable="false"
                        className="menu-button menu-button-dark-hover"
                        alt="set always on top"
                        src="/assets/window_pushpin.svg"
                        onClick={() => setAlwaysOnTop(!alwaysOnTop)}
                    />
                    <img
                        draggable="false"
                        src="/assets/window_minimize.svg"
                        alt="minimize"
                        className="menu-button menu-button-dark-hover"
                        onClick={() => appWindow.minimize()}
                    />
                    <img
                        draggable="false"
                        src="/assets/window_maximize.svg"
                        alt="maximize"
                        className="menu-button menu-button-dark-hover"
                        onClick={() => appWindow.toggleMaximize()}
                    />
                    <img
                        draggable="false"
                        src="/assets/window_close.svg"
                        alt="close"
                        className="menu-button menu-button-red-hover"
                        onClick={() => appWindow.close()}
                    />
                </div>
            </nav>
            <div className="container">
                <TaskList />
            </div>
            <footer>
                <p>Designed and developed by Adar Arbiv</p>
            </footer>
        </>
    );
}

export default App;
