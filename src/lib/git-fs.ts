import { BoardData } from "@/types/kanban";
import { promises as fs } from "fs";
import { join } from "path";

const DATA_DIR = join(process.cwd(), "data");
const BOARD_FILE = join(DATA_DIR, "kanban.json");

export async function loadBoard(): Promise<BoardData | null> {
  try {
    const data = await fs.readFile(BOARD_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return null;
  }
}

export async function saveBoard(board: BoardData): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(BOARD_FILE, JSON.stringify(board, null, 2));
}
