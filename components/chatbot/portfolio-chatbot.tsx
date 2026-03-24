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

type StaticFaq = {
  question: string;
  answer: string;
};

const STARTER_MESSAGE =
  "Hi, I'm Leynard's AI assistant. Ask me about his background, skills, projects, or internship goals.";
const CHATBOT_PROFILE_IMAGE = "/me/leynardAichatbot.jpg";
const GEMINI_LOGO_IMAGE = "/me/Google-Gemini-Logo-Transparent.png";
const ASSISTANT_TYPING_SPEED = 22;
const PROMPT_TYPING_SPEED = 75;
const STATIC_FAQ: StaticFaq[] = [
  {
    question: "What are Leynard's skills?",
    answer:
      "**Skills (Junior Level)**\nLeynard is currently at a junior level in all of the following areas:\n- Hadoop\n- Hive\n- Spark\n- Kafka\n- SQL\n- React\n- Next.js\n- Tailwind CSS\n- React Native\n- Foundational cybersecurity concepts",
  },
  {
    question: "What project has Leynard built?",
    answer:
      "**Projects**\n- **KalikaScan**: A plant identifier system developed as a capstone project at Samar State University.\n- **Data Warehouse and Analytics Project**: A complete data warehousing and analytics solution built with SQL Server.\n- **Confluent Kafka Hands On**: A practical Kafka project using Python for topic creation, producers, and message streaming.\n- **Big Data Hive Practical**: A hands-on Apache Hive project in GCP Dataproc for querying and big data analysis.\n- **Big Data Engineering Real-World Project: E-commerce Dataset**: A full data engineering workflow using the Olist e-commerce dataset.\n- **Fast Fizza Factory**: A modern pizza ordering app with cart management and dynamic menu features.\n- **The Wild Oasis Employee**: A hotel admin dashboard for managing bookings, guests, and cabins.\n- **The Wild Oasis Website Guest**: A guest-facing hotel website for browsing cabins and amenities.\n- **The ShopeStore an E-commerce website**: A responsive e-commerce platform for browsing products and managing a cart.\n- **Static E-commerce website**: A demo-only e-commerce site showcasing product listings, cart UI, and navigation.\n- **Digital Lost and Found System**: A real-time lost and found platform for SSU with real-time messaging features.",
  },
  {
    question: "What is Leynard looking for right now?",
    answer:
      "**Goals**\n- Leynard is an aspiring Data Engineer.\n- He is actively looking for internship opportunities.\n- He wants to gain real-world experience, deepen his data engineering skills, and keep learning every day. 🚀",
  },
  {
    question: "Tell me about Leynard's background",
    answer:
      "**Background**\n- **Full Name**: Leynard M. Peñaranda\n- **Location**: Catbalogan City, Samar, Philippines\n- **University**: Samar State University\n- **Program**: BS in Information Systems\n- **Status**: Currently a 3rd-year student transitioning to 4th year",
  },
];

function renderInlineMarkdown(text: string) {
  const segments = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g).filter(Boolean);

  return segments.map((segment, index) => {
    if (segment.startsWith("`") && segment.endsWith("`")) {
      return (
        <code
          key={index}
          className="rounded-md bg-zinc-950/8 px-1.5 py-0.5 font-mono text-[0.85em] dark:bg-white/10"
        >
          {segment.slice(1, -1)}
        </code>
      );
    }

    if (segment.startsWith("**") && segment.endsWith("**")) {
      return (
        <strong key={index} className="font-semibold">
          {segment.slice(2, -2)}
        </strong>
      );
    }

    return <span key={index}>{segment}</span>;
  });
}

