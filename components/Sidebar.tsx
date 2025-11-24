import React, { useState } from 'react';
import { SIDEBAR_ITEMS } from '../constants';
import { ChevronRight, Dumbbell } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { currentView, setView } = useStore();

  return (
    <nav className={`
      fixed left-0 top-0 h-screen bg-surface-200 border-r border-slate-200 
      transition-all duration-300 ease-in-out z-50
      ${collapsed ? 'w-20' : 'w-72'}
      hidden md:flex flex-col py-6
    `}>
      {/* Brand */}
      <div className={`px-6 mb-10 flex items-center ${collapsed ? 'justify-center' : 'justify-between'}`}>
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('DASHBOARD')}>
          <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary-200">
            <Dumbbell size={20} />
          </div>
          {!collapsed && (
            <span className="font-display font-bold text-xl text-slate-800 tracking-tight">
              GymMaster
            </span>
          )}
        </div>
        
        {!collapsed && (
          <button 
            onClick={() => setCollapsed(true)}
            className="w-8 h-8 rounded-full hover:bg-slate-200 flex items-center justify-center text-slate-500"
          >
            <ChevronRight className="rotate-180" size={18} />
          </button>
        )}
      </div>

      {/* Nav Items */}
      <div className="flex-1 overflow-y-auto px-4 space-y-1 custom-scrollbar">
        {SIDEBAR_ITEMS.map((item) => (
          <button
            key={item.label}
            onClick={() => setView(item.view)}
            className={`
              w-full flex items-center gap-4 px-4 py-3.5 rounded-full transition-all duration-200 group
              ${currentView === item.view 
                ? 'bg-primary-100 text-primary-900 font-medium' 
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}
              ${collapsed ? 'justify-center px-0' : ''}
            `}
            title={collapsed ? item.label : undefined}
          >
            <item.icon 
              size={22} 
              className={currentView === item.view ? 'text-primary-700' : 'text-slate-500 group-hover:text-slate-900'} 
            />
            {!collapsed && <span>{item.label}</span>}
          </button>
        ))}
      </div>

      {/* Sidebar Footer (Toggle if collapsed) */}
      {collapsed && (
        <div className="px-4 mt-auto">
          <button 
            onClick={() => setCollapsed(false)}
            className="w-12 h-12 mx-auto rounded-full hover:bg-slate-200 flex items-center justify-center text-slate-500"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </nav>
  );
};
