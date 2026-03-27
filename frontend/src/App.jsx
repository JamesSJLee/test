import React from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <Sidebar />
      <Dashboard />
      {/* Visual Polish: Ghost background texture */}
      <div className="fixed top-0 right-0 -z-10 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
    </div>
  );
}

export default App;
