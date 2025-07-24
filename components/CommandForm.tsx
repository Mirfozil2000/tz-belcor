"use client"

import React from "react"
import { useForm, Controller } from "react-hook-form"
import { Paper, TextField, Button, Typography, Box, Slider, Alert } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../store"
import { setAnimationSpeed } from "../store/slices/manipulatorSlice"
import { optimizeCommands } from "../utils/commandOptimizer"

interface CommandFormData {
  commands: string
}

interface CommandFormProps {
  onExecute: (originalCommand: string, optimizedCommand: string) => void
}

const CommandForm: React.FC<CommandFormProps> = ({ onExecute }) => {
  const dispatch = useDispatch()
  const manipulatorState = useSelector((state: RootState) => state.manipulator)
  const [optimizedCommand, setOptimizedCommand] = React.useState<string>("")

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CommandFormData>({
    defaultValues: {
      commands: "",
    },
  })

  const watchedCommands = watch("commands", "")

  React.useEffect(() => {
    if (watchedCommands) {
      const optimized = optimizeCommands(watchedCommands.toUpperCase())
      setOptimizedCommand(optimized)
    } else {
      setOptimizedCommand("")
    }
  }, [watchedCommands])

  const validateCommands = (value: string) => {
    if (!value) return "Введите команды"
    const validCommands = /^[ЛПВНОБлпвноб]+$/
    if (!validCommands.test(value)) {
      return "Допустимые команды: Л, П, В, Н, О, Б"
    }
    return true
  }

  const onSubmit = (data: CommandFormData) => {
    const upperCommands = data.commands.toUpperCase()
    const optimized = optimizeCommands(upperCommands)
    onExecute(upperCommands, optimized)
  }

  if (!manipulatorState) {
    return (
      <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
        <Typography>Загрузка...</Typography>
      </Paper>
    )
  }

  const { animationSpeed, isAnimating } = manipulatorState

  return (
    <Paper elevation={2} sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Управление манипулятором
      </Typography>

      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="commands"
          control={control}
          rules={{ validate: validateCommands }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Последовательность команд"
              fullWidth
              multiline
              rows={3}
              margin="normal"
              error={!!errors.commands}
              helperText={
                errors.commands?.message ||
                "Доступные команды: Л (лево), П (право), В (вверх), Н (низ), О (взять), Б (отпустить)"
              }
              disabled={isAnimating}
            />
          )}
        />

        {optimizedCommand && (
          <Alert severity="info" sx={{ mt: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Оптимизированная команда:
            </Typography>
            <Typography variant="body2" fontFamily="monospace">
              {optimizedCommand}
            </Typography>
          </Alert>
        )}

        <Box sx={{ mt: 2, mb: 2 }}>
          <Typography gutterBottom>Скорость анимации: {animationSpeed}мс</Typography>
          <Slider
            value={animationSpeed}
            onChange={(_, value) => dispatch(setAnimationSpeed(value as number))}
            min={100}
            max={2000}
            step={100}
            marks
            disabled={isAnimating}
            valueLabelDisplay="auto"
          />
        </Box>

        <Button type="submit" variant="contained" fullWidth disabled={isAnimating || !watchedCommands} sx={{ mt: 2 }}>
          {isAnimating ? "Выполняется..." : "Выполнить команды"}
        </Button>
      </Box>
    </Paper>
  )
}

export default CommandForm
