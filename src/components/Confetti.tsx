import ReactCanvasConfetti from "react-canvas-confetti";
import { useEffect, useRef } from "react";

type ConfettiProps = {
  fire: boolean;
};

export default function Confetti({ fire }: ConfettiProps) {
  const confettiRef = useRef<((opts: any) => void) | null>(null);

  useEffect(() => {
    if (!fire || !confettiRef.current) return;

    confettiRef.current({
      particleCount: 1200,
      angle: 90,
      spread: 270,
      startVelocity: 40,
      delay: 0.8,
      drift: 0.5,
      origin: { x: 0.5, y: 0.2 },
    });
  }, [fire]);

  return (
    <ReactCanvasConfetti
      onInit={({ confetti }) => {
        confettiRef.current = confetti;
      }}
      className="fixed inset-0 pointer-events-none w-full mx-auto"
    />
  );
}
