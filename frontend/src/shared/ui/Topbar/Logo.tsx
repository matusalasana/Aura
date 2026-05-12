import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center">
      <motion.span
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-serif tracking-tighter italic text-gray-900 dark:text-white"
      >
        Aura
      </motion.span>
    </Link>
  );
};

export default Logo;