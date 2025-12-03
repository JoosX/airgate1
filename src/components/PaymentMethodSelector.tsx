import { CreditCard, Check } from "lucide-react";
import { Card, CardContent } from "./ui/card";

interface PaymentMethod {
    id: string;
    name: string;
    icon: React.ReactNode;
    description: string;
}

interface PaymentMethodSelectorProps {
    selectedMethod: string;
    onSelectMethod: (method: string) => void;
}

const PaymentMethodSelector = ({ selectedMethod, onSelectMethod }: PaymentMethodSelectorProps) => {
    const paymentMethods: PaymentMethod[] = [
        {
            id: "stripe",
            name: "Tarjeta de Crédito/Débito",
            icon: <CreditCard className="h-6 w-6" />,
            description: "Pago seguro con Stripe"
        },
        {
            id: "paypal",
            name: "PayPal",
            icon: (
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.067 8.478c.492.88.556 2.014.3 3.327-.74 3.806-3.276 5.12-6.514 5.12h-.5a.805.805 0 00-.794.68l-.04.22-.63 3.993-.028.14a.804.804 0 01-.794.68H7.72a.483.483 0 01-.477-.558L7.418 21h1.518l.95-6.02h1.385c4.678 0 7.75-2.203 8.796-6.502z" />
                    <path d="M2.344 1.746a.483.483 0 01.477-.403h7.944c1.598 0 2.78.332 3.516.985.736.654 1.043 1.63.914 2.904-.13 1.273-.653 2.29-1.556 3.018-.904.729-2.145 1.093-3.693 1.093H7.732L6.87 15.31a.805.805 0 00.794.937h2.412a.644.644 0 00.636-.54l.026-.137.502-3.182.032-.173a.644.644 0 01.636-.54h.401c3.639 0 6.49-1.478 7.32-5.755.345-1.775.166-3.26-.686-4.423C17.856 1.194 16.411.64 14.429.64H6.016a.804.804 0 00-.794.68L2.344 18.094" />
                </svg>
            ),
            description: "Paga con tu cuenta PayPal"
        },
        {
            id: "credit-card",
            name: "Tarjeta Manual",
            icon: <CreditCard className="h-6 w-6" />,
            description: "Ingresa los datos manualmente"
        }
    ];

    return (
        <div className="space-y-3">
            {paymentMethods.map((method) => (
                <Card
                    key={method.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${selectedMethod === method.id
                            ? "border-primary border-2 bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                    onClick={() => onSelectMethod(method.id)}
                >
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className={`${selectedMethod === method.id ? "text-primary" : "text-muted-foreground"}`}>
                                    {method.icon}
                                </div>
                                <div>
                                    <p className="font-semibold text-foreground">{method.name}</p>
                                    <p className="text-sm text-muted-foreground">{method.description}</p>
                                </div>
                            </div>
                            {selectedMethod === method.id && (
                                <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                                    <Check className="h-4 w-4 text-white" />
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default PaymentMethodSelector;
