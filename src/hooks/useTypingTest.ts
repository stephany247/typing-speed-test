import { useEffect, useState } from "react"

type Config =
    | { mode: "timed"; duration: number }
    | { mode: "passage" }

export function useTypingTest(text: string, config: Config) {
    const [hasStarted, setHasStarted] = useState(false)
    const [typed, setTyped] = useState("")
    const [errors, setErrors] = useState<number[]>([])
    const [elapsedTime, setElapsedTime] = useState(0)
    const [timeLeft, setTimeLeft] = useState(
        config.mode === "timed" ? config.duration : 0
    )
    const [isTesting, setIsTesting] = useState(false);

    const startGame = () => {
        if (!hasStarted) setHasStarted(true)
    }

    const resetGame = () => {
        setHasStarted(false)
        setIsTesting(false);
        setElapsedTime(0)
        setTyped("")
        setErrors([])
        if (config.mode === "timed") {
            setTimeLeft(config.duration)
        } else {
            setTimeLeft(0)
        }
    }

    // typing logic F
    useEffect(() => {
        if (!hasStarted) return

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === " " || e.key === "Backspace") {
                e.preventDefault()
            }

            if (e.key.length !== 1 && e.key !== "Backspace") return

            if (!isTesting) {
                setIsTesting(true);
            }

            if (e.key === "Backspace") {
                setTyped(prev => prev.slice(0, -1))
                return
            }

            setTyped(prev => prev + e.key)
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [hasStarted, isTesting])

    // error calculation logic
    useEffect(() => {
        const newErrors: number[] = []

        for (let i = 0; i < typed.length; i++) {
            if (typed[i] !== text[i]) {
                newErrors.push(i)
            }
        }

        setErrors(newErrors)
    }, [typed, text])

    // timer logic
    useEffect(() => {
        if (!isTesting) return

        const id = setInterval(() => {
            if (config.mode === "timed") {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        clearInterval(id)
                        setHasStarted(false)
                        setIsTesting(false)
                        return 0
                    }
                    return prev - 1
                })
                setElapsedTime(prev => prev + 1)
            } else {
                setElapsedTime(prev => prev + 1)
            }
        }, 1000)

        return () => clearInterval(id)
    }, [isTesting, config])

    // sync when mode changes
    useEffect(() => {
        setTimeLeft(config.mode === "timed" ? config.duration : 0)
    }, [config])


    return {
        hasStarted,
        timeLeft,
        typed,
        errors,
        startGame,
        resetGame,
        elapsedTime,
        isTesting,
    }
}
