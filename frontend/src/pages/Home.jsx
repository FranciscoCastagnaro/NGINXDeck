import { useState, useRef, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import ApiKeyManager from "@/components/ApiKeyManager";
import NGINXEditor from "@/components/NGINXEditor";

const tabs = [
  { id: "nginx", label: "NGINX Editor" },
  { id: "api", label: "API Keys" },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("nginx");
  const [tabRects, setTabRects] = useState({});
  const tabRefs = useRef({});
  const tabContainerRef = useRef();

  useEffect(() => {
    const newRects = {};
    for (const tab of tabs) {
      const el = tabRefs.current[tab.id];
      if (el) {
        newRects[tab.id] = el.getBoundingClientRect();
      }
    }
    setTabRects(newRects);
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-primary text-textPrimary p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-accent tracking-tight">
            NGINXDeck
          </h1>
          <p className="text-sm text-textSecondary">
            Your visual NGINX configuration option
          </p>
        </div>

        <div
          ref={tabContainerRef}
          className="relative flex gap-6 border-b border-muted mb-6"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              ref={(el) => (tabRefs.current[tab.id] = el)}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-2 relative text-sm transition-colors duration-300 ${
                activeTab === tab.id ? "text-accent" : "text-textSecondary"
              }`}
            >
              {tab.label}
            </button>
          ))}

          {tabRects[activeTab] && (
            <motion.div
              layoutId="tab-underline"
              className="absolute bottom-0 h-[2px] bg-accent rounded"
              initial={false}
              animate={{
                left:
                  tabRects[activeTab].left -
                  tabContainerRef.current.getBoundingClientRect().left,
                width: tabRects[activeTab].width,
              }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "nginx" && (
            <motion.div
              key="nginx"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              <NGINXEditor />
            </motion.div>
          )}

          {activeTab === "api" && (
            <motion.div
              key="api"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
            >
              <ApiKeyManager />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
