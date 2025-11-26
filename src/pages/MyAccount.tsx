import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { User, Mail, Plane, Calendar } from "lucide-react";

const MyAccount = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return null;
  }

  const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
  const userBookings = bookings.filter((b: any) => b.passenger.email === user.email);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">Mi Cuenta</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <Card className="shadow-medium border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    Perfil
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Nombre</p>
                    <p className="font-semibold">{user.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Mail className="h-4 w-4 text-primary" />
                      Email
                    </p>
                    <p className="font-semibold">{user.email}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Bookings Section */}
            <div className="lg:col-span-2">
              <Card className="shadow-medium border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plane className="h-5 w-5 text-primary" />
                    Mis Reservas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {userBookings.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Plane className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No tienes reservas aún</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {userBookings.map((booking: any) => (
                        <div
                          key={booking.bookingId}
                          className="border border-border rounded-lg p-4 hover:shadow-soft transition-smooth"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <p className="font-semibold text-lg">{booking.flight.airline}</p>
                              <p className="text-sm text-muted-foreground flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {new Date(booking.date).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-muted-foreground">Código</p>
                              <p className="font-semibold text-accent">{booking.bookingId}</p>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Ruta</p>
                              <p className="font-semibold">
                                {booking.flight.origin} → {booking.flight.destination}
                              </p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Asiento</p>
                              <p className="font-semibold">{booking.extras.selectedSeat}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Salida</p>
                              <p className="font-semibold">{booking.flight.departureTime}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Total</p>
                              <p className="font-semibold text-primary">${booking.totalPrice}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MyAccount;
