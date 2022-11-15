// // import login.jsx
import Dashboard from './components/dashboard';
import Login from './components/login';
import Register from './components/register';
import UpdateForm from './components/updateForm.jsx';
//user react router for routing
import {Routes, Route } from 'react-router-dom';



function App() {



  return (
    <div className="App">
      <Routes>
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>}/>
        <Route path="/" element={<Dashboard />} />
        {/* update with id value */}
        <Route path="/update/:id" element={<UpdateForm  />} />
      </Routes>
    </div>

  );
}

export default App;
