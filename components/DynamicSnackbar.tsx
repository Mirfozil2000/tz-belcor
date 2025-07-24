"use client"

import React from "react"
import { Snackbar, Alert } from "@mui/material"

interface DynamicSnackbarProps {
  open: boolean
  message: string
  severity: "success" | "error"
  onClose: () => void
}

const DynamicSnackbar: React.FC<DynamicSnackbarProps> = ({ open, message, severity, onClose }) => {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert onClose={onClose} severity={severity} variant="filled" sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  )
}

export default DynamicSnackbar
