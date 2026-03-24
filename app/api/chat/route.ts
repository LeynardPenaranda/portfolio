import { NextRequest, NextResponse } from "next/server";

const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models";

const SYSTEM_PROMPT = `You are an AI chatbot that represents and speaks ONLY about Leynard M. Penaranda. Your purpose is to answer questions, introduce yourself, and engage in conversations strictly based on Leynard's background, skills, projects, and goals. Do NOT provide information unrelated to Leynard. If a question is outside this scope, politely redirect the conversation back to Leynard.

Here is the information about Leynard:

* Full Name: Leynard M. Penaranda
* Location: Catbalogan City, Samar, Philippines
* University: Samar State University
* Education: Bachelor of Science in Information Systems (BSIS), currently a 3rd-year student transitioning to 4th year

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
* Format responses so they are easy to read
* Prefer short paragraphs, short sections, and bullet points when listing skills, projects, goals, or achievements
* Avoid large walls of text
* When helpful, use labels like "Background", "Skills", "Projects", or "Goals"
* When asked about Leynard's projects, list all relevant projects from his portfolio before adding short explanations
* When talking about Leynard's skills, make it clear that all of his listed technical skills are currently at a junior level

Example response style:

* "Hi, I'm Leynard M. Penaranda, a BSIS student at Samar State University based in Catbalogan City. I'm passionate about data engineering and currently looking for internship opportunities to grow my skills. 😊"
* "Skills (Junior Level):\n- Spark\n- Kafka\n- Hadoop\n- SQL\n- React Native"
* "Projects:\n- KalikaScan\n- Data Warehouse and Analytics Project\n- Confluent Kafka Hands On\n- Big Data Hive Practical\n- Big Data Engineering Real-World Project: E-commerce Dataset\n- Fast Fizza Factory\n- The Wild Oasis Employee\n- The Wild Oasis Website Guest\n- The ShopeStore an E-commerce website\n- Static E-commerce website\n- Digital Lost and Found System"

If asked something unrelated, respond with:
"I'm here to talk about Leynard M. Penaranda. Let me know how I can help you learn more about his background, skills, or projects."

Your goal is to act as Leynard's personal AI portfolio assistant and conversational representative.`;

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

function toGeminiRole(role: ChatMessage["role"]) {
  return role === "assistant" ? "model" : "user";
}

function extractText(data: unknown) {
  if (!data || typeof data !== "object") return "";

  const candidates = (data as { candidates?: unknown[] }).candidates;
  if (!Array.isArray(candidates) || candidates.length === 0) return "";

  const firstCandidate = candidates[0] as {
    content?: { parts?: Array<{ text?: string }> };
  };

  const parts = firstCandidate.content?.parts;
  if (!Array.isArray(parts)) return "";

  return parts
    .map((part) => (typeof part.text === "string" ? part.text : ""))
    .join("")
    .trim();
}

function isQuotaError(message: string) {
  const normalizedMessage = message.toLowerCase();

  return (
    normalizedMessage.includes("rpd") ||
    normalizedMessage.includes("quota") ||
    normalizedMessage.includes("daily limit") ||
    normalizedMessage.includes("resource has been exhausted") ||
    normalizedMessage.includes("free tier")
  );
}

function isTemporaryBusyError(message: string) {
  const normalizedMessage = message.toLowerCase();

  return (
    normalizedMessage.includes("rate limit") ||
    normalizedMessage.includes("too many requests") ||
    normalizedMessage.includes("overloaded") ||
    normalizedMessage.includes("busy") ||
    normalizedMessage.includes("temporarily unavailable") ||
    normalizedMessage.includes("try again later")
  );
}

function getFriendlyApiError(message: string) {
  if (isQuotaError(message)) {
    return "I've reached the Gemini daily request limit for now. Please try again tomorrow, because I am only using a free tier model for this.";
  }

  if (isTemporaryBusyError(message)) {
    return "I'm answering many people right now, so the chat is a bit busy. Please wait a moment and try sending your message again.";
  }

  return message;
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  const model = process.env.GEMINI_MODEL || "gemini-2.5-flash-lite";

  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing GEMINI_API_KEY on the server." },
      { status: 500 }
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
        { status: 400 }
      );
    }

    const recentHistory = history
      .slice(-8)
      .filter(
        (item) =>
          item &&
          (item.role === "user" || item.role === "assistant") &&
          typeof item.content === "string" &&
          item.content.trim()
      );

    const conversation: ChatMessage[] = [
      ...recentHistory,
      { role: "user", content: message },
    ];

    const geminiContents = conversation.map((item) => ({
      role: toGeminiRole(item.role),
      parts: [{ text: item.content }],
    }));

    const response = await fetch(`${GEMINI_API_URL}/${model}:generateContent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: SYSTEM_PROMPT }],
        },
        contents: geminiContents,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 400,
        },
      }),
    });

    const data = (await response.json()) as Record<string, unknown>;

    if (!response.ok) {
      const apiError =
        typeof data.error === "object" &&
        data.error &&
        "message" in data.error &&
        typeof data.error.message === "string"
          ? data.error.message
          : "Gemini request failed.";

      return NextResponse.json(
        {
          error: getFriendlyApiError(apiError),
          fallbackMode: isQuotaError(apiError) ? "static" : null,
        },
        { status: response.status }
      );
    }

    const reply = extractText(data);

    if (!reply) {
      return NextResponse.json(
        { error: "Gemini did not return a text response." },
        { status: 502 }
      );
    }

    return NextResponse.json({ reply, fallbackMode: null });
  } catch {
    return NextResponse.json(
      {
        error:
          "I'm answering many people right now, so the chat may be temporarily unavailable. Please try again in a moment.",
      },
      { status: 500 }
    );
  }
}
