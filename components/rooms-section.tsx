import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const rooms = [
  {
    title: "Deluxe Room",
    description: "Elegantly appointed for the discerning traveler, offering breathtaking city views.",
    image: "/elegant-hotel-deluxe-room-with-city-view-modern-in.jpg",
  },
  {
    title: "Palm Suite",
    description: "Spacious luxury suite with premium amenities and panoramic skyline vistas.",
    image: "/luxury-hotel-palm-suite-with-panoramic-skyline-vie.jpg",
  },
  {
    title: "Presidential Suite",
    description: "The pinnacle of luxury accommodation with exclusive services and opulent design.",
    image: "/presidential-hotel-suite-opulent-luxury-design-exc.jpg",
  },
  {
    title: "Executive Room",
    description: "Perfect for business travelers with modern workspace and premium comfort.",
    image: "/executive-hotel-room-modern-workspace-business-tra.jpg",
  },
]

export function RoomsSection() {
  return (
    <section id="rooms" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            An Abode for Every Traveler
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {rooms.map((room, index) => (
            <Card key={index} className="card-hover overflow-hidden bg-card border-0 shadow-lg">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={room.image || "/placeholder.svg"}
                  alt={room.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-serif font-semibold text-card-foreground mb-3">{room.title}</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">{room.description}</p>
                <Button
                  variant="outline"
                  className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent"
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
