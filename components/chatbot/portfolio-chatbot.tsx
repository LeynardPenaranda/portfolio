"use client";

import {
  FormEvent,
  KeyboardEvent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
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
const PROMPT_TYPING_SPEED = 75;
const RESPONSE_WORD_SPEED = 90;
const RESPONSE_WORD_BATCH = 2;
const STATIC_FAQ: StaticFaq[] = [
  {
    question: "What are Leynard's skills?",
    answer:
      "**Skills (Junior Level)**\nLeynard is currently at a junior level in all of the following areas:\n- Hadoop\n- Hive\n- Spark\n- Kafka\n- SQL\n- React\n- Next.js\n- Tailwind CSS\n- React Native\n- Foundational cybersecurity concepts",
  },
  {
    question: "What project has Leynard built?",
    answer:
      "**Projects**\n- **KalikaScan**: A plant identifier system developed as a capstone project at Samar State University. The mobile app is currently only compatible with Android because iOS testing is limited by the lack of physical resources.\n- **Data Warehouse and Analytics Project**: A complete data warehousing and analytics solution built with SQL Server.\n- **Confluent Kafka Hands On**: A practical Kafka project using Python for topic creation, producers, and message streaming.\n- **Big Data Hive Practical**: A hands-on Apache Hive project in GCP Dataproc for querying and big data analysis.\n- **Big Data Engineering Real-World Project: E-commerce Dataset**: A full data engineering workflow using the Olist e-commerce dataset.\n- **Fast Fizza Factory**: A modern pizza ordering app with cart management and dynamic menu features.\n- **The Wild Oasis Employee**: A hotel admin dashboard for managing bookings, guests, and cabins.\n- **The Wild Oasis Website Guest**: A guest-facing hotel website for browsing cabins and amenities.\n- **The ShopeStore an E-commerce website**: A responsive e-commerce platform for browsing products and managing a cart.\n- **Static E-commerce website**: A demo-only e-commerce site showcasing product listings, cart UI, and navigation.\n- **Digital Lost and Found System**: A real-time lost and found platform for SSU with real-time messaging features.",
  },
  {
    question: "What is Leynard looking for right now?",
    answer:
      "**Goals**\n- Leynard is an aspiring Data Engineer.\n- He is actively looking for internship opportunities.\n- He wants to gain real-world experience, deepen his data engineering skills, and keep learning every day. 🚀",
  },
  {
    question: "Tell me about Leynard's background",
    answer:
      "**Background**\n- **Full Name**: Leynard M. Peñaranda\n- **Location**: Catbalogan City, Samar, Philippines\n- **University**: Samar State University\n- **Program**: BS in Information Systems\n- **Status**: Currently a 3rd-year student in the 2nd semester, taking final exams, and close to transitioning to 4th year",
  },
];

function normalizeAssistantMessage(content: string) {
  return content
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function renderInlineMarkdown(text: string) {
  const segments = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);

  return segments.map((segment, index) => {
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

function getWordTokens(text: string) {
  return text.match(/\S+\s*/g) ?? [];
}

function renderInlineMarkdownWithLimit(text: string, wordLimit: number) {
  const segments = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
  const nodes: ReactNode[] = [];
  let remainingWords = wordLimit;
  let wordsUsed = 0;

  for (const [index, segment] of segments.entries()) {
    if (remainingWords <= 0) break;

    const isBold = segment.startsWith("**") && segment.endsWith("**");
    const value = isBold ? segment.slice(2, -2) : segment;
    const tokens = getWordTokens(value);

    if (tokens.length === 0) continue;

    const visible = tokens.slice(0, remainingWords).join("");
    const segmentWordsUsed = Math.min(tokens.length, remainingWords);

    if (!visible) continue;

    nodes.push(
      isBold ? (
        <strong key={index} className="font-semibold">
          {visible}
        </strong>
      ) : (
        <span key={index}>{visible}</span>
      ),
    );

    remainingWords -= segmentWordsUsed;
    wordsUsed += segmentWordsUsed;
  }

  return { nodes, wordsUsed };
}

function StructuredMessage({
  content,
  animated = false,
  speed = RESPONSE_WORD_SPEED,
  onProgress,
  onComplete,
}: {
  content: string;
  animated?: boolean;
  speed?: number;
  onProgress?: () => void;
  onComplete?: () => void;
}) {
  const normalizedContent = normalizeAssistantMessage(content);
  const blocks =
    normalizedContent.match(/(?:[^\n]+\n?)+?(?=\n\s*\n|$)/g) ?? [];
  const totalWords = getWordTokens(normalizedContent).length;
  const [visibleWords, setVisibleWords] = useState(
    animated ? 0 : totalWords,
  );
  const onProgressRef = useRef(onProgress);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onProgressRef.current = onProgress;
    onCompleteRef.current = onComplete;
  }, [onComplete, onProgress]);

  useEffect(() => {
    if (!animated) {
      setVisibleWords(totalWords);
      return;
    }

    setVisibleWords(0);

    const timer = window.setInterval(() => {
      setVisibleWords((current) =>
        Math.min(current + RESPONSE_WORD_BATCH, totalWords),
      );
    }, speed);

    return () => window.clearInterval(timer);
  }, [animated, speed, totalWords, normalizedContent]);

  useEffect(() => {
    if (!animated) return;
    if (visibleWords <= 0) return;

    onProgressRef.current?.();
  }, [animated, visibleWords]);

  useEffect(() => {
    if (!animated) return;
    if (visibleWords < totalWords) return;

    onCompleteRef.current?.();
  }, [animated, totalWords, visibleWords]);

  let remainingWords = visibleWords;

  return (
    <div className="space-y-3">
      {blocks.map((block, index) => {
        if (remainingWords <= 0) return null;

        const trimmedBlock = block.trim();
        const lines = trimmedBlock.split("\n").map((line) => line.trim());
        const bulletLines = lines.filter((line) => /^[-*]\s+/.test(line));

        if (/^\*\*[^*]+\*\*$/.test(trimmedBlock)) {
          const headingTokens = getWordTokens(trimmedBlock.slice(2, -2));
          const visible = headingTokens.slice(0, remainingWords).join("");
          const usedWords = Math.min(headingTokens.length, remainingWords);

          if (!visible) return null;

          remainingWords -= usedWords;

          return (
            <p key={index} className="text-base font-semibold">
              {visible}
            </p>
          );
        }

        if (bulletLines.length === lines.length) {
          const items: ReactNode[] = [];

          for (const [lineIndex, line] of lines.entries()) {
            if (remainingWords <= 0) break;

            const { nodes, wordsUsed } = renderInlineMarkdownWithLimit(
              line.replace(/^[-*]\s+/, ""),
              remainingWords,
            );

            if (wordsUsed === 0) break;

            remainingWords -= wordsUsed;
            items.push(<li key={lineIndex}>{nodes}</li>);
          }

          if (items.length === 0) return null;

          return (
            <ul key={index} className="list-disc space-y-1 pl-5">
              {items}
            </ul>
          );
        }

        const { nodes, wordsUsed } = renderInlineMarkdownWithLimit(
          trimmedBlock,
          remainingWords,
        );

        if (wordsUsed === 0) return null;

        remainingWords -= wordsUsed;

        return (
          <p key={index} className="whitespace-pre-wrap">
            {nodes}
          </p>
        );
      })}
      {animated && visibleWords < totalWords ? (
        <span className="chatbot-caret" aria-hidden="true" />
      ) : null}
    </div>
  );
}

function TypewriterText({
  text,
  active,
  onComplete,
  onProgress,
  speed = PROMPT_TYPING_SPEED,
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
  const [animatingMessageId, setAnimatingMessageId] = useState<number | null>(
    null,
  );
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
  }, [animatingMessageId, isLoading, messages]);

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
      setAnimatingMessageId(assistantMessageId);
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
      setAnimatingMessageId(assistantMessageId);
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
    setAnimatingMessageId(assistantMessageId);
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
      className="fixed right-4 bottom-[6.5rem] z-[60] sm:right-6 sm:bottom-[6.5rem]"
    >
      {isOpen ? (
        <div
          className={`chatbot-panel flex h-[32rem] w-[min(24rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-2xl backdrop-blur dark:border-zinc-800 dark:bg-black ${
            isClosing ? "chatbot-panel-out" : "chatbot-panel-in"
          }`}
        >
          <div className="flex items-center justify-between border-b border-zinc-200 bg-black px-4 py-3 text-white dark:border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="overflow-hidden rounded-full ring-1 ring-white/25">
                <Image
                  src={CHATBOT_PROFILE_IMAGE}
                  alt="Leynard AI profile"
                  width={34}
                  height={34}
                  className="size-[34px] rounded-full object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-semibold">Ask Leynard AI</p>
                <p className="mt-1 text-xs text-zinc-300">
                  Portfolio assistant
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleCloseChat}
              className="rounded-full p-2 transition hover:bg-white/10"
              aria-label="Close chatbot"
            >
              <X className="size-5" />
            </button>
          </div>

          <div
            ref={scrollAreaRef}
            onScroll={handleScroll}
            className="relative flex-1 space-y-3 overflow-y-auto bg-gradient-to-b from-zinc-50 to-white px-4 py-4 dark:from-zinc-950 dark:to-black"
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
                    <div className="overflow-hidden rounded-full border border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-950">
                      <Image
                        src={CHATBOT_PROFILE_IMAGE}
                        alt="Leynard AI profile"
                        width={24}
                        height={24}
                        className="size-6 rounded-full object-cover"
                      />
                    </div>
                  ) : null}
                  <div
                    className={`chatbot-card relative ${
                      message.role === "assistant" ? "max-w-[92%]" : "max-w-[85%]"
                    } rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm ${
                      message.role === "user"
                        ? "chatbot-card-user bg-black text-white dark:bg-white dark:text-black"
                        : "chatbot-card-assistant border border-zinc-300 bg-white text-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`absolute bottom-3 h-3 w-3 rotate-45 ${
                        message.role === "user"
                          ? "-right-1 bg-black dark:bg-white"
                          : "-left-1 border-r border-b border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-950"
                      }`}
                    />
                    {message.role === "assistant" ? (
                      <StructuredMessage
                        content={message.content}
                        animated={animatingMessageId === message.id}
                        onProgress={() => {
                          if (isNearBottom()) {
                            scrollToBottom("auto");
                          }
                        }}
                        onComplete={() =>
                          setAnimatingMessageId((current) =>
                            current === message.id ? null : current,
                          )
                        }
                      />
                    ) : (
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {isLoading ? (
              <div className="flex justify-start">
                <div className="inline-flex items-center gap-2 rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-700 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-300">
                  <LoaderCircle className="size-4 animate-spin" />
                  Responding
                  <span className="chatbot-dots" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </span>
                </div>
              </div>
            ) : null}
            {isStaticMode ? (
              <div className="rounded-2xl border border-zinc-300 bg-zinc-100 p-3 text-sm text-zinc-900 shadow-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100">
                <p className="font-semibold">Static mode is active</p>
                <p className="mt-1 text-xs leading-5 text-zinc-700 dark:text-zinc-300">
                  Live AI responses are temporarily unavailable. You can still
                  explore Leynard&apos;s profile using the question bubbles
                  below.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {STATIC_FAQ.map((item) => (
                    <button
                      key={item.question}
                      type="button"
                      onClick={() => handleStaticQuestionSelect(item)}
                      className="cursor-pointer rounded-full border border-zinc-300 bg-white px-3 py-2 text-xs font-medium text-zinc-800 transition hover:-translate-y-0.5 hover:bg-zinc-200 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-800"
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
            className="relative border-t border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-black"
          >
            <button
              type="button"
              onClick={() => scrollToBottom("smooth")}
              className={`chatbot-scroll-button absolute top-0 left-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-2 rounded-full border border-zinc-300 bg-white/95 px-4 py-2 text-xs font-medium text-zinc-800 shadow-lg backdrop-blur transition dark:border-zinc-700 dark:bg-zinc-950/95 dark:text-zinc-100 ${
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
                disabled={isStaticMode || isLoading}
                className="h-12 flex-1 resize-none rounded-2xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-500 disabled:cursor-not-allowed disabled:opacity-70 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim() || isStaticMode}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-black text-white transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-black"
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
            className={`pointer-events-none absolute right-0 bottom-[4.5rem] chatbot-prompt rounded-2xl border border-zinc-300 bg-white/95 px-4 py-2 text-sm font-medium text-zinc-950 shadow-xl backdrop-blur dark:border-zinc-700 dark:bg-zinc-950/95 dark:text-zinc-100 ${
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
            className="chatbot-launcher group relative flex h-14 w-14 cursor-pointer items-center justify-center rounded-[10px] bg-black text-white shadow-2xl transition hover:-translate-y-1 dark:bg-white dark:text-black"
            aria-label="Open chatbot"
          >
            <span className="absolute inset-0 rounded-[10px] bg-white/10 opacity-0 transition group-hover:opacity-100 dark:bg-black/10" />
            <MessageCircle className="relative z-10 size-6" />
          </button>
        </div>
      )}
    </div>
  );
}
