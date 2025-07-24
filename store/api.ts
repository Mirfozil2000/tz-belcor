import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { Command } from "../types"

export const manipulatorApi = createApi({
  reducerPath: "manipulatorApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/",
  }),
  tagTypes: ["Command"],
  endpoints: (builder) => ({
    executeCommand: builder.mutation<{ success: boolean; message: string }, { command: string }>({
      query: (body) => ({
        url: "execute",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Command"],
    }),
    getCommandHistory: builder.query<Command[], void>({
      query: () => "commands",
      providesTags: ["Command"],
    }),
  }),
})

export const { useExecuteCommandMutation, useGetCommandHistoryQuery } = manipulatorApi
