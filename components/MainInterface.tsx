"use client"

import React from "react"
import { Container, Grid, AppBar, Toolbar, Typography, Button, Box } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../store"
import { logout } from "../store/slices/authSlice"
import { setPosition, setCarryingSample, setAnimating, resetManipulator } from "../store/slices/manipulatorSlice"
import { removeSample, addSample, generateNewSamples } from "../store/slices/samplesSlice"
import type { Command, Position, CommandType } from "../types"

const DynamicManipulatorGrid = React.lazy(() => import("./ManipulatorGrid"))
const DynamicCommandForm = React.lazy(() => import("./CommandForm"))
const DynamicCommandHistory = React.lazy(() => import("./CommandHistory"))
const DynamicNotification = React.lazy(() => import("./Notification"))

const MainInterface: React.FC = () => {
  const dispatch = useDispatch()
  const authState = useSelector((state: RootState) => state.auth)
  const manipulatorState = useSelector((state: RootState) => state.manipulator)
  const samplesState = useSelector((state: RootState) => state.samples)

  const [interfaceReady, setInterfaceReady] = React.useState(false)
  const [commandHistory, setCommandHistory] = React.useState<Command[]>([])
  const [notification, setNotification] = React.useState<{
    open: boolean
    message: string
    severity: "success" | "error"
  }>({ open: false, message: "", severity: "success" })

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setInterfaceReady(true)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  if (!interfaceReady || !authState || !manipulatorState || !samplesState) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography variant="h6">Загрузка интерфейса...</Typography>
      </Box>
    )
  }

  const { user } = authState
  const { manipulator, animationSpeed } = manipulatorState
  const { samples } = samplesState

  const showNotification = (message: string, severity: "success" | "error") => {
    setNotification({ open: true, message, severity })
  }

  const handleCloseNotification = () => {
    setNotification((prev) => ({ ...prev, open: false }))
  }

  const handleLogout = () => {
    dispatch(logout())
    dispatch(resetManipulator())
  }

  const executeCommand = async (originalCommand: string, optimizedCommand: string) => {
    dispatch(setAnimating(true))

    const samplesBeforeExecution = [...samples]
    let currentPosition = { ...manipulator.position }
    let isCarrying = manipulator.isCarryingSample
    let carriedSampleId = manipulator.carriedSampleId

    try {
      const commands = optimizedCommand.split("")

      for (let i = 0; i < commands.length; i++) {
        const command = commands[i] as CommandType

        if (/\d/.test(command)) {
          const match = optimizedCommand.substring(i).match(/^(\d+)([ЛПВН])/)
          if (match) {
            const count = Number.parseInt(match[1])
            const direction = match[2] as CommandType

            for (let j = 0; j < count; j++) {
              currentPosition = moveManipulator(currentPosition, direction)
              dispatch(setPosition(currentPosition))
              await sleep(animationSpeed)
            }

            i += match[0].length - 1
            continue
          }
        }

        if (["Л", "П", "В", "Н"].includes(command)) {
          currentPosition = moveManipulator(currentPosition, command)
          dispatch(setPosition(currentPosition))
        } else if (command === "О") {
          const result = pickUpSample(currentPosition)
          if (result.success) {
            isCarrying = true
            carriedSampleId = result.sampleId
            dispatch(
              setCarryingSample({
                isCarrying: true,
                sampleId: result.sampleId,
              }),
            )
            if (result.sampleId) {
              dispatch(removeSample(result.sampleId))
            }
          }
        } else if (command === "Б") {
          if (isCarrying && carriedSampleId) {
            dispatch(
              addSample({
                id: carriedSampleId,
                position: currentPosition,
              }),
            )
            isCarrying = false
            carriedSampleId = undefined
            dispatch(setCarryingSample({ isCarrying: false }))
          }
        }

        await sleep(animationSpeed)
      }

      const newCommand: Command = {
        id: Date.now().toString(),
        originalCommand,
        optimizedCommand,
        timestamp: new Date().toISOString(),
        samplesBeforeExecution,
        samplesAfterExecution: [...samples],
        status: "success",
      }

      setCommandHistory((prev) => [newCommand, ...prev])
      showNotification("Команды успешно выполнены!", "success")
    } catch (error) {
      showNotification("Ошибка при выполнении команд", "error")
    } finally {
      dispatch(setAnimating(false))
    }
  }

  const moveManipulator = (currentPos: Position, direction: CommandType): Position => {
    const newPos = { ...currentPos }

    switch (direction) {
      case "Л":
        newPos.x = Math.max(0, newPos.x - 1)
        break
      case "П":
        newPos.x = Math.min(9, newPos.x + 1)
        break
      case "В":
        newPos.y = Math.max(0, newPos.y - 1)
        break
      case "Н":
        newPos.y = Math.min(9, newPos.y + 1)
        break
    }

    return newPos
  }

  const pickUpSample = (position: Position): { success: boolean; sampleId?: string } => {
    const sample = samples.find((s) => s.position.x === position.x && s.position.y === position.y)
    if (sample && !manipulator.isCarryingSample) {
      return { success: true, sampleId: sample.id }
    }
    return { success: false }
  }

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Система управления манипулятором - {user?.username}
          </Typography>
          <Button color="inherit" onClick={() => dispatch(generateNewSamples())} sx={{ mr: 1 }}>
            Новые образцы
          </Button>
          <Button color="inherit" onClick={handleLogout}>
            Выйти
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 3, pb: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={6}>
            <React.Suspense fallback={<Box sx={{ p: 2 }}>Загрузка сетки...</Box>}>
              <DynamicManipulatorGrid />
            </React.Suspense>
            <React.Suspense fallback={<Box sx={{ p: 2 }}>Загрузка формы...</Box>}>
              <DynamicCommandForm onExecute={executeCommand} />
            </React.Suspense>
          </Grid>
          <Grid item xs={12} lg={6}>
            <React.Suspense fallback={<Box sx={{ p: 2 }}>Загрузка истории...</Box>}>
              <DynamicCommandHistory commands={commandHistory} />
            </React.Suspense>
          </Grid>
        </Grid>
      </Container>

      <React.Suspense fallback={null}>
        <DynamicNotification
          open={notification.open}
          message={notification.message}
          severity={notification.severity}
          onClose={handleCloseNotification}
        />
      </React.Suspense>
    </Box>
  )
}

export default MainInterface
