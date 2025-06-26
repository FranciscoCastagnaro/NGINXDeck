import { useState } from "react";

export default function Home() {
  const [apiKeys, setApiKeys] = useState([
    { id: 1, name: "Production API", key: "xyz-1234" },
    { id: 2, name: "Test API", key: "abc-5678" },
  ]);

  const [newName, setNewName] = useState("");
  const [newKey, setNewKey] = useState("");

  const addKey = () => {
    if (newName && newKey) {
      const newEntry = {
        id: Date.now(),
        name: newName,
        key: newKey,
      };
      setApiKeys([newEntry, ...apiKeys]);
      setNewName("");
      setNewKey("");
    }
  };

  const deleteKey = (id) => {
    setApiKeys(apiKeys.filter((k) => k.id !== id));
  };

  return (
    <div className="min-h-screen bg-primary text-white px-4 py-10">
      <div className="max-w-5xl mx-auto bg-secondary p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-semibold mb-6">Your API Keys</h1>

        {/* Add Key Form */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Key Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg bg-primary border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <input
            type="text"
            placeholder="API Key"
            value={newKey}
            onChange={(e) => setNewKey(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg bg-primary border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <button
            onClick={addKey}
            className="bg-accent text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Add API Key
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-700 rounded-lg overflow-hidden">
            <thead className="bg-primary border-b border-gray-700">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Key</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {apiKeys.map((k) => (
                <tr key={k.id} className="border-t border-gray-700 hover:bg-gray-800">
                  <td className="p-3">{k.name}</td>
                  <td className="p-3 font-mono text-sm text-gray-300">{k.key}</td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => deleteKey(k.id)}
                      className="text-red-500 hover:text-red-700 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {apiKeys.length === 0 && (
                <tr>
                  <td colSpan="3" className="p-3 text-center text-gray-500">
                    No API keys available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
