"use client"

import type React from "react"
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Box,
} from "@mui/material"
import type { Command } from "../types"

interface CommandHistoryProps {
  commands: Command[]
}

const CommandHistory: React.FC<CommandHistoryProps> = ({ commands }) => {
  return (
    <Paper elevation={2} sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        История команд
      </Typography>

      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell>Дата/Время</TableCell>
              <TableCell>Исходная команда</TableCell>
              <TableCell>Оптимизированная</TableCell>
              <TableCell>Статус</TableCell>
              <TableCell>Образцы до</TableCell>
              <TableCell>Образцы после</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {commands.map((command) => (
              <TableRow key={command.id} hover>
                <TableCell>
                  <Typography variant="caption">{new Date(command.timestamp).toLocaleString()}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontFamily="monospace">
                    {command.originalCommand}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontFamily="monospace">
                    {command.optimizedCommand}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={command.status === "success" ? "Успех" : "Ошибка"}
                    color={command.status === "success" ? "success" : "error"}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="caption">{command.samplesBeforeExecution.length}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="caption">{command.samplesAfterExecution.length}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {commands.length === 0 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            py: 4,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            История команд пуста
          </Typography>
        </Box>
      )}
    </Paper>
  )
}

export default CommandHistory
