import { LexRuntimeV2Client, RecognizeTextCommand } from "@aws-sdk/client-lex-runtime-v2"
import { v4 as uuidv4 } from "uuid"

export async function POST(req: Request) {
  console.log("[v0] API route called")

  try {
    const { message, sessionId } = await req.json()
    console.log("[v0] Received message:", message, "sessionId:", sessionId)

    // Each conversation with a user needs a unique session ID.
    // We'll generate a new one if the client doesn't provide one.
    const session = sessionId || uuidv4()

    console.log("[v0] Environment variables check:", {
      region: process.env.AWS_REGION ? "✓" : "✗",
      accessKey: process.env.AWS_ACCESS_KEY_ID ? "✓" : "✗",
      secretKey: process.env.AWS_SECRET_ACCESS_KEY ? "✓" : "✗",
      botId: process.env.LEX_BOT_ID ? "✓" : "✗",
      botAliasId: process.env.LEX_BOT_ALIAS_ID ? "✓" : "✗",
    })

    const client = new LexRuntimeV2Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
      requestHandler: {
        httpOptions: {
          agent: { maxSockets: 25 },
        },
      },
    })

    console.log("[v0] Client created, sending command")

    const command = new RecognizeTextCommand({
      botId: process.env.LEX_BOT_ID,
      botAliasId: process.env.LEX_BOT_ALIAS_ID,
      localeId: "en_US", // Or your bot's locale
      sessionId: session,
      text: message,
    })

    const response = await client.send(command)
    console.log("[v0] Lex response:", response)

    const botMessage = response.messages?.map((msg) => msg.content).join(" ") || "Sorry, I didn't understand that."

    console.log("[v0] Sending response:", botMessage)
    return new Response(JSON.stringify({ response: botMessage, sessionId: session }), { status: 200 })
  } catch (error) {
    console.error("[v0] Error communicating with Amazon Lex:", error)
    console.error("[v0] Error details:", {
      name: error.name,
      message: error.message,
      stack: error.stack,
    })

    return new Response(
      JSON.stringify({
        error: "Failed to get response from chatbot",
        details: error.message,
        type: error.name,
      }),
      { status: 500 },
    )
  }
}
