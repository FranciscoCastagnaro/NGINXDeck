import { useState } from "react";

// Api Key CRUD tab
export default function ApiKeyManager() {
  const [apiKeys, setApiKeys] = useState([
    {id: 1, name: "Test KEY", key: "abc-123"},
    {id: 2, name: "Prod KEY", key: "xyz-789"}
  ]);
  const [newName, setNewName] = useState("");
  const [newKey, setNewKey] = useState("");

  const addKey = () => {
    if (newName && newKey) {
      setApiKeys([{ id: Date.now(), name: newName, key: newKey }, ...apiKeys]);
      setNewName("");
      setNewKey("");
    }
  };

  const deleteKey = (id) => {
    setApiKeys(apiKeys.filter((k) => k.id !== id));
  };

  return (
    <div className="bg-secondary p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">API Key Manager</h2>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          placeholder="Key Name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="px-4 py-2 rounded-lg bg-primary border border-muted text-textPrimary placeholder-textSecondary"
        />
        <input
          type="text"
          placeholder="API Key"
          value={newKey}
          onChange={(e) => setNewKey(e.target.value)}
          className="px-4 py-2 rounded-lg bg-primary border border-muted text-textPrimary placeholder-textSecondary"
        />
        <button
          onClick={addKey}
          className="bg-accent text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition"
        >
          Add API Key
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-muted rounded-lg overflow-hidden">
          <thead className="bg-primary border-b border-muted">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Key</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {apiKeys.map((k) => (
              <tr key={k.id} className="border-t border-muted hover:bg-muted">
                <td className="p-3">{k.name}</td>
                <td className="p-3 font-mono text-sm text-textSecondary">{k.key}</td>
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
                <td colSpan="3" className="p-3 text-center text-textSecondary">
                  No API keys available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
