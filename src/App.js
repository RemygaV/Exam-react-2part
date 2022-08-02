import './App.css';
import Header from './Components/Header';
import Restaurants from './Components/Restaurants';
import AddRestaurant from './Components/AddRestaurant';
import Dishes from './Components/Dishes';
// import AddDish from './Components/AddDish';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Footer from './Components/Footer';
import Login from './Components/Login';
import Register from './Components/Register';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/restaurants' element={<Restaurants />}/>
          <Route path='/addRestaurant' element={<AddRestaurant />} />
          <Route path='/dishes' element={<Dishes />} />      
          <Route path='/Login' element={<Login />} />
          <Route path='/Register' element={<Register />} /> 
        </Routes>
        <Footer />
      </BrowserRouter>

    </div>
  );
}

export default App;
