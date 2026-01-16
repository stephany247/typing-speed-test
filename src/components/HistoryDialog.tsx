import { getStats } from "../utils/storage";

export default function HistoryDialog({ onClose }: { onClose: () => void }) {
  const { history } = getStats();

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-neutral-900 rounded-xl p-6 w-full max-w-2xl">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-semibold">Result History</h2>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="border border-neutral-600 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="text-neutral-0 bg-neutral-800 pl-2">
              <tr className="text-left">
                <th>Date</th>
                <th>Mode</th>
                <th>Difficulty</th>
                <th>WPM</th>
                <th>Acc.</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item, i) => (
                <tr
                  key={i}
                  className="border-t border-neutral-600 text-neutral-200 capitalize pt-4 hover:bg-neutral-800"
                >
                  <td>{new Date(item.date).toLocaleDateString()}</td>
                  <td>
                    {item.mode === "timed" ? `${item.duration}s` : "passages"}
                  </td>
                  <td>{item.difficulty}</td>
                  <td>{item.wpm}</td>
                  <td>{item.accuracy}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
