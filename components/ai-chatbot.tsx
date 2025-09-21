
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Message {
  text: string;
  isUser: boolean;
}

export default function AiChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = async () => {
    if (inputValue.trim() === "") return;

    const newMessages = [...messages, { text: inputValue, isUser: true }];
    setMessages(newMessages);
    setInputValue("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: inputValue }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response from the bot");
      }

      const data = await response.json();
      const botMessage = data.response || "Sorry, I didn't understand that.";

      setMessages([...newMessages, { text: botMessage, isUser: false }]);
    } catch (error) {
      console.error("Error communicating with the chatbot:", error);
      setMessages([...newMessages, { text: "Error: Could not connect to the bot.", isUser: false }]);
    }
  };

  return (
    <div>
      <Button
        className="fixed bottom-4 right-4 rounded-full w-16 h-16"
        onClick={() => setIsOpen(!isOpen)}
      >
        Chat
      </Button>
      {isOpen && (
        <Card className="fixed bottom-24 right-4 w-80 h-96 flex flex-col">
          <CardHeader>
            <CardTitle>AI Chatbot</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow overflow-y-auto">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.isUser ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`px-4 py-2 rounded-lg ${
                      message.isUser
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage();
                  }
                }}
                placeholder="Type your message..."
              />
              <Button onClick={handleSendMessage}>Send</Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
