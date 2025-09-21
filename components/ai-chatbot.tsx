"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, X, Send } from "lucide-react"

interface Message {
  text: string
  isUser: boolean
}

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [sessionId, setSessionId] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setSessionId(crypto.randomUUID())
  }, [])

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          text: "Welcome to JBsuperstar Hotel! How can I assist you with your stay or booking today?",
          isUser: false,
        },
      ])
    }
  }, [isOpen, messages.length])

  const handleSendMessage = async () => {
    if (inputValue.trim() === "" || isLoading) return

    const userMessage = inputValue.trim()
    const newMessages = [...messages, { text: userMessage, isUser: true }]
    setMessages(newMessages)
    setInputValue("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          sessionId: sessionId,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response from the bot")
      }

      const data = await response.json()
      const botMessage = data.response || "Sorry, I didn't understand that."

      setMessages([...newMessages, { text: botMessage, isUser: false }])
    } catch (error) {
      console.error("Error communicating with the chatbot:", error)
      setMessages([
        ...newMessages,
        {
          text: "I apologize, but I'm having trouble connecting right now. Please try again in a moment.",
          isUser: false,
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <Button
        className="fixed bottom-6 right-6 rounded-full w-20 h-20 bg-gradient-to-r from-gold to-yellow-400 hover:from-gold/90 hover:to-yellow-400/90 shadow-2xl transition-all duration-300 hover:scale-110 z-50 animate-pulse border-2 border-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MessageCircle className="w-8 h-8 text-navy" />
      </Button>

      {isOpen && (
        /* Increased chatbox size from w-80 h-96 to w-96 h-[28rem] for slightly bigger dimensions */
        <Card className="fixed bottom-28 right-6 w-96 h-[28rem] flex flex-col shadow-2xl border-navy/20 z-40">
          <CardHeader className="bg-gradient-to-r from-navy to-blue-900 text-white rounded-t-lg py-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-serif">🏨 JBsuperstar Concierge</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 h-6 w-6 p-0"
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="flex-grow overflow-y-auto p-3 bg-off-white">
            <div className="space-y-2">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`px-3 py-2 rounded-lg max-w-[85%] text-sm ${
                      message.isUser ? "bg-navy text-black" : "bg-white border border-gray-200 text-gray-800"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-200 text-gray-800 px-3 py-2 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>

          <div className="p-3 border-t bg-white rounded-b-lg">
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !isLoading) {
                    handleSendMessage()
                  }
                }}
                placeholder="Ask about rooms, amenities..."
                disabled={isLoading}
                /* Added text-black to make input text black instead of white for better visibility */
                className="flex-1 text-sm h-8 text-black"
              />
              <Button
                onClick={handleSendMessage}
                disabled={isLoading || inputValue.trim() === ""}
                className="bg-gold hover:bg-gold/90 text-navy h-8 w-8 p-0"
              >
                <Send className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
