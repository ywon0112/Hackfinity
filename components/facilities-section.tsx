import { Waves, Dumbbell, Film, Gamepad2, UtensilsCrossed, Users, Clock, Wifi } from "lucide-react"

const facilities = [
  { icon: Waves, title: "Indoor Swimming Pool" },
  { icon: Dumbbell, title: "State-of-the-Art Gym" },
  { icon: Film, title: "Private Cinema" },
  { icon: Gamepad2, title: "Bowling Alley" },
  { icon: UtensilsCrossed, title: "Gourmet Halal Buffet" },
  { icon: Users, title: "Business & Conference Rooms" },
  { icon: Clock, title: "24/7 Room Service" },
  { icon: Wifi, title: "High-Speed Wi-Fi" },
]

export function FacilitiesSection() {
  return (
    <section id="facilities" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">World-Class Facilities</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {facilities.map((facility, index) => (
            <div key={index} className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-accent/10 group-hover:bg-accent/20 transition-colors">
                <facility.icon className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{facility.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
