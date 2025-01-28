import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import NotesListPage from './pages/NotesListPage'
import NotePage from './pages/NotePage'
import { HashRouter, Routes, Route, useLocation } from 'react-router'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'
import { NotesProvider } from './NotesContext'


function App() {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
}

function AppContent() {
  // Use the useLocation hook to access the current route
  const location = useLocation();

  // Check if the current route is 'signup' or 'login'
  const shouldHideHeader = location.pathname === '/signup' || location.pathname === '/login';

  // Conditionally set styles based on the current route
  const appStyles = shouldHideHeader
    ? {}
    : { backgroundColor: "#2e3235", boxShadow: "1px 1px 6px rgba(0, 0, 0, 0.05)" };

  return (
    <div className="container dark">
      <div className="app" style={appStyles}>
        {/* Conditionally render Header based on URL */}
        {!shouldHideHeader && <Header />} {/* Only show Header if not on 'signup' or 'login' */}
        <NotesProvider>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/signup" exact element={<Signup />} />
            <Route path="/login" exact element={<Login />} />

            <Route path="/notes" exact element={<NotesListPage />} />
            <Route path="/note/:id" element={<NotePage />} />

          </Routes>
        </NotesProvider>
      </div>
    </div >
  );
}

export default App;
