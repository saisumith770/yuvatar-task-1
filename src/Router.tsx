import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Landing } from "./pages/Landing";
import { Curriculum } from "./pages/Curriculum";

interface RouterProps {}

export const Router: React.FC<RouterProps> = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Landing />} />
				<Route path="/curriculum" element={<Curriculum />} />
			</Routes>
		</BrowserRouter>
	);
};
