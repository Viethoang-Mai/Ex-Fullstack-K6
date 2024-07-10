import React from "react";
import { useSelector, useDispatch, useSelectorResult } from "../../Store/hook";
import { getMaxTime } from "../../Utils/maxTime";
export default function Heading() {
    const dispatch = useDispatch();
    let range = useSelector((state) => state.range);
    const maxTime = getMaxTime(range);
    let restTime = useSelector((state) => state.restTimes);
    const CheckAnswer = useSelectorResult((state) => state.result);

    return (
        <div>
            <h2>{CheckAnswer}</h2>
            <p>
                Còn {restTime} / {maxTime}
            </p>
            <p>Bạn cần rìm kiếm một số từ 1 đến {range}</p>
        </div>
    );
}
