// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import NGINXEditor from "@/components/NGINXEditor";
import Header from "@/components/Header";
import Footer from "@/components/Footer";


export default function Home() {

  return (
    <div className="min-h-screen bg-primary text-textPrimary p-6">
      <div className="max-w-6xl mx-auto">
        <Header />
        <AnimatePresence mode="wait">
          <motion.div
            key="nginx"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: .2 }}
          >
            <NGINXEditor />
          </motion.div>
        </AnimatePresence>
        <Footer />
      </div>
    </div>
  );
}
