"use client"

import React from "react"

interface NotificationProps {
  open: boolean
  message: string
  severity: "success" | "error"
  onClose: () => void
}

const Notification: React.FC<NotificationProps> = ({ open, message, severity, onClose }) => {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  React.useEffect(() => {
    if (open && mounted) {
      const timer = setTimeout(() => {
        onClose()
      }, 4000)

      return () => clearTimeout(timer)
    }
  }, [open, mounted, onClose])

  if (!mounted || !open) {
    return null
  }

  return (
    <div
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        backgroundColor: severity === "success" ? "#4caf50" : "#f44336",
        color: "white",
        padding: "12px 24px",
        borderRadius: "4px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        zIndex: 1000,
        cursor: "pointer",
      }}
      onClick={onClose}
    >
      {message}
    </div>
  )
}

export default Notification
