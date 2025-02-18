import { taskSchema } from "@/schema/taskSchema";
import { NextRequest, NextResponse } from "next/server";

export interface Task {
  id: number;
  title: string;
  isCompleted?: boolean;
}

export let tasks: Task[] = [];
console.log("initial tasks", tasks);

export async function POST(req: NextRequest) {
  try {
    const { data, error } = taskSchema.safeParse(await req.json());
    console.log(error?.issues);
    if (error) {
      return NextResponse.json(
        { success: false, message: error.issues.map((err) => err.message) },
        { status: 400 }
      );
   
    }
    if (data) {
      const task = tasks.find((t) => t.title === data.title);
      if (task) {
        return NextResponse.json(
          { success: false, message: "Task already exists" },
          { status: 403 }
        );
      
      }
      const newTask = {
        id: tasks.length ? Math.max(...tasks.map((task) => task.id)) + 1 : 1,
        title: data.title,
        isCompleted: data.isCompleted,
      };
      tasks.push(newTask);
      console.log("post tasks", tasks);
      return NextResponse.json(
        { success: true, message: "task added successfully", newTask },
        { status: 201 }
      );
   
    }
  } catch (error) {
    console.log("Error getting todos", error);
    return NextResponse.json({ message: "Internal sever error" }, { status: 500 });
    
  }
}

export async function GET(req: NextRequest) {
  try {
    return NextResponse.json({ success: true, tasks }, { status: 200 });
  } catch (error) {
    console.log("Error getting tasks", error);
    return NextResponse.json({ message: "Internal sever error" }, { status: 500 });

  }
}
