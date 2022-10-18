import React from "react";
import useMockData from "../utils/mockData";

const Main = () => {
    const { error, isitialize, progress, status } = useMockData();
    const handleClick = () => {
        isitialize();
        console.log("Инициализация");
    };

    return (
        <div className="container m-5 text-center">
            <h3>Main page</h3>
            <h3>Инициализация данных в FireBase</h3>
            <ul>
                <li>Status: {status}</li>
                <li>Progress: {progress} %</li>
                {error && <li>error: {error}</li>}
            </ul>
            <button className="btn btn-primary"
                onClick={handleClick}
            >Инициализация</button>
        </div>
    );
};

export default Main;
