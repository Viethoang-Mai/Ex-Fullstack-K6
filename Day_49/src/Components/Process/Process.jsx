import React from "react";
import { useDispatch } from "../../Store/hook";
import { useSelector } from "../../Store/hook";
export default function Process() {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const points = [100, 512, 1024, 1536, 2048];
    const getPercentPosition = (arr) => {
        const newArr = arr.map((value) => {
            return (value / 2048) * 100;
        });
        return newArr;
    };
    const getWidth = (e) => {
        const maxWidth = document.documentElement.clientWidth;
        const x = e.clientX;
        const width = Math.round((x / maxWidth) * 100);
         const range =
            Math.round((width / 100) * 2048) <= 0
                ? 5
                : Math.round((width / 100) * 2048);
        dispatch({
            type: "set_width",
            payload: {
                rate: width,
                range: range,
                restTimes: Math.ceil(Math.log2(range)),
            },
        });
        document.addEventListener("mousemove", handleDrag);
    };
    const handleBtn = (e) => {
        e.stopPropagation();

        document.addEventListener("mousemove", handleDrag);
    };
    document.addEventListener("mouseup", (e) => {
        document.removeEventListener("mousemove", handleDrag);
    });
    const handleDrag = (e) => {
        const maxWidth = document.documentElement.clientWidth;
        const x = e.clientX;
        const width = x > maxWidth ? 100 : Math.round((x / maxWidth) * 100);
        const range =
            Math.round((width / 100) * 2048) <= 0
                ? 5
                : Math.round((width / 100) * 2048);
        dispatch({
            type: "set_width",
            payload: {
                rate: width,
                range: range,
                restTimes: Math.ceil(Math.log2(range)),
            },
        });
    };
    return (
        <div
            className="process w-full h-2 bg-slate-300 mt-5 rounded relative cursor-pointer"
            onMouseDown={getWidth}
        >
            {getPercentPosition(points).map((point) => (
                <span
                    className="absolute top-4 transform -translate-x-full text-sm "
                    style={{ left: `${point}%` }}
                >
                    {(point / 100) * 2048}
                </span>
            ))}

            <div
                className="process-bar h-2 bg-cyan-800 "
                style={{ width: `${state.rate}%` }}
            ></div>
            <span
                className="process-btn absolute top-0 left-0 transform left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-sky-300  "
                style={{ left: `${state.rate}%` }}
                onMouseDown={handleBtn}
            >
                <span className="absolute px-2 -top-4 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-cyan-400 text-white rounded text-sm font-semibold">
                    {state.range}
                </span>
            </span>
        </div>
    );
}
