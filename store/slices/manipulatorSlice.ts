import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { ManipulatorState, Position } from "../../types"

interface ManipulatorSliceState {
  manipulator: ManipulatorState
  isAnimating: boolean
  animationSpeed: number
}

const initialState: ManipulatorSliceState = {
  manipulator: {
    position: { x: 0, y: 0 },
    isCarryingSample: false,
    carriedSampleId: undefined,
  },
  isAnimating: false,
  animationSpeed: 500,
}

const manipulatorSlice = createSlice({
  name: "manipulator",
  initialState,
  reducers: {
    setPosition: (state, action: PayloadAction<Position>) => {
      state.manipulator.position = action.payload
    },
    setCarryingSample: (state, action: PayloadAction<{ isCarrying: boolean; sampleId?: string }>) => {
      state.manipulator.isCarryingSample = action.payload.isCarrying
      state.manipulator.carriedSampleId = action.payload.sampleId
    },
    setAnimating: (state, action: PayloadAction<boolean>) => {
      state.isAnimating = action.payload
    },
    setAnimationSpeed: (state, action: PayloadAction<number>) => {
      state.animationSpeed = action.payload
    },
    resetManipulator: (state) => {
      state.manipulator = {
        position: { x: 0, y: 0 },
        isCarryingSample: false,
        carriedSampleId: undefined,
      }
    },
  },
})

export const { setPosition, setCarryingSample, setAnimating, setAnimationSpeed, resetManipulator } =
  manipulatorSlice.actions
export default manipulatorSlice.reducer
