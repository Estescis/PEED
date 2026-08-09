import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//Layout de mi Index
import Layout from './components/Layout';

//Componentes de mi Index
import Home from './components/Home';

// Componentes de mi Nav
import Support from './components/Support';
import About from './components/About';
import Notices from './components/Notices';
import Functions from './components/Functions';

// Componentes externos
import Login from './components/Login';
import Register from './components/Register';

// Componentes DashBoard
import Dashboard from './components/dashboard/Dashboard';

// Componente de ruta protegida
import ProtectedRoute from './components/ProtectedRoute';

// Rutas protegidas según el rol
import AdminRoute from "./components/AdminRoute";
import CandidateRoute from "./components/CandidateRoute";

function App() {

  return (
    <Router>
      <Routes>
        {/* --- GRUPO CON NAVEGACIÓN (Layout Principal) --- */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="support" element={<Support />} />
          <Route path="about" element={<About />} />
          <Route path="notices" element={<Notices />} />
          <Route path="functions" element={<Functions />} />
        </Route>

        {/* Rutas que NO usan el Layout */}
          <Route path="/login" element={<Login />} />
          <Route path='/register' element={<Register />} />

        {/* --- GRUPO CON NAVEGACIÓN (Layout Dashboard) --- */}
        <Route path="/dashboard" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>}/>

      </Routes>
    </Router>
  );
}

export default App