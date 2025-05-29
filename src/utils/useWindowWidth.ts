import { useState, useEffect, useMemo } from "react";

export default function useWindowWidth(): number {
    const [windowWidth, setWindowWidth] = useState(0);

    const body = useMemo(() => document.querySelector("body"), []);

    useEffect(() => {
        if (body) {
            const observer = new ResizeObserver(() => {
                setWindowWidth(window.innerWidth);
            });

            observer.observe(body);

            // Cleanup function
            return () => {
                observer.disconnect();
            };
        }
    }, [body]);

    return windowWidth;
}
