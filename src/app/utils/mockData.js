import { useEffect, useState } from "react";
import professions from "../mockData/professions.json";
import qualities from "../mockData/qualities.json";
import users from "../mockData/users.json";
import httpService from "../services/http.service";

const useMockData = () => {
    const statusConsts = {
        idle: "Not started",
        pending: "In progress",
        successed: "Ready",
        error: "Error occured"
    };

    const [error, setError] = useState(null);
    const [status, setStatus] = useState(statusConsts.idle);
    const [progress, setProgress] = useState(0);
    const [count, setCount] = useState(0);
    const summuryCount = professions.length + qualities.length + users.length;

    const increaseCount = () => {
        setCount(prevState => prevState + 1);
    };

    const updateProgress = () => {
        if (count !== 0 && status === status.idle) {
            setStatus(statusConsts.pending);
        }
        const newProgress = Math.floor((count / summuryCount) * 100);
        if (progress < newProgress) {
            setProgress(() => newProgress);
        }
        if (newProgress === 100) {
            setStatus(statusConsts.successed);
        }
    };

    useEffect(() => {
        updateProgress();
    }, [count]);

    const isitialize = async () => {
        try {
            for (const prof of professions) {
                await httpService.put("profession/" + prof._id, prof);
                increaseCount();
            }
            for (const user of users) {
                await httpService.put("user/" + user._id, user);
                increaseCount();
            }
            for (const quality of qualities) {
                await httpService.put("quality/" + quality._id, quality);
                increaseCount();
            }
        } catch (error) {
            setError(error);
            setStatus(statusConsts.error);
        }
    };

    return ({ error, isitialize, progress, status });
};

export default useMockData;
