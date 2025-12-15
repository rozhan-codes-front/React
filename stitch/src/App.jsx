import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import RoyaHome from "./pages/RoyaHome.jsx";
import PizzaClass from "./pages/PizzaClass.jsx";


export default function App() {
    return (
        <Router>
            <div className="min-h-screen flex flex-col"
                 style={{ fontFamily: 'Vazirmatn, sans-serif' }}>
                <header className="bg-[#1b120e] text-white">
                    <div className="px-4 py-3 flex items-center justify-between nav-head">
                        <h1 className="text-lg font-semibold tracking-tight">دموی ریکت</h1>
                        <nav className="flex gap-4 text-sm">
                            <Link className="hover:text-[#ce5316] transition-colors" to="/">
                               صفحه اصلی رویاس
                            </Link>
                            <Link className="hover:text-[#ce5316] transition-colors" to="/pizza">
                                برنامه رستوران
                            </Link>
                        </nav>
                    </div>
                </header>
                <main className="flex-1">
                    <Routes>
                        <Route path="/" element={<RoyaHome />} />
                        <Route path="/pizza" element={<PizzaClass />} />
                    </Routes>
                </main>
                <footer className="bg-[#1b120e] text-white text-center py-3 text-xs">
                    <p>Navigate between the converted layouts using the links above.</p>
                </footer>
            </div>
        </Router>
    );
}