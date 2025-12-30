import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Layout from "@/components/Layout";
import GateDiagram from "@/components/gates/GateDiagram";
import { useLogicGate, GateType } from "@/hooks/useLogicGate";

const gates: { type: GateType; label: string; description: string }[] = [
    { type: "AND", label: "AND", description: "Output is 1 only when both inputs are 1" },
    { type: "OR", label: "OR", description: "Output is 1 when at least one input is 1" },
    { type: "NOT", label: "NOT", description: "Output is the inverse of input A" },
    { type: "NAND", label: "NAND", description: "Output is 0 only when both inputs are 1" },
    { type: "NOR", label: "NOR", description: "Output is 1 only when both inputs are 0" },
    { type: "XOR", label: "XOR", description: "Output is 1 when inputs are different" },
];

const gateColors: Record<GateType, string> = {
    AND: "bg-[hsl(var(--gate-and))] hover:bg-[hsl(var(--gate-and))]/80",
    OR: "bg-[hsl(var(--gate-or))] hover:bg-[hsl(var(--gate-or))]/80",
    NOT: "bg-[hsl(var(--gate-not))] hover:bg-[hsl(var(--gate-not))]/80",
    NAND: "bg-[hsl(var(--gate-nand))] hover:bg-[hsl(var(--gate-nand))]/80",
    NOR: "bg-[hsl(var(--gate-nor))] hover:bg-[hsl(var(--gate-nor))]/80",
    XOR: "bg-[hsl(var(--gate-xor))] hover:bg-[hsl(var(--gate-xor))]/80",
};

const LogicGateSimulator = () => {
    const { inputA, inputB, selectedGate, output, toggleInputA, toggleInputB, setSelectedGate } =
        useLogicGate();
    const [animateOutput, setAnimateOutput] = useState(false);

    const isNotGate = selectedGate === "NOT";
    const currentGateInfo = gates.find((g) => g.type === selectedGate);

    // Trigger animation when output changes
    useEffect(() => {
        setAnimateOutput(true);
        const timer = setTimeout(() => setAnimateOutput(false), 400);
        return () => clearTimeout(timer);
    }, [output]);

    return (
        <Layout>
            <div className="mx-auto max-w-4xl">
                <div className="mb-8 text-center">
                    <h1 className="mb-2 text-3xl font-bold text-foreground">Logic Gate Simulator</h1>
                    <p className="text-muted-foreground">
                        Select a gate and toggle inputs to see how logic gates work
                    </p>
                </div>

                {/* Gate Selection */}
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle className="text-lg">Select Logic Gate</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                            {gates.map((gate) => (
                                <Button
                                    key={gate.type}
                                    variant={selectedGate === gate.type ? "default" : "outline"}
                                    className={cn(
                                        "h-12 font-semibold transition-all",
                                        selectedGate === gate.type && gateColors[gate.type]
                                    )}
                                    onClick={() => setSelectedGate(gate.type)}
                                >
                                    {gate.label}
                                </Button>
                            ))}
                        </div>
                        {currentGateInfo && (
                            <p className="mt-4 text-center text-sm text-muted-foreground">
                                {currentGateInfo.description}
                            </p>
                        )}
                    </CardContent>
                </Card>

                {/* Gate Diagram */}
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle className="text-lg">{selectedGate} Gate Diagram</CardTitle>
                        <CardDescription>Visual representation of the gate with current inputs</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <GateDiagram
                            gate={selectedGate}
                            inputA={inputA}
                            inputB={inputB}
                            output={output}
                            className="py-4"
                        />
                    </CardContent>
                </Card>

                {/* Input Controls and Output */}
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Input Controls */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Inputs</CardTitle>
                            <CardDescription>Toggle the input values</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Input A */}
                            <div className="flex items-center justify-between rounded-lg bg-secondary p-4">
                                <span className="text-lg font-medium text-foreground">Input A</span>
                                <Button
                                    size="lg"
                                    variant={inputA ? "default" : "outline"}
                                    className={cn(
                                        "h-14 w-20 text-2xl font-bold transition-all",
                                        inputA && "bg-primary text-primary-foreground"
                                    )}
                                    onClick={toggleInputA}
                                >
                                    {inputA ? "1" : "0"}
                                </Button>
                            </div>

                            {/* Input B - Hidden for NOT gate */}
                            {!isNotGate && (
                                <div className="flex items-center justify-between rounded-lg bg-secondary p-4">
                                    <span className="text-lg font-medium text-foreground">Input B</span>
                                    <Button
                                        size="lg"
                                        variant={inputB ? "default" : "outline"}
                                        className={cn(
                                            "h-14 w-20 text-2xl font-bold transition-all",
                                            inputB && "bg-primary text-primary-foreground"
                                        )}
                                        onClick={toggleInputB}
                                    >
                                        {inputB ? "1" : "0"}
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Output Display */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Output</CardTitle>
                            <CardDescription>
                                {selectedGate}({isNotGate ? "A" : "A, B"}) = {output ? "1" : "0"}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex items-center justify-center py-8">
                            <div
                                className={cn(
                                    "flex h-32 w-32 items-center justify-center rounded-full text-5xl font-bold transition-all",
                                    output
                                        ? "bg-accent text-accent-foreground"
                                        : "bg-muted text-muted-foreground",
                                    animateOutput && "animate-output-pulse animate-glow"
                                )}
                            >
                                {output ? "1" : "0"}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Layout>
    );
};

export default LogicGateSimulator;
