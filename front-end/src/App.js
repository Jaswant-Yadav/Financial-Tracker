import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Navbar from './components/Navbar';
import SignUp from './components/SignUp';
import PrivateComponent from './components/PrivateComponent';
import Login from './components/Login';
import Home from './components/Home';
import Income from './components/Income';
import Expense from './components/Expense';
import RemainingBalance from './components/RemainingBalance';


function App() {
  return (
    <div className='App'>
      <BrowserRouter>
      <Navbar />
      <Routes>

      <Route element ={<PrivateComponent />}>
        <Route path="/" element = {<Home />} /> 
        <Route path="/:id" element = {<Home />} /> 
        <Route path="/income" element = {<Income />} /> 
        <Route path="/expense" element = {<Expense />} /> 
        <Route path="/balance" element = {<RemainingBalance />} /> 
        <Route path="/logout" element = {<h1>Log out Page</h1>} /> 
        </Route>

        <Route path="/signup" element = {<SignUp />} /> 
        <Route path="/login" element = {<Login />} /> 
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
