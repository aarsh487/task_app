"use client";

import { Task } from "@/app/page";
import { axiosInstance } from "@/config/axiosInstance";
import { Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Inputtask } from "./Inputtask";

export const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const getTasks = async () => {
    try {
      const response = await axiosInstance.get("/");
      if (!response.data.success) {
        console.log("No tasks found");
        return;
      }
      setTasks(response.data.tasks);
    } catch (error) {
      console.log("Server Error");
    }
  };

  async function createTask(title: string) {
    try {
      console.log(title);
      const response = await axiosInstance.post("/task", { title });
      if (!response.data.success) {
        console.log("No tasks added");
        return;
      }
      setTasks((prev) => [...prev, response.data.newTask]);
    } catch (error) {
      console.log(error);
    }
  }

  const toggleTask = async (id: string, isCompleted: boolean) => {
    try {
      const response = await axiosInstance.put(`/task/${id}`, { isCompleted });
      if (!response.data.success) {
        console.log("No task changed");
        return;
      }
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
        )
      );
    } catch (error) {
      console.log("Server Error");
    }
  };

  const deleteTask = async (id: string) => {
    try {
      const response = await axiosInstance.delete(`/task/${id}`);
      if (!response.data.success) {
        console.log("No task deleted");
        return;
      }
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (error) {
      console.log("Server Error");
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <Inputtask createTask={createTask} />
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <div
            key={task.id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "14px",
              borderRadius: "12px",
              backgroundColor: "#FFFFFF",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              transition: "box-shadow 0.3s ease",
            }}
          >
            <button
              onClick={() => toggleTask(task.id, !task.isCompleted)}
              style={{
                width: "24px",
                height: "24px",
                backgroundColor: task?.isCompleted ? "black" : "white",
                border: "1px solid black",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: 0,
                cursor: "pointer",
                transition: "background-color 0.3s, border-color 0.3s",
              }}
            ></button>

            <h2
              style={{
                flex: 1,
                margin: "0 16px",
                color: task?.isCompleted ? "#6B7280" : "#1F2937",
                textDecoration: task?.isCompleted ? "line-through" : "none",
                fontSize: "18px",
                fontWeight: "500",
              }}
            >
              {task.title}
            </h2>

            <button
              onClick={() => deleteTask(task.id)}
              style={{
                backgroundColor: "transparent",
                color: "white",
                border: "none",
                padding: "",
                borderRadius: "12px",
                fontSize: "14px",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
              }}
            >
              <Trash color="#bd2828" />
            </button>
          </div>
        ))
      ) : (
        <div
          style={{
            textAlign: "center",
            color: "#6B7280",
            padding: "20px",
            backgroundColor: "#F9FAFB",
            borderRadius: "12px",
          }}
        >
          No tasks available
        </div>
      )}
    </div>
  );
};
