import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { FaPaperPlane, FaRobot, FaTimes } from "react-icons/fa";
import "./Chatbot.css";

const SUGGESTIONS = [
  "What projects have you built?",
  "What tech stack do you use?",
  "Tell me about your work experience",
  "Tell me about your certifications",
  "How can I contact you?",
];

const WELCOME_MESSAGE =
  "Hi! I'm Edsel's portfolio assistant. Ask me about his projects, skills, certifications, or background.";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: WELCOME_MESSAGE },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages, isTyping, isOpen]);

  const sendMessage = async (text) => {
    const content = (text ?? input).trim();
    if (!content || isTyping) return;

    const nextMessages = [...messages, { role: "user", content }];
    setMessages(nextMessages);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });
      const data = await res.json();

      if (!res.ok) {
        const err = new Error(data?.error || "Request failed");
        if (typeof data?.message === "string" && data.message.trim()) {
          err.userMessage = data.message.trim();
        }
        throw err;
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch (err) {
      const fallback =
        "Sorry, I couldn't reach the assistant right now. Please try again later, or use the contact form at the bottom of the page.";
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            err && typeof err.userMessage === "string"
              ? err.userMessage
              : fallback,
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            className="chatbot-hint"
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ delay: 1.5, duration: 0.4, type: "spring", stiffness: 100 }}
          >
            <div className="hint-text">Ask me about Edsel!</div>
            <svg
              className="hint-arrow"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className={`chatbot-toggle ${isOpen ? "chatbot-toggle-open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close chat" : "Open chat"}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <FaTimes /> : <FaRobot />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chatbot-window"
            role="dialog"
            aria-label="Portfolio assistant chat"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="chatbot-header">
              <div className="chatbot-avatar">
                <img
                  src="/images/chatbot_icon/Sel_Saga.jpg"
                  alt="Edsel Suralta Payan"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>
              <div className="chatbot-header-info">
                <h3>Edsel's Assistant</h3>
                <span className="chatbot-status">
                  <span className="status-dot" />
                  Online
                </span>
              </div>
              <button
                type="button"
                className="chatbot-close"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
              >
                <FaTimes />
              </button>
            </div>

            <div className="chatbot-messages">
              {messages.map((msg, index) => (
                <div key={index} className={`chat-message ${msg.role}`}>
                  {msg.role === "assistant" && (
                    <div className="chat-msg-avatar">
                      <FaRobot />
                    </div>
                  )}
                  <div className="chat-bubble">
                    {msg.role === "assistant" ? (
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    ) : (
                      msg.content
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="chat-message assistant">
                  <div className="chat-msg-avatar">
                    <FaRobot />
                  </div>
                  <div className="chat-bubble typing-bubble">
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {messages.length <= 1 && (
              <div className="chatbot-suggestions">
                {SUGGESTIONS.map((suggestion) => (
                  <button
                    key={suggestion}
                    className="suggestion-chip"
                    onClick={() => sendMessage(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            <form className="chatbot-form" onSubmit={handleSubmit}>
              <textarea
                className="chatbot-input"
                placeholder="Ask about experience, projects, skills, certifications..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                rows="1"
                maxLength={500}
                aria-label="Type your message"
              />
              <button
                type="submit"
                className="chatbot-send"
                disabled={!input.trim() || isTyping}
                aria-label="Send message"
              >
                <FaPaperPlane />
              </button>
            </form>

            <p className="chatbot-disclaimer">
              AI-powered assistant. Answers are based only on public portfolio
              content.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
