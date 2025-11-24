import React, { useState } from 'react';
import { Bell, Search, Menu, ChevronDown } from 'lucide-react';
import { STAFF_USER } from '../constants';
import { useStore } from '../context/StoreContext';

export const Header: React.FC = () => {
  const { currentView, selectedMemberId, getMember, setView, selectMember, members } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);

  const activeMember = selectedMemberId ? getMember(selectedMemberId) : null;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setShowResults(e.target.value.length > 0);
  };

  const filteredMembers = members.filter(m => 
    m.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.id.toString().includes(searchTerm)
  );

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-3 flex items-center justify-between">
      {/* Left: Mobile Toggle & Breadcrumbs */}
      <div className="flex items-center gap-4">
        <button className="md:hidden p-2 hover:bg-slate-100 rounded-full text-slate-600">
          <Menu size={24} />
        </button>
        <nav className="hidden sm:flex items-center text-sm font-medium text-slate-500">
          <span 
            className="hover:text-primary-600 cursor-pointer transition-colors"
            onClick={() => setView('DASHBOARD')}
          >
            Home
          </span>
          <span className="mx-2 text-slate-300">/</span>
          {currentView === 'MEMBER_DETAIL' && activeMember ? (
             <>
                <span 
                  className="hover:text-primary-600 cursor-pointer transition-colors"
                  onClick={() => setView('MEMBER_LIST')}
                >
                  Members
                </span>
                <span className="mx-2 text-slate-300">/</span>
                <span className="text-slate-900 bg-slate-100 px-3 py-1 rounded-full">
                  {activeMember.firstName} {activeMember.lastName} #{activeMember.id}
                </span>
             </>
          ) : (
            <span className="text-slate-900 capitalize">{currentView.replace('_', ' ').toLowerCase()}</span>
          )}
        </nav>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        {/* Search Bar */}
        <div className="relative hidden md:block">
            <div className="flex items-center bg-slate-100 rounded-full px-4 py-2.5 w-64 focus-within:ring-2 focus-within:ring-primary-200 transition-all">
              <Search size={18} className="text-slate-400" />
              <input 
                type="text" 
                placeholder="Search members..." 
                className="bg-transparent border-none outline-none text-sm ml-2 w-full text-slate-700 placeholder:text-slate-400"
                value={searchTerm}
                onChange={handleSearch}
                onBlur={() => setTimeout(() => setShowResults(false), 200)}
                onFocus={() => searchTerm && setShowResults(true)}
              />
            </div>
            
            {/* Quick Search Results */}
            {showResults && (
              <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-xl shadow-xl border border-slate-100 py-2 max-h-64 overflow-y-auto">
                {filteredMembers.length > 0 ? (
                  filteredMembers.map(m => (
                    <div 
                      key={m.id}
                      className="px-4 py-2 hover:bg-slate-50 cursor-pointer flex items-center gap-3"
                      onMouseDown={() => {
                        selectMember(m.id);
                        setSearchTerm('');
                      }}
                    >
                      <img src={m.photoUrl} className="w-8 h-8 rounded-full object-cover" alt="" />
                      <div>
                        <div className="text-sm font-medium text-slate-800">{m.firstName} {m.lastName}</div>
                        <div className="text-xs text-slate-500">#{m.id} • {m.status}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-2 text-sm text-slate-500">No members found</div>
                )}
              </div>
            )}
        </div>

        {/* Notification */}
        <button className="relative w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        {/* Profile Dropdown */}
        <div className="flex items-center gap-2 pl-2 cursor-pointer hover:bg-slate-50 p-1.5 pr-3 rounded-full border border-transparent hover:border-slate-200 transition-all">
          <img 
            src={STAFF_USER.avatar} 
            alt="Profile" 
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="hidden lg:block text-xs text-left">
            <div className="font-semibold text-slate-700">{STAFF_USER.name}</div>
            <div className="text-slate-400">Staff</div>
          </div>
          <ChevronDown size={14} className="text-slate-400" />
        </div>
      </div>
    </header>
  );
};
