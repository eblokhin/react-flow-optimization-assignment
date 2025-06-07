import {useCallback, useMemo} from 'react'

import {
    ReactFlowProvider,
    ReactFlow,
    Background,
    Panel,

    BackgroundVariant,
} from "@xyflow/react";
import '@xyflow/react/dist/style.css';

import FPSCounter from "@/components/FPSCounter.tsx";
import Node from "@/components/Node.tsx";

import {
    useGraph
} from "@/hooks";

function App() {

    const {
        nodes,
        edges,
        addNode,
        addConnection,
        setNodesChanges,
        setEdgeChanges
    } = useGraph();

    const onAddClick = useCallback(() => {
        addNode()
    }, [addNode])

    // согласно документации, если noedTypes объявляется внутри компонента, то useMemo обязателен для предотвращения rerender
    const nodeTypes = useMemo(() => ({custom: Node}), [])

    return (
        <div
            style={{
                width: '100vw',
                height: '100vh'
            }}
        >
            <ReactFlowProvider>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={setNodesChanges}
                    onEdgesChange={setEdgeChanges}
                    onConnect={addConnection}
                    nodeTypes={nodeTypes}
                    deleteKeyCode={"Delete"}
                >
                    <Panel>
                        <FPSCounter/>
                        <button onClick={onAddClick}>Add Node</button>
                    </Panel>
                    <Background variant={BackgroundVariant.Dots} gap={12} size={1}/>
                </ReactFlow>
            </ReactFlowProvider>
        </div>
    )
}

export default App;
