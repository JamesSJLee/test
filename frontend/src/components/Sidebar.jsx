import React from 'react';

const Sidebar = () => {
  const menuItems = [
    { icon: 'pending_actions', label: 'Pre-Meeting', active: false },
    { icon: 'rate_review', label: 'Review', active: false },
    { icon: 'groups', label: 'Meeting', active: true },
    { icon: 'assignment_turned_in', label: 'Post-Meeting', active: false },
  ];

  return (
    <aside className="h-screen w-64 fixed left-0 top-0 pt-20 bg-slate-50 flex flex-col p-6 space-y-4">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-slate-700 font-headline">Workflow</h2>
        <p className="text-xs text-slate-500">Executive Steering</p>
      </div>
      <nav className="flex-1 space-y-1">
        {menuItems.map((item, index) => (
          <a
            key={index}
            className={`flex items-center gap-3 p-3 transition-all rounded-md text-sm font-medium ${
              item.active ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:bg-slate-200'
            }`}
            href="#"
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span>{item.label}</span>
          </a>
        ))}
      </nav>
      <div className="pt-6 border-t border-slate-200 space-y-1">
        <a className="flex items-center gap-3 p-2 text-slate-500 hover:bg-slate-200 transition-all rounded-md text-xs" href="#">
          <span className="material-symbols-outlined text-sm">settings</span>
          <span>Settings</span>
        </a>
        <a className="flex items-center gap-3 p-2 text-slate-500 hover:bg-slate-200 transition-all rounded-md text-xs" href="#">
          <span className="material-symbols-outlined text-sm">help_outline</span>
          <span>Support</span>
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;
