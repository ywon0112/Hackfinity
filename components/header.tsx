"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-primary/95 backdrop-blur-sm shadow-lg" : "bg-primary"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-2xl font-serif font-bold text-primary-foreground">JBsuperstar Hotel</h1>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <button
            onClick={() => scrollToSection("home")}
            className="text-primary-foreground hover:text-accent transition-colors"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection("rooms")}
            className="text-primary-foreground hover:text-accent transition-colors"
          >
            Rooms
          </button>
          <button
            onClick={() => scrollToSection("facilities")}
            className="text-primary-foreground hover:text-accent transition-colors"
          >
            Facilities
          </button>
          <button
            onClick={() => scrollToSection("location")}
            className="text-primary-foreground hover:text-accent transition-colors"
          >
            Location
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="text-primary-foreground hover:text-accent transition-colors"
          >
            Contact
          </button>
        </nav>

        <Button
          className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-6"
          onClick={() => scrollToSection("rooms")}
        >
          Book Now
        </Button>
      </div>
    </header>
  )
}
