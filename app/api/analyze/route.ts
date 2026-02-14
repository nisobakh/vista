import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import OpenAI from "openai";

export async function POST() {
  try {
    // 1️⃣ Read CSV file
    const filePath = path.join(process.cwd(), "public", "maria_transactions.csv");
    const csvData = fs.readFileSync(filePath, "utf-8");

    // 2️⃣ Initialize OpenAI
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // 3️⃣ Send to OpenAI
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      temperature: 0.2,
      messages: [
        {
          role: "system",
          content: `
You are a financial analyst AI helping a small food truck owner understand cash flow.

Analyze the transaction CSV data and return STRICT JSON in this exact format:

{
  "outlook": [
    { "week": "Week 1", "expected_in": number, "expected_out": number, "summary": "string", "tight": boolean },
    { "week": "Week 2", "expected_in": number, "expected_out": number, "summary": "string", "tight": boolean },
    { "week": "Week 3", "expected_in": number, "expected_out": number, "summary": "string", "tight": boolean },
    { "week": "Week 4", "expected_in": number, "expected_out": number, "summary": "string", "tight": boolean }
  ],
  "insights": [
    {
      "title": "string",
      "insight": "string",
      "suggested_action": "string",
      "accentColor": "success" | "warning" | "info"
    }
  ],
  "non_obvious_observation": "string"
}

Do not include markdown.
Do not wrap in code fences.
Do not explain anything.
Return only valid JSON.
          `,
        },
        {
          role: "user",
          content: `Here is the transaction data:\n\n${csvData}`,
        },
      ],
    });

    const raw = response.choices[0].message.content || "{}";

    // Remove accidental ```json fences if model still adds them
    const cleaned = raw
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(cleaned);

    console.log("AI OUTPUT:");
    console.log(JSON.stringify(parsed, null, 2));

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("ANALYZE ERROR:", error);
    return NextResponse.json(
      { error: "Failed to analyze cash flow" },
      { status: 500 }
    );
  }
}
