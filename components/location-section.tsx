export function LocationSection() {
  return (
    <section id="location" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            Discover Our Prime Location
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
            <img
              src="/map-of-taman-daya-johor-bahru-with-hotel-location-.jpg"
              alt="JBsuperstar Hotel Location Map"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-6">
            <h3 className="text-3xl font-serif font-bold text-foreground">In the Heart of Taman Daya</h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Perfectly situated at 26, Jalan Enau 13, JBsuperstar Hotel is your gateway to the city's best attractions.
              We are just a 5-minute walk from the AEON Shopping Complex, offering unparalleled convenience for both
              shopping and leisure.
            </p>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                <p className="text-foreground">5-minute walk to AEON Shopping Complex</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                <p className="text-foreground">Easy access to major highways</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                <p className="text-foreground">Close to business districts</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
