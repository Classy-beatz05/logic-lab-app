import { useState, useCallback, useMemo } from "react";

export type GateType = "AND" | "OR" | "NOT" | "NAND" | "NOR" | "XOR";

export const useLogicGate = () => {
    const [inputA, setInputA] = useState(false);
    const [inputB, setInputB] = useState(false);
    const [selectedGate, setSelectedGate] = useState<GateType>("AND");

    const calculateOutput = useCallback((gate: GateType, a: boolean, b: boolean): boolean => {
        switch (gate) {
            case "AND":
                return a && b;
            case "OR":
                return a || b;
            case "NOT":
                return !a;
            case "NAND":
                return !(a && b);
            case "NOR":
                return !(a || b);
            case "XOR":
                return a !== b;
            default:
                return false;
        }
    }, []);

    const output = useMemo(
        () => calculateOutput(selectedGate, inputA, inputB),
        [selectedGate, inputA, inputB, calculateOutput]
    );

    const toggleInputA = useCallback(() => setInputA((prev) => !prev), []);
    const toggleInputB = useCallback(() => setInputB((prev) => !prev), []);

    const generateTruthTable = useCallback((gate: GateType) => {
        const isNotGate = gate === "NOT";

        if (isNotGate) {
            return [
                { a: false, b: false, output: calculateOutput(gate, false, false) },
                { a: true, b: false, output: calculateOutput(gate, true, false) },
            ];
        }

        return [
            { a: false, b: false, output: calculateOutput(gate, false, false) },
            { a: false, b: true, output: calculateOutput(gate, false, true) },
            { a: true, b: false, output: calculateOutput(gate, true, false) },
            { a: true, b: true, output: calculateOutput(gate, true, true) },
        ];
    }, [calculateOutput]);

    return {
        inputA,
        inputB,
        selectedGate,
        output,
        setInputA,
        setInputB,
        setSelectedGate,
        toggleInputA,
        toggleInputB,
        calculateOutput,
        generateTruthTable,
    };
};
