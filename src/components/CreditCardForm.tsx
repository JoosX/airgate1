import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { CreditCard, Lock } from "lucide-react";

interface CreditCardFormProps {
    onValidationChange: (isValid: boolean) => void;
}

const CreditCardForm = ({ onValidationChange }: CreditCardFormProps) => {
    const [cardNumber, setCardNumber] = useState("");
    const [cardName, setCardName] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvv, setCvv] = useState("");

    const getCardType = (number: string) => {
        const cleaned = number.replace(/\s/g, "");
        if (cleaned.startsWith("4")) return "Visa";
        if (cleaned.startsWith("5")) return "Mastercard";
        if (cleaned.startsWith("3")) return "Amex";
        return "";
    };

    const formatCardNumber = (value: string) => {
        const cleaned = value.replace(/\s/g, "");
        const formatted = cleaned.match(/.{1,4}/g)?.join(" ") || cleaned;
        return formatted.slice(0, 19);
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

    const cardType = getCardType(cardNumber);

    return (
        <div className="space-y-4 bg-slate-50 p-6 rounded-lg border border-border">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-primary" />
                    Datos de la Tarjeta
                </h3>
                <div className="flex items-center gap-2">
                    {cardType && (
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                            {cardType}
                        </span>
                    )}
                    <Lock className="h-4 w-4 text-green-600" />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="ccNumber">Número de Tarjeta</Label>
                <Input
                    id="ccNumber"
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={(e) => handleCardNumberChange(e.target.value)}
                    maxLength={19}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="ccName">Nombre del Titular</Label>
                <Input
                    id="ccName"
                    placeholder="JUAN PEREZ"
                    value={cardName}
                    onChange={(e) => handleCardNameChange(e.target.value.toUpperCase())}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="ccExpiry">Fecha de Vencimiento</Label>
                    <Input
                        id="ccExpiry"
                        placeholder="MM/AA"
                        value={expiry}
                        onChange={(e) => handleExpiryChange(e.target.value)}
                        maxLength={5}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="ccCvv">Código de Seguridad</Label>
                    <Input
                        id="ccCvv"
                        type="password"
                        placeholder="123"
                        value={cvv}
                        onChange={(e) => handleCvvChange(e.target.value)}
                        maxLength={4}
                    />
                </div>
            </div>

            <div className="flex gap-2 mt-3">
                <img src="https://img.icons8.com/color/48/visa.png" alt="Visa" className="h-8" />
                <img src="https://img.icons8.com/color/48/mastercard.png" alt="Mastercard" className="h-8" />
                <img src="https://img.icons8.com/color/48/amex.png" alt="Amex" className="h-8" />
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-4">
                <p className="text-xs text-green-800 flex items-center gap-2">
                    <Lock className="h-3 w-3" />
                    Pago seguro y encriptado
                </p>
            </div>
        </div>
    );
};

export default CreditCardForm;
