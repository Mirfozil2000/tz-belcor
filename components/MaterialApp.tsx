"use client"

import React from "react"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { Box } from "@mui/material"
import MainInterface from "./MainInterface"

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

const MaterialApp: React.FC = () => {
  const [themeReady, setThemeReady] = React.useState(false)

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setThemeReady(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  if (!themeReady) {
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
        Инициализация темы...
      </div>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: "100vh", bgcolor: "grey.100" }}>
        <MainInterface />
      </Box>
    </ThemeProvider>
  )
}

export default MaterialApp
