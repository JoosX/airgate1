import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Download, Mail, Plane } from "lucide-react";

const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state?.booking;

  if (!booking) {
    navigate("/");
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          {/* Success Message */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-accent/10 rounded-full mb-4"
            >
              <CheckCircle2 className="h-10 w-10 text-accent" />
            </motion.div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              ¡Compra Exitosa!
            </h1>
            <p className="text-lg text-muted-foreground">
              Tu reserva ha sido confirmada
            </p>
          </div>

          {/* Booking Details Card */}
          <Card className="shadow-large border-border/50 mb-6">
            <CardHeader className="border-b border-border">
              <CardTitle className="flex items-center gap-2">
                <Plane className="h-5 w-5 text-primary" />
                Detalles de la Reserva
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              {/* Booking Code */}
              <div className="bg-accent/5 p-4 rounded-lg border border-accent/20">
                <p className="text-sm text-muted-foreground mb-1">Código de Reserva</p>
                <p className="text-2xl font-bold text-accent">{booking.bookingId}</p>
              </div>

              {/* Flight Information */}
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Información del Vuelo</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Aerolínea</p>
                    <p className="font-semibold">{booking.flight.airline}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Ruta</p>
                    <p className="font-semibold">
                      {booking.flight.origin} → {booking.flight.destination}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Salida</p>
                    <p className="font-semibold">{booking.flight.departureTime}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Llegada</p>
                    <p className="font-semibold">{booking.flight.arrivalTime}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Duración</p>
                    <p className="font-semibold">{booking.flight.duration}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Asiento</p>
                    <p className="font-semibold">{booking.extras.selectedSeat}</p>
                  </div>
                </div>
              </div>

              {/* Passenger Information */}
              <div className="space-y-3 border-t border-border pt-4">
                <h3 className="font-semibold text-lg">Información del Pasajero</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Nombre</p>
                    <p className="font-semibold">{booking.passenger.fullName}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Documento</p>
                    <p className="font-semibold">{booking.passenger.idNumber}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Email</p>
                    <p className="font-semibold">{booking.passenger.email}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Teléfono</p>
                    <p className="font-semibold">{booking.passenger.phone}</p>
                  </div>
                </div>
              </div>

              {/* Price Summary */}
              <div className="space-y-3 border-t border-border pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total Pagado</span>
                  <span className="text-primary">${booking.totalPrice}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" size="lg" className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Descargar PDF
            </Button>
            <Button variant="outline" size="lg" className="w-full">
              <Mail className="mr-2 h-4 w-4" />
              Enviar por Email
            </Button>
          </div>

          <div className="text-center mt-8">
            <Button onClick={() => navigate("/")} size="lg" className="bg-accent hover:bg-accent/90">
              Volver al Inicio
            </Button>
          </div>

          <p className="text-sm text-muted-foreground text-center mt-6">
            Recibirás un correo de confirmación con todos los detalles de tu reserva
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Confirmation;
