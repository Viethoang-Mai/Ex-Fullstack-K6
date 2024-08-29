import { useCallback, useState } from "react";
import { Handle, Position, useReactFlow } from "@xyflow/react";

function TextUpdaterNode(data) {
    const { setNodes } = useReactFlow();
    const [edit, setEdit] = useState(false);

    const onChange = useCallback(
        (evt) => {
            const newLabel = evt.target.value;
            setNodes((nds) =>
                nds.map((nd) => {
                    if (nd.id === data.id) {
                        return { ...nd, data: { ...nd.data, label: newLabel } };
                    }
                    return nd;
                })
            );
        },
        [setNodes, data.id]
    );

    return (
        <>
            <Handle type="target" position={Position.Top} />
            <div>
                <input
                    id="text"
                    name="text"
                    onChange={onChange}
                    defaultValue={data.data.label}
                    readOnly={!edit}
                    onDoubleClick={() => setEdit(true)}
                    onBlur={() => setEdit(false)}
                    onKeyUp={(e) => e.key === "Enter" && setEdit(false)}
                    className=" text-center border border-gray-300 rounded-lg p-2 inline-block "
                />
            </div>
            <Handle type="source" position={Position.Bottom} id="a" />
            <Handle type="source" position={Position.Bottom} id="b" />
        </>
    );
}

export default TextUpdaterNode;
