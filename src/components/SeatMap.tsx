import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Armchair, DoorOpen, Crown, Plane } from "lucide-react";

interface SeatMapProps {
    selectedSeat: string;
    onSelectSeat: (seat: string, price: number) => void;
    occupiedSeats?: string[];
}

const SeatMap = ({ selectedSeat, onSelectSeat, occupiedSeats = [] }: SeatMapProps) => {
    const rows = 30;
    const columns = ["A", "B", "C", "D", "E", "F"];
    const emergencyRows = [10, 20];
    const businessClassRows = [1, 2, 3, 4]; // First 4 rows
    const premiumEconomyRows = [11, 12, 13, 14, 15]; // Rows after first emergency exit
    const wingRows = [16, 17, 18, 19, 20, 21]; // Rows near wings

    const getSeatClass = (row: number): "business" | "premium" | "economy" => {
        if (businessClassRows.includes(row)) return "business";
        if (premiumEconomyRows.includes(row)) return "premium";
        return "economy";
    };

    const getSeatType = (row: number, col: string): "window" | "aisle" | "middle" | "emergency" => {
        if (emergencyRows.includes(row)) return "emergency";
        if (col === "A" || col === "F") return "window";
        if (col === "C" || col === "D") return "aisle";
        return "middle";
    };

    const getSeatPrice = (row: number, col: string): number => {
        const seatClass = getSeatClass(row);
        const seatType = getSeatType(row, col);

        // Base prices by class
        let basePrice = 0;
        if (seatClass === "business") basePrice = 50;
        else if (seatClass === "premium") basePrice = 20;

        // Additional charges by type
        if (seatType === "emergency") return basePrice + 25;
        if (seatType === "window") return basePrice + 15;
        if (seatType === "aisle") return basePrice + 10;
        return basePrice;
    };

    const getSeatStatus = (seatId: string) => {
        if (occupiedSeats.includes(seatId)) return "occupied";
        if (selectedSeat === seatId) return "selected";
        return "available";
    };

    const getSeatLabel = (seatClass: string, seatType: string): string => {
        const classLabel = seatClass === "business" ? "Ejecutiva" : seatClass === "premium" ? "Premium" : "Económica";
        const typeLabel = seatType === "emergency" ? "Salida Emerg." : seatType === "window" ? "Ventana" : seatType === "aisle" ? "Pasillo" : "Centro";
        return `${classLabel} - ${typeLabel}`;
    };

    const isNearWing = (row: number) => wingRows.includes(row);

    return (
        <div className="w-full max-w-4xl mx-auto">
            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-3 mb-6 text-xs">
                <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-border shadow-sm">
                    <div className="w-6 h-6 rounded bg-emerald-100 border-2 border-emerald-400" />
                    <span className="font-medium">Disponible</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-border shadow-sm">
                    <div className="w-6 h-6 rounded bg-blue-500 border-2 border-blue-700" />
                    <span className="font-medium">Seleccionado</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-border shadow-sm">
                    <div className="w-6 h-6 rounded bg-slate-300 border-2 border-slate-400 opacity-60" />
                    <span className="font-medium">Ocupado</span>
                </div>
                <div className="flex items-center gap-2 bg-amber-50 px-3 py-2 rounded-lg border border-amber-300 shadow-sm">
                    <Crown className="w-5 h-5 text-amber-600" />
                    <span className="font-medium">Ejecutiva</span>
                </div>
            </div>

            {/* Airplane Container */}
            <div className="bg-gradient-to-b from-slate-100 via-white to-slate-100 rounded-3xl border-4 border-slate-300 shadow-2xl overflow-hidden">
                {/* Cockpit */}
                <div className="relative bg-gradient-to-b from-slate-700 to-slate-500 py-6">
                    <div className="w-24 h-24 mx-auto border-t-8 border-l-8 border-r-8 border-slate-800 rounded-t-full bg-gradient-to-b from-slate-300 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-slate-800/80 text-white px-4 py-2 rounded-lg font-bold text-sm backdrop-blur-sm">
                            <Plane className="w-5 h-5 inline mr-2" />
                            COCKPIT
                        </div>
                    </div>
                </div>

                <div className="px-4 md:px-8 py-6">
                    {/* Column Headers */}
                    <div className="flex justify-between mb-4 px-8 md:px-12 font-bold text-slate-700 text-sm">
                        <div className="flex gap-3 md:gap-4">
                            {["A", "B", "C"].map((col) => (
                                <div key={col} className="w-8 md:w-10 text-center">{col}</div>
                            ))}
                        </div>
                        <div className="flex gap-3 md:gap-4">
                            {["D", "E", "F"].map((col) => (
                                <div key={col} className="w-8 md:w-10 text-center">{col}</div>
                            ))}
                        </div>
                    </div>

                    {/* Seats Grid */}
                    <div className="space-y-2 bg-white/80 backdrop-blur-sm rounded-xl p-3 md:p-4 border-2 border-slate-200 max-h-[600px] overflow-y-auto">
                        {Array.from({ length: rows }, (_, i) => i + 1).map((row) => {
                            const isEmergencyRow = emergencyRows.includes(row);
                            const seatClass = getSeatClass(row);
                            const isWingRow = isNearWing(row);
                            const isFirstBusiness = row === 1;
                            const isFirstPremium = row === 11;
                            const isFirstEconomy = row === 16;

                            return (
                                <div key={row} className="relative">
                                    {/* Class Section Headers */}
                                    {isFirstBusiness && (
                                        <div className="mb-3 -mx-3 px-3 py-3 bg-gradient-to-r from-amber-100 via-amber-50 to-amber-100 border-y-2 border-amber-300">
                                            <div className="flex items-center justify-center gap-2 text-amber-800 font-bold">
                                                <Crown className="w-5 h-5" />
                                                <span>CLASE EJECUTIVA</span>
                                                <Crown className="w-5 h-5" />
                                            </div>
                                        </div>
                                    )}
                                    {isFirstPremium && (
                                        <div className="mb-3 mt-4 -mx-3 px-3 py-3 bg-gradient-to-r from-indigo-100 via-indigo-50 to-indigo-100 border-y-2 border-indigo-300">
                                            <div className="flex items-center justify-center gap-2 text-indigo-800 font-bold text-sm">
                                                <span>ECONOMÍA PREMIUM</span>
                                            </div>
                                        </div>
                                    )}
                                    {isFirstEconomy && (
                                        <div className="mb-3 mt-4 -mx-3 px-3 py-3 bg-gradient-to-r from-slate-100 via-slate-50 to-slate-100 border-y-2 border-slate-300">
                                            <div className="flex items-center justify-center gap-2 text-slate-700 font-bold text-sm">
                                                <span>CLASE ECONÓMICA</span>
                                            </div>
                                        </div>
                                    )}

                                    {/* Emergency Exit Row Label */}
                                    {isEmergencyRow && (
                                        <div className="mb-2 flex items-center justify-center gap-2 text-orange-600 text-xs font-semibold">
                                            <DoorOpen className="w-4 h-4" />
                                            <span>SALIDA DE EMERGENCIA</span>
                                            <DoorOpen className="w-4 h-4" />
                                        </div>
                                    )}

                                    {/* Wing Indicator */}
                                    {isWingRow && row === wingRows[0] && (
                                        <div className="absolute -left-6 top-0 bottom-0 flex items-center">
                                            <div className="bg-slate-400 text-white text-[10px] font-bold px-1 py-6 rounded-l writing-mode-vertical transform -rotate-180">
                                                ALA
                                            </div>
                                        </div>
                                    )}
                                    {isWingRow && row === wingRows[0] && (
                                        <div className="absolute -right-6 top-0 bottom-0 flex items-center">
                                            <div className="bg-slate-400 text-white text-[10px] font-bold px-1 py-6 rounded-r writing-mode-vertical">
                                                ALA
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex justify-between items-center relative group">
                                        {/* Row Number (Left) */}
                                        <div className="absolute -left-8 md:-left-10 text-xs text-slate-600 font-bold w-6 md:w-8 text-right pt-2">
                                            {row}
                                        </div>

                                        {/* Left Side (A-C) */}
                                        <div className="flex gap-3 md:gap-4">
                                            {["A", "B", "C"].map((col) => {
                                                const seatId = `${row}${col}`;
                                                const status = getSeatStatus(seatId);
                                                const seatType = getSeatType(row, col);
                                                const price = getSeatPrice(row, col);
                                                const seatClassType = getSeatClass(row);

                                                return (
                                                    <div key={seatId} className="relative group/seat">
                                                        <motion.button
                                                            whileHover={{ scale: status !== "occupied" ? 1.1 : 1 }}
                                                            whileTap={{ scale: status !== "occupied" ? 0.95 : 1 }}
                                                            onClick={() => status !== "occupied" && onSelectSeat(seatId, price)}
                                                            disabled={status === "occupied"}
                                                            className={cn(
                                                                "w-8 h-11 md:w-10 md:h-12 rounded-t-xl border-2 transition-all duration-200 relative flex items-center justify-center",
                                                                status !== "occupied" && "hover:shadow-xl cursor-pointer",
                                                                // Business Class
                                                                status === "available" && seatClassType === "business" && "bg-gradient-to-b from-amber-100 to-amber-50 border-amber-400 hover:border-amber-500 text-amber-800",
                                                                // Premium Economy
                                                                status === "available" && seatClassType === "premium" && seatType === "emergency" && "bg-gradient-to-b from-orange-100 to-orange-50 border-orange-400 hover:border-orange-500 text-orange-800",
                                                                status === "available" && seatClassType === "premium" && seatType === "window" && "bg-gradient-to-b from-indigo-100 to-indigo-50 border-indigo-400 hover:border-indigo-500 text-indigo-800",
                                                                status === "available" && seatClassType === "premium" && seatType === "aisle" && "bg-gradient-to-b from-purple-100 to-purple-50 border-purple-400 hover:border-purple-500 text-purple-800",
                                                                status === "available" && seatClassType === "premium" && seatType === "middle" && "bg-gradient-to-b from-indigo-50 to-indigo-25 border-indigo-300 hover:border-indigo-400 text-indigo-700",
                                                                // Economy Class
                                                                status === "available" && seatClassType === "economy" && seatType === "emergency" && "bg-gradient-to-b from-orange-100 to-orange-50 border-orange-400 hover:border-orange-500 text-orange-800",
                                                                status === "available" && seatClassType === "economy" && seatType === "window" && "bg-gradient-to-b from-sky-100 to-sky-50 border-sky-400 hover:border-sky-500 text-sky-800",
                                                                status === "available" && seatClassType === "economy" && seatType === "aisle" && "bg-gradient-to-b from-purple-100 to-purple-50 border-purple-400 hover:border-purple-500 text-purple-800",
                                                                status === "available" && seatClassType === "economy" && seatType === "middle" && "bg-gradient-to-b from-emerald-100 to-emerald-50 border-emerald-400 hover:border-emerald-500 text-emerald-800",
                                                                // Selected
                                                                status === "selected" && "bg-gradient-to-b from-blue-600 to-blue-500 border-blue-800 text-white shadow-2xl scale-110 z-10 ring-4 ring-blue-300",
                                                                // Occupied
                                                                status === "occupied" && "bg-slate-200 border-slate-300 cursor-not-allowed opacity-50 text-slate-400"
                                                            )}
                                                        >
                                                            {seatClassType === "business" && status !== "occupied" && status !== "selected" ? (
                                                                <Crown className="w-4 h-4" />
                                                            ) : (
                                                                <Armchair className="w-4 h-4" />
                                                            )}
                                                        </motion.button>

                                                        {/* Enhanced Tooltip */}
                                                        {status !== "occupied" && (
                                                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover/seat:opacity-100 transition-opacity pointer-events-none z-30">
                                                                <div className="bg-slate-900 text-white text-xs rounded-lg py-2 px-3 whitespace-nowrap shadow-2xl border border-slate-700">
                                                                    <div className="font-bold text-sm text-blue-300">{seatId}</div>
                                                                    <div className="text-slate-300 text-[10px]">{getSeatLabel(seatClassType, seatType)}</div>
                                                                    {price > 0 ? (
                                                                        <div className="text-green-400 font-semibold text-xs mt-1">+${price}</div>
                                                                    ) : (
                                                                        <div className="text-green-400 font-semibold text-xs mt-1">Incluido</div>
                                                                    )}
                                                                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900"></div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        {/* Aisle */}
                                        <div className="w-8 md:w-12 flex items-center justify-center">
                                            <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-400 to-transparent"></div>
                                        </div>

                                        {/* Right Side (D-F) */}
                                        <div className="flex gap-3 md:gap-4">
                                            {["D", "E", "F"].map((col) => {
                                                const seatId = `${row}${col}`;
                                                const status = getSeatStatus(seatId);
                                                const seatType = getSeatType(row, col);
                                                const price = getSeatPrice(row, col);
                                                const seatClassType = getSeatClass(row);

                                                return (
                                                    <div key={seatId} className="relative group/seat">
                                                        <motion.button
                                                            whileHover={{ scale: status !== "occupied" ? 1.1 : 1 }}
                                                            whileTap={{ scale: status !== "occupied" ? 0.95 : 1 }}
                                                            onClick={() => status !== "occupied" && onSelectSeat(seatId, price)}
                                                            disabled={status === "occupied"}
                                                            className={cn(
                                                                "w-8 h-11 md:w-10 md:h-12 rounded-t-xl border-2 transition-all duration-200 relative flex items-center justify-center",
                                                                status !== "occupied" && "hover:shadow-xl cursor-pointer",
                                                                // Business Class
                                                                status === "available" && seatClassType === "business" && "bg-gradient-to-b from-amber-100 to-amber-50 border-amber-400 hover:border-amber-500 text-amber-800",
                                                                // Premium Economy
                                                                status === "available" && seatClassType === "premium" && seatType === "emergency" && "bg-gradient-to-b from-orange-100 to-orange-50 border-orange-400 hover:border-orange-500 text-orange-800",
                                                                status === "available" && seatClassType === "premium" && seatType === "window" && "bg-gradient-to-b from-indigo-100 to-indigo-50 border-indigo-400 hover:border-indigo-500 text-indigo-800",
                                                                status === "available" && seatClassType === "premium" && seatType === "aisle" && "bg-gradient-to-b from-purple-100 to-purple-50 border-purple-400 hover:border-purple-500 text-purple-800",
                                                                status === "available" && seatClassType === "premium" && seatType === "middle" && "bg-gradient-to-b from-indigo-50 to-indigo-25 border-indigo-300 hover:border-indigo-400 text-indigo-700",
                                                                // Economy Class
                                                                status === "available" && seatClassType === "economy" && seatType === "emergency" && "bg-gradient-to-b from-orange-100 to-orange-50 border-orange-400 hover:border-orange-500 text-orange-800",
                                                                status === "available" && seatClassType === "economy" && seatType === "window" && "bg-gradient-to-b from-sky-100 to-sky-50 border-sky-400 hover:border-sky-500 text-sky-800",
                                                                status === "available" && seatClassType === "economy" && seatType === "aisle" && "bg-gradient-to-b from-purple-100 to-purple-50 border-purple-400 hover:border-purple-500 text-purple-800",
                                                                status === "available" && seatClassType === "economy" && seatType === "middle" && "bg-gradient-to-b from-emerald-100 to-emerald-50 border-emerald-400 hover:border-emerald-500 text-emerald-800",
                                                                // Selected
                                                                status === "selected" && "bg-gradient-to-b from-blue-600 to-blue-500 border-blue-800 text-white shadow-2xl scale-110 z-10 ring-4 ring-blue-300",
                                                                // Occupied
                                                                status === "occupied" && "bg-slate-200 border-slate-300 cursor-not-allowed opacity-50 text-slate-400"
                                                            )}
                                                        >
                                                            {seatClassType === "business" && status !== "occupied" && status !== "selected" ? (
                                                                <Crown className="w-4 h-4" />
                                                            ) : (
                                                                <Armchair className="w-4 h-4" />
                                                            )}
                                                        </motion.button>

                                                        {/* Enhanced Tooltip */}
                                                        {status !== "occupied" && (
                                                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover/seat:opacity-100 transition-opacity pointer-events-none z-30">
                                                                <div className="bg-slate-900 text-white text-xs rounded-lg py-2 px-3 whitespace-nowrap shadow-2xl border border-slate-700">
                                                                    <div className="font-bold text-sm text-blue-300">{seatId}</div>
                                                                    <div className="text-slate-300 text-[10px]">{getSeatLabel(seatClassType, seatType)}</div>
                                                                    {price > 0 ? (
                                                                        <div className="text-green-400 font-semibold text-xs mt-1">+${price}</div>
                                                                    ) : (
                                                                        <div className="text-green-400 font-semibold text-xs mt-1">Incluido</div>
                                                                    )}
                                                                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900"></div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        {/* Row Number (Right) */}
                                        <div className="absolute -right-8 md:-right-10 text-xs text-slate-600 font-bold w-6 md:w-8 text-left pt-2">
                                            {row}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Rear of Plane */}
                    <div className="mt-6 text-center">
                        <div className="inline-flex items-center gap-2 bg-slate-200 px-4 py-2 rounded-full text-sm font-semibold text-slate-700 border-2 border-slate-400">
                            <div className="w-2 h-2 bg-slate-600 rounded-full animate-pulse"></div>
                            PARTE TRASERA DEL AVIÓN
                        </div>
                    </div>

                    {/* Pricing Summary */}
                    <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                        <div className="bg-amber-50 border-2 border-amber-300 rounded-lg p-2 text-center">
                            <Crown className="w-4 h-4 mx-auto mb-1 text-amber-600" />
                            <div className="font-bold text-amber-800">Ejecutiva</div>
                            <div className="text-amber-700 font-semibold">Desde +$50</div>
                        </div>
                        <div className="bg-indigo-50 border-2 border-indigo-300 rounded-lg p-2 text-center">
                            <div className="font-bold text-indigo-800">Premium</div>
                            <div className="text-indigo-700 font-semibold">Desde +$20</div>
                        </div>
                        <div className="bg-emerald-50 border-2 border-emerald-300 rounded-lg p-2 text-center">
                            <div className="font-bold text-emerald-800">Económica Centro</div>
                            <div className="text-emerald-700 font-semibold">Incluido</div>
                        </div>
                        <div className="bg-orange-50 border-2 border-orange-300 rounded-lg p-2 text-center">
                            <DoorOpen className="w-4 h-4 mx-auto mb-1 text-orange-600" />
                            <div className="font-bold text-orange-800">Salida Emerg.</div>
                            <div className="text-orange-700 font-semibold">+$25</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SeatMap;
