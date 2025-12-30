import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AlertCircle, RotateCcw, Binary, Hash, Code } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Layout from "@/components/Layout";
import { useNumberConverter } from "@/hooks/useNumberConverter";

const NumberConverter = () => {
    const { values, convertFromBinary, convertFromDecimal, convertFromHexadecimal, clearAll } =
        useNumberConverter();

    return (
        <Layout>
            <div className="mx-auto max-w-2xl">
                <div className="mb-8 text-center">
                    <h1 className="mb-2 text-3xl font-bold text-foreground">Number System Converter</h1>
                    <p className="text-muted-foreground">
                        Convert between Binary, Decimal, and Hexadecimal instantly
                    </p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            <span>Enter a Number</span>
                            <Button variant="outline" size="sm" onClick={clearAll}>
                                <RotateCcw className="mr-2 h-4 w-4" />
                                Clear
                            </Button>
                        </CardTitle>
                        <CardDescription>
                            Type in any field and the other values will update automatically
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Error Alert */}
                        {values.error && (
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>{values.error}</AlertDescription>
                            </Alert>
                        )}

                        {/* Binary Input */}
                        <div className="space-y-2">
                            <Label htmlFor="binary" className="flex items-center gap-2 text-base font-medium">
                                <Binary className="h-4 w-4 text-[hsl(var(--gate-and))]" />
                                Binary (Base 2)
                            </Label>
                            <Input
                                id="binary"
                                type="text"
                                placeholder="Enter binary (e.g., 1010)"
                                value={values.binary}
                                onChange={(e) => convertFromBinary(e.target.value)}
                                className="h-12 font-mono text-lg"
                            />
                            <p className="text-xs text-muted-foreground">Only 0 and 1 allowed</p>
                        </div>

                        {/* Decimal Input */}
                        <div className="space-y-2">
                            <Label htmlFor="decimal" className="flex items-center gap-2 text-base font-medium">
                                <Hash className="h-4 w-4 text-[hsl(var(--gate-or))]" />
                                Decimal (Base 10)
                            </Label>
                            <Input
                                id="decimal"
                                type="text"
                                placeholder="Enter decimal (e.g., 10)"
                                value={values.decimal}
                                onChange={(e) => convertFromDecimal(e.target.value)}
                                className="h-12 font-mono text-lg"
                            />
                            <p className="text-xs text-muted-foreground">Only digits 0-9 allowed</p>
                        </div>

                        {/* Hexadecimal Input */}
                        <div className="space-y-2">
                            <Label htmlFor="hex" className="flex items-center gap-2 text-base font-medium">
                                <Code className="h-4 w-4 text-[hsl(var(--gate-not))]" />
                                Hexadecimal (Base 16)
                            </Label>
                            <Input
                                id="hex"
                                type="text"
                                placeholder="Enter hex (e.g., A)"
                                value={values.hexadecimal}
                                onChange={(e) => convertFromHexadecimal(e.target.value)}
                                className="h-12 font-mono text-lg uppercase"
                            />
                            <p className="text-xs text-muted-foreground">Only 0-9 and A-F allowed</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Reference */}
                <Card className="mt-6">
                    <CardHeader>
                        <CardTitle className="text-lg">Quick Reference</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-3 gap-4 text-center text-sm">
                            <div className="rounded-lg bg-secondary p-3">
                                <p className="font-semibold text-foreground">Binary</p>
                                <p className="font-mono text-muted-foreground">1010</p>
                            </div>
                            <div className="rounded-lg bg-secondary p-3">
                                <p className="font-semibold text-foreground">Decimal</p>
                                <p className="font-mono text-muted-foreground">10</p>
                            </div>
                            <div className="rounded-lg bg-secondary p-3">
                                <p className="font-semibold text-foreground">Hexadecimal</p>
                                <p className="font-mono text-muted-foreground">A</p>
                            </div>
                        </div>
                        <p className="mt-4 text-center text-xs text-muted-foreground">
                            All three values above represent the same number (ten)
                        </p>
                    </CardContent>
                </Card>

                {/* Conversion Tips */}
                <Card className="mt-6">
                    <CardHeader>
                        <CardTitle className="text-lg">Conversion Tips</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm text-muted-foreground">
                        <p>
                            <span className="font-medium text-foreground">Binary → Decimal:</span> Multiply each bit by 2^position (from right, starting at 0) and sum.
                        </p>
                        <p>
                            <span className="font-medium text-foreground">Decimal → Binary:</span> Repeatedly divide by 2 and collect remainders in reverse.
                        </p>
                        <p>
                            <span className="font-medium text-foreground">Hex → Binary:</span> Convert each hex digit to its 4-bit binary equivalent.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </Layout>
    );
};

export default NumberConverter;
