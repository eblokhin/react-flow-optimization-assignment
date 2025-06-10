import React, { memo } from 'react';

import {
    Handle,
    Position,
    type NodeProps
} from '@xyflow/react';

import {
    type NodeType
} from "@/schemas";
import DictionaryTable from "@/components/DictTable.tsx";

// Rerender будет происходить на каждое изменения состояния ноды
// Для оптимизации нутрянку можно обернуть в memo, а props'ы декомпозировать на нужные
const NodeWrapper: React.FC<NodeProps<NodeType>> = (props) => {
    return <Node id={props.id} selected={props.selected} displayName={props.data.displayName} values={props.data.values}  />
}

const Node: React.FC<{
    id: string
    selected: boolean
    displayName: string
    values: Record<string, number>
}> = memo((props) => {
    const {
        id,
        values,
        displayName,
        selected
    } = props;

    return (
        <div
            id={id}
            style={{
                border: selected ? "2px solid #0070f3" : "2px solid #c1c1c1",
                borderRadius: "10px",
                padding: "10px",
                background: "#FFFCFF",
                boxShadow: selected
                    ? "0 0 10px rgba(0, 112, 243, 0.5)"
                    : "none",
                transition: "box-shadow 0.2s, border 0.2s"
            }}
        >
            <div style={{ marginBottom: "10px" }}>
                <strong>{displayName}</strong>
            </div>
            <div>
                <Handle
                    type='target'
                    position={Position.Left}
                />
                <Handle
                    type='source'
                    position={Position.Right}
                />
            </div>
            <DictionaryTable data={values}/>
        </div>
    )
})

export default NodeWrapper;