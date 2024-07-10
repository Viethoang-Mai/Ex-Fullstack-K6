import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch, useDispatchResult } from "../../Store/hook";
import { toast } from "react-toastify";
import { regexInput } from "./utils/regexInput";
import { getMaxTime } from "../../Utils/maxTime";

export default function Form() {
    const [finished, setFinished] = useState(false);
    const {
        restTimes,
        range,
        number: res,
        value,
    } = useSelector((state) => state);
    const dispatch = useDispatch();
    const dispatchResult = useDispatchResult();

    const inputRef = useRef(null);
    const handleSubmit = (e) => {
        e.preventDefault();
        const number = inputRef.current.value;

        if (+number === +res) {
            dispatchResult({ type: "set_result/success" });
            toast.success("Bạn đã đoán đúng");
            data.push({
                number: number,
                answer: true,
                maxTime: getMaxTime(range),
            });
            dataTotal.push(data);
            dispatch({ type: "rest_time", payload: restTimes - 1 });
            return;
        } else if (+number > res) {
            dispatchResult({ type: "set_result/higher" });
            toast.warning("Bạn cần giảm đi một chút");
        } else {
            dispatchResult({ type: "set_result/lower" });
            toast.warning("Bạn cần tăng lên một chút");
        }

        data.push({
            number: number,
        });
        if (restTimes === 0) {
            dataTotal.push(data);
        }

        dispatch({ type: "rest_time", payload: restTimes - 1 });
        if (restTimes === 0) {
            dispatch({ type: "reset" });
        }
    };
    const handleChange = (e) => {};

    useEffect(() => {
        document.addEventListener("keydown", (e) => {
            if (e.key === "ArrowUp") {
                inputRef.current.value =
                    +inputRef.current.value + 1 > range
                        ? range
                        : +inputRef.current.value + 1;
            } else if (e.key === "ArrowDown") {
                inputRef.current.value =
                    +inputRef.current.value - 1 < 1
                        ? 1
                        : +inputRef.current.value - 1;
            }
        });
    }, [range]);
    console.log(dataTotal, dataTotal.current);
    return (
        <div className="mt-10">
            <form action="" onSubmit={handleSubmit}>
                <label className="block">Hãy thử nhập một số</label>
                <input
                    type="text"
                    name="number"
                    id=""
                    placeholder="Thử một số"
                    className="w-full border-2 focus:border-cyan-500 focus:outline-none px-4 py-2 rounded-lg"
                    autoFocus
                    onChange={handleChange}
                    ref={inputRef}
                />
            </form>
        </div>
    );
}
