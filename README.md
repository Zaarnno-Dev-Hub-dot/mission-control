# Mission Control Dashboard 🐉

Dragon's Eye view of our world. A Next.js-based productivity hub for Red ↔ Blue ↔ User coordination.

## 🌐 Live Demo

**URL:** https://sachiko-bolographic-nonpliably.ngrok-free.dev

- **Username:** `dragon`
- **Password:** `RaxorPass321!!`

## ✨ Features

| Module | Status | Description |
|--------|--------|-------------|
| 📋 **KanBan Board** | ✅ Live | Drag-drop task board with 4 columns (Backlog → Priority → Active → Done), assignees, and priorities |
| 🎮 **Games** | ✅ Live | Embedded Math Falling Equations game |
| 💬 **Chat Relay** | ✅ API Ready | Agent chat with auto-refresh (Discord bridge parked) |
| 📊 **Usage Stats** | ✅ Live | Session tracking, token counts, cost estimates, 7-day charts |

## 🛠 Tech Stack

- **Next.js 14** (App Router, TypeScript)
- **Tailwind CSS** (Dark Dragon Theme)
- **@dnd-kit** (Drag-drop KanBan)
- **Git-backed persistence** (JSON files, no external DB)
- **HTTP Basic Auth** (NextAuth planned)

## 📁 Project Structure

```
mission-control/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── kanban/      # KanBan persistence API
│   │   │   ├── chat/        # Chat relay API
│   │   │   └── usage/       # Usage stats API
│   │   ├── page.tsx         # Main dashboard
│   │   └── layout.tsx
│   ├── components/
│   │   ├── kanban/          # KanBan board, cards, columns
│   │   ├── chat/            # Chat relay component
│   │   └── stats/           # Usage stats component
│   ├── lib/
│   │   └── git-fs.ts        # Git-backed file operations
│   └── types/
│       └── kanban.ts        # TypeScript types
├── data/                    # Git-persisted data
│   ├── kanban.json
│   ├── chat.jsonl
│   └── usage.json
└── README.md
```

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run dev server
npm run dev -- -H 127.0.0.1

# Or use tmux for persistence
tmux new-session -d -s mission-control "npm run dev -- -H 127.0.0.1"
```

## 🔐 Authentication

Currently uses HTTP Basic Auth:
- Username: `dragon`
- Password: `RaxorPass321!!`

NextAuth integration planned for OAuth providers.

## 📊 API Endpoints

### KanBan
- `GET /api/kanban` - Load board data
- `POST /api/kanban` - Save board data

### Chat
- `GET /api/chat` - Load last 50 messages
- `POST /api/chat` - Add message

### Usage Stats
- `GET /api/usage` - Get usage statistics
- `POST /api/usage` - Log usage entry

## 🐉 Agents

| Agent | Role | Model | Host |
|-------|------|-------|------|
| 🔴 **Red** | Coding/Implementation | Kimi K2.5 | 172.31.91.231 |
| 🔵 **Blue** | Reasoning/Architecture | Grok | 172.31.88.159 |

## 📝 Development Log

- **2026-02-17**: Initial scaffold, KanBan board, auth, ngrok tunnel
- **2026-02-18**: Math game embed, Chat relay API, Usage Stats module

## 🔮 Roadmap

- [ ] KanBan: Edit/delete tasks, due dates, tags
- [ ] Usage Stats: Real OpenClaw integration
- [ ] Discord bridge: Bidirectional sync (parked)
- [ ] NextAuth: OAuth providers
- [ ] Game scores: Persist high scores locally

## 📄 License

MIT - Built by 🐉 Raxor Red & Blue
