import TaskList from "./Tasks/TaskList";
import { open } from "@tauri-apps/api/shell";
import { useState } from "react";

function App() {
    const [menuLinks, setMenuLinks] = useState(false);
    async function handleMenuClick() {
        console.log("Clicked");
        setMenuLinks((prevState) => !prevState);
    }

    return (
        <>
            <nav data-tauri-drag-region className="titlebar">
                <h1 className="logo">ThingsDone</h1>
                <div className="right-side-menu">
                    <img
                        className="menu-button menu-folder"
                        alt="change path"
                        src="/assets/window_folder.svg"
                    />
                    <img
                        className="menu-button menu-pushpin"
                        src="/assets/window_pushpin.svg"
                    />
                    <img
                        src="/assets/window_minimize.svg"
                        alt="minimize"
                        className="menu-button menu-minimize"
                    />
                    <img
                        src="/assets/window_maximize.svg"
                        alt="maximize"
                        className="menu-button menu-maximize"
                    />
                    <img
                        src="/assets/window_close.svg"
                        alt="close"
                        className="menu-button menu-close"
                    />
                </div>
            </nav>
            <div className="container">
                <TaskList />
                <footer>
                    <p>Designed and developed by Adar Arbiv</p>
                </footer>
            </div>
        </>
    );
}

export default App;
