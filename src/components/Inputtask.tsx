"use client";

import React, { useState } from 'react'

export const Inputtask = ({createTask}: { createTask: (title: string) => void}) => {
    const [ title, setTitle ] = useState<string>("")
  return (
    <div>
        <form
        onSubmit={(e) => {e.preventDefault(); createTask(title); setTitle("")}}
        style={{
          display: "flex",
          gap: "12px",
          alignItems: "center",
          marginBottom: "24px",
        }}
      > 
        <input
          type="text"
          placeholder="Add a new task..."
          onChange = {(e) => setTitle(e.target.value)}
          style={{
            backgroundColor: "#F9FAFB",
            color: "#1F2937",
            flex: 1,
            padding: "14px 18px",
            borderRadius: "12px",
            border: "2px solid #E5E7EB",
            fontSize: "16px",
            outline: "none",
            transition: "border-color 0.3s ease",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "14px 20px",
            color: "white",
            border: "none",
            borderRadius: "12px",
            backgroundColor: "black",
            fontSize: "16px",
            transition: "background-color 0.3s ease",
          }}
        >
          {"Add"}
        </button>
      </form>
    </div>
  )
}
