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
        className="fixed bottom-6 right-6 rounded-full w-16 h-16 bg-navy hover:bg-navy/90 shadow-lg transition-all duration-300 hover:scale-105"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MessageCircle className="w-6 h-6" />
      </Button>

      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-96 h-[500px] flex flex-col shadow-2xl border-navy/20">
          <CardHeader className="bg-navy text-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-serif">JBsuperstar Concierge</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 h-8 w-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="flex-grow overflow-y-auto p-4 bg-off-white">
            <div className="space-y-3">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`px-4 py-2 rounded-lg max-w-[80%] ${
                      message.isUser ? "bg-navy text-white" : "bg-white border border-gray-200 text-gray-800"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-200 text-gray-800 px-4 py-2 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>

          <div className="p-4 border-t bg-white rounded-b-lg">
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !isLoading) {
                    handleSendMessage()
                  }
                }}
                placeholder="Ask about rooms, amenities, or bookings..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                disabled={isLoading || inputValue.trim() === ""}
                className="bg-gold hover:bg-gold/90 text-navy"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
