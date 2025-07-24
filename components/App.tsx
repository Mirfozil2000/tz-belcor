"use client"

import React from "react"
import { useSelector } from "react-redux"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { Box } from "@mui/material"
import type { RootState } from "../store"
import LoginForm from "./LoginForm"
import MainInterface from "./MainInterface"
import LoadingScreen from "./LoadingScreen"

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarGutter: "stable",
        },
      },
    },
  },
})

const App: React.FC = () => {
  const [isClient, setIsClient] = React.useState(false)
  const user = useSelector((state: RootState) => state.auth.user)

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsClient(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  if (!isClient) {
    return <LoadingScreen />
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: "100vh", bgcolor: "grey.100" }}>
        {user?.isAuthenticated ? <MainInterface /> : <LoginForm />}
      </Box>
    </ThemeProvider>
  )
}

export default App
