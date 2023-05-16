import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faL } from "@fortawesome/free-solid-svg-icons";
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
            <nav role="navigation" className="main-nav" id="main-nav">
                <ul id="main-nav-list">
                    <h1>Things to do</h1>
                    <li>
                        <div className="icon">
                            <div
                                className="itemys"
                                style={{
                                    display: menuLinks ? "flex" : "none",
                                }}
                            >
                                <button onClick={() => console.log("clickMu")}>
                                    click me
                                </button>
                                <button onClick={() => console.log("clickMe")}>
                                    click mu
                                </button>
                            </div>
                            <svg
                                onClick={handleMenuClick}
                                viewBox="0 0 100 100"
                                className="icon"
                            >
                                <FontAwesomeIcon icon={faBars} />
                            </svg>
                        </div>
                    </li>
                </ul>
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
