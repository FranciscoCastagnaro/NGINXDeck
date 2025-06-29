import { useState } from "react";
import { ClipboardCopy, Check, Download } from "lucide-react";
import CodeMirror from "@uiw/react-codemirror";
import { dracula } from "@uiw/codemirror-theme-dracula";

export default function NGINXEditor() {
  const [serverName, setServerName] = useState("");
  const [proxyPass, setProxyPass] = useState("");
  const [useLoadBalancer, setUseLoadBalancer] = useState(false);
  const [loadBalancerName, setLoadBalancerName] = useState("backend");
  const [loadBalancerServers, setLoadBalancerServers] = useState([""]);
  const [configPreview, setConfigPreview] = useState("");
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState({});

  const validateInputs = () => {
    const newErrors = {};
    if (!serverName.trim()) newErrors.serverName = "Server name is required.";

    if (useLoadBalancer) {
      if (!loadBalancerName.trim()) newErrors.loadBalancerName = "Upstream name is required.";
      const emptyServers = loadBalancerServers.some((s) => !s.trim());
      if (emptyServers) newErrors.loadBalancerServers = "All backend servers must be filled.";
    } else {
      if (!proxyPass.trim()) newErrors.proxyPass = "Proxy pass URL is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateConfig = () => {
    if (!validateInputs()) return;

    let config = "http {\n";

    if (useLoadBalancer) {
      config += `  upstream ${loadBalancerName} {\n`;
      loadBalancerServers.forEach((server) => {
        if (server.trim()) config += `    server ${server};\n`;
      });
      config += `  }\n\n`;
    }

    config += `  server {\n    listen 80;\n    server_name ${serverName};\n\n    location / {\n`;
    config += useLoadBalancer
      ? `      proxy_pass http://${loadBalancerName};\n`
      : `      proxy_pass ${proxyPass};\n`;
    config += `    }\n  }\n}`;

    setConfigPreview(config);
    setCopied(false);
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
            className={`w-full px-4 py-2 rounded bg-primary border ${errors.serverName ? "border-red-500" : "border-muted"} text-textPrimary placeholder-textSecondary`}
            placeholder="example.com"
          />
          {errors.serverName && <p className="text-red-500 text-sm mt-1">{errors.serverName}</p>}
        </div>

        {!useLoadBalancer && (
          <div>
            <label className="block text-sm mb-1">Proxy Pass URL</label>
            <input
              type="text"
              value={proxyPass}
              onChange={(e) => setProxyPass(e.target.value)}
              className={`w-full px-4 py-2 rounded bg-primary border ${errors.proxyPass ? "border-red-500" : "border-muted"} text-textPrimary placeholder-textSecondary`}
              placeholder="http://localhost:3000"
            />
            {errors.proxyPass && <p className="text-red-500 text-sm mt-1">{errors.proxyPass}</p>}
          </div>
        )}
      </div>

      <div className="mb-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={useLoadBalancer}
            onChange={() => setUseLoadBalancer(!useLoadBalancer)}
            className="mr-2"
          />
          Enable Load Balancer
        </label>
      </div>

      {useLoadBalancer && (
        <div className="mb-6">
          <div className="mb-2">
            <label className="block text-sm mb-1">Upstream Name</label>
            <input
              type="text"
              value={loadBalancerName}
              onChange={(e) => setLoadBalancerName(e.target.value)}
              className={`w-full px-4 py-2 rounded bg-primary border ${errors.loadBalancerName ? "border-red-500" : "border-muted"} text-textPrimary placeholder-textSecondary`}
            />
            {errors.loadBalancerName && <p className="text-red-500 text-sm mt-1">{errors.loadBalancerName}</p>}
          </div>

          <div className="mb-2">
            <label className="block text-sm mb-1">Backend Servers</label>
            {loadBalancerServers.map((server, index) => (
              <input
                key={index}
                type="text"
                value={server}
                onChange={(e) => {
                  const updated = [...loadBalancerServers];
                  updated[index] = e.target.value;
                  setLoadBalancerServers(updated);
                }}
                className={`w-full px-4 py-2 rounded bg-primary border ${errors.loadBalancerServers ? "border-red-500" : "border-muted"} text-textPrimary placeholder-textSecondary mb-2`}
                placeholder="192.168.1.10"
              />
            ))}
            <button
              onClick={() => setLoadBalancerServers([...loadBalancerServers, ""])}
              className="mt-1 text-sm text-accent hover:underline"
            >
              + Add Server
            </button>
            {errors.loadBalancerServers && <p className="text-red-500 text-sm mt-1">{errors.loadBalancerServers}</p>}
          </div>
        </div>
      )}

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

          <CodeMirror
            value={configPreview}
            theme={dracula}
            height="300px"
            extensions={[]}
            onChange={(value) => setConfigPreview(value)}
          />
        </div>
      )}
    </div>
  );
}
