import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Flight } from "@/data/mockFlights";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Plane, User, Phone, Mail, Luggage, Shield, AlertCircle } from "lucide-react";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const flight = location.state?.flight as Flight;

  const [fullName, setFullName] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");
  const [luggageSize, setLuggageSize] = useState("small");
  const [flightPlan, setFlightPlan] = useState("economy");
  const [selectedSeat, setSelectedSeat] = useState("");

  if (!user) {
    navigate("/login");
    return null;
  }

  if (!flight) {
    navigate("/");
    return null;
  }

  const luggagePrices: { [key: string]: number } = {
    small: 0,
    medium: 30,
    large: 60
  };

  const planPrices: { [key: string]: number } = {
    economy: 0,
    flexible: 50,
    premium: 120
  };

  const totalPrice = flight.price + luggagePrices[luggageSize] + planPrices[flightPlan];

  const handleConfirm = () => {
    if (!fullName || !idNumber || !phone || !email || !emergencyName || !emergencyPhone || !selectedSeat) {
      toast.error("Por favor completa todos los campos");
      return;
    }

    const bookingData = {
      bookingId: `BK-${Date.now()}`,
      flight,
      passenger: { fullName, idNumber, phone, email },
      emergency: { name: emergencyName, phone: emergencyPhone },
      extras: { luggageSize, flightPlan, selectedSeat },
      totalPrice,
      date: new Date().toISOString()
    };

    // Save booking to localStorage
    const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    bookings.push(bookingData);
    localStorage.setItem("bookings", JSON.stringify(bookings));

    navigate("/confirmation", { state: { booking: bookingData } });
  };

  const generateSeats = () => {
    const rows = 20;
    const seatsPerRow = 6;
    const seats = [];
    const letters = ["A", "B", "C", "D", "E", "F"];
    
    for (let i = 1; i <= rows; i++) {
      for (let j = 0; j < seatsPerRow; j++) {
        seats.push(`${i}${letters[j]}`);
      }
    }
    return seats;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">Finalizar Compra</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Flight Details Card */}
              <Card className="shadow-medium border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plane className="h-5 w-5 text-primary" />
                    Detalles del Vuelo
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Aerolínea</p>
                      <p className="font-semibold">{flight.airline}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Ruta</p>
                      <p className="font-semibold">{flight.origin} → {flight.destination}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Salida</p>
                      <p className="font-semibold">{flight.departureTime}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Llegada</p>
                      <p className="font-semibold">{flight.arrivalTime}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Personal Information */}
              <Card className="shadow-medium border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    Datos Personales
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Nombre Completo</Label>
                      <Input
                        id="fullName"
                        placeholder="Juan Pérez García"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="idNumber">Cédula / Pasaporte</Label>
                      <Input
                        id="idNumber"
                        placeholder="12345678"
                        value={idNumber}
                        onChange={(e) => setIdNumber(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-primary" />
                        Teléfono
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+34 600 000 000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-primary" />
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="tu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-accent" />
                      Contacto de Emergencia
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="emergencyName">Nombre</Label>
                        <Input
                          id="emergencyName"
                          placeholder="María López"
                          value={emergencyName}
                          onChange={(e) => setEmergencyName(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="emergencyPhone">Teléfono</Label>
                        <Input
                          id="emergencyPhone"
                          type="tel"
                          placeholder="+34 600 000 000"
                          value={emergencyPhone}
                          onChange={(e) => setEmergencyPhone(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Flight Options */}
              <Card className="shadow-medium border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Luggage className="h-5 w-5 text-primary" />
                    Opciones de Vuelo
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="luggage">Tamaño de Equipaje</Label>
                    <Select value={luggageSize} onValueChange={setLuggageSize}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Pequeño (incluido)</SelectItem>
                        <SelectItem value="medium">Mediano (+$30)</SelectItem>
                        <SelectItem value="large">Grande (+$60)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="plan" className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-primary" />
                      Plan de Vuelo
                    </Label>
                    <Select value={flightPlan} onValueChange={setFlightPlan}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="economy">Económico (incluido)</SelectItem>
                        <SelectItem value="flexible">Flexible - Cambios gratis (+$50)</SelectItem>
                        <SelectItem value="premium">Premium - Todo incluido (+$120)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="seat">Selección de Asiento</Label>
                    <Select value={selectedSeat} onValueChange={setSelectedSeat}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un asiento" />
                      </SelectTrigger>
                      <SelectContent className="max-h-60">
                        {generateSeats().map((seat) => (
                          <SelectItem key={seat} value={seat}>
                            Asiento {seat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Summary Sidebar */}
            <div className="lg:col-span-1">
              <Card className="shadow-large border-border/50 sticky top-24">
                <CardHeader>
                  <CardTitle>Resumen de Compra</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Vuelo base</span>
                      <span className="font-semibold">${flight.price}</span>
                    </div>
                    {luggagePrices[luggageSize] > 0 && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Equipaje</span>
                        <span className="font-semibold">+${luggagePrices[luggageSize]}</span>
                      </div>
                    )}
                    {planPrices[flightPlan] > 0 && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Plan de vuelo</span>
                        <span className="font-semibold">+${planPrices[flightPlan]}</span>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-primary">${totalPrice}</span>
                    </div>
                  </div>

                  <Button onClick={handleConfirm} className="w-full bg-accent hover:bg-accent/90" size="lg">
                    Confirmar Compra
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    Al confirmar, aceptas nuestros términos y condiciones
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Checkout;
