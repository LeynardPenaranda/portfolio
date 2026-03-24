"use client";

import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ChevronDown,
  LoaderCircle,
  MessageCircle,
  Send,
  X,
} from "lucide-react";

type ChatMessage = {
  id: number;
  role: "user" | "assistant";
  content: string;
};

const STARTER_MESSAGE =
  "Hi, I'm Leynard's AI assistant. Ask me about his background, skills, projects, or internship goals.";
const CHATBOT_PROFILE_IMAGE = "/me/leynardAichatbot.jpg";
const GEMINI_LOGO_IMAGE = "/me/Google-Gemini-Logo-Transparent.png";

function StructuredMessage({ content }: { content: string }) {
  const blocks = content
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean);

  return (
    <div className="space-y-3">
      {blocks.map((block, blockIndex) => {
        const lines = block.split("\n").map((line) => line.trim());
        const bulletLines = lines.filter((line) => /^[-*•]\s+/.test(line));
        const numberedLines = lines.filter((line) => /^\d+\.\s+/.test(line));

        if (bulletLines.length === lines.length) {
          return (
            <ul key={blockIndex} className="list-disc space-y-1 pl-5">
              {lines.map((line, lineIndex) => (
                <li key={lineIndex}>{line.replace(/^[-*•]\s+/, "")}</li>
              ))}
            </ul>
          );
        }

        if (numberedLines.length === lines.length) {
          return (
            <ol key={blockIndex} className="list-decimal space-y-1 pl-5">
              {lines.map((line, lineIndex) => (
                <li key={lineIndex}>{line.replace(/^\d+\.\s+/, "")}</li>
              ))}
            </ol>
          );
        }

        return (
          <p key={blockIndex} className="whitespace-pre-wrap">
            {block}
          </p>
        );
      })}
    </div>
  );
}

function TypewriterText({
  text,
  active,
  onComplete,
  onProgress,
}: {
  text: string;
  active: boolean;
  onComplete?: () => void;
  onProgress?: () => void;
}) {
  const [visibleText, setVisibleText] = useState(active ? "" : text);

  useEffect(() => {
    if (!active) {
      setVisibleText(text);
      return;
    }

    setVisibleText("");
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setVisibleText(text.slice(0, index));
      onProgress?.();

      if (index >= text.length) {
        window.clearInterval(timer);
        onComplete?.();
      }
    }, 14);

    return () => window.clearInterval(timer);
  }, [active, onComplete, onProgress, text]);

  return (
    <span>
      {visibleText}
      {active ? <span className="chatbot-caret" aria-hidden="true" /> : null}
    </span>
  );
}

