import { useState } from "react";
import { Search, MapPin, Calendar, Users, Plane } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card, CardContent } from "./ui/card";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

interface FlightSearchCardProps {
  onSearch: (params: SearchParams) => void;
}

export interface SearchParams {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  tripType: "roundtrip" | "oneway";
  passengers: number;
  class: string;
}

const FlightSearchCard = ({ onSearch }: FlightSearchCardProps) => {
  const [tripType, setTripType] = useState<"roundtrip" | "oneway">("roundtrip");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState("1");
  const [flightClass, setFlightClass] = useState("economy");

  const handleSearch = () => {
    if (!origin || !destination || !departureDate) {
      alert("Por favor completa todos los campos obligatorios");
      return;
    }

    onSearch({
      origin,
      destination,
      departureDate,
      returnDate: tripType === "roundtrip" ? returnDate : undefined,
      tripType,
      passengers: parseInt(passengers),
      class: flightClass,
    });
  };

  return (
    <Card className="w-full shadow-large border-border/50">
      <CardContent className="p-6">
        <Tabs value={tripType} onValueChange={(v) => setTripType(v as "roundtrip" | "oneway")} className="mb-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="roundtrip">Ida y vuelta</TabsTrigger>
            <TabsTrigger value="oneway">Solo ida</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {/* Origin */}
          <div className="space-y-2">
            <Label htmlFor="origin" className="text-sm font-medium flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              Origen
            </Label>
            <Input
              id="origin"
              placeholder="Ciudad de origen"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="h-11"
            />
          </div>

          {/* Destination */}
          <div className="space-y-2">
            <Label htmlFor="destination" className="text-sm font-medium flex items-center gap-2">
              <Plane className="h-4 w-4 text-accent" />
              Destino
            </Label>
            <Input
              id="destination"
              placeholder="Ciudad de destino"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="h-11"
            />
          </div>

          {/* Departure Date */}
          <div className="space-y-2">
            <Label htmlFor="departure" className="text-sm font-medium flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              Fecha de salida
            </Label>
            <Input
              id="departure"
              type="date"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              className="h-11"
            />
          </div>

          {/* Return Date */}
          {tripType === "roundtrip" && (
            <div className="space-y-2">
              <Label htmlFor="return" className="text-sm font-medium flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                Fecha de retorno
              </Label>
              <Input
                id="return"
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="h-11"
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Passengers */}
          <div className="space-y-2">
            <Label htmlFor="passengers" className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              Pasajeros
            </Label>
            <Select value={passengers} onValueChange={setPassengers}>
              <SelectTrigger className="h-11">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} {num === 1 ? "pasajero" : "pasajeros"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Class */}
          <div className="space-y-2">
            <Label htmlFor="class" className="text-sm font-medium">
              Clase
            </Label>
            <Select value={flightClass} onValueChange={setFlightClass}>
              <SelectTrigger className="h-11">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="economy">Económica</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
                <SelectItem value="business">Ejecutiva</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Search Button */}
          <div className="space-y-2">
            <Label className="text-sm font-medium opacity-0">Buscar</Label>
            <Button onClick={handleSearch} className="w-full h-11 bg-accent hover:bg-accent/90" size="lg">
              <Search className="mr-2 h-5 w-5" />
              Buscar vuelos
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FlightSearchCard;
