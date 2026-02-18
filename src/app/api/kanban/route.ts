import { NextRequest, NextResponse } from "next/server";
import { loadBoard, saveBoard } from "@/lib/git-fs";
import { BoardData } from "@/types/kanban";

export async function GET() {
  try {
    const board = await loadBoard();
    if (board) {
      return NextResponse.json(board);
    }
    // Return default if no saved data
    return NextResponse.json(getDefaultBoard());
  } catch (error) {
    console.error("Error loading board:", error);
    return NextResponse.json(getDefaultBoard());
  }
}

export async function POST(request: NextRequest) {
  try {
    const board: BoardData = await request.json();
    await saveBoard(board);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving board:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save board" },
      { status: 500 }
    );
  }
}

function getDefaultBoard(): BoardData {
  return {
    columns: [
      {
        id: "backlog",
        title: "📥 Backlog",
        tasks: [
          {
            id: "task-1",
            title: "Set up NextAuth authentication",
            assignee: "red",
            priority: "high",
            tags: ["auth", "mvp"],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ],
      },
      {
        id: "priority",
        title: "🎯 Priority",
        tasks: [],
      },
      {
        id: "active",
        title: "⚡ Active",
        tasks: [
          {
            id: "task-2",
            title: "Build KanBan board UI",
            assignee: "red",
            priority: "high",
            tags: ["ui", "mvp"],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ],
      },
      {
        id: "done",
        title: "✅ Done",
        tasks: [],
      },
    ],
    lastUpdated: new Date().toISOString(),
  };
}
