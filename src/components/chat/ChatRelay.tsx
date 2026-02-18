"use client";

import { useState, useEffect, useRef } from "react";

interface Message {
  id: string;
  channel: string;
  sender: string;
  text: string;
  timestamp: string;
}

export function ChatRelay() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [channel, setChannel] = useState("user");
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const channels = [
    { id: "user", label: "👤 User", color: "text-dragon-200" },
    { id: "red", label: "🔴 Red", color: "text-dragon-400" },
    { id: "blue", label: "🔵 Blue", color: "text-blue-400" },
  ];

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/chat");
      if (res.ok) {
        const data = await res.json();
        setMessages(data.messages || []);
      }
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          channel,
          sender: channel,
          text: newMessage,
        }),
      });

      if (res.ok) {
        setNewMessage("");
        await fetchMessages();
      }
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  // Auto-refresh every 3 seconds
  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, []);

  // Scroll to bottom on new messages (only within chat container)
  useEffect(() => {
    if (messages.length > 0 && !isLoading) {
      messagesEndRef.current?.scrollIntoView({ behavior: "auto", block: "nearest" });
    }
  }, [messages, isLoading]);

  const getSenderColor = (sender: string) => {
    switch (sender) {
      case "red":
        return "text-dragon-400";
      case "blue":
        return "text-blue-400";
      default:
        return "text-dragon-200";
    }
  };

  const getSenderEmoji = (sender: string) => {
    switch (sender) {
      case "red":
        return "🔴";
      case "blue":
        return "🔵";
      default:
        return "👤";
    }
  };

  return (
    <div className="flex flex-col h-96">
      {/* Messages Area */}
      <div className="flex-1 bg-dragon-900 rounded border border-dragon-700 p-4 overflow-y-auto mb-4">
        {isLoading ? (
          <p className="text-dragon-500 text-sm text-center">Loading messages...</p>
        ) : messages.length === 0 ? (
          <p className="text-dragon-500 text-sm text-center">
            No messages yet. Start the conversation!
          </p>
        ) : (
          <div className="space-y-3">
            {messages.map((msg) => (
              <div key={msg.id} className="flex items-start gap-2">
                <span className="text-sm">{getSenderEmoji(msg.sender)}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-medium ${getSenderColor(msg.sender)}`}>
                      {msg.sender}
                    </span>
                    <span className="text-xs text-dragon-600">
                      {new Date(msg.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <p className="text-sm text-dragon-100 mt-0.5">{msg.text}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <form onSubmit={sendMessage} className="flex gap-2">
        <select
          value={channel}
          onChange={(e) => setChannel(e.target.value)}
          className="px-3 py-2 bg-dragon-800 border border-dragon-600 rounded text-sm text-dragon-200 focus:outline-none focus:border-dragon-400"
        >
          {channels.map((ch) => (
            <option key={ch.id} value={ch.id}>
              {ch.label}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-3 py-2 bg-dragon-800 border border-dragon-600 rounded text-sm text-dragon-100 placeholder-dragon-500 focus:outline-none focus:border-dragon-400"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-dragon-400 text-dragon-900 rounded text-sm font-medium hover:bg-dragon-300 transition"
        >
          Send
        </button>
      </form>
    </div>
  );
}
