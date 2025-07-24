"use client"

import React from "react"
import { useForm, Controller } from "react-hook-form"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { Box, Paper, TextField, Button, Typography, Alert, Container } from "@mui/material"
import { useDispatch } from "react-redux"
import { login } from "../store/slices/authSlice"

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
  },
})

interface LoginFormData {
  username: string
  password: string
}

const LoginForm: React.FC = () => {
  const dispatch = useDispatch()
  const [error, setError] = React.useState<string>("")
  const [formReady, setFormReady] = React.useState(false)

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setFormReady(true)
    }, 200)

    return () => clearTimeout(timer)
  }, [])

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      username: "",
      password: "",
    },
  })

  const onSubmit = (data: LoginFormData) => {
    if (data.username === "admin" && data.password === "admin") {
      dispatch(login({ username: data.username, isAuthenticated: true }))
      setError("")
    } else {
      setError("Неверные учетные данные")
    }
  }

  if (!formReady) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#f5f5f5",
        }}
      >
        Загрузка формы...
      </div>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
          <Paper elevation={3} sx={{ p: 4, width: "100%" }}>
            <Typography variant="h4" component="h1" gutterBottom align="center">
              Авторизация
            </Typography>
            <Typography variant="subtitle1" gutterBottom align="center" color="text.secondary">
              Система управления манипулятором
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
              <Controller
                name="username"
                control={control}
                rules={{ required: "Введите имя пользователя" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Имя пользователя"
                    fullWidth
                    margin="normal"
                    error={!!errors.username}
                    helperText={errors.username?.message}
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                rules={{ required: "Введите пароль" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Пароль"
                    type="password"
                    fullWidth
                    margin="normal"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                  />
                )}
              />

              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Войти
              </Button>
            </Box>
          </Paper>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default LoginForm
