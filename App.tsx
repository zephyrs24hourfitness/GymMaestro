import React from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { MemberProfile } from './components/MemberProfile';
import { Dashboard } from './components/views/Dashboard';
import { MemberList } from './components/views/MemberList';
import { AddMember } from './components/views/AddMember';
import { StoreProvider, useStore } from './context/StoreContext';

const MainContent: React.FC = () => {
  const { currentView } = useStore();

  switch (currentView) {
    case 'DASHBOARD':
      return <Dashboard />;
    case 'MEMBER_LIST':
      return <MemberList />;
    case 'ADD_MEMBER':
      return <AddMember />;
    case 'MEMBER_DETAIL':
      return <MemberProfile />;
    default:
      return (
        <div className="flex items-center justify-center h-full text-slate-400">
          Work in progress: {currentView}
        </div>
      );
  }
};

function App() {
  return (
    <StoreProvider>
        <div className="min-h-screen bg-surface-100 flex font-sans selection:bg-primary-200 selection:text-primary-900">
        <Sidebar />
        <div className="flex-1 md:ml-72 flex flex-col min-w-0 transition-all duration-300 ease-in-out">
            <Header />
            <main className="flex-1 overflow-x-hidden pb-12">
                <MainContent />
            </main>
        </div>
        </div>
    </StoreProvider>
  );
}

export default App;
