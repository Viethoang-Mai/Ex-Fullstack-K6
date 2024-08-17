"use client";
import React, { useCallback } from "react";
import {
    ReactFlow,
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

const initialNodes = [
    { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
];
const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

export default function MindMap() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges]
    );

    return (
        <div style={{ width: "100%", height: "70vh" }}>
            <ReactFlow
                fitView
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
            >
                <Controls />
                <MiniMap />
                <Background variant="dots" gap={12} size={1} />
            </ReactFlow>
        </div>
    );
}
