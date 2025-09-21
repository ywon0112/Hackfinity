import { LexRuntimeV2Client, RecognizeTextCommand } from "@aws-sdk/client-lex-runtime-v2";
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: Request) {
  const { message, sessionId } = await req.json();

  // Each conversation with a user needs a unique session ID.
  // We'll generate a new one if the client doesn't provide one.
  const session = sessionId || uuidv4();

  const client = new LexRuntimeV2Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  });

  const command = new RecognizeTextCommand({
    botId: process.env.LEX_BOT_ID,
    botAliasId: process.env.LEX_BOT_ALIAS_ID,
    localeId: "en_US", // Or your bot's locale
    sessionId: session,
    text: message,
  });

  try {
    const response = await client.send(command);
    const botMessage = response.messages?.map(msg => msg.content).join(' ') || "Sorry, I didn't understand that.";
    
    return new Response(JSON.stringify({ response: botMessage, sessionId: session }), { status: 200 });
  } catch (error) {
    console.error("Error communicating with Amazon Lex:", error);
    return new Response(JSON.stringify({ error: "Failed to get response from chatbot" }), { status: 500 });
  }
}
