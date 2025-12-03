import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { CreditCard, Lock } from "lucide-react";

interface StripePaymentFormProps {
    onValidationChange: (isValid: boolean) => void;
}

const StripePaymentForm = ({ onValidationChange }: StripePaymentFormProps) => {
    const [cardNumber, setCardNumber] = useState("");
    const [cardName, setCardName] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvv, setCvv] = useState("");

    const formatCardNumber = (value: string) => {
        const cleaned = value.replace(/\s/g, "");
        const formatted = cleaned.match(/.{1,4}/g)?.join(" ") || cleaned;
        return formatted.slice(0, 19); // 16 digits + 3 spaces
    };

    const formatExpiry = (value: string) => {
        const cleaned = value.replace(/\D/g, "");
        if (cleaned.length >= 2) {
            return cleaned.slice(0, 2) + "/" + cleaned.slice(2, 4);
        }
        return cleaned;
    };

    const handleCardNumberChange = (value: string) => {
        const formatted = formatCardNumber(value);
        setCardNumber(formatted);
        validateForm(formatted, cardName, expiry, cvv);
    };

    const handleExpiryChange = (value: string) => {
        const formatted = formatExpiry(value);
        setExpiry(formatted);
        validateForm(cardNumber, cardName, formatted, cvv);
    };

    const handleCvvChange = (value: string) => {
        const cleaned = value.replace(/\D/g, "").slice(0, 4);
        setCvv(cleaned);
        validateForm(cardNumber, cardName, expiry, cleaned);
    };

    const handleCardNameChange = (value: string) => {
        setCardName(value);
        validateForm(cardNumber, value, expiry, cvv);
    };

    const validateForm = (card: string, name: string, exp: string, c: string) => {
        const cardValid = card.replace(/\s/g, "").length === 16;
        const nameValid = name.length >= 3;
        const expiryValid = exp.length === 5;
        const cvvValid = c.length >= 3;

        onValidationChange(cardValid && nameValid && expiryValid && cvvValid);
    };

    return (
        <div className="space-y-4 bg-slate-50 p-6 rounded-lg border border-border">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-primary" />
                    Datos de la Tarjeta
                </h3>
                <Lock className="h-4 w-4 text-green-600" />
            </div>

            <div className="space-y-2">
                <Label htmlFor="cardNumber">Número de Tarjeta</Label>
                <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={(e) => handleCardNumberChange(e.target.value)}
                    maxLength={19}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="cardName">Nombre en la Tarjeta</Label>
                <Input
                    id="cardName"
                    placeholder="JUAN PEREZ"
                    value={cardName}
                    onChange={(e) => handleCardNameChange(e.target.value.toUpperCase())}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="expiry">Vencimiento</Label>
                    <Input
                        id="expiry"
                        placeholder="MM/AA"
                        value={expiry}
                        onChange={(e) => handleExpiryChange(e.target.value)}
                        maxLength={5}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                        id="cvv"
                        type="password"
                        placeholder="123"
                        value={cvv}
                        onChange={(e) => handleCvvChange(e.target.value)}
                        maxLength={4}
                    />
                </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
                <p className="text-xs text-blue-800 flex items-center gap-2">
                    <Lock className="h-3 w-3" />
                    Tu información está protegida con encriptación SSL de 256 bits
                </p>
            </div>
        </div>
    );
};

export default StripePaymentForm;
