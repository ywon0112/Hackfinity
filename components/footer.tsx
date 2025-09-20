"use client"

import { Facebook, Instagram, Twitter } from "lucide-react"

export function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <footer id="contact" className="navy-bg text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-xl font-serif font-bold mb-6 gold-text">Contact</h3>
            <div className="space-y-3">
              <p>26, Jalan Enau 13</p>
              <p>Taman Daya, Johor Bahru</p>
              <p>81100 Johor, Malaysia</p>
              <p className="mt-4">Phone: +60 7-123 4567</p>
              <p>Email: info@jbsuperstarhotel.com</p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-serif font-bold mb-6 gold-text">Quick Links</h3>
            <div className="space-y-3">
              <button onClick={() => scrollToSection("home")} className="block hover:text-accent transition-colors">
                Home
              </button>
              <button onClick={() => scrollToSection("rooms")} className="block hover:text-accent transition-colors">
                Rooms
              </button>
              <button
                onClick={() => scrollToSection("facilities")}
                className="block hover:text-accent transition-colors"
              >
                Facilities
              </button>
              <button onClick={() => scrollToSection("location")} className="block hover:text-accent transition-colors">
                Location
              </button>
              <a href="#" className="block hover:text-accent transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="block hover:text-accent transition-colors">
                Terms of Service
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-serif font-bold mb-6 gold-text">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-accent rounded-full flex items-center justify-center hover:bg-accent/80 transition-colors"
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-accent rounded-full flex items-center justify-center hover:bg-accent/80 transition-colors"
              >
                <Facebook className="w-5 h-5 text-white" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-accent rounded-full flex items-center justify-center hover:bg-accent/80 transition-colors"
              >
                <Twitter className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8 text-center">
          <p>&copy; 2024 JBsuperstar Hotel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
