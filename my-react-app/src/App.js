import React, { useState } from "react";
import logo from './logo.svg';
import './App.css';
import { Login } from "./Login";
import { Register } from "./Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<Home />} />
				<Route path="blogs" element={<Blogs />} />
				<Route path="contact" element={<Contact />} />
				<Route path="*" element={<NoPage />} />
			</Route>
		</Routes>
	</BrowserRouter>
}

export default App;
