import { useLocation } from "react-router-dom";

function Compare() {
  const { state } = useLocation();
  const selected = state || [];

  if (selected.length !== 2) {
    return <h2 className="text-center mt-10">Select 2 colleges to compare</h2>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        📊 Compare Colleges
      </h1>

      <div className="overflow-x-auto flex justify-center">
        <table className="bg-white shadow-md rounded-xl overflow-hidden">
          <thead className="bg-black text-white">
            <tr>
              <th className="px-6 py-3">Feature</th>
              <th className="px-6 py-3">{selected[0].name}</th>
              <th className="px-6 py-3">{selected[1].name}</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-t">
              <td className="px-6 py-3 font-medium">Location</td>
              <td className="px-6 py-3">{selected[0].location}</td>
              <td className="px-6 py-3">{selected[1].location}</td>
            </tr>

            <tr className="border-t bg-gray-50">
              <td className="px-6 py-3 font-medium">Fees</td>
              <td className="px-6 py-3">₹{selected[0].fees}</td>
              <td className="px-6 py-3">₹{selected[1].fees}</td>
            </tr>

            <tr className="border-t">
              <td className="px-6 py-3 font-medium">Rating</td>
              <td className="px-6 py-3 text-yellow-500">
                ⭐ {selected[0].rating}
              </td>
              <td className="px-6 py-3 text-yellow-500">
                ⭐ {selected[1].rating}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Compare;