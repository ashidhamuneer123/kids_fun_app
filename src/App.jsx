import Navbar from "./components/Navbar";
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Puzzle from './pages/Puzzle';
import PuzzleGame from './pages/PuzzleGame';
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
          <Route path="/puzzle-game/:category/:puzzleName" component={PuzzleGame} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
