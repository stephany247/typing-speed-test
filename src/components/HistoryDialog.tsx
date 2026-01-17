import { useEffect, useState } from "react";
import { clearHistory, deleteHistoryItem, getStats } from "../utils/storage";

export default function HistoryDialog({ onClose }: { onClose: () => void }) {
  const [history, setHistory] = useState(() => getStats().history);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleDelete = (index: number) => {
    deleteHistoryItem(index);
    setHistory((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearAll = () => {
    clearHistory();
    setHistory([]);
  };

  function formatDate(timestamp: number) {
    const d = new Date(timestamp);

    const date = `${String(d.getDate()).padStart(2, "0")}/${String(
      d.getMonth() + 1
    ).padStart(2, "0")}/${String(d.getFullYear()).slice(-2)}`;

    const time = d.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    return `${date}  ${time}`;
  }

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex md:items-center md:justify-center">
      <div
        className="
    bg-neutral-900 p-6 pt-4
    w-full h-full
    md:h-auto md:max-h-[80vh]
    md:max-w-2xl
    md:rounded-xl
    flex flex-col
  "
      >
        <button onClick={onClose} className="cursor-pointer self-end pb-4">
          ✕
        </button>

        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-semibold">Result History</h2>
          <div className="flex gap-4 items-center">
            <button
              onClick={handleClearAll}
              className="text-sm text-red-400 hover:text-red-300 cursor-pointer border border-neutral-600 rounded-lg px-3 py-1"
            >
              Clear all
            </button>
          </div>
        </div>

        <div className="passage-scroll flex-1 overflow-y-auto border border-neutral-600 rounded-lg overflow-hidden">
          {history.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-3 text-neutral-200 p-6">
              <img
                src="/images/icon-history.svg"
                alt=""
                className="size-10 opacity-90"
              />
              <p className="text-sm">No results yet</p>
              <p className="text-xs text-neutral-400">
                Complete a test to see your history here.
              </p>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="text-neutral-0 bg-neutral-800 pl-2">
                <tr className="text-left">
                  <th>Date</th>
                  <th>Mode</th>
                  <th>Difficulty</th>
                  <th>WPM</th>
                  <th>Acc.</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {history.map((item, i) => (
                  <tr
                    key={i}
                    className="border-t border-neutral-600 text-neutral-200 capitalize pt-4 hover:bg-neutral-800"
                  >
                    <td>{formatDate(item.date)}</td>
                    <td>
                      {item.mode === "timed" ? `${item.duration}s` : "passages"}
                    </td>
                    <td>{item.difficulty}</td>
                    <td>{item.wpm}</td>
                    <td>{item.accuracy}%</td>
                    <td className="text-right">
                      <button
                        onClick={() => handleDelete(i)}
                        className="text-red-400 hover:text-red-300 cursor-pointer"
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
