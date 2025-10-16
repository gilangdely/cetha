"use client";

import { motion } from "framer-motion";

const HowCethaWorks = () => {
    const messages = [
        { sender: "user", text: "Bagaimana cara kerja Cetha?" },
        {
            sender: "bot",
            text: "Cetha bekerja dengan memanfaatkan teknologi kecerdasan buatan (AI) untuk menganalisis data karier pengguna. Dari informasi dalam CV atau input pengguna, Cetha memberikan saran peningkatan profesional, merekomendasikan pekerjaan yang relevan, dan menjawab pertanyaan karier secara interaktif melalui chatbot.",
        },
    ];

    return (
        <div className="p-4 h-full overflow-y-auto bg-Background text-sm text-gray-700">
            {messages.map((msg, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.2 }}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"
                        } mb-3`}
                >
                    <div
                        className={`max-w-[80%] rounded-xl px-3 py-2 text-sm ${msg.sender === "user"
                            ? "rounded-br-none bg-blue-600 text-white"
                            : "rounded-bl-none bg-gray-200 text-gray-800"
                            }`}
                    >
                        {msg.text}
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default HowCethaWorks;
