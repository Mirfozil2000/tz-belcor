import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Sample } from "../../types"

interface SamplesState {
  samples: Sample[]
}

const generateRandomSamples = (): Sample[] => {
  const samples: Sample[] = []
  const numSamples = Math.floor(Math.random() * 5) + 3

  for (let i = 0; i < numSamples; i++) {
    samples.push({
      id: `sample-${i}`,
      position: {
        x: Math.floor(Math.random() * 10),
        y: Math.floor(Math.random() * 10),
      },
    })
  }

  return samples
}

const initialState: SamplesState = {
  samples: generateRandomSamples(),
}

const samplesSlice = createSlice({
  name: "samples",
  initialState,
  reducers: {
    setSamples: (state, action: PayloadAction<Sample[]>) => {
      state.samples = action.payload
    },
    removeSample: (state, action: PayloadAction<string>) => {
      state.samples = state.samples.filter((sample) => sample.id !== action.payload)
    },
    addSample: (state, action: PayloadAction<Sample>) => {
      state.samples.push(action.payload)
    },
    generateNewSamples: (state) => {
      state.samples = generateRandomSamples()
    },
  },
})

export const { setSamples, removeSample, addSample, generateNewSamples } = samplesSlice.actions
export default samplesSlice.reducer
