"use client"

import type React from "react"

import { useState } from "react"
import { MessageCircle, X, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  const handleSendMessage = () => {
    if (message.trim()) {
      // Handle message sending logic here
      console.log("Sending message:", message)
      setMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 w-16 h-16 navy-bg rounded-full flex items-center justify-center shadow-2xl hover:shadow-3xl transition-all duration-300 z-50 hover:scale-105"
        aria-label="Open chat"
      >
        <MessageCircle className="w-8 h-8 gold-text" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-lg shadow-2xl z-50 flex flex-col overflow-hidden animate-in slide-in-from-bottom-2 duration-300">
          {/* Header */}
          <div className="navy-bg text-white p-4 flex items-center justify-between">
            <h3 className="font-semibold">Hotel Concierge</h3>
            <button
              onClick={toggleChat}
              className="gold-text hover:text-yellow-300 transition-colors"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 p-4 bg-gray-50 overflow-y-auto">
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <p className="text-sm text-gray-700">
                How can I assist you today? I'm here to help with reservations, amenities, and any questions about your
                stay.
              </p>
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 border-t bg-white">
            <div className="flex space-x-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                size="sm"
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
