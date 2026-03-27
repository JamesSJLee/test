import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import AgendaForm from './components/AgendaForm';

function App() {
  const [view, setView] = useState('dashboard');

  return (
    <div className="min-h-screen bg-surface">
      <Navbar setView={setView} />
      <Sidebar />
      <main className="transition-all duration-500">
        {view === 'dashboard' ? (
          <Dashboard />
        ) : (
          <AgendaForm onBack={() => setView('dashboard')} />
        )}
      </main>
      
      {/* Visual Polish: Ghost background texture */}
      <div className="fixed top-0 right-0 -z-10 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
      <div className="fixed -bottom-20 -left-20 -z-10 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none"></div>
    </div>
  );
}

export default App;
