import { Button } from "./ui/button";

interface PayPalButtonProps {
    amount: number;
    onSuccess: () => void;
}

const PayPalButton = ({ amount, onSuccess }: PayPalButtonProps) => {
    const handlePayPalClick = () => {
        // Simulate PayPal payment flow
        // In production, this would redirect to PayPal or open PayPal modal
        setTimeout(() => {
            onSuccess();
        }, 1500);
    };

    return (
        <div className="space-y-4 bg-slate-50 p-6 rounded-lg border border-border">
            <div className="text-center space-y-4">
                <svg className="h-12 w-auto mx-auto text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.067 8.478c.492.88.556 2.014.3 3.327-.74 3.806-3.276 5.12-6.514 5.12h-.5a.805.805 0 00-.794.68l-.04.22-.63 3.993-.028.14a.804.804 0 01-.794.68H7.72a.483.483 0 01-.477-.558L7.418 21h1.518l.95-6.02h1.385c4.678 0 7.75-2.203 8.796-6.502z" />
                    <path d="M2.344 1.746a.483.483 0 01.477-.403h7.944c1.598 0 2.78.332 3.516.985.736.654 1.043 1.63.914 2.904-.13 1.273-.653 2.29-1.556 3.018-.904.729-2.145 1.093-3.693 1.093H7.732L6.87 15.31a.805.805 0 00.794.937h2.412a.644.644 0 00.636-.54l.026-.137.502-3.182.032-.173a.644.644 0 01.636-.54h.401c3.639 0 6.49-1.478 7.32-5.755.345-1.775.166-3.26-.686-4.423C17.856 1.194 16.411.64 14.429.64H6.016a.804.804 0 00-.794.68L2.344 18.094" />
                </svg>

                <div>
                    <p className="text-lg font-semibold">Pagar con PayPal</p>
                    <p className="text-sm text-muted-foreground">Serás redirigido a PayPal para completar el pago</p>
                </div>

                <div className="bg-primary/5 rounded-lg p-4">
                    <p className="text-2xl font-bold text-primary">${amount}</p>
                    <p className="text-xs text-muted-foreground">Monto total a pagar</p>
                </div>

                <Button
                    onClick={handlePayPalClick}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    size="lg"
                >
                    Continuar con PayPal
                </Button>

                <p className="text-xs text-muted-foreground">
                    Al hacer clic, aceptas los términos de PayPal
                </p>
            </div>
        </div>
    );
};

export default PayPalButton;
