"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Brain, User, Sparkles, Maximize2, Minimize2, Zap, Code, Briefcase, Github } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Message {
    role: "user" | "assistant";
    content: string;
}

const API_URL = process.env.NEXT_PUBLIC_CHATBOT_API_URL || "http://localhost:8000";

export function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "assistant",
            content: "Hey there! ✨ I'm **Harshit's AI assistant**. Ask me anything about his skills, projects, or experience!\n\nTry the quick buttons below 👇",
        },
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [backendStatus, setBackendStatus] = useState<"unknown" | "waking" | "ready">("unknown");
    const [hasWarmedUp, setHasWarmedUp] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Warm up backend on page load (before user even opens chat)
    useEffect(() => {
        if (hasWarmedUp) return;
        
        const warmUp = async () => {
            try {
                setBackendStatus("waking");
                const response = await fetch(`${API_URL}/health`, { 
                    method: "GET",
                    signal: AbortSignal.timeout(15000)
                });
                if (response.ok) {
                    setBackendStatus("ready");
                    setHasWarmedUp(true);
                }
            } catch {
                // Backend might be cold-starting, try again after a delay
                setTimeout(async () => {
                    try {
                        const retryResponse = await fetch(`${API_URL}/health`, {
                            method: "GET",
                            signal: AbortSignal.timeout(30000)
                        });
                        if (retryResponse.ok) {
                            setBackendStatus("ready");
                            setHasWarmedUp(true);
                        }
                    } catch {
                        setBackendStatus("unknown");
                    }
                }, 5000);
            }
        };

        warmUp();
    }, [hasWarmedUp]);

    // Show response directly (no character streaming to avoid garbled text)
    const showResponse = useCallback((fullText: string) => {
        setMessages((prev) => [...prev, { role: "assistant", content: fullText }]);
        setIsLoading(false);
    }, []);

    const sendMessage = async (messageText?: string) => {
        const text = messageText || input.trim();
        if (!text || isLoading) return;

        if (!messageText) setInput("");
        setMessages((prev) => [...prev, { role: "user", content: text }]);
        setIsLoading(true);

        try {
            const response = await fetch(`${API_URL}/chat`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query: text }),
            });

            if (!response.ok) throw new Error("Failed to get response");

            const data = await response.json();
            setBackendStatus("ready");
            showResponse(data.response);
        } catch (error) {
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: "⚠️ Sorry, I couldn't connect to the server. The AI might be waking up — please try again in a moment!" },
            ]);
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    // Quick action buttons
    const quickActions = [
        { label: "Skills", icon: Zap, query: "What are Harshit's technical skills?" },
        { label: "Projects", icon: Code, query: "Tell me about Harshit's projects" },
        { label: "Experience", icon: Briefcase, query: "What is Harshit's work experience?" },
        { label: "GitHub", icon: Github, query: "Show me Harshit's GitHub stats" },
    ];

    // Dynamic sizing
    const chatWidth = isExpanded ? "md:w-[600px]" : "md:w-[420px]";
    const chatHeight = isExpanded ? "md:h-[700px]" : "md:h-[600px]";

    return (
        <>
            {/* Floating Chat Button with pulse animation */}
            <motion.button
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 p-4 md:p-5 rounded-full text-white shadow-2xl ${isOpen ? "hidden" : "flex"
                    }`}
                style={{
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
                }}
                whileHover={{ scale: 1.15, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 100, rotate: -180 }}
                animate={{
                    opacity: 1,
                    y: 0,
                    rotate: 0,
                    boxShadow: [
                        "0 0 20px rgba(102, 126, 234, 0.5)",
                        "0 0 40px rgba(118, 75, 162, 0.6)",
                        "0 0 20px rgba(240, 147, 251, 0.5)",
                    ]
                }}
                transition={{
                    delay: 0.5,
                    boxShadow: { duration: 2, repeat: Infinity, repeatType: "reverse" }
                }}
            >
                <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <Brain className="w-8 h-8" />
                </motion.div>

                {/* Sparkle effect */}
                <motion.div
                    className="absolute -top-1 -right-1"
                    animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    <Sparkles className="w-5 h-5 text-yellow-300" />
                </motion.div>
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.8, rotateX: 20 }}
                        animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                        exit={{ opacity: 0, y: 50, scale: 0.8, rotateX: 20 }}
                        transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
                        className={`fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 w-[calc(100vw-2rem)] h-[80vh] ${chatWidth} ${chatHeight} flex flex-col rounded-3xl overflow-hidden shadow-2xl transition-all duration-300`}
                        style={{
                            background: "rgba(10, 10, 10, 0.95)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            backdropFilter: "blur(20px)",
                        }}
                    >
                        {/* Animated gradient border */}
                        <div
                            className="absolute inset-0 rounded-3xl pointer-events-none"
                            style={{
                                background: "linear-gradient(45deg, #667eea, #764ba2, #f093fb, #667eea)",
                                backgroundSize: "400% 400%",
                                animation: "gradient-shift 8s ease infinite",
                                padding: "2px",
                                mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                                maskComposite: "xor",
                                WebkitMaskComposite: "xor",
                            }}
                        />

                        {/* Header */}
                        <motion.div
                            className="flex items-center justify-between p-4 border-b border-white/10"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            style={{
                                background: "rgba(30, 30, 30, 0.5)",
                            }}
                        >
                            <div className="flex items-center gap-3">
                                <motion.div
                                    className="w-12 h-12 rounded-2xl flex items-center justify-center relative overflow-hidden"
                                    style={{
                                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                    }}
                                    animate={{
                                        boxShadow: [
                                            "0 0 15px rgba(102,126,234,0.5)",
                                            "0 0 25px rgba(118,75,162,0.6)",
                                            "0 0 15px rgba(102,126,234,0.5)",
                                        ]
                                    }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    <Brain className="w-6 h-6 text-white" />
                                    <motion.div
                                        className="absolute inset-0 bg-white/20"
                                        animate={{ x: ["-100%", "100%"] }}
                                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                                    />
                                </motion.div>
                                <div>
                                    <h3 className="font-bold text-white text-lg">AI Assistant</h3>
                                    <p className="text-xs text-purple-300 flex items-center gap-1">
                                        <motion.span
                                            className={`w-2 h-2 rounded-full ${backendStatus === "ready" ? "bg-green-400" : backendStatus === "waking" ? "bg-yellow-400" : "bg-gray-400"}`}
                                            animate={{ scale: [1, 1.3, 1] }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                        />
                                        {backendStatus === "ready" ? "Online & ready" : backendStatus === "waking" ? "Waking up..." : "Connecting..."}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <motion.button
                                    onClick={() => setIsExpanded(!isExpanded)}
                                    className="hidden md:block p-2 rounded-xl hover:bg-white/10 transition-colors text-purple-300 hover:text-white"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    {isExpanded ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
                                </motion.button>
                                <motion.button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 rounded-xl hover:bg-red-500/20 transition-colors text-purple-300 hover:text-red-400"
                                    whileHover={{ scale: 1.1, rotate: 90 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <X className="w-5 h-5" />
                                </motion.button>
                            </div>
                        </motion.div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-purple-500/30 scrollbar-track-transparent">
                            {messages.map((message, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                    className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
                                >
                                    <motion.div
                                        className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${message.role === "user"
                                            ? "bg-gradient-to-br from-blue-500 to-cyan-400"
                                            : "bg-gradient-to-br from-purple-600 to-pink-500"
                                            }`}
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                    >
                                        {message.role === "user" ? (
                                            <User className="w-5 h-5 text-white" />
                                        ) : (
                                            <Brain className="w-5 h-5 text-white" />
                                        )}
                                    </motion.div>
                                    <motion.div
                                        className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${message.role === "user"
                                            ? "bg-gradient-to-br from-blue-600 to-cyan-500 text-white rounded-br-md"
                                            : "bg-white/5 border border-white/10 text-gray-100 rounded-bl-md"
                                            }`}
                                        whileHover={{ scale: 1.01 }}
                                    >
                                        {message.role === "assistant" ? (
                                            <div className="prose prose-sm prose-invert max-w-none prose-p:my-1 prose-headings:my-2 prose-ul:my-1 prose-li:my-0 prose-table:my-2 prose-th:p-2 prose-td:p-2 prose-table:text-xs">
                                                <ReactMarkdown
                                                    remarkPlugins={[remarkGfm]}
                                                    components={{
                                                        a: ({ node, ...props }) => (
                                                            <a {...props} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline" />
                                                        ),
                                                    }}
                                                >
                                                    {message.content}
                                                </ReactMarkdown>
                                            </div>
                                        ) : (
                                            message.content
                                        )}
                                    </motion.div>
                                </motion.div>
                            ))}

                            {/* Quick Action Buttons - show only after first message */}
                            {messages.length === 1 && !isLoading && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="flex flex-wrap gap-2 pl-13"
                                >
                                    {quickActions.map((action) => (
                                        <motion.button
                                            key={action.label}
                                            onClick={() => sendMessage(action.query)}
                                            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-purple-200 hover:bg-purple-500/20 hover:border-purple-400/30 hover:text-white transition-all"
                                            whileHover={{ scale: 1.05, y: -2 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <action.icon className="w-3.5 h-3.5" />
                                            {action.label}
                                        </motion.button>
                                    ))}
                                </motion.div>
                            )}

                            {/* Typing Indicator */}
                            {isLoading && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex gap-3"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center">
                                        <Brain className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-bl-md">
                                        <div className="flex items-center gap-2">
                                            <div className="flex gap-1.5">
                                                {[0, 1, 2].map((i) => (
                                                    <motion.span
                                                        key={i}
                                                        className="w-2.5 h-2.5 rounded-full"
                                                        style={{
                                                            background: "linear-gradient(135deg, #667eea, #764ba2)",
                                                        }}
                                                        animate={{ y: [-3, 3, -3] }}
                                                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-xs text-purple-300/60 ml-2">
                                                {backendStatus !== "ready" ? "Waking up AI..." : "Thinking..."}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <motion.div
                            className="p-4 border-t border-white/10"
                            style={{
                                background: "linear-gradient(180deg, rgba(25,25,50,0) 0%, rgba(25,25,50,0.5) 100%)",
                            }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="flex gap-3">
                                <motion.input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Ask me anything..."
                                    className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
                                    disabled={isLoading}
                                    whileFocus={{ scale: 1.01 }}
                                />
                                <motion.button
                                    onClick={() => sendMessage()}
                                    disabled={isLoading || !input.trim()}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="p-4 rounded-2xl text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all relative overflow-hidden"
                                    style={{
                                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                    }}
                                >
                                    <Send className="w-5 h-5 relative z-10" />
                                    <motion.div
                                        className="absolute inset-0 bg-white/20"
                                        initial={{ x: "-100%" }}
                                        whileHover={{ x: "100%" }}
                                        transition={{ duration: 0.5 }}
                                    />
                                </motion.button>
                            </div>
                            <p className="text-xs text-purple-400/50 text-center mt-3">
                                Powered by AI • Built with ❤️ by Harshit
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Global styles for gradient animation */}
            <style jsx global>{`
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
        </>
    );
}
