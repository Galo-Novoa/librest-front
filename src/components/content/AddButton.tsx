import { Plus } from "lucide-react";
import { useState } from "react";
import AddForm from "./AddForm";
import { motion, AnimatePresence } from "framer-motion";
import type { Product } from "../../types/Product";

type Props = {
  onAdd: (newProduct: Omit<Product, "id">) => void;
};

function AddButton({ onAdd }: Readonly<Props>) {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <button
        className="absolute bottom-10 right-10 w-20 h-20 bg-lime-500 text-white rounded-full text-2xl transition-transform hover:scale-110 flex items-center justify-center"
        onClick={() => setShowForm(!showForm)}
      >
        <Plus size={40} strokeWidth={4} />
      </button>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-36 right-10"
          >
            <AddForm onAdd={onAdd} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AddButton;