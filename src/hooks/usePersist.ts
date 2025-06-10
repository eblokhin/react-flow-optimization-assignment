import { useEffect, useLayoutEffect, useRef } from "react"

import type { EdgeType, NodeType } from '@/schemas'
import { store } from '@/store'
import { useGraph } from './useGraph'

const usePersist = ((key = 'react-flow-state') => {
  const { setEdges, setNodes } = useGraph()
  const initializedRef = useRef<string>(null)

  useLayoutEffect(() => {
    // отменить повторную инициализацию
    if (initializedRef.current === key) {
      return
    }

    const record = window.localStorage.getItem(key)

    if (!record) return

    try {
      const dataParsed = JSON.parse(record) as {
        nodes: NodeType[]
        edges: EdgeType[]
      }

      setNodes(dataParsed.nodes)
      setEdges(dataParsed.edges)
    } catch (e) {
      console.error(`Coudn't parse saved data`)
    }

    initializedRef.current = key
  }, [key, setNodes, setEdges])

  useEffect(() => {
    const saveData = (key: string) => {
      const { nodes, edges } = store.getState().graph
      const data = JSON.stringify({
        nodes,
        edges,
      })

      window.localStorage.setItem(key, data)
    }

    const visibilityHandler = () => {
      const isHidden = document.visibilityState === 'hidden'

      if (isHidden) {
        saveData(key)
      }
    }

    const unloadHandler = () => {
      saveData(key)
    }

    document.addEventListener('visibilitychange', visibilityHandler)
    window.addEventListener('beforeunload', unloadHandler)

    return () => {
      document.removeEventListener('visibilitychange', visibilityHandler)
      window.removeEventListener('beforeunload', unloadHandler)
    }
  }, [key])
})

export default usePersist
