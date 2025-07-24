"use client"

import React from "react"
import { useSelector } from "react-redux"
import type { RootState } from "../store"

const DynamicMaterialApp = React.lazy(() => import("./MaterialApp"))
const DynamicLoginForm = React.lazy(() => import("./LoginForm"))

const ClientApp: React.FC = () => {
  const [isClient, setIsClient] = React.useState(false)
  const [domReady, setDomReady] = React.useState(false)
  const user = useSelector((state: RootState) => state.auth.user)

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true)

      const checkDomReady = () => {
        if (document.readyState === "complete") {
          setTimeout(() => {
            setDomReady(true)
          }, 300)
        } else {
          document.addEventListener("readystatechange", () => {
            if (document.readyState === "complete") {
              setTimeout(() => {
                setDomReady(true)
              }, 300)
            }
          })
        }
      }

      checkDomReady()
    }
  }, [])

  if (!isClient || !domReady) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#f5f5f5",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            border: "4px solid #e0e0e0",
            borderTop: "4px solid #1976d2",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        />
        <p style={{ marginTop: "16px", color: "#666" }}>
          {!isClient ? "Инициализация..." : "Подготовка интерфейса..."}
        </p>
        <style
          dangerouslySetInnerHTML={{
            __html: `
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `,
          }}
        />
      </div>
    )
  }

  return (
    <React.Suspense
      fallback={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            backgroundColor: "#f5f5f5",
          }}
        >
          Загрузка компонентов...
        </div>
      }
    >
      {user?.isAuthenticated ? <DynamicMaterialApp /> : <DynamicLoginForm />}
    </React.Suspense>
  )
}

export default ClientApp
