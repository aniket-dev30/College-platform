import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Saved() {
  const [saved, setSaved] = useState([]);
  const [selected, setSelected] = useState([]);

  // Load saved colleges from localStorage
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("saved")) || [];
    setSaved(data);
  }, []);

  // Remove a college from saved list
  const removeCollege = (collegeId) => {
    const updated = saved.filter(c => c.id !== collegeId);
    setSaved(updated);
    localStorage.setItem("saved", JSON.stringify(updated));
    
    // Also remove from selected if it was selected
    setSelected(selected.filter(c => c.id !== collegeId));
  };

  // Toggle selection for comparison
  const toggleCompare = (college) => {
    const isSelected = selected.some(c => c.id === college.id);
    
    if (isSelected) {
      setSelected(selected.filter(c => c.id !== college.id));
    } else if (selected.length < 2) {
      setSelected([...selected, college]);
    }
  };

  // Handle compare action
  const handleCompare = () => {
    if (selected.length === 2) {
      window.location.href = `/compare?colleges=${selected[0].id},${selected[1].id}`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HEADER + NAVBAR */}
      <div className="flex flex-col items-center mb-8 bg-white shadow-sm py-6">
        <h1 className="text-3xl font-bold mb-4">🎓 Saved Colleges</h1>
        
        {/* NAVIGATION */}
        <div className="flex gap-6 bg-gray-50 px-6 py-2 rounded-full border border-gray-200">
          <Link to="/" className="text-gray-600 font-medium hover:text-blue-600 transition">
            Home
          </Link>
          <Link to="/qna" className="text-gray-600 font-medium hover:text-blue-600 transition">
            Q&A
          </Link>
          <Link to="/saved" className="text-blue-600 font-medium border-b-2 border-blue-600">
            Saved ({saved.length})
          </Link>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="p-6 max-w-7xl mx-auto">
        
        {/* EMPTY STATE */}
        {saved.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📚</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No saved colleges yet</h2>
            <p className="text-gray-600 mb-6">
              Save colleges from the home page to compare and view them later.
            </p>
            <Link
              to="/"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Browse Colleges →
            </Link>
          </div>
        ) : (
          <>
            {/* SAVED COLLEGES GRID */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {saved.map(c => (
                <div
                  key={c.id}
                  className="bg-white shadow-md rounded-xl p-5 hover:shadow-lg transition border-l-4 border-blue-500"
                >
                  {/* Header with checkbox */}
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold flex-1 text-gray-900">{c.name}</h3>
                    <input
                      type="checkbox"
                      className="w-4 h-4 mt-1 cursor-pointer"
                      onChange={() => toggleCompare(c)}
                      checked={selected.some(s => s.id === c.id)}
                      title="Select for comparison"
                    />
                  </div>

                  {/* College details */}
                  <p className="text-gray-600 text-sm mb-2">📍 {c.location}</p>
                  <p className="font-semibold text-gray-900 mb-1">
                    ₹{c.fees?.toLocaleString() || "N/A"}
                  </p>
                  <p className="text-yellow-500 mb-4">
                    ⭐ {c.rating?.toFixed(1) || "N/A"}/5
                  </p>

                  {/* View Details Link */}
                  <Link
                    to={`/college/${c.id}`}
                    className="text-blue-500 hover:text-blue-700 text-sm font-medium block mb-3"
                  >
                    View Details →
                  </Link>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeCollege(c.id)}
                    className="w-full py-2 rounded text-sm font-medium bg-red-100 text-red-700 hover:bg-red-200 transition"
                  >
                    × Remove from Saved
                  </button>
                </div>
              ))}
            </div>

            {/* COMPARE SECTION */}
            {selected.length > 0 && (
              <div className="fixed bottom-6 left-0 right-0 flex justify-center">
                <div className="bg-white shadow-lg rounded-lg p-4 flex items-center gap-4 border-l-4 border-blue-600">
                  <span className="text-gray-700 font-medium">
                    Selected: {selected.length}/2 colleges
                  </span>
                  <button
                    disabled={selected.length < 2}
                    onClick={handleCompare}
                    className={`px-6 py-2 rounded font-semibold transition ${
                      selected.length < 2
                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    Compare ({selected.length})
                  </button>
                  <button
                    onClick={() => setSelected([])}
                    className="text-gray-600 hover:text-gray-900 text-lg"
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Saved;