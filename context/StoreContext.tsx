import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { MemberData, ViewState, Transaction, MembershipPlan } from '../types';
import { INITIAL_MEMBERS, MEMBERSHIP_PLANS } from '../constants';

interface StoreContextType {
  members: MemberData[];
  plans: MembershipPlan[];
  currentView: ViewState;
  selectedMemberId: number | null;
  setView: (view: ViewState) => void;
  selectMember: (id: number) => void;
  addMember: (member: Omit<MemberData, 'id'>) => void;
  updateMember: (id: number, data: Partial<MemberData>) => void;
  addTransaction: (memberId: number, transaction: Omit<Transaction, 'id'>) => void;
  getMember: (id: number) => MemberData | undefined;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [members, setMembers] = useState<MemberData[]>(INITIAL_MEMBERS);
  const [currentView, setCurrentView] = useState<ViewState>('DASHBOARD');
  const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null);

  const selectMember = (id: number) => {
    setSelectedMemberId(id);
    setCurrentView('MEMBER_DETAIL');
  };

  const addMember = (memberData: Omit<MemberData, 'id'>) => {
    const newId = Math.max(...members.map(m => m.id)) + 1;
    const newMember = { ...memberData, id: newId };
    setMembers(prev => [newMember, ...prev]);
    selectMember(newId);
  };

  const updateMember = (id: number, data: Partial<MemberData>) => {
    setMembers(prev => prev.map(m => m.id === id ? { ...m, ...data } : m));
  };

  const addTransaction = (memberId: number, transaction: Omit<Transaction, 'id'>) => {
    const newTx: Transaction = {
      ...transaction,
      id: `tx_${Date.now()}`
    };
    
    setMembers(prev => prev.map(m => {
      if (m.id === memberId) {
        let newBalance = m.balance;
        if (transaction.type === 'Charge') newBalance += transaction.amount;
        if (transaction.type === 'Payment') newBalance -= transaction.amount;
        if (transaction.type === 'Refund') newBalance += transaction.amount;
        
        return {
          ...m,
          balance: newBalance,
          transactions: [newTx, ...m.transactions]
        };
      }
      return m;
    }));
  };

  const getMember = (id: number) => members.find(m => m.id === id);

  return (
    <StoreContext.Provider value={{
      members,
      plans: MEMBERSHIP_PLANS,
      currentView,
      selectedMemberId,
      setView: setCurrentView,
      selectMember,
      addMember,
      updateMember,
      addTransaction,
      getMember
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
