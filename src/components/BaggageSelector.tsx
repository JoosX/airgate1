import { Luggage, Check, Scale, Ruler } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "./ui/card";

interface BaggageOption {
    id: string;
    name: string;
    weight: string;
    weightKg: number;
    dimensions: string;
    description: string;
    price: number;
    features: string[];
    icon: string;
}

interface BaggageSelectorProps {
    selectedBaggage: string;
    onSelectBaggage: (baggageId: string) => void;
}

const baggageOptions: BaggageOption[] = [
    {
        id: "small",
        name: "Equipaje de Mano",
        weight: "Hasta 8kg",
        weightKg: 8,
        dimensions: "55 x 40 x 20 cm",
        description: "Bolso o mochila pequeña que cabe debajo del asiento",
        price: 0,
        icon: "backpack",
        features: [
            "Incluido en el precio",
            "Acceso durante el vuelo",
            "Ideal para viajes cortos"
        ]
    },
    {
        id: "medium",
        name: "Equipaje de Bodega (23kg)",
        weight: "Hasta 23kg",
        weightKg: 23,
        dimensions: "75 x 50 x 30 cm",
        description: "Maleta estándar para viajes de una semana",
        price: 30,
        icon: "suitcase",
        features: [
            "Perfecto para viajes medianos",
            "Espacio suficiente para ropa",
            "Peso generoso"
        ]
    },
    {
        id: "large",
        name: "Equipaje de Bodega (32kg)",
        weight: "Hasta 32kg",
        weightKg: 32,
        dimensions: "85 x 60 x 35 cm",
        description: "Maleta grande para viajes extensos o múltiples personas",
        price: 60,
        icon: "luggage-large",
        features: [
            "Ideal para viajes largos",
            "Máxima capacidad",
            "Espacio para souvenirs"
        ]
    }
];

const maxWeight = 32; // Maximum weight for progress bar calculations

