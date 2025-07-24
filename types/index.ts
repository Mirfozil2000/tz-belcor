export interface Position {
  x: number
  y: number
}

export interface Sample {
  id: string
  position: Position
}

export interface Command {
  id: string
  originalCommand: string
  optimizedCommand: string
  timestamp: string
  samplesBeforeExecution: Sample[]
  samplesAfterExecution: Sample[]
  status: "success" | "error"
}

export interface ManipulatorState {
  position: Position
  isCarryingSample: boolean
  carriedSampleId?: string
}

export type CommandType = "Л" | "П" | "В" | "Н" | "О" | "Б"

export interface User {
  username: string
  isAuthenticated: boolean
}
