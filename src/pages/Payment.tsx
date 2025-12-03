import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PaymentMethodSelector from "@/components/PaymentMethodSelector";
import StripePaymentForm from "@/components/StripePaymentForm";
import PayPalButton from "@/components/PayPalButton";
import CreditCardForm from "@/components/CreditCardForm";
import { CreditCard, Plane, Loader2 } from "lucide-react";
import { toast } from "sonner";

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const booking = location.state?.booking;

    const [selectedMethod, setSelectedMethod] = useState("stripe");
    const [isFormValid, setIsFormValid] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    if (!booking) {
        navigate("/");
        return null;
    }

    const handlePayment = async () => {
        setIsProcessing(true);

        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Mock payment success
        const paymentData = {
            ...booking,
            payment: {
                method: selectedMethod,
                transactionId: `TXN-${Date.now()}`,
                timestamp: new Date().toISOString(),
                status: "completed"
            }
        };

        // Save booking to localStorage
        const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
        bookings.push(paymentData);
        localStorage.setItem("bookings", JSON.stringify(bookings));

        setIsProcessing(false);
        toast.success("¡Pago procesado exitosamente!");
        navigate("/confirmation", { state: { booking: paymentData } });
    };

    const handlePayPalSuccess = () => {
        setIsProcessing(true);

        const paymentData = {
            ...booking,
            payment: {
                method: "paypal",
                transactionId: `PP-${Date.now()}`,
                timestamp: new Date().toISOString(),
                status: "completed"
            }
        };

        // Save booking
        const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
        bookings.push(paymentData);
        localStorage.setItem("bookings", JSON.stringify(bookings));

        toast.success("¡Pago con PayPal exitoso!");
        navigate("/confirmation", { state: { booking: paymentData } });
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
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">Pago Seguro</h1>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Payment Form */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Payment Method Selection */}
                            <Card className="shadow-medium border-border/50">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <CreditCard className="h-5 w-5 text-primary" />
                                        Método de Pago
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <PaymentMethodSelector
                                        selectedMethod={selectedMethod}
                                        onSelectMethod={setSelectedMethod}
                                    />
                                </CardContent>
                            </Card>

                            {/* Payment Form Based on Selection */}
                            <Card className="shadow-medium border-border/50">
                                <CardHeader>
                                    <CardTitle>Información de Pago</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {selectedMethod === "stripe" && (
                                        <StripePaymentForm onValidationChange={setIsFormValid} />
                                    )}
                                    {selectedMethod === "paypal" && (
                                        <PayPalButton amount={booking.totalPrice} onSuccess={handlePayPalSuccess} />
                                    )}
                                    {selectedMethod === "credit-card" && (
                                        <CreditCardForm onValidationChange={setIsFormValid} />
                                    )}
                                </CardContent>
                            </Card>

                            {/* Process Payment Button */}
                            {selectedMethod !== "paypal" && (
                                <Button
                                    onClick={handlePayment}
                                    disabled={!isFormValid || isProcessing}
                                    className="w-full bg-accent hover:bg-accent/90"
                                    size="lg"
                                >
                                    {isProcessing ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Procesando pago...
                                        </>
                                    ) : (
                                        `Pagar $${booking.totalPrice}`
                                    )}
                                </Button>
                            )}
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <Card className="shadow-large border-border/50 sticky top-24">
                                <CardHeader className="border-b border-border">
                                    <CardTitle className="flex items-center gap-2">
                                        <Plane className="h-5 w-5 text-primary" />
                                        Resumen de Compra
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="pt-6 space-y-4">
                                    {/* Flight Details */}
                                    <div className="space-y-2">
                                        <h3 className="font-semibold text-lg">{booking.flight.airline}</h3>
                                        <div className="text-sm space-y-1">
                                            <p className="flex justify-between">
                                                <span className="text-muted-foreground">Ruta:</span>
                                                <span className="font-medium">
                                                    {booking.flight.origin} → {booking.flight.destination}
                                                </span>
                                            </p>
                                            <p className="flex justify-between">
                                                <span className="text-muted-foreground">Salida:</span>
                                                <span className="font-medium">{booking.flight.departureTime}</span>
                                            </p>
                                            <p className="flex justify-between">
                                                <span className="text-muted-foreground">Asiento:</span>
                                                <span className="font-medium">{booking.extras.selectedSeat}</span>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="border-t border-border pt-4 space-y-2 text-sm">
                                        <p className="flex justify-between">
                                            <span className="text-muted-foreground">Vuelo base</span>
                                            <span className="font-semibold">${booking.flight.price}</span>
                                        </p>
                                        {booking.extras.luggageSize !== "small" && (
                                            <p className="flex justify-between">
                                                <span className="text-muted-foreground">Equipaje</span>
                                                <span className="font-semibold">
                                                    +${booking.extras.luggageSize === "medium" ? 30 : 60}
                                                </span>
                                            </p>
                                        )}
                                        {booking.extras.flightPlan !== "economy" && (
                                            <p className="flex justify-between">
                                                <span className="text-muted-foreground">Plan de vuelo</span>
                                                <span className="font-semibold">
                                                    +${booking.extras.flightPlan === "flexible" ? 50 : 120}
                                                </span>
                                            </p>
                                        )}
                                    </div>

                                    <div className="border-t border-border pt-4">
                                        <p className="flex justify-between text-lg font-bold">
                                            <span>Total</span>
                                            <span className="text-primary">${booking.totalPrice}</span>
                                        </p>
                                    </div>

                                    <div className="border-t border-border pt-4 space-y-2 text-sm">
                                        <p className="font-semibold">Pasajero:</p>
                                        <p className="text-muted-foreground">{booking.passenger.fullName}</p>
                                        <p className="text-muted-foreground">{booking.passenger.email}</p>
                                    </div>

                                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                                        <p className="text-xs text-green-800 text-center">
                                            🔒 Pago 100% seguro y encriptado
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Payment;
