import { useAppDispatch } from "./useAppDispatch"
import { useAppSelector } from "./useAppSelector"

import { actions } from "@/store/slices/graphSlice.ts"

import { useMemo } from 'react'
import { bindActionCreators } from '@reduxjs/toolkit'

export const useGraph = () => {
    const dispatch = useAppDispatch()

    const nodes = useAppSelector((state) => state.graph.nodes)
    const edges = useAppSelector((state) => state.graph.edges)

    const boundActionCreators = useMemo(
        () => bindActionCreators(actions, dispatch),
        [dispatch]
    )

    return {
        nodes,
        edges,
        ...boundActionCreators
    }
}