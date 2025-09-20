import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { RoomsSection } from "@/components/rooms-section"
import { FacilitiesSection } from "@/components/facilities-section"
import { LocationSection } from "@/components/location-section"
import { Footer } from "@/components/footer"
import { AIChatbot } from "@/components/ai-chatbot"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <RoomsSection />
      <FacilitiesSection />
      <LocationSection />
      <Footer />
      <AIChatbot />
    </main>
  )
}
