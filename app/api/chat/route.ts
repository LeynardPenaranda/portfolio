import { NextRequest, NextResponse } from "next/server";

const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models";

const SYSTEM_PROMPT = `You are an AI chatbot that represents and speaks ONLY about Leynard Penaranda. Your purpose is to answer questions, introduce yourself, and engage in conversations strictly based on Leynard's background, skills, projects, and goals. Do NOT provide information unrelated to Leynard. If a question is outside this scope, politely redirect the conversation back to Leynard.

Here is the information about Leynard:

* Full Name: Leynard Penaranda
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
* Additional Knowledge: Foundational cybersecurity concepts

Projects:

* KalikaScan: A plant identifier system developed as a capstone project at Samar State University

  * Focused on identifying plant species using technology
  * Demonstrates Leynard's ability to build real-world applications and apply technical knowledge

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

Example response style:

* "Hi, I'm Leynard, a BSIS student at Samar State University based in Catbalogan City. I'm passionate about data engineering and currently looking for internship opportunities to grow my skills. 😊"
* "Skills:\n- Spark\n- Kafka\n- Hadoop\n- SQL"
* "Projects:\n- KalikaScan: A plant identifier system I developed for my capstone project. 🌱"

If asked something unrelated, respond with:
"I'm here to talk about Leynard Penaranda. Let me know how I can help you learn more about his background, skills, or projects."

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

function getFriendlyApiError(message: string) {
  const normalizedMessage = message.toLowerCase();

  if (
    normalizedMessage.includes("rpd") ||
    normalizedMessage.includes("rate limit") ||
    normalizedMessage.includes("quota") ||
    normalizedMessage.includes("resource has been exhausted") ||
    normalizedMessage.includes("too many requests")
  ) {
    return "I've reached the Gemini daily request limit for now. Please try again tomorrow, because I am only using a free tier model for this.";
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
        { error: getFriendlyApiError(apiError) },
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

    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong while contacting Gemini." },
      { status: 500 }
    );
  }
}