export default function PortfolioChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [showPromptBubble, setShowPromptBubble] = useState(true);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [nextId, setNextId] = useState(2);
  const [typingMessageId, setTypingMessageId] = useState<number | null>(1);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, role: "assistant", content: STARTER_MESSAGE },
  ]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  function isNearBottom() {
    const container = scrollAreaRef.current;
    if (!container) return true;

    const distanceFromBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight;

    return distanceFromBottom < 96;
  }

  function scrollToBottom(behavior: ScrollBehavior = "smooth") {
    messagesEndRef.current?.scrollIntoView({ behavior });
  }

  function handleScroll() {
    setShowScrollButton(!isNearBottom());
  }

  useEffect(() => {
    if (isNearBottom()) {
      scrollToBottom("smooth");
    }
  }, [isLoading, messages, typingMessageId]);

  useEffect(() => {
    if (isOpen) {
      setShowPromptBubble(false);
      return;
    }

    const cycleBubble = () => {
      setShowPromptBubble(true);
      window.setTimeout(() => setShowPromptBubble(false), 2200);
    };

    cycleBubble();
    const interval = window.setInterval(cycleBubble, 5000);

    return () => window.clearInterval(interval);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    function handlePointerDown(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (containerRef.current?.contains(target)) return;
      if (isClosing) return;
      handleCloseChat();
    }

    document.addEventListener("mousedown", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, [isClosing, isOpen]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const message = input.trim();
    if (!message || isLoading) return;

    const history = messages
      .filter(
        (item) => item.role !== "assistant" || item.content !== STARTER_MESSAGE
      )
      .map(({ role, content }) => ({ role, content }));

    const userMessage: ChatMessage = {
      id: nextId,
      role: "user",
      content: message,
    };

    const assistantMessageId = nextId + 1;

    setMessages((current) => [...current, userMessage]);
    setNextId((current) => current + 1);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          messages: history,
        }),
      });

      const data = (await response.json()) as { reply?: string; error?: string };

      if (!response.ok) {
        throw new Error(data.error || "Unable to send message.");
      }

      setMessages((current) => [
        ...current,
        {
          id: assistantMessageId,
          role: "assistant",
          content:
            data.reply ||
            "I'm here to talk about Leynard Penaranda. Let me know how I can help.",
        },
      ]);
      setNextId((current) => current + 1);
      setTypingMessageId(assistantMessageId);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.";

      setMessages((current) => [
        ...current,
        {
          id: assistantMessageId,
          role: "assistant",
          content: errorMessage,
        },
      ]);
      setNextId((current) => current + 1);
      setTypingMessageId(assistantMessageId);
    } finally {
      setIsLoading(false);
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();

      if (!input.trim() || isLoading) return;

      const form = event.currentTarget.form;
      if (form) {
        form.requestSubmit();
      }
    }
  }

  function handleOpenChat() {
    setIsClosing(false);
    setIsOpen(true);
    setShowPromptBubble(false);
  }

  function handleCloseChat() {
    setIsClosing(true);
    window.setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 220);
  }

  return (
    <div
      ref={containerRef}
      className="fixed right-4 bottom-4 z-[60] sm:right-6 sm:bottom-6"
    >
      {isOpen ? (
        <div
          className={`chatbot-panel flex h-[32rem] w-[min(24rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-3xl border border-white/50 bg-white/90 shadow-2xl backdrop-blur dark:border-white/10 dark:bg-zinc-950/90 ${
            isClosing ? "chatbot-panel-out" : "chatbot-panel-in"
          }`}
        >
          <div className="flex items-center justify-between bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500 px-4 py-3 text-white">
            <div className="flex items-center gap-3">
              <div className="overflow-hidden rounded-full ring-2 ring-white/30">
                <Image
                  src={CHATBOT_PROFILE_IMAGE}
                  alt="Leynard AI profile"
                  width={40}
                  height={40}
                  className="size-10 object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-semibold">Ask Leynard AI</p>
                <div className="mt-1 flex items-center gap-2 text-xs text-white/85">
                  <span className="leading-none">
                    Portfolio assistant powered by Gemini
                  </span>
                  <span className="inline-flex items-center justify-center rounded-full bg-white/15 p-1.5 backdrop-blur-sm">
                    <Image
                      src={GEMINI_LOGO_IMAGE}
                      alt="Gemini logo"
                      width={20}
                      height={20}
                      className="block size-5 object-contain"
                    />
                  </span>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={handleCloseChat}
              className="rounded-full p-2 transition hover:bg-white/15"
              aria-label="Close chatbot"
            >
              <X className="size-5" />
            </button>
          </div>

          <div
            ref={scrollAreaRef}
            onScroll={handleScroll}
            className="relative flex-1 space-y-3 overflow-y-auto bg-gradient-to-b from-slate-50 to-white px-4 py-4 dark:from-zinc-900 dark:to-zinc-950"
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div className="flex max-w-[92%] items-end gap-2">
                  {message.role === "assistant" ? (
                    <div className="overflow-hidden rounded-full border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
                      <Image
                        src={CHATBOT_PROFILE_IMAGE}
                        alt="Leynard AI profile"
                        width={32}
                        height={32}
                        className="size-8 object-cover"
                      />
                    </div>
                  ) : null}
                  <div
                    className={`relative max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm ${
                      message.role === "user"
                        ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                        : "border border-zinc-200 bg-white text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`absolute bottom-3 h-3 w-3 rotate-45 ${
                        message.role === "user"
                          ? "-right-1 bg-zinc-900 dark:bg-white"
                          : "-left-1 border-r border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
                      }`}
                    />
                    {message.role === "assistant" &&
                    typingMessageId === message.id ? (
                      <TypewriterText
                        text={message.content}
                        active
                        onProgress={() => {
                          if (isNearBottom()) {
                            scrollToBottom("auto");
                          }
                        }}
                        onComplete={() =>
                          setTypingMessageId((current) =>
                            current === message.id ? null : current
                          )
                        }
                      />
                    ) : message.role === "assistant" ? (
                      <StructuredMessage content={message.content} />
                    ) : (
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {isLoading ? (
              <div className="flex justify-start">
                <div className="inline-flex items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-600 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
                  <LoaderCircle className="size-4 animate-spin" />
                  Typing
                  <span className="chatbot-dots" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </span>
                </div>
              </div>
            ) : null}
            <button
              type="button"
              onClick={() => scrollToBottom("smooth")}
              className={`chatbot-scroll-button absolute right-4 bottom-4 flex size-10 items-center justify-center rounded-full border border-sky-200 bg-white/95 text-sky-600 shadow-lg backdrop-blur transition dark:border-sky-500/20 dark:bg-zinc-900/95 dark:text-sky-300 ${
                showScrollButton
                  ? "pointer-events-auto opacity-100 translate-y-0"
                  : "pointer-events-none opacity-0 translate-y-2"
              }`}
              aria-label="Scroll to latest message"
            >
              <ChevronDown className="size-5" />
            </button>
            <div ref={messagesEndRef} />
          </div>

          <form
            onSubmit={handleSubmit}
            className="border-t border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-950"
          >
            <div className="flex items-stretch gap-2">
              <textarea
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about Leynard..."
                rows={2}
                className="h-12 flex-1 resize-none rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-sky-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-r from-sky-500 to-emerald-500 text-white transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
                aria-label="Send message"
              >
                <Send className="size-4" />
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="relative flex items-end justify-end">
          <div
            className={`pointer-events-none absolute right-0 bottom-[4.5rem] chatbot-prompt rounded-2xl border border-sky-200/70 bg-white/95 px-4 py-2 text-sm font-medium text-sky-950 shadow-xl backdrop-blur dark:border-sky-500/20 dark:bg-zinc-950/95 dark:text-sky-100 ${
              showPromptBubble ? "chatbot-prompt-in" : "chatbot-prompt-out"
            }`}
          >
            Ask Leynard AI
          </div>
          <button
            type="button"
            onClick={handleOpenChat}
            className="chatbot-launcher group relative flex size-14 cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500 text-white shadow-2xl transition hover:-translate-y-1"
            aria-label="Open chatbot"
          >
            <span className="absolute inset-0 rounded-full bg-white/15 opacity-0 transition group-hover:opacity-100" />
            <MessageCircle className="relative z-10 size-6" />
          </button>
        </div>
      )}
    </div>
  );
}
