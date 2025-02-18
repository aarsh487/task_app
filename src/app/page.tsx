import { Tasks } from "@/components/Tasks";

export interface Task {
  id: string;
  title: string;
  isCompleted: boolean;
}

export default async function Home() {

  return (
    <div
    style={{
      backgroundColor: "#F3F4F6",
      minHeight: "100vh",
      minWidth: "100vw",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "16px",
    }}
  >
    <div
      style={{
        maxWidth: "600px",
        width: "100%",
        background: "#FFFFFF",
        padding: "24px",
        borderRadius: "16px",
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#1F2937",
          fontSize: "28px",
          marginBottom: "24px",
          fontWeight: "600",
        }}
      >
        Task Manager
      </h1>
      {/* Task List */}
     <Tasks />
    </div>
  </div>
  );
}
