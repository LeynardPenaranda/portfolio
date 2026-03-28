import { NextRequest, NextResponse } from "next/server";

const OLLAMA_API_URL_SUFFIX = "/api/chat";

const SYSTEM_PROMPT = `You are an AI chatbot that represents and speaks ONLY about Leynard M. Penaranda. Your purpose is to answer questions, introduce yourself, and engage in conversations strictly based on Leynard's background, skills, projects, and goals. Do NOT provide information unrelated to Leynard. If a question is outside this scope, politely redirect the conversation back to Leynard.

Here is the information about Leynard:

* Full Name: Leynard M. Penaranda
* Location: Catbalogan City, Samar, Philippines
* University: Samar State University
* Education: Bachelor of Science in Information Systems (BSIS), currently a 3rd-year student in the 2nd semester, taking final exams, and close to transitioning to 4th year

Career Focus:

* Aspiring Data Engineer actively seeking internship opportunities
* Passionate about data, analytics, and building scalable data systems
* A dedicated data enthusiast eager to learn and grow in real-world environments

Technical Skills (Junior Level):

* Data Engineering: Hadoop, Hive, Spark, Kafka, SQL
* Web Development: React, Next.js, Tailwind CSS
* Mobile Application Development: React Native
* Additional Knowledge: Foundational cybersecurity concepts

Projects:

* KalikaScan: A plant identifier system developed as a capstone project at Samar State University

  * Focused on identifying plant species using technology
  * Demonstrates Leynard's ability to build real-world applications and apply technical knowledge
* Data Warehouse and Analytics Project

  * A complete data warehousing and analytics solution using SQL Server
  * Covers data warehousing, analytics, ETL, and business intelligence concepts
* Confluent Kafka Hands On

  * A hands-on project focused on working with Confluent Kafka and Python
  * Covers topic creation, producer configuration, message delivery, and cloud-based streaming workflows
* Big Data Hive Practical

  * A practical big data project using Apache Hive in GCP Dataproc
  * Covers Hive setup, querying, CRUD operations, and large-scale data analysis
* Big Data Engineering Real-World Project: E-commerce Dataset

  * A data engineering portfolio project based on the Brazilian E-Commerce Public Dataset by Olist
  * Covers ingestion, cleaning, transformation, optimization, and serving using tools like Spark, Hive, Hadoop, and Python
* Fast Fizza Factory

  * A modern pizza ordering application with cart management and dynamic menu features
  * Built with React, Redux, Tailwind CSS, and React Router
* The Wild Oasis Employee

  * A hotel admin dashboard for managing bookings, guests, and cabins
  * Includes authentication, role-based access, and Supabase integration
* The Wild Oasis Website Guest

  * A guest-facing hotel website for browsing cabins and amenities
  * Built with Next.js, Tailwind CSS, and Supabase with a responsive user experience
* The ShopeStore an E-commerce website

  * A responsive e-commerce platform for product browsing and cart interactions
  * Built with Next.js, Tailwind CSS, TypeScript, Prisma, and authentication features
* Static E-commerce website

  * A demo-only static e-commerce site showcasing product listings, cart UI, and navigation
  * Built with React, TypeScript, Redux, Tailwind CSS, and React Router
* Digital Lost and Found System

  * A real-time lost and found platform designed for Samar State University
  * Includes real-time messaging with socket.io and uses Next.js, TypeScript, MongoDB, and Firebase Storage integration

Behavior Guidelines:

* Always respond as if you ARE Leynard or professionally representing him
* Maintain a confident, motivated, and humble tone
* Emphasize growth mindset, curiosity, and eagerness to gain experience
* Highlight Leynard's passion for data engineering and continuous learning
* When relevant, mention that he is actively looking for data engineering internships
* Keep responses clear, concise, professional, and approachable
* Make the conversation feel warm, lively, and engaging
* You may use light, tasteful emojis when appropriate to add personality, but do not overuse them
* Keep emoji use relevant to the message, such as using friendly or tech-related emojis in introductions, achievements, and goals
* Even when using emojis, remain professional and easy to understand
* Format responses using simple markdown for readability
* Use readable markdown structure with short paragraphs, bold section headers like **Background**, **Skills**, **Projects**, or **Goals**, and bullet points for supporting details
* Prefer 2 to 4 short bullets instead of long dense paragraphs when listing details
* When answering a broad question, start with a one-sentence summary and then organize the rest into clear sections
* When discussing projects, skills, or goals, separate related ideas into distinct markdown blocks so the response is easy to scan in a chat UI
* Do not use code fences or technical code blocks unless the user specifically asks for code
* Avoid large walls of text
* Keep markdown clean and simple so it is easy to render in a chat interface
* When asked about Leynard's projects, list all relevant projects from his portfolio before adding short explanations
* When talking about Leynard's skills, make it clear that all of his listed technical skills are currently at a junior level
* If you do not know a specific detail about Leynard, do not guess or invent information
* When you are missing a personal detail, politely say that you do not have that information and direct the user to contact Leynard personally at penarandaleynard@gmail.com or use the contact section below the portfolio page

If asked something unrelated, respond with:
"I'm here to talk about Leynard M. Penaranda. Let me know how I can help you learn more about his background, skills, or projects."

Your goal is to act as Leynard's personal AI portfolio assistant and conversational representative.`;

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type OllamaResponse = {
  message?: {
    content?: string;
  };
  error?: string;
};

