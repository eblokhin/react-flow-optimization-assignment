import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { type NodeType, type EdgeType } from "@/schemas";
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  type Connection,
  type EdgeChange,
  type NodeChange,
} from "@xyflow/react";
import { createRandomDictionary } from "@/utils";

interface InitialState {
  nodes: NodeType[];
  edges: EdgeType[];
}

const initialState: InitialState = {
  nodes: [],
  edges: [],
};

const graphSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    addNode: (state) => {
      const nodesLength = state.nodes.length;
      const newNode: NodeType = {
        id: (nodesLength + 1).toString(),
        position: { x: Math.random() * 400, y: Math.random() * 400 },
        type: "custom",
        data: {
          displayName: `Node ${nodesLength + 1}`,
          values: createRandomDictionary(2),
        },
      };
      state.nodes = [...state.nodes, newNode];
    },
    addConnection: (state, action: PayloadAction<Connection>) => {
      const connection = action.payload;
      const { edges, nodes } = state;
      const newEdges = addEdge<EdgeType>(connection, edges);

      const sourceNode = nodes.find((node) => node.id === connection.source);
      const targetNode = nodes.find((node) => node.id === connection.target);

      if (!sourceNode || !targetNode) {
        console.error(
          "Source or target node not found for connection:",
          connection
        );
        return;
      }

      const sourceNodeData = sourceNode.data;
      const targetNodeData = targetNode.data;

      // скопировать данные из source node в target node
      const newNode: NodeType = {
        id: connection.target,
        position: targetNode.position,
        type: "custom",
        data: {
          displayName: targetNodeData.displayName,
          values: {
            ...sourceNodeData.values,
            ...targetNodeData.values,
          },
        },
      };

      state.nodes = nodes.map((node) =>
        node.id === newNode.id ? newNode : node
      );

      state.edges = newEdges;
    },
    setNodes: (state, action: PayloadAction<NodeType[]>) => {
      state.nodes = action.payload;
    },
    setEdges: (state, action: PayloadAction<EdgeType[]>) => {
      state.edges = action.payload;
    },
    setNodesChanges: (state, action: PayloadAction<NodeChange<NodeType>[]>) => {
      state.nodes = applyNodeChanges<NodeType>(action.payload, state.nodes);
    },
    setEdgesChanges: (
      state,
      action: PayloadAction<EdgeChange<EdgeType>[]>
    ) => {
      state.edges = applyEdgeChanges(action.payload, state.edges);
    },
  },
});

export const { actions, reducer } = graphSlice;
