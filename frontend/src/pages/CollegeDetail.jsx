import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCollegeById } from "../services/api";

function CollegeDetail() {
  const { id } = useParams();
  const [college, setCollege] = useState(null);

  useEffect(() => {
    getCollegeById(id)
      .then(res => setCollege(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!college) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Header */}
      <div className="bg-white shadow-md rounded-xl p-6 mb-6">
        <h1 className="text-3xl font-bold">{college.name}</h1>
        <p className="text-gray-600">{college.location}</p>
        <p className="mt-2 font-medium">Fees: ₹{college.fees}</p>
        <p className="text-yellow-500">⭐ {college.rating}</p>
      </div>

      {/* Courses Section */}
      <div className="bg-white shadow-md rounded-xl p-6 mb-6">
        <h2 className="text-xl font-semibold mb-3">Courses</h2>
        <ul className="list-disc ml-6">
          {college.courses.map((course, i) => (
            <li key={i}>{course}</li>
          ))}
        </ul>
      </div>

      {/* Placement Section (Mock) */}
      <div className="bg-white shadow-md rounded-xl p-6 mb-6">
        <h2 className="text-xl font-semibold mb-3">Placements</h2>
        <p>Average Placement: {college.placement || 80}%</p>
      </div>

      {/* Reviews Section (Mock) */}
      <div className="bg-white shadow-md rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-3">Reviews</h2>
        <p>⭐ {college.rating} - Students rate this college highly.</p>
      </div>

    </div>
  );
}

export default CollegeDetail;