import {Route,Routes,Link} from 'react-router-dom';
import './App.css';
import DailyTarget from './components/DailyTarget';
import Signup from './components/Signup';
import Login from './components/Login';
import {useNavigate} from 'react-router-dom';
function App() {
  return (
    <div className="App">
       <nav className="navbar navbar-expand-lg navbar-light bg-light ">
    <div className="container-fluid">
      <a className="navbar-brand" href="/">WorkOut tracker</a>
      <button className="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
      </button>
      <div className="container-fluid collapse navbar-collapse " id="navbarSupportedContent">
        <ul className="navbar-nav float-start ms-auto mb-2 mb-lg-0">
          <a href="/Login">Login</a>
          <a href="/Signup">SignUp</a>
        </ul>  
      </div>
    </div>
  </nav>
     
     <Routes>
      
       <Route path="/Login" element={<Login/>}/>      
       <Route path="/Signup" element={<Signup/>}/>      
       <Route path="/DailyTarget" element={<DailyTarget/>}/>         
     </Routes>
    </div>
  );
}

export default App;
