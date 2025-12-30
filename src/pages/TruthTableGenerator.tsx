import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import Layout from "@/components/Layout";
import { useLogicGate, GateType } from "@/hooks/useLogicGate";

const gates: { type: GateType; label: string; expression: string }[] = [
    { type: "AND", label: "AND", expression: "Y = A · B" },
    { type: "OR", label: "OR", expression: "Y = A + B" },
    { type: "NOT", label: "NOT", expression: "Y = A'" },
    { type: "NAND", label: "NAND", expression: "Y = (A · B)'" },
    { type: "NOR", label: "NOR", expression: "Y = (A + B)'" },
    { type: "XOR", label: "XOR", expression: "Y = A ⊕ B" },
];

const gateColors: Record<GateType, string> = {
    AND: "bg-[hsl(var(--gate-and))] hover:bg-[hsl(var(--gate-and))]/80",
    OR: "bg-[hsl(var(--gate-or))] hover:bg-[hsl(var(--gate-or))]/80",
    NOT: "bg-[hsl(var(--gate-not))] hover:bg-[hsl(var(--gate-not))]/80",
    NAND: "bg-[hsl(var(--gate-nand))] hover:bg-[hsl(var(--gate-nand))]/80",
    NOR: "bg-[hsl(var(--gate-nor))] hover:bg-[hsl(var(--gate-nor))]/80",
    XOR: "bg-[hsl(var(--gate-xor))] hover:bg-[hsl(var(--gate-xor))]/80",
};

const TruthTableGenerator = () => {
    const { selectedGate, setSelectedGate, generateTruthTable } = useLogicGate();
    const truthTable = generateTruthTable(selectedGate);
    const isNotGate = selectedGate === "NOT";
    const currentGateInfo = gates.find((g) => g.type === selectedGate);

    return (
        <Layout>
            <div className="mx-auto max-w-4xl">
                <div className="mb-8 text-center">
                    <h1 className="mb-2 text-3xl font-bold text-foreground">Truth Table Generator</h1>
                    <p className="text-muted-foreground">
                        Select a logic gate to see its complete truth table
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
                    </CardContent>
                </Card>

                {/* Truth Table */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">{selectedGate} Gate Truth Table</CardTitle>
                        <CardDescription>
                            Boolean Expression: <code className="rounded bg-secondary px-2 py-1 font-mono text-foreground">{currentGateInfo?.expression}</code>
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-border hover:bg-transparent">
                                        <TableHead className="text-center font-bold text-foreground">A</TableHead>
                                        {!isNotGate && (
                                            <TableHead className="text-center font-bold text-foreground">B</TableHead>
                                        )}
                                        <TableHead className="text-center font-bold text-foreground">Output (Y)</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {truthTable.map((row, index) => (
                                        <TableRow
                                            key={index}
                                            className={cn(
                                                "border-border transition-colors",
                                                index % 2 === 0 ? "bg-secondary/30" : "bg-transparent"
                                            )}
                                        >
                                            <TableCell className="text-center">
                                                <span
                                                    className={cn(
                                                        "inline-flex h-8 w-8 items-center justify-center rounded-full font-mono font-bold",
                                                        row.a ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                                                    )}
                                                >
                                                    {row.a ? "1" : "0"}
                                                </span>
                                            </TableCell>
                                            {!isNotGate && (
                                                <TableCell className="text-center">
                                                    <span
                                                        className={cn(
                                                            "inline-flex h-8 w-8 items-center justify-center rounded-full font-mono font-bold",
                                                            row.b ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                                                        )}
                                                    >
                                                        {row.b ? "1" : "0"}
                                                    </span>
                                                </TableCell>
                                            )}
                                            <TableCell className="text-center">
                                                <span
                                                    className={cn(
                                                        "inline-flex h-8 w-8 items-center justify-center rounded-full font-mono font-bold",
                                                        row.output ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
                                                    )}
                                                >
                                                    {row.output ? "1" : "0"}
                                                </span>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>

                {/* Gate Info Cards */}
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {gates.map((gate) => (
                        <Card
                            key={gate.type}
                            className={cn(
                                "cursor-pointer transition-all hover:border-primary",
                                selectedGate === gate.type && "border-primary ring-1 ring-primary"
                            )}
                            onClick={() => setSelectedGate(gate.type)}
                        >
                            <CardContent className="py-4">
                                <div className="flex items-center justify-between">
                                    <span className="font-semibold text-foreground">{gate.label}</span>
                                    <code className="text-sm text-muted-foreground">{gate.expression}</code>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default TruthTableGenerator;
