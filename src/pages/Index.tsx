import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import FlightSearchCard, { SearchParams } from "@/components/FlightSearchCard";
import FlightCard from "@/components/FlightCard";
import DestinationCard from "@/components/DestinationCard";
import { generateMockFlights, popularDestinations, Flight } from "@/data/mockFlights";
import { Plane } from "lucide-react";

const Index = () => {
  const [searchResults, setSearchResults] = useState<Flight[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (params: SearchParams) => {
    const flights = generateMockFlights(params.origin, params.destination, params.class);
    setSearchResults(flights);
    setShowResults(true);
    
    // Scroll to results
    setTimeout(() => {
      document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleDestinationClick = (destinationName: string) => {
    const flights = generateMockFlights("Tu ciudad", destinationName, "economy");
    setSearchResults(flights);
    setShowResults(true);
    
    setTimeout(() => {
      document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-10"></div>
        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Plane className="h-8 w-8 text-primary" />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
                Encuentra tu próximo destino
              </h1>
            </div>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Compara precios, encuentra las mejores ofertas y reserva tu vuelo ideal
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <FlightSearchCard onSearch={handleSearch} />
          </motion.div>
        </div>
      </section>

      {/* Search Results */}
      {showResults && (
        <section id="results" className="py-12 px-4 bg-muted/30">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-3xl font-bold text-foreground mb-2">
                Vuelos disponibles
              </h2>
              <p className="text-muted-foreground mb-8">
                {searchResults.length} resultados encontrados
              </p>
              
              <div className="space-y-4">
                {searchResults.map((flight, index) => (
                  <motion.div
                    key={flight.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <FlightCard flight={flight} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Popular Destinations */}
      <section id="destinations" className="py-16 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Destinos más populares
            </h2>
            <p className="text-lg text-muted-foreground">
              Descubre los destinos favoritos de nuestros viajeros
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularDestinations.map((destination, index) => (
              <motion.div
                key={destination.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <DestinationCard
                  name={destination.name}
                  country={destination.country}
                  averagePrice={destination.averagePrice}
                  image={destination.image}
                  onViewFlights={() => handleDestinationClick(destination.name)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