const BaggageSelector = ({ selectedBaggage, onSelectBaggage }: BaggageSelectorProps) => {
    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {baggageOptions.map((option) => {
                    const isSelected = selectedBaggage === option.id;
                    const weightPercentage = (option.weightKg / maxWeight) * 100;

                    return (
                        <Card
                            key={option.id}
                            className={cn(
                                "relative cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
                                "border-2",
                                isSelected
                                    ? "border-blue-500 bg-blue-50 shadow-lg ring-4 ring-blue-200"
                                    : "border-border hover:border-blue-300 bg-white"
                            )}
                            onClick={() => onSelectBaggage(option.id)}
                        >
                            {/* Selected Badge */}
                            {isSelected && (
                                <div className="absolute -top-3 -right-3 bg-blue-500 text-white rounded-full p-2 shadow-lg z-10">
                                    <Check className="w-5 h-5" />
                                </div>
                            )}

                            {/* Recommended Badge for Medium */}
                            {option.id === "medium" && !isSelected && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md z-10">
                                    RECOMENDADO
                                </div>
                            )}

                            <div className="p-6 space-y-4">
                                {/* Icon - Size varies by option */}
                                <div className={cn(
                                    "flex justify-center",
                                    isSelected ? "text-blue-600" : "text-slate-400"
                                )}>
                                    <Luggage
                                        className={cn(
                                            "transition-all duration-300",
                                            option.id === "small" && "w-12 h-12",
                                            option.id === "medium" && "w-16 h-16",
                                            option.id === "large" && "w-20 h-20"
                                        )}
                                    />
                                </div>

                                {/* Title */}
                                <div className="text-center">
                                    <h3 className={cn(
                                        "font-bold text-lg mb-1",
                                        isSelected ? "text-blue-700" : "text-foreground"
                                    )}>
                                        {option.name}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        {option.description}
                                    </p>
                                </div>

                                {/* Weight Indicator with Progress Bar */}
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-1 text-muted-foreground">
                                            <Scale className="w-4 h-4" />
                                            <span>Peso:</span>
                                        </div>
                                        <span className="font-bold text-foreground">{option.weight}</span>
                                    </div>
                                    {/* Weight Progress Bar */}
                                    <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                                        <div
                                            className={cn(
                                                "h-full rounded-full transition-all duration-500",
                                                isSelected ? "bg-blue-500" : "bg-gradient-to-r from-green-400 to-green-600"
                                            )}
                                            style={{ width: `${weightPercentage}%` }}
                                        />
                                    </div>
                                </div>

                                {/* Dimensions */}
                                <div className="flex items-center justify-between text-sm border-t border-border pt-3">
                                    <div className="flex items-center gap-1 text-muted-foreground">
                                        <Ruler className="w-4 h-4" />
                                        <span>Dimensiones:</span>
                                    </div>
                                    <span className="font-semibold text-xs">{option.dimensions}</span>
                                </div>

                                {/* Features */}
                                <div className="space-y-2 border-t border-border pt-3">
                                    {option.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                                            <Check className={cn(
                                                "w-4 h-4 mt-0.5 flex-shrink-0",
                                                isSelected ? "text-blue-500" : "text-green-500"
                                            )} />
                                            <span>{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Price */}
                                <div className="text-center pt-3 border-t border-border">
                                    {option.price === 0 ? (
                                        <div className="space-y-1">
                                            <div className="text-2xl font-bold text-green-600">
                                                Incluido
                                            </div>
                                            <div className="text-xs text-green-700 bg-green-50 inline-block px-2 py-1 rounded-full">
                                                Sin cargo adicional
                                            </div>
                                        </div>
                                    ) : (
                                        <div>
                                            <div className={cn(
                                                "text-2xl font-bold",
                                                isSelected ? "text-blue-600" : "text-primary"
                                            )}>
                                                +${option.price}
                                            </div>
                                            <div className="text-xs text-muted-foreground">
                                                por maleta
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>

            {/* Visual Size Comparison */}
            <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 border-2 border-blue-200 rounded-lg p-6">
                <h4 className="text-center font-bold text-blue-900 mb-4 flex items-center justify-center gap-2">
                    <Luggage className="w-5 h-5" />
                    Comparación Visual de Tamaños
                </h4>
                <div className="flex items-end justify-center gap-6">
                    {baggageOptions.map((option) => {
                        const isSelected = selectedBaggage === option.id;
                        const height = option.id === "small" ? 60 : option.id === "medium" ? 90 : 120;

                        return (
                            <div key={option.id} className="flex flex-col items-center gap-2">
                                <div
                                    className={cn(
                                        "rounded-lg border-4 transition-all duration-300 flex items-center justify-center",
                                        isSelected
                                            ? "border-blue-500 bg-blue-200"
                                            : "border-slate-300 bg-slate-100 hover:border-blue-300"
                                    )}
                                    style={{
                                        width: `${height * 0.6}px`,
                                        height: `${height}px`
                                    }}
                                >
                                    <Luggage className={cn(
                                        "transition-all",
                                        isSelected ? "text-blue-700" : "text-slate-400",
                                        option.id === "small" && "w-6 h-6",
                                        option.id === "medium" && "w-8 h-8",
                                        option.id === "large" && "w-10 h-10"
                                    )} />
                                </div>
                                <div className={cn(
                                    "text-xs font-semibold text-center",
                                    isSelected ? "text-blue-700" : "text-slate-600"
                                )}>
                                    {option.weightKg}kg
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Help Text */}
            <div className="bg-sky-50 border border-sky-200 rounded-lg p-4 text-sm text-sky-800">
                <div className="flex items-start gap-3">
                    <Luggage className="w-5 h-5 mt-0.5 flex-shrink-0 text-sky-600" />
                    <div>
                        <p className="font-semibold mb-1">Información importante sobre equipaje</p>
                        <p className="text-sky-700">
                            • El equipaje de mano debe caber en el compartimento superior o debajo del asiento delantero<br />
                            • El equipaje de bodega será facturado en el mostrador de la aerolínea<br />
                            • Puedes agregar equipaje adicional más tarde, pero con un costo mayor
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BaggageSelector;
