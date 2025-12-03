import { useState, useEffect } from "react";
import { Luggage, Check, Scale, Ruler, Plus, Minus, ShoppingBag, Package, Info, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "./ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

export interface BaggageSelection {
    type: string;
    quantity: number;
    price: number;
}

interface BaggageOption {
    id: string;
    name: string;
    shortName: string;
    weight: string;
    weightKg: number;
    dimensions: string;
    description: string;
    pricePerItem: number;
    maxQuantity: number;
    features: string[];
    icon: "carry" | "checked" | "extra";
    included: boolean;
    recommended?: boolean;
}

interface BaggageSelectorProps {
    selections: BaggageSelection[];
    onSelectionsChange: (selections: BaggageSelection[]) => void;
}

const baggageOptions: BaggageOption[] = [
    {
        id: "carry-on",
        name: "Equipaje de Mano",
        shortName: "Mano",
        weight: "Hasta 10kg",
        weightKg: 10,
        dimensions: "55 x 40 x 23 cm",
        description: "Maleta pequeña o mochila para llevar en cabina. Indispensable para tus objetos de valor.",
        pricePerItem: 0,
        maxQuantity: 1,
        icon: "carry",
        included: true,
        features: [
            "1 pieza incluida gratis",
            "Acceso durante el vuelo",
            "Cabe en compartimento superior",
        ]
    },
    {
        id: "checked-23",
        name: "Equipaje Documentado (23kg)",
        shortName: "23kg",
        weight: "Hasta 23kg",
        weightKg: 23,
        dimensions: "158 cm lineales",
        description: "La opción estándar perfecta para la mayoría de los viajes. Entrega en mostrador.",
        pricePerItem: 35,
        maxQuantity: 3,
        icon: "checked",
        included: false,
        recommended: true,
        features: [
            "Ideal para viajes de 5-7 días",
            "Documentado en mostrador",
            "Seguro de equipaje incluido"
        ]
    },
    {
        id: "checked-32",
        name: "Equipaje Documentado (32kg)",
        shortName: "32kg",
        weight: "Hasta 32kg",
        weightKg: 32,
        dimensions: "203 cm lineales",
        description: "Máxima capacidad para viajes largos, mudanzas o compras especiales.",
        pricePerItem: 65,
        maxQuantity: 2,
        icon: "extra",
        included: false,
        features: [
            "Máxima capacidad permitida",
            "Perfecto para viajes largos",
            "Prioridad en entrega"
        ]
    }
];

const BaggageSelector = ({ selections, onSelectionsChange }: BaggageSelectorProps) => {
    // Ensure selections are valid on mount
    useEffect(() => {
        const hasCarryOn = selections.some(s => s.type === "carry-on");
        if (!hasCarryOn) {
            // Default to 1 carry-on if missing (business rule: 1 included)
            onSelectionsChange([
                ...selections,
                { type: "carry-on", quantity: 1, price: 0 }
            ]);
        }
    }, []);

    const getQuantity = (typeId: string): number => {
        const selection = selections.find(s => s.type === typeId);
        return selection ? selection.quantity : 0;
    };

    const updateQuantity = (option: BaggageOption, newQuantity: number) => {
        const clampedQuantity = Math.max(0, Math.min(newQuantity, option.maxQuantity));

        // Prevent removing the included carry-on if it's mandatory (assuming 1 is min for included)
        if (option.included && clampedQuantity < 1) return;

        const newSelections = selections.filter(s => s.type !== option.id);

        if (clampedQuantity > 0) {
            newSelections.push({
                type: option.id,
                quantity: clampedQuantity,
                price: option.included && clampedQuantity === 1 ? 0 : clampedQuantity * option.pricePerItem // Logic: First one free if included? Or all free? Assuming first one based on data. Actually data says pricePerItem is 0 for carry-on, so it's always free.
            });
        }

        onSelectionsChange(newSelections);
    };

    const getTotalPrice = (): number => {
        return selections.reduce((total, s) => total + s.price, 0);
    };

    const getTotalPieces = (): number => {
        return selections.reduce((total, s) => total + s.quantity, 0);
    };

    const renderIcon = (iconType: string, className: string) => {
        switch (iconType) {
            case "carry":
                return <ShoppingBag className={className} />;
            case "checked":
                return <Luggage className={className} />;
            case "extra":
                return <Package className={className} />;
            default:
                return <Luggage className={className} />;
        }
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h3 className="text-2xl font-bold text-foreground flex items-center gap-2">
                        <Luggage className="h-6 w-6 text-primary" />
                        Selecciona tu Equipaje
                    </h3>
                    <p className="text-muted-foreground mt-1">
                        Personaliza tu experiencia de viaje añadiendo el equipaje que necesites.
                    </p>
                </div>

                {/* Mini Summary Badge */}
                <div className="bg-primary/5 border border-primary/20 rounded-full px-4 py-2 flex items-center gap-3 self-start md:self-auto">
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Total piezas:</span>
                        <span className="font-bold text-foreground text-lg">{getTotalPieces()}</span>
                    </div>
                    <div className="h-4 w-px bg-border" />
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Extra:</span>
                        <span className="font-bold text-primary text-lg">
                            {getTotalPrice() > 0 ? `+$${getTotalPrice()}` : "Incluido"}
                        </span>
                    </div>
                </div>
            </div>

            {/* Baggage Options Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                    {baggageOptions.map((option) => {
                        const quantity = getQuantity(option.id);
                        const isSelected = quantity > 0;
                        const totalPrice = quantity * option.pricePerItem;

                        return (
                            <motion.div
                                key={option.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Card
                                    className={cn(
                                        "relative h-full transition-all duration-300 overflow-visible group",
                                        isSelected
                                            ? "border-primary ring-1 ring-primary shadow-lg bg-primary/5"
                                            : "border-border hover:border-primary/50 hover:shadow-md bg-card"
                                    )}
                                >
                                    {/* Badges */}
                                    <div className="absolute -top-3 left-0 w-full flex justify-center gap-2 z-10 px-4 pointer-events-none">
                                        {option.included && (
                                            <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200 shadow-sm">
                                                <Check className="w-3 h-3 mr-1" /> INCLUIDO
                                            </Badge>
                                        )}
                                        {option.recommended && !isSelected && (
                                            <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-none shadow-sm animate-pulse">
                                                ⭐ RECOMENDADO
                                            </Badge>
                                        )}
                                    </div>

                                    <div className="p-6 flex flex-col h-full">
                                        {/* Icon & Title */}
                                        <div className="text-center mb-6 mt-2">
                                            <div className={cn(
                                                "mx-auto w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-colors duration-300",
                                                isSelected ? "bg-primary text-primary-foreground shadow-lg" : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                                            )}>
                                                {renderIcon(option.icon, "w-8 h-8")}
                                            </div>
                                            <h4 className="font-bold text-lg mb-2">{option.name}</h4>
                                            <p className="text-sm text-muted-foreground leading-relaxed">
                                                {option.description}
                                            </p>
                                        </div>

                                        {/* Specs */}
                                        <div className="grid grid-cols-2 gap-3 mb-6">
                                            <div className="bg-background rounded-lg p-3 border border-border/50 flex flex-col items-center justify-center text-center">
                                                <Scale className="w-4 h-4 text-muted-foreground mb-1" />
                                                <span className="text-xs text-muted-foreground">Peso máx.</span>
                                                <span className="font-bold text-sm">{option.weight}</span>
                                            </div>
                                            <div className="bg-background rounded-lg p-3 border border-border/50 flex flex-col items-center justify-center text-center">
                                                <Ruler className="w-4 h-4 text-muted-foreground mb-1" />
                                                <span className="text-xs text-muted-foreground">Medidas</span>
                                                <span className="font-bold text-sm">{option.dimensions}</span>
                                            </div>
                                        </div>

                                        {/* Features List */}
                                        <ul className="space-y-2 mb-6 flex-grow">
                                            {option.features.map((feature, idx) => (
                                                <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                                                    <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                                    <span className="text-xs">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        {/* Footer: Price & Controls */}
                                        <div className="pt-4 border-t border-border/50 mt-auto">
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="text-left">
                                                    <span className="text-xs text-muted-foreground block">Precio por unidad</span>
                                                    <span className={cn("font-bold text-lg", option.pricePerItem === 0 ? "text-green-600" : "text-foreground")}>
                                                        {option.pricePerItem === 0 ? "GRATIS" : `$${option.pricePerItem}`}
                                                    </span>
                                                </div>
                                                <div className="text-right">
                                                    <span className="text-xs text-muted-foreground block">Subtotal</span>
                                                    <span className={cn("font-bold text-lg", totalPrice > 0 ? "text-primary" : "text-muted-foreground")}>
                                                        {totalPrice > 0 ? `+$${totalPrice}` : "-"}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between bg-muted/50 rounded-lg p-1">
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 hover:bg-background hover:shadow-sm transition-all"
                                                    onClick={() => updateQuantity(option, quantity - 1)}
                                                    disabled={quantity <= (option.included ? 1 : 0)}
                                                >
                                                    <Minus className="h-4 w-4" />
                                                </Button>

                                                <div className="font-bold text-lg w-8 text-center">
                                                    {quantity}
                                                </div>

                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 hover:bg-background hover:shadow-sm transition-all"
                                                    onClick={() => updateQuantity(option, quantity + 1)}
                                                    disabled={quantity >= option.maxQuantity}
                                                >
                                                    <Plus className="h-4 w-4" />
                                                </Button>
                                            </div>
                                            <div className="text-center mt-2">
                                                <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
                                                    Máximo {option.maxQuantity} por pasajero
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

            {/* Info Alert */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3 items-start">
                <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                    <h4 className="font-semibold text-blue-900 text-sm">Información importante sobre equipaje</h4>
                    <p className="text-sm text-blue-800 leading-relaxed">
                        Recuerda que el equipaje de mano debe caber en los compartimentos superiores.
                        El equipaje documentado se entrega en los mostradores de facturación antes de pasar seguridad.
                        Si necesitas equipaje especial (instrumentos, deportivo), contáctanos directamente.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BaggageSelector;
