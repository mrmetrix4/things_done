import "./titlebar.css";
import { useEffect, useState } from "react";
import { setDataDir } from "../../io/dataIo";
import { appWindow } from "@tauri-apps/api/window";

function Navbar() {
    const [alwaysOnTop, setAlwaysOnTop] = useState(false);

    useEffect(() => {
        appWindow.setAlwaysOnTop(alwaysOnTop);
    }, [alwaysOnTop]);

    return (
        <nav data-tauri-drag-region className="titlebar">
            <div className="left-side-menu">
                <span data-tauri-drag-region className="logo">
                    ThingsDone
                </span>
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
    );
}

export default Navbar;
