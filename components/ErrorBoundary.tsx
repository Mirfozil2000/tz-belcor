"use client"

import React from "react"
import { Paper, Typography, Button, Box } from "@mui/material"

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

class ErrorBoundary extends React.Component<React.PropsWithChildren<{}>, ErrorBoundaryState> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="grey.100">
          <Paper elevation={3} sx={{ p: 4, maxWidth: 500, textAlign: "center" }}>
            <Typography variant="h5" color="error" gutterBottom>
              Произошла ошибка
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Что-то пошло не так. Попробуйте перезагрузить страницу.
            </Typography>
            <Button variant="contained" onClick={() => window.location.reload()}>
              Перезагрузить
            </Button>
          </Paper>
        </Box>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
