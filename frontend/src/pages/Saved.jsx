import { useEffect, useState } from "react";

function Saved() {
  const [saved, setSaved] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("saved")) || [];
    setSaved(data);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Saved Colleges</h1>

      {saved.length === 0 && <p>No saved colleges</p>}

      {saved.map(c => (
        <div key={c.id} className="border p-3 mb-2 rounded">
          <h3>{c.name}</h3>
          <p>{c.location}</p>
        </div>
      ))}
    </div>
  );
}

export default Saved;