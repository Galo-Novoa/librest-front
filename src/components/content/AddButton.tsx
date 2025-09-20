import { Plus } from "lucide-react";
import { useState } from "react";
import AddForm from "./AddForm";
import handleAdd from "./ProductFeed";

function AddButton() {
	const [showForm, setShowForm] = useState(false);

	return (
		<div>
			<button
				className="w-12 h-12 bg-lime-500 text-white rounded-full text-2xl transition-transform hover:scale-110 flex items-center justify-center"
				onClick={() => setShowForm(!showForm)}
			>
				<Plus />
			</button>
			{showForm && <AddForm onAdd={handleAdd} />}
		</div>
	);
}

export default AddButton;
