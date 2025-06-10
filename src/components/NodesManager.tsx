import {
  Background,
  BackgroundVariant,
  Panel,
  ReactFlow,
} from "@xyflow/react";

import Node from "@/components/Node";
import { useGraph } from "@/hooks";
import FPSCounter from "./FPSCounter";
import usePersist from '@/hooks/usePersist'

const CUSTOM_NODES = {
  custom: Node,
};

const NodesManager = () => {
  const {
    nodes,
    edges,
    setNodesChanges,
    setEdgesChanges,
    addNode, 
    addConnection
  } = useGraph()

  usePersist()

  const onAddNode = () => {
    addNode()
  }

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={setNodesChanges}
      onEdgesChange={setEdgesChanges}
      nodeTypes={CUSTOM_NODES}
      deleteKeyCode={"Delete"}
      onConnect={addConnection}
    >
      <Panel>
        <FPSCounter />
        <button onClick={onAddNode}>Add Node</button>
      </Panel>
      <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
    </ReactFlow>
  );
};

export default NodesManager;
