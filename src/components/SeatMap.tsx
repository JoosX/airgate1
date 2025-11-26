import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SeatMapProps {
    selectedSeat: string;
    onSelectSeat: (seat: string) => void;
    occupiedSeats?: string[];
}

const SeatMap = ({ selectedSeat, onSelectSeat, occupiedSeats = [] }: SeatMapProps) => {
    const rows = 20;
    const columns = ["A", "B", "C", "D", "E", "F"];

    const getSeatStatus = (seatId: string) => {
        if (occupiedSeats.includes(seatId)) return "occupied";
        if (selectedSeat === seatId) return "selected";
        return "available";
    };

    return (
        <div className="w-full max-w-md mx-auto bg-white rounded-xl border border-border p-6 shadow-sm">
            <div className="flex justify-center gap-8 mb-6 text-sm">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-emerald-100 border border-emerald-300" />
                    <span>Disponible</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-blue-500 border border-blue-600" />
                    <span>Seleccionado</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-slate-200 border border-slate-300 opacity-50" />
                    <span>Ocupado</span>
                </div>
            </div>

            {/* Plane Nose Indicator */}
            <div className="w-full flex justify-center mb-8 opacity-20">
                <div className="w-16 h-16 border-t-4 border-l-4 border-r-4 border-slate-800 rounded-t-full" />
            </div>

            {/* Column Headers */}
            <div className="flex justify-between mb-4 px-8 font-bold text-slate-400">
                <div className="flex gap-3">
                    {["A", "B", "C"].map((col) => (
                        <div key={col} className="w-8 text-center">{col}</div>
                    ))}
                </div>
                <div className="flex gap-3">
                    {["D", "E", "F"].map((col) => (
                        <div key={col} className="w-8 text-center">{col}</div>
                    ))}
                </div>
            </div>

            {/* Seats Grid */}
            <div className="space-y-3 relative">
                {Array.from({ length: rows }, (_, i) => i + 1).map((row) => (
                    <div key={row} className="flex justify-between items-center relative group">
                        {/* Row Number (Left) */}
                        <div className="absolute -left-8 text-xs text-slate-400 font-mono w-6 text-right pt-2">
                            {row}
                        </div>

                        {/* Left Side (A-C) */}
                        <div className="flex gap-3">
                            {["A", "B", "C"].map((col) => {
                                const seatId = `${row}${col}`;
                                const status = getSeatStatus(seatId);

                                return (
                                    <button
                                        key={seatId}
                                        onClick={() => status !== "occupied" && onSelectSeat(seatId)}
                                        disabled={status === "occupied"}
                                        className={cn(
                                            "w-8 h-10 rounded-t-lg border-2 transition-all duration-200 relative",
                                            "hover:-translate-y-1 hover:shadow-md",
                                            status === "available" && "bg-emerald-50 border-emerald-200 hover:bg-emerald-100 hover:border-emerald-300 text-emerald-700",
                                            status === "selected" && "bg-blue-500 border-blue-600 text-white shadow-lg scale-110 z-10",
                                            status === "occupied" && "bg-slate-100 border-slate-200 cursor-not-allowed opacity-60 hover:translate-y-0 hover:shadow-none"
                                        )}
                                    >
                                        <span className="text-[10px] font-bold">{col}</span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Aisle */}
                        <div className="w-8 text-center text-xs text-slate-300 select-none">
                            {row}
                        </div>

                        {/* Right Side (D-F) */}
                        <div className="flex gap-3">
                            {["D", "E", "F"].map((col) => {
                                const seatId = `${row}${col}`;
                                const status = getSeatStatus(seatId);

                                return (
                                    <button
                                        key={seatId}
                                        onClick={() => status !== "occupied" && onSelectSeat(seatId)}
                                        disabled={status === "occupied"}
                                        className={cn(
                                            "w-8 h-10 rounded-t-lg border-2 transition-all duration-200 relative",
                                            "hover:-translate-y-1 hover:shadow-md",
                                            status === "available" && "bg-emerald-50 border-emerald-200 hover:bg-emerald-100 hover:border-emerald-300 text-emerald-700",
                                            status === "selected" && "bg-blue-500 border-blue-600 text-white shadow-lg scale-110 z-10",
                                            status === "occupied" && "bg-slate-100 border-slate-200 cursor-not-allowed opacity-60 hover:translate-y-0 hover:shadow-none"
                                        )}
                                    >
                                        <span className="text-[10px] font-bold">{col}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 text-center text-xs text-slate-400">
                Frente del avión
            </div>
        </div>
    );
};

export default SeatMap;
