import React from 'react'
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <nav className="bg-yellow-400 text-black p-4 flex justify-between">
    <h1 className="text-2xl font-bold">Kids' Fun Zone</h1>
    <div>
          <Link to="/" className="mr-4 hover:underline">Home</Link>
          <Link to="/quiz" className="mr-4 hover:underline">Quiz</Link>
          <Link to="/puzzle" className="hover:underline">Puzzles</Link>
    </div>
</nav>
  )
}

export default Navbar
