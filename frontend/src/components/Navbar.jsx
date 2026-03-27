import React from 'react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/10 shadow-[0_20px_50px_rgba(43,52,55,0.05)] flex justify-between items-center px-12 py-4">
      <div className="flex items-center gap-8">
        <span className="text-xl font-bold text-slate-700 tracking-tight font-headline">경영집행위원회</span>
        <div className="hidden md:flex gap-6">
          <a className="text-slate-900 border-b-2 border-slate-500 pb-1 font-semibold tracking-tight" href="#">Home</a>
          <a className="text-slate-500 hover:text-slate-700 transition-colors font-semibold tracking-tight" href="#">Meetings</a>
          <a className="text-slate-500 hover:text-slate-700 transition-colors font-semibold tracking-tight" href="#">Tasks</a>
          <a className="text-slate-500 hover:text-slate-700 transition-colors font-semibold tracking-tight" href="#">Reports</a>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-surface-container px-3 py-1.5 rounded-full border border-outline-variant/10">
          <span className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Role</span>
          <span className="text-sm font-semibold text-primary">대표님</span>
          <span className="material-symbols-outlined text-sm text-outline">expand_more</span>
        </div>
        <button className="material-symbols-outlined text-slate-600 hover:text-slate-900 transition-colors">account_circle</button>
      </div>
    </nav>
  );
};

export default Navbar;
