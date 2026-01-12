import { useEffect, useState } from "react"

type Mode = "timed" | "passage"

export function useTypingTest(text: string, mode: Mode) {
    const [hasStarted, setHasStarted] = useState(false)
    const [timeLeft, setTimeLeft] = useState(60)
    const [typed, setTyped] = useState("")
    const [errors, setErrors] = useState<number[]>([])

    const startGame = () => {
        if (!hasStarted) setHasStarted(true)
    }

    const resetGame = () => {
        setHasStarted(false)
        setTimeLeft(60)
        setTyped("")
        setErrors([])
    }

    useEffect(() => {
        if (!hasStarted) return

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === " " || e.key === "Backspace") {
                e.preventDefault()
            }

            if (e.key.length !== 1 && e.key !== "Backspace") return

            if (!hasStarted) {
                setHasStarted(true)
            }

            if (e.key === "Backspace") {
                setTyped(prev => prev.slice(0, -1))
                return
            }

            setTyped(prev => prev + e.key)
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [hasStarted])

    useEffect(() => {
        const newErrors: number[] = []

        for (let i = 0; i < typed.length; i++) {
            if (typed[i] !== text[i]) {
                newErrors.push(i)
            }
        }

        setErrors(newErrors)
    }, [typed, text])

    return {
        hasStarted,
        timeLeft,
        typed,
        errors,
        startGame,
        resetGame,
    }
}
