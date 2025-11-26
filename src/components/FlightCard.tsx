import { Plane, Clock, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Flight } from "@/data/mockFlights";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface FlightCardProps {
  flight: Flight;
}

const FlightCard = ({ flight }: FlightCardProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSelect = () => {
    if (!user) {
      toast.error("Debes iniciar sesión para reservar un vuelo");
      navigate("/login");
      return;
    }
    navigate("/checkout", { state: { flight } });
  };

  return (
    <Card className="shadow-medium hover:shadow-large transition-smooth border-border/50">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Flight Info */}
          <div className="flex-1 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">{flight.airline}</h3>
              {flight.stops === 0 && (
                <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full font-medium">
                  Directo
                </span>
              )}
            </div>

            <div className="grid grid-cols-3 gap-4 items-center">
              {/* Departure */}
              <div>
                <p className="text-2xl font-bold text-foreground">{flight.departureTime}</p>
                <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                  <MapPin className="h-3 w-3" />
                  {flight.origin}
                </p>
              </div>

              {/* Duration & Stops */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="h-px bg-border flex-1"></div>
                  <Plane className="h-4 w-4 text-primary rotate-90" />
                  <div className="h-px bg-border flex-1"></div>
                </div>
                <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                  <Clock className="h-3 w-3" />
                  {flight.duration}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {flight.stops === 0 ? "Sin escalas" : `${flight.stops} ${flight.stops === 1 ? "escala" : "escalas"}`}
                </p>
              </div>

              {/* Arrival */}
              <div className="text-right">
                <p className="text-2xl font-bold text-foreground">{flight.arrivalTime}</p>
                <p className="text-sm text-muted-foreground flex items-center justify-end gap-1 mt-1">
                  <MapPin className="h-3 w-3" />
                  {flight.destination}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Clase: {flight.class === "economy" ? "Económica" : flight.class === "premium" ? "Premium" : "Ejecutiva"}</span>
              <span>•</span>
              <span>{flight.availableSeats} asientos disponibles</span>
            </div>
          </div>

          {/* Price & Action */}
          <div className="flex flex-col items-end justify-between gap-4 md:min-w-[180px]">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Desde</p>
              <p className="text-3xl font-bold text-primary">${flight.price}</p>
              <p className="text-xs text-muted-foreground">por pasajero</p>
            </div>
            <Button onClick={handleSelect} className="w-full bg-accent hover:bg-accent/90" size="lg">
              Seleccionar vuelo
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FlightCard;
