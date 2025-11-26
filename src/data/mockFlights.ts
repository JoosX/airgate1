export interface Flight {
  id: string;
  airline: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: number;
  price: number;
  class: string;
  availableSeats: number;
}

export const generateMockFlights = (
  origin: string,
  destination: string,
  flightClass: string
): Flight[] => {
  const airlines = ["Aerolíneas Argentinas", "LATAM", "Iberia", "American Airlines", "United Airlines", "Air France"];
  
  const basePrice = flightClass === "economy" ? 300 : flightClass === "premium" ? 600 : 1200;
  
  return Array.from({ length: 8 }, (_, i) => {
    const departureHour = 6 + i * 2;
    const duration = 2 + Math.floor(Math.random() * 8);
    const arrivalHour = (departureHour + duration) % 24;
    const stops = Math.floor(Math.random() * 3);
    const priceVariation = Math.floor(Math.random() * 400) - 200;

    return {
      id: `flight-${i + 1}`,
      airline: airlines[Math.floor(Math.random() * airlines.length)],
      origin,
      destination,
      departureTime: `${departureHour.toString().padStart(2, "0")}:${(Math.floor(Math.random() * 6) * 10).toString().padStart(2, "0")}`,
      arrivalTime: `${arrivalHour.toString().padStart(2, "0")}:${(Math.floor(Math.random() * 6) * 10).toString().padStart(2, "0")}`,
      duration: `${duration}h ${Math.floor(Math.random() * 60)}m`,
      stops,
      price: basePrice + priceVariation,
      class: flightClass,
      availableSeats: 10 + Math.floor(Math.random() * 90),
    };
  });
};

export const popularDestinations = [
  {
    id: "madrid",
    name: "Madrid",
    country: "España",
    averagePrice: 450,
    image: "madrid"
  },
  {
    id: "buenosaires",
    name: "Buenos Aires",
    country: "Argentina",
    averagePrice: 550,
    image: "buenosaires"
  },
  {
    id: "miami",
    name: "Miami",
    country: "Estados Unidos",
    averagePrice: 380,
    image: "miami"
  },
  {
    id: "cancun",
    name: "Cancún",
    country: "México",
    averagePrice: 320,
    image: "cancun"
  },
  {
    id: "paris",
    name: "París",
    country: "Francia",
    averagePrice: 520,
    image: "paris"
  },
  {
    id: "santiago",
    name: "Santiago",
    country: "Chile",
    averagePrice: 480,
    image: "santiago"
  }
];
