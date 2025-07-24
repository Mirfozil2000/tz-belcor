"use client"

import type React from "react"
import { Paper, Typography, Box } from "@mui/material"
import { useSelector } from "react-redux"
import type { RootState } from "../store"

const GRID_SIZE = 10

const ManipulatorGrid: React.FC = () => {
  const manipulatorState = useSelector((state: RootState) => state.manipulator)
  const samplesState = useSelector((state: RootState) => state.samples)

  if (!manipulatorState || !samplesState) {
    return (
      <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
        <Typography>Загрузка...</Typography>
      </Paper>
    )
  }

  const { manipulator, animationSpeed } = manipulatorState
  const { samples } = samplesState

  const renderCell = (x: number, y: number) => {
    const isManipulator = manipulator.position.x === x && manipulator.position.y === y
    const sample = samples.find((s) => s.position.x === x && s.position.y === y)

    return (
      <Box
        key={`${x}-${y}`}
        sx={{
          width: 40,
          height: 40,
          border: "1px solid",
          borderColor: "grey.300",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          bgcolor: isManipulator ? "primary.main" : "background.paper",
          transition: `all ${animationSpeed}ms ease-in-out`,
        }}
      >
        {isManipulator && (
          <Typography variant="caption" color="primary.contrastText" fontWeight="bold">
            M
          </Typography>
        )}
        {sample && !isManipulator && (
          <Box
            sx={{
              width: 20,
              height: 20,
              borderRadius: "50%",
              bgcolor: "warning.main",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="caption" fontSize="10px" color="warning.contrastText">
              S
            </Typography>
          </Box>
        )}
        {sample && isManipulator && manipulator.isCarryingSample && (
          <Box
            sx={{
              position: "absolute",
              top: -5,
              right: -5,
              width: 15,
              height: 15,
              borderRadius: "50%",
              bgcolor: "warning.main",
              border: "2px solid",
              borderColor: "background.paper",
            }}
          />
        )}
      </Box>
    )
  }

  return (
    <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        Рабочая область манипулятора
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: `repeat(${GRID_SIZE}, 40px)`,
          gap: 0,
          border: "2px solid",
          borderColor: "grey.800",
          width: "fit-content",
          mb: 2,
        }}
      >
        {Array.from({ length: GRID_SIZE }, (_, y) => Array.from({ length: GRID_SIZE }, (_, x) => renderCell(x, y)))}
      </Box>
      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box sx={{ width: 20, height: 20, bgcolor: "primary.main" }} />
          <Typography variant="caption">Манипулятор</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              width: 20,
              height: 20,
              bgcolor: "warning.main",
              borderRadius: "50%",
            }}
          />
          <Typography variant="caption">Образец</Typography>
        </Box>
      </Box>
    </Paper>
  )
}

export default ManipulatorGrid
