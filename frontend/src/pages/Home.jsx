import { useEffect, useState } from "react";
import { getColleges } from "../services/api";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const [colleges, setColleges] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);
  const [savedIds, setSavedIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Initialize saved colleges from localStorage on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("saved")) || [];
    setSavedIds(saved.map(s => s.id));
  }, []);

  // Fetch colleges when search changes
  useEffect(() => {
    const fetchColleges = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await getColleges(search);
        // res.data should be an array, not wrapped
        setColleges(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("API ERROR:", err);
        setError("Failed to load colleges. Please try again.");
        setColleges([]);
      } finally {
        setLoading(false);
      }
    };

    // Debounce search to avoid excessive API calls
    const timer = setTimeout(fetchColleges, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const toggleCompare = (college) => {
    const isSelected = selected.some(c => c.id === college.id);
    
    if (isSelected) {
      setSelected(selected.filter(c => c.id !== college.id));
    } else if (selected.length < 2) {
      setSelected([...selected, college]);
    }
  };

  const saveCollege = (college) => {
    try {
      let saved = JSON.parse(localStorage.getItem("saved")) || [];
      
      // Check if already saved
      const exists = saved.find(s => s.id === college.id);
      if (exists) return; // Already saved, don't add duplicate

      saved.push(college);
      localStorage.setItem("saved", JSON.stringify(saved));
      
      // Update savedIds state
      setSavedIds(prev => [...prev, college.id]);
    } catch (err) {
      console.error("Error saving college:", err);
      setError("Failed to save college. Storage might be full.");
    }
  };

  const removeSavedCollege = (collegeId) => {
    try {
      let saved = JSON.parse(localStorage.getItem("saved")) || [];
      saved = saved.filter(s => s.id !== collegeId);
      localStorage.setItem("saved", JSON.stringify(saved));
      setSavedIds(prev => prev.filter(id => id !== collegeId));
    } catch (err) {
      console.error("Error removing college:", err);
    }
  };

  const handleCompare = () => {
    if (selected.length === 2) {
      navigate("/compare", { state: selected });
      setSelected([]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* HEADER + NAVBAR */}
      <div className="flex flex-col items-center mb-6">
        <h1 className="text-3xl font-bold mb-3">🎓 College Finder</h1>
        
        {/* NAVIGATION */}
        <div className="flex gap-6 bg-white shadow px-6 py-2 rounded-full">
          <Link to="/" className="text-black font-medium hover:text-blue-600">
            Home
          </Link>
          <Link to="/qna" className="text-gray-600 font-medium hover:text-blue-600">
            Q&A
          </Link>
          <Link to="/saved" className="text-gray-600 font-medium hover:text-blue-600">
            Saved ({savedIds.length})
          </Link>
        </div>
      </div>

      {/* SEARCH */}
      <div className="flex justify-center mb-6">
        <input
          className="border border-gray-300 p-3 rounded w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search college by name, location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* ERROR MESSAGE */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 text-center">
          {error}
        </div>
      )}

      {/* LOADING STATE */}
      {loading && (
        <div className="text-center text-gray-600 py-8">
          Loading colleges...
        </div>
      )}

      {/* NO RESULTS */}
      {!loading && colleges.length === 0 && search && (
        <div className="text-center text-gray-600 py-8">
          No colleges found for "{search}". Try a different search.
        </div>
      )}

      {/* CARDS GRID */}
      {!loading && colleges.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {colleges.map(c => (
            <div
              key={c.id}
              className="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition"
            >
              {/* Header with checkbox */}
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold flex-1">{c.name}</h3>
                <input
                  type="checkbox"
                  className="w-4 h-4 mt-1 cursor-pointer"
                  onChange={() => toggleCompare(c)}
                  checked={selected.some(s => s.id === c.id)}
                  title="Select for comparison"
                />
              </div>

              {/* College details */}
              <p className="text-gray-600 text-sm mb-2">{c.location}</p>
              <p className="font-medium text-gray-900 mb-1">₹{c.fees?.toLocaleString()}</p>
              <p className="text-yellow-500 mb-3">⭐ {c.rating?.toFixed(1)}</p>

              {/* View Details Link */}
              <Link
                to={`/college/${c.id}`}
                className="text-blue-500 hover:text-blue-700 text-sm mb-3 inline-block"
              >
                View Details →
              </Link>

              {/* Save/Remove Button */}
              <button
                onClick={() => 
                  savedIds.includes(c.id) 
                    ? removeSavedCollege(c.id) 
                    : saveCollege(c)
                }
                className={`block w-full py-2 rounded text-sm font-medium transition ${
                  savedIds.includes(c.id)
                    ? "bg-green-100 text-green-700 hover:bg-green-200"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {savedIds.includes(c.id) ? "✓ Saved" : "⭐ Save"}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* COMPARE BUTTON - Fixed sticky footer */}
      {colleges.length > 0 && (
        <div className="flex justify-center sticky bottom-6">
          <button
            disabled={selected.length < 2}
            onClick={handleCompare}
            className={`px-8 py-3 rounded text-white font-semibold transition ${
              selected.length < 2
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 shadow-lg"
            }`}
          >
            Compare Selected ({selected.length}/2)
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;