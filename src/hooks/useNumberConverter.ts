import { useState, useCallback } from "react";

interface ConversionResult {
    binary: string;
    decimal: string;
    hexadecimal: string;
    error: string | null;
}

export const useNumberConverter = () => {
    const [values, setValues] = useState<ConversionResult>({
        binary: "",
        decimal: "",
        hexadecimal: "",
        error: null,
    });

    const validateBinary = (value: string): boolean => {
        return /^[01]*$/.test(value);
    };

    const validateDecimal = (value: string): boolean => {
        return /^\d*$/.test(value);
    };

    const validateHexadecimal = (value: string): boolean => {
        return /^[0-9A-Fa-f]*$/.test(value);
    };

    const convertFromBinary = useCallback((binary: string) => {
        if (!binary) {
            setValues({ binary: "", decimal: "", hexadecimal: "", error: null });
            return;
        }

        if (!validateBinary(binary)) {
            setValues((prev) => ({ ...prev, binary, error: "Binary must contain only 0 and 1" }));
            return;
        }

        const decimalValue = parseInt(binary, 2);
        if (isNaN(decimalValue)) {
            setValues((prev) => ({ ...prev, binary, error: "Invalid binary number" }));
            return;
        }

        setValues({
            binary,
            decimal: decimalValue.toString(),
            hexadecimal: decimalValue.toString(16).toUpperCase(),
            error: null,
        });
    }, []);

    const convertFromDecimal = useCallback((decimal: string) => {
        if (!decimal) {
            setValues({ binary: "", decimal: "", hexadecimal: "", error: null });
            return;
        }

        if (!validateDecimal(decimal)) {
            setValues((prev) => ({ ...prev, decimal, error: "Decimal must contain only digits 0-9" }));
            return;
        }

        const decimalValue = parseInt(decimal, 10);
        if (isNaN(decimalValue)) {
            setValues((prev) => ({ ...prev, decimal, error: "Invalid decimal number" }));
            return;
        }

        setValues({
            binary: decimalValue.toString(2),
            decimal,
            hexadecimal: decimalValue.toString(16).toUpperCase(),
            error: null,
        });
    }, []);

    const convertFromHexadecimal = useCallback((hexadecimal: string) => {
        if (!hexadecimal) {
            setValues({ binary: "", decimal: "", hexadecimal: "", error: null });
            return;
        }

        if (!validateHexadecimal(hexadecimal)) {
            setValues((prev) => ({
                ...prev,
                hexadecimal,
                error: "Hexadecimal must contain only 0-9 and A-F",
            }));
            return;
        }

        const decimalValue = parseInt(hexadecimal, 16);
        if (isNaN(decimalValue)) {
            setValues((prev) => ({ ...prev, hexadecimal, error: "Invalid hexadecimal number" }));
            return;
        }

        setValues({
            binary: decimalValue.toString(2),
            decimal: decimalValue.toString(),
            hexadecimal: hexadecimal.toUpperCase(),
            error: null,
        });
    }, []);

    const clearAll = useCallback(() => {
        setValues({ binary: "", decimal: "", hexadecimal: "", error: null });
    }, []);

    return {
        values,
        convertFromBinary,
        convertFromDecimal,
        convertFromHexadecimal,
        clearAll,
    };
};
