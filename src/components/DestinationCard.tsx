import { MapPin, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

interface DestinationCardProps {
  name: string;
  country: string;
  averagePrice: number;
  image: string;
  onViewFlights: () => void;
}

const DestinationCard = ({ name, country, averagePrice, image, onViewFlights }: DestinationCardProps) => {
  const getImageSrc = (imageName: string) => {
    try {
      return new URL(`../assets/${imageName}.jpg`, import.meta.url).href;
    } catch {
      return "";
    }
  };

  return (
    <Card className="group overflow-hidden shadow-medium hover:shadow-large transition-smooth border-border/50">
      <div className="relative h-64 overflow-hidden">
        <img
          src={getImageSrc(image)}
          alt={`${name}, ${country}`}
          className="w-full h-full object-cover transition-smooth group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-2xl font-bold mb-1">{name}</h3>
          <p className="text-sm flex items-center gap-1 opacity-90">
            <MapPin className="h-4 w-4" />
            {country}
          </p>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Desde</p>
            <p className="text-2xl font-bold text-primary">${averagePrice}</p>
          </div>
          <Button onClick={onViewFlights} size="lg" className="bg-accent hover:bg-accent/90">
            Ver vuelos
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DestinationCard;
