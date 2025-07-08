import React from 'react';
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const auth = localStorage.getItem('user');
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate('/signup')
  }

  return (
    <div >
      {auth ? <ul className='navbar-ul'>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/income">Income</Link></li>
        <li><Link to="/expense">Expense</Link></li>
        <li><Link to="/balance">Balance</Link></li>
       
        <li> <Link onClick={logout} to="/signup">Logout ({JSON.parse(auth).name})</Link></li>
      </ul>
        :
        <ul className='navbar-ul nav-right'>
          <li> <Link to="/signup">Sign Up</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      }
    </div >
  )
}

export default Navbar