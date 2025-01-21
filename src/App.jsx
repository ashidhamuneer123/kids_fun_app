import Navbar from "./components/Navbar";
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Puzzle from './pages/Puzzle';
import { Routes, Route } from 'react-router-dom';
import Footer from "./components/Footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar />
      <main className="flex-grow p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/puzzle" element={<Puzzle />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
