import { ReactFlowProvider } from "@xyflow/react";
import '@xyflow/react/dist/style.css';

import './styles.css'

import NodesManager from './components/NodesManager'

function App() {
    return (
        <div
            style={{
                width: '100vw',
                height: '100vh'
            }}
        >
            <ReactFlowProvider>
                <NodesManager />
            </ReactFlowProvider>
        </div>
    )
}

export default App;
