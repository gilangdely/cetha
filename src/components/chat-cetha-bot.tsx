"use client";

import { auth } from "@/app/lib/firebase";
import { Send } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import ReactMarkdown from "react-markdown";

const ChatCethaBot = () => {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
    const [username, setUsername] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user && user.displayName) {
                setUsername(user.displayName);
            } else {
                setUsername(null);
            }
        });
        return () => unsubscribe();
    }, []);

    // Auto-scroll ke bawah setiap pesan baru muncul
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMsg = { sender: "user", text: input };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");

        try {
            const res = await fetch("/api/chatbot", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: input, username }),
            });

            const data = await res.json();
            const botMsg = { sender: "bot", text: data.reply };
            setMessages((prev) => [...prev, botMsg]);
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <div className="flex h-100 flex-col justify-between bg-Background">
            {/* Pesan Chat */}
            <div className="flex-1 space-y-2 overflow-y-auto p-3">
                {messages.map((msg, i) => (
                    <div
                        key={i}
                        className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                        <div
                            className={`max-w-[80%] rounded-xl px-3 py-2 text-sm leading-relaxed ${msg.sender === "user"
                                ? "rounded-br-none bg-blue-600 text-white"
                                : "rounded-bl-none bg-gray-200 text-gray-800"
                                }`}
                        >
                            {/* Gunakan ReactMarkdown untuk merender teks dari bot */}
                            {msg.sender === "bot" ? (
                                <ReactMarkdown
                                    components={{
                                        strong: ({ children }) => (
                                            <strong className="font-semibold">{children}</strong>
                                        ),
                                        ul: ({ children }) => (
                                            <ul className="list-disc pl-5 mt-1 space-y-1">{children}</ul>
                                        ),
                                        ol: ({ children }) => (
                                            <ol className="list-decimal pl-5 mt-1 space-y-1">{children}</ol>
                                        ),
                                        li: ({ children }) => <li className="pl-1">{children}</li>,
                                        a: ({ href, children }) => (
                                            <a
                                                href={href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 underline hover:text-blue-800"
                                            >
                                                {children}
                                            </a>
                                        ),
                                        p: ({ children }) => <p className="mb-1">{children}</p>,
                                    }}
                                >
                                    {msg.text}
                                </ReactMarkdown>
                            ) : (
                                msg.text
                            )}
                        </div>
                    </div>
                ))}

                {/* Referensi scroll ke bawah */}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Box */}
            <div className="sticky bottom-0 flex items-center gap-2 border-t bg-white px-3 pt-2 pb-3">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ketik pesan..."
                    className="flex-1 rounded-full border px-3 py-2 text-sm focus:ring-1 focus:ring-blue-400 focus:outline-none"
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <button
                    onClick={sendMessage}
                    className="rounded-full bg-blue-600 p-2 text-white transition hover:bg-blue-700"
                >
                    <Send size={16} />
                </button>
            </div>
        </div>
    );
};

export default ChatCethaBot;
