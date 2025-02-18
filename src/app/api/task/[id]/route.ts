import { NextRequest, NextResponse } from "next/server";
import { Task, tasks } from "../route";
import { taskSchema } from "@/schema/taskSchema";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const taskid = Number((await params).id);
    console.log(taskid);
    const taskIndex = tasks.findIndex((t) => t.id === taskid);
    tasks.splice(taskIndex, 1);
    console.log("deleted tasks", tasks);
    return NextResponse.json(
      { success: true, message: "task deleted successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error deleting task", error);
    return NextResponse.json({ message: "Internal sever error" }, { status: 500 });
   
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const taskid = Number((await params).id);
  console.log(taskid);
  try {
    const { data, error } = taskSchema.partial().safeParse(await req.json());
    if (error) {
      return NextResponse.json({
        success: false,
        message: error.issues.map((err) => err.message),
      }, { status: 403 });
      
    }
    if (data) {
      const taskIndex = tasks.findIndex((task) => task.id === taskid);
      console.log("taskIndex", taskIndex);
      if (taskIndex === -1) {
       return  NextResponse.json({ success: false, message: "task not found" }, { status: 404 });
     
      }
      const updateTask: Partial<Task> = {};
      updateTask.id = tasks[taskIndex].id;
      if (data.title) updateTask.title = data.title;
      if (typeof data.isCompleted === "boolean")
        updateTask.isCompleted = data.isCompleted;
      tasks[taskIndex] = { ...tasks[taskIndex], ...updateTask };
      console.log("update tasks", tasks);
      return NextResponse.json({ success: true, message: "task updated successfull" }, { status: 200 });

    }
  } catch (error) {
    console.log("Error updating todo", error);
    return NextResponse.json({ message: "Internal sever error" }, { status: 500 });
  }
}
