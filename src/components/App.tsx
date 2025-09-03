// src/App.tsx
import { useEffect, useState } from "react";

function App() {
	const [mensaje, setMensaje] = useState("");

	useEffect(() => {
		fetch("http://localhost:8080/hello")
			.then((res) => res.text())
			.then((data) => setMensaje(data))
			.catch((err) => console.error(err));
	}, []);

	return <div>{mensaje}</div>;
}

export default App;