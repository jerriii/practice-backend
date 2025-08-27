"use client"
import { useState, useEffect, useCallback } from "react";

export default function useFetch<T>(url: string, dependencies: Array<unknown> = []) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const json = await response.json();
            setData(json);
            setError(null);
        } catch (err) {
            setError(err as Error);
            setData(null);
        } finally {
            setLoading(false);
        }
    }, [url]); // Only include url in dependencies

    useEffect(() => {
        fetchData();
    }, [fetchData, ...dependencies]); // Include all dependencies that should trigger a re-fetch

    // Add manual refetch function
    const refetch = useCallback(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, refetch }; // Now includes refetch capability
}