function StructuredMessage({ content }: { content: string }) {
  const blocks =
    content.match(/```[\s\S]*?```|(?:[^\n]+\n?)+?(?=\n\s*\n|```|$)/g) ?? [];

  return (
    <div className="space-y-3">
      {blocks.map((block, blockIndex) => {
        const trimmedBlock = block.trim();

        if (trimmedBlock.startsWith("```") && trimmedBlock.endsWith("```")) {
          const code = trimmedBlock
            .replace(/^```[^\n]*\n?/, "")
            .replace(/\n?```$/, "");

          return (
            <pre
              key={blockIndex}
              className="overflow-x-auto rounded-2xl bg-zinc-950 px-4 py-3 text-[13px] text-zinc-100 shadow-inner dark:bg-black"
            >
              <code className="font-mono whitespace-pre-wrap break-words">
                {code}
              </code>
            </pre>
          );
        }

        const lines = trimmedBlock.split("\n").map((line) => line.trim());
        const bulletLines = lines.filter((line) => /^[-*]\s+/.test(line));
        const numberedLines = lines.filter((line) => /^\d+\.\s+/.test(line));
        const headingMatch = trimmedBlock.match(/^(#{1,3})\s+(.+)$/);

        if (headingMatch) {
          const level = headingMatch[1].length;
          const headingText = headingMatch[2];
          const headingClass =
            level === 1
              ? "text-base font-semibold"
              : level === 2
                ? "text-sm font-semibold"
                : "text-sm font-medium";

          return (
            <p key={blockIndex} className={headingClass}>
              {renderInlineMarkdown(headingText)}
            </p>
          );
        }

        if (bulletLines.length === lines.length) {
          return (
            <ul key={blockIndex} className="list-disc space-y-1 pl-5">
              {lines.map((line, lineIndex) => (
                <li key={lineIndex}>
                  {renderInlineMarkdown(line.replace(/^[-*]\s+/, ""))}
                </li>
              ))}
            </ul>
          );
        }

        if (numberedLines.length === lines.length) {
          return (
            <ol key={blockIndex} className="list-decimal space-y-1 pl-5">
              {lines.map((line, lineIndex) => (
                <li key={lineIndex}>
                  {renderInlineMarkdown(line.replace(/^\d+\.\s+/, ""))}
                </li>
              ))}
            </ol>
          );
        }

        return (
          <p key={blockIndex} className="whitespace-pre-wrap">
            {renderInlineMarkdown(trimmedBlock)}
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
  speed = ASSISTANT_TYPING_SPEED,
}: {
  text: string;
  active: boolean;
  onComplete?: () => void;
  onProgress?: () => void;
  speed?: number;
}) {
  const [visibleText, setVisibleText] = useState(active ? "" : text);
  const onCompleteRef = useRef(onComplete);
  const onProgressRef = useRef(onProgress);

  useEffect(() => {
    onCompleteRef.current = onComplete;
    onProgressRef.current = onProgress;
  }, [onComplete, onProgress]);

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
      onProgressRef.current?.();

      if (index >= text.length) {
        window.clearInterval(timer);
        onCompleteRef.current?.();
      }
    }, speed);

    return () => window.clearInterval(timer);
  }, [active, speed, text]);

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
  const [promptCycleKey, setPromptCycleKey] = useState(0);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isStaticMode, setIsStaticMode] = useState(false);
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
    if (!isOpen) return;

    window.requestAnimationFrame(() => {
      scrollToBottom("auto");
    });
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setShowPromptBubble(false);
      return;
    }

    const cycleBubble = () => {
      setPromptCycleKey((current) => current + 1);
      setShowPromptBubble(true);
      window.setTimeout(() => setShowPromptBubble(false), 3000);
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
    window.requestAnimationFrame(() => {
      scrollToBottom("smooth");
    });

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

      const data = (await response.json()) as {
        reply?: string;
        error?: string;
        fallbackMode?: "static" | null;
      };

      if (!response.ok) {
        if (data.fallbackMode === "static") {
          setIsStaticMode(true);
        }
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

  function handleStaticQuestionSelect(item: StaticFaq) {
    if (isLoading) return;

    const userMessageId = nextId;
    const assistantMessageId = nextId + 1;

    setMessages((current) => [
      ...current,
      { id: userMessageId, role: "user", content: item.question },
      { id: assistantMessageId, role: "assistant", content: item.answer },
    ]);
    setNextId((current) => current + 2);
    setTypingMessageId(assistantMessageId);
    window.requestAnimationFrame(() => {
      scrollToBottom("smooth");
    });
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
                    className={`chatbot-card relative max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm ${
                      message.role === "user"
                        ? "chatbot-card-user bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                        : "chatbot-card-assistant border border-zinc-200 bg-white text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
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
                        speed={ASSISTANT_TYPING_SPEED}
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
            {isStaticMode ? (
              <div className="rounded-2xl border border-sky-200 bg-sky-50/80 p-3 text-sm text-sky-900 shadow-sm dark:border-sky-500/20 dark:bg-sky-500/10 dark:text-sky-100">
                <p className="font-semibold">Static mode is active</p>
                <p className="mt-1 text-xs leading-5 text-sky-800/90 dark:text-sky-100/80">
                  Gemini is temporarily unavailable because the free-tier daily
                  limit was reached. You can still explore Leynard&apos;s profile
                  using the question bubbles below.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {STATIC_FAQ.map((item) => (
                    <button
                      key={item.question}
                      type="button"
                      onClick={() => handleStaticQuestionSelect(item)}
                      className="cursor-pointer rounded-full border border-sky-200 bg-white px-3 py-2 text-xs font-medium text-sky-700 transition hover:-translate-y-0.5 hover:bg-sky-100 dark:border-sky-500/25 dark:bg-zinc-900 dark:text-sky-200 dark:hover:bg-zinc-800"
                    >
                      {item.question}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
            <div ref={messagesEndRef} />
          </div>

          <form
            onSubmit={handleSubmit}
            className="relative border-t border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-950"
          >
            <button
              type="button"
              onClick={() => scrollToBottom("smooth")}
              className={`chatbot-scroll-button absolute top-0 left-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-2 rounded-full border border-sky-200 bg-white/95 px-4 py-2 text-xs font-medium text-sky-600 shadow-lg backdrop-blur transition dark:border-sky-500/20 dark:bg-zinc-900/95 dark:text-sky-300 ${
                showScrollButton
                  ? "pointer-events-auto opacity-100"
                  : "pointer-events-none opacity-0"
              }`}
              aria-label="Scroll to latest message"
            >
              <span>Scroll to latest</span>
              <ChevronDown className="size-4" />
            </button>
            <div className="flex items-stretch gap-2">
              <textarea
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={
                  isStaticMode
                    ? "Static mode is active. Use the question bubbles above."
                    : "Ask about Leynard..."
                }
                rows={2}
                disabled={isStaticMode}
                className="h-12 flex-1 resize-none rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-sky-400 disabled:cursor-not-allowed disabled:opacity-70 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim() || isStaticMode}
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
            <TypewriterText
              key={promptCycleKey}
              text="Ask Leynard AI"
              active={showPromptBubble}
              speed={PROMPT_TYPING_SPEED}
            />
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