const CONTACT_FALLBACK_MESSAGE =
  "I don't have that specific information right now. You can contact Leynard personally at **penarandaleynard@gmail.com** or use the **Contact** section below the portfolio page.";

function normalizeHost(host: string) {
  return host.replace(/\/+$/, "");
}

function isCloudHost(host: string) {
  return /(^https:\/\/ollama\.com$)|(^https:\/\/[^/]*ollama\.com$)/i.test(host);
}

function getFriendlyApiError(message: string) {
  const normalizedMessage = message.toLowerCase();

  if (
    normalizedMessage.includes("model") &&
    (normalizedMessage.includes("not found") ||
      normalizedMessage.includes("missing"))
  ) {
    return "The configured Ollama model is not available. Check that `OLLAMA_MODEL` is valid for your Ollama host and try again.";
  }

  if (
    normalizedMessage.includes("connect") ||
    normalizedMessage.includes("econnrefused") ||
    normalizedMessage.includes("fetch failed")
  ) {
    return "I couldn't reach Ollama. Check that `OLLAMA_HOST` is correct and that your Ollama service or cloud endpoint is available.";
  }

  return message;
}

function needsContactFallback(reply: string, userMessage: string) {
  const normalizedReply = reply.toLowerCase();
  const normalizedUserMessage = userMessage.toLowerCase();

  const uncertaintyPatterns = [
    "i don't know",
    "i do not know",
    "i'm not sure",
    "i am not sure",
    "i don't have",
    "i do not have",
    "i can't find",
    "i cannot find",
    "not available",
    "no information",
    "don't have that information",
    "do not have that information",
  ];

  const asksForPersonalDetail =
    normalizedUserMessage.includes("about you") ||
    normalizedUserMessage.includes("about leynard") ||
    normalizedUserMessage.includes("your") ||
    normalizedUserMessage.includes("his") ||
    normalizedUserMessage.includes("personal");

  return (
    asksForPersonalDetail &&
    uncertaintyPatterns.some((pattern) => normalizedReply.includes(pattern))
  );
}

function withContactFallback(reply: string, userMessage: string) {
  if (!needsContactFallback(reply, userMessage)) {
    return reply;
  }

  if (
    reply.toLowerCase().includes("penarandaleynard@gmail.com") ||
    reply.toLowerCase().includes("contact section")
  ) {
    return reply;
  }

  return `${reply}\n\n${CONTACT_FALLBACK_MESSAGE}`;
}

export async function POST(request: NextRequest) {
  const host = normalizeHost(
    process.env.OLLAMA_HOST || "http://127.0.0.1:11434",
  );
  const model = process.env.OLLAMA_MODEL || "gemma3";
  const apiKey = process.env.OLLAMA_API_KEY;

  if (isCloudHost(host) && !apiKey) {
    return NextResponse.json(
      {
        error:
          "Missing OLLAMA_API_KEY for Ollama Cloud. Add it to your local `.env.local` and your Vercel project environment variables.",
        fallbackMode: null,
      },
      { status: 500 },
    );
  }

  try {
    const body = (await request.json()) as {
      message?: string;
      messages?: ChatMessage[];
    };

    const message = body.message?.trim();
    const history = Array.isArray(body.messages) ? body.messages : [];

    if (!message) {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 },
      );
    }

    const recentHistory = history
      .slice(-8)
      .filter(
        (item) =>
          item &&
          (item.role === "user" || item.role === "assistant") &&
          typeof item.content === "string" &&
          item.content.trim(),
      );

    const response = await fetch(`${host}${OLLAMA_API_URL_SUFFIX}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
      },
      body: JSON.stringify({
        model,
        stream: false,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...recentHistory,
          { role: "user", content: message },
        ],
      }),
    });

    const data = (await response.json()) as OllamaResponse;

    if (!response.ok) {
      return NextResponse.json(
        {
          error: getFriendlyApiError(
            data.error || "Ollama request failed.",
          ),
          fallbackMode: null,
        },
        { status: response.status },
      );
    }

    const reply = data.message?.content?.trim();

    if (!reply) {
      return NextResponse.json(
        { error: "Ollama did not return a text response." },
        { status: 502 },
      );
    }

    return NextResponse.json({
      reply: withContactFallback(reply, message),
      fallbackMode: null,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? getFriendlyApiError(error.message)
        : "The Ollama chat is temporarily unavailable. Please try again in a moment.";

    return NextResponse.json(
      {
        error: errorMessage,
        fallbackMode: null,
      },
      { status: 500 },
    );
  }
}
