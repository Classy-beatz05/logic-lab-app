import { cn } from "@/lib/utils";

type GateType = "AND" | "OR" | "NOT" | "NAND" | "NOR" | "XOR";

interface GateDiagramProps {
    gate: GateType;
    inputA: boolean;
    inputB: boolean;
    output: boolean;
    className?: string;
}

const gateColors: Record<GateType, string> = {
    AND: "stroke-[hsl(var(--gate-and))]",
    OR: "stroke-[hsl(var(--gate-or))]",
    NOT: "stroke-[hsl(var(--gate-not))]",
    NAND: "stroke-[hsl(var(--gate-nand))]",
    NOR: "stroke-[hsl(var(--gate-nor))]",
    XOR: "stroke-[hsl(var(--gate-xor))]",
};

const GateDiagram = ({ gate, inputA, inputB, output, className }: GateDiagramProps) => {
    const gateColor = gateColors[gate];
    const activeInput = "fill-primary";
    const inactiveInput = "fill-muted-foreground";
    const activeOutput = "fill-accent";
    const inactiveOutput = "fill-muted-foreground";

    const renderGateShape = () => {
        switch (gate) {
            case "AND":
                return (
                    <path
                        d="M60 30 L60 70 L90 70 Q120 70 120 50 Q120 30 90 30 Z"
                        fill="none"
                        strokeWidth="3"
                        className={gateColor}
                    />
                );
            case "OR":
                return (
                    <path
                        d="M60 30 Q75 50 60 70 Q90 70 120 50 Q90 30 60 30"
                        fill="none"
                        strokeWidth="3"
                        className={gateColor}
                    />
                );
            case "NOT":
                return (
                    <>
                        <polygon
                            points="60,30 60,70 110,50"
                            fill="none"
                            strokeWidth="3"
                            className={gateColor}
                        />
                        <circle
                            cx="116"
                            cy="50"
                            r="6"
                            fill="none"
                            strokeWidth="3"
                            className={gateColor}
                        />
                    </>
                );
            case "NAND":
                return (
                    <>
                        <path
                            d="M60 30 L60 70 L90 70 Q120 70 120 50 Q120 30 90 30 Z"
                            fill="none"
                            strokeWidth="3"
                            className={gateColor}
                        />
                        <circle
                            cx="126"
                            cy="50"
                            r="6"
                            fill="none"
                            strokeWidth="3"
                            className={gateColor}
                        />
                    </>
                );
            case "NOR":
                return (
                    <>
                        <path
                            d="M60 30 Q75 50 60 70 Q90 70 120 50 Q90 30 60 30"
                            fill="none"
                            strokeWidth="3"
                            className={gateColor}
                        />
                        <circle
                            cx="126"
                            cy="50"
                            r="6"
                            fill="none"
                            strokeWidth="3"
                            className={gateColor}
                        />
                    </>
                );
            case "XOR":
                return (
                    <>
                        <path
                            d="M55 30 Q70 50 55 70"
                            fill="none"
                            strokeWidth="3"
                            className={gateColor}
                        />
                        <path
                            d="M60 30 Q75 50 60 70 Q90 70 120 50 Q90 30 60 30"
                            fill="none"
                            strokeWidth="3"
                            className={gateColor}
                        />
                    </>
                );
        }
    };

    const isNotGate = gate === "NOT";

    return (
        <div className={cn("flex items-center justify-center", className)}>
            <svg viewBox="0 0 180 100" className="h-32 w-full max-w-xs">
                {/* Input Lines */}
                <line
                    x1="10"
                    y1={isNotGate ? "50" : "40"}
                    x2="60"
                    y2={isNotGate ? "50" : "40"}
                    strokeWidth="2"
                    className={inputA ? "stroke-primary" : "stroke-muted-foreground"}
                />
                {!isNotGate && (
                    <line
                        x1="10"
                        y1="60"
                        x2="60"
                        y2="60"
                        strokeWidth="2"
                        className={inputB ? "stroke-primary" : "stroke-muted-foreground"}
                    />
                )}

                {/* Input Dots */}
                <circle
                    cx="10"
                    cy={isNotGate ? "50" : "40"}
                    r="5"
                    className={inputA ? activeInput : inactiveInput}
                />
                {!isNotGate && (
                    <circle
                        cx="10"
                        cy="60"
                        r="5"
                        className={inputB ? activeInput : inactiveInput}
                    />
                )}

                {/* Input Labels */}
                <text
                    x="10"
                    y={isNotGate ? "35" : "28"}
                    textAnchor="middle"
                    className="fill-foreground text-xs font-medium"
                >
                    A
                </text>
                {!isNotGate && (
                    <text
                        x="10"
                        y="78"
                        textAnchor="middle"
                        className="fill-foreground text-xs font-medium"
                    >
                        B
                    </text>
                )}

                {/* Gate Shape */}
                {renderGateShape()}

                {/* Output Line */}
                <line
                    x1={gate === "NOT" || gate === "NAND" || gate === "NOR" ? "122" : "120"}
                    y1="50"
                    x2="160"
                    y2="50"
                    strokeWidth="2"
                    className={output ? "stroke-accent" : "stroke-muted-foreground"}
                />

                {/* Output Dot */}
                <circle
                    cx="165"
                    cy="50"
                    r="6"
                    className={output ? activeOutput : inactiveOutput}
                />

                {/* Output Label */}
                <text
                    x="165"
                    y="35"
                    textAnchor="middle"
                    className="fill-foreground text-xs font-medium"
                >
                    Out
                </text>
            </svg>
        </div>
    );
};

export default GateDiagram;
