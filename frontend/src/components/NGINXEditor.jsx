import { useState } from "react";
import { ClipboardCopy, Check, Download } from "lucide-react";

export default function NGINXEditor() {
  const [serverName, setServerName] = useState("");
  const [proxyPass, setProxyPass] = useState("");
  const [configPreview, setConfigPreview] = useState("");
  const [copied, setCopied] = useState(false);

  const generateConfig = () => {
    const conf = `
        server {
            listen 80;
            server_name ${serverName};

            location / {
                proxy_pass ${proxyPass};
            }
        }
    `.trim();
    setConfigPreview(conf);
    setCopied(false); // resetear al regenerar
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(configPreview);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  const exportToFile = () => {
    const blob = new Blob([configPreview], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${serverName || "nginx"}.conf`;
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-secondary p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">NGINX Visual Config Editor</h2>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm mb-1">Server Name</label>
          <input
            type="text"
            value={serverName}
            onChange={(e) => setServerName(e.target.value)}
            className="w-full px-4 py-2 rounded bg-primary border border-muted text-textPrimary placeholder-textSecondary"
            placeholder="example.com"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Proxy Pass URL</label>
          <input
            type="text"
            value={proxyPass}
            onChange={(e) => setProxyPass(e.target.value)}
            className="w-full px-4 py-2 rounded bg-primary border border-muted text-textPrimary placeholder-textSecondary"
            placeholder="http://localhost:3000"
          />
        </div>
      </div>

      <button
        onClick={generateConfig}
        className="bg-accent text-white px-4 py-2 rounded hover:bg-blue-800 transition"
      >
        Generate Config
      </button>

      {configPreview && (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm">Generated Config:</label>
            <div className="flex gap-2">
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 bg-muted text-textPrimary hover:bg-gray-700 px-3 py-1.5 rounded-md transition shadow-sm"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-textSecondary-400" />
                    Copied
                  </>
                ) : (
                  <>
                    <ClipboardCopy className="w-4 h-4 text-textSecondary-400" />
                    Copy
                  </>
                )}
              </button>
              <button
                onClick={exportToFile}
                className="flex items-center gap-2 bg-muted text-textPrimary hover:bg-gray-700 px-3 py-1.5 rounded-md transition shadow-sm"
              >
                <Download className="w-4 h-4 text-textSecondary-400" />
                Export
              </button>
            </div>
          </div>

          <pre className="bg-gray-900 text-sm font-mono p-4 rounded-lg overflow-auto whitespace-pre-wrap">
            {configPreview}
          </pre>
        </div>
      )}
    </div>
  );
}
