import { useEffect, useState } from "react"

type Mode = "timed" | "passage"

export function useTypingTest(text: string, mode: Mode) {
    const [hasStarted, setHasStarted] = useState(false)
    const [timeLeft, setTimeLeft] = useState(60)
    const [typed, setTyped] = useState("")
    const [errors, setErrors] = useState<number[]>([])
    const [elapsedTime, setElapsedTime] = useState(0)

    const startGame = () => {
        if (!hasStarted) setHasStarted(true)
    }

    const resetGame = () => {
        setHasStarted(false)
        setTimeLeft(60)
        setElapsedTime(0)
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
                startGame()
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

    useEffect(() => {
        if (!hasStarted) return

        const id = setInterval(() => {
            setElapsedTime(prev => prev + 1)
        }, 1000)

        return () => clearInterval(id)
    }, [hasStarted])


    return {
        hasStarted,
        timeLeft,
        typed,
        errors,
        startGame,
        resetGame,
        elapsedTime,
    }
}
