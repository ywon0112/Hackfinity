"use client"

import { Button } from "@/components/ui/button"

export function HeroSection() {
  const scrollToRooms = () => {
    const element = document.getElementById("rooms")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/luxury-modern-hotel-exterior-at-dusk-with-warm-glo.jpg')`,
        }}
      />
      <div className="hero-overlay absolute inset-0" />

      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 text-balance">
          Experience Unparalleled Luxury in <span className="gold-text">Johor Bahru</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-pretty opacity-90">
          Your sanctuary of modern elegance and exceptional comfort awaits.
        </p>
        <Button
          size="lg"
          className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-4 text-lg"
          onClick={scrollToRooms}
        >
          Book Your Stay
        </Button>
      </div>
    </section>
  )
}
