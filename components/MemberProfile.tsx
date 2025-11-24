import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { TabType, MemberData, Transaction } from '../types';
import { MemberOverview } from './MemberOverview';
import { Card } from './ui/Card';
import { 
  Camera, MapPin, Mail, Phone, Calendar, Edit3, Save, 
  Briefcase, CheckCircle, CreditCard, Plus, ArrowUpRight, ArrowDownLeft
} from 'lucide-react';

export const MemberProfile: React.FC = () => {
  const { selectedMemberId, getMember, plans, updateMember, addTransaction } = useStore();
  const [activeTab, setActiveTab] = useState<TabType>(TabType.OVERVIEW);
  
  const member = selectedMemberId ? getMember(selectedMemberId) : undefined;
  
  if (!member) return <div className="p-8">Member not found</div>;

  const currentPlan = plans.find(p => p.id === member.membershipPlanId);

  const handlePayment = () => {
    if (member.balance <= 0) return;
    addTransaction(member.id, {
        date: new Date().toISOString().split('T')[0],
        amount: member.balance,
        description: 'Manual Payment',
        type: 'Payment',
        method: 'Credit Card',
        status: 'Completed'
    });
  };

  const handleCharge = () => {
    addTransaction(member.id, {
        date: new Date().toISOString().split('T')[0],
        amount: 25.00,
        description: 'PT Session',
        type: 'Charge',
        status: 'Completed'
    });
  };

  return (
    <div className="p-4 md:p-8 max-w-[1600px] mx-auto">
      {/* Page Header Area */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div className="flex items-center gap-6">
           <div className="relative group">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-[2rem] overflow-hidden shadow-xl ring-4 ring-white bg-slate-100">
                <img 
                  src={member.photoUrl} 
                  alt={member.firstName} 
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="absolute bottom-2 right-2 p-2 bg-slate-900 text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-primary-600">
                <Camera size={16} />
              </button>
           </div>
           
           <div className="mb-2">
             <div className="flex items-center gap-3 mb-1">
                <span className={`
                    text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider
                    ${member.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-700'}
                `}>
                  {member.status}
                </span>
                <span className="text-slate-400 text-sm font-medium">#{member.id}</span>
             </div>
             <h1 className="text-3xl md:text-5xl font-display font-medium text-slate-900 tracking-tight">
               {member.firstName} {member.lastName}
             </h1>
             <div className="flex items-center gap-2 text-slate-500 mt-2 text-sm">
                <MapPin size={14} />
                <span>{member.address.split(',')[1] || 'Unknown City'}</span>
                <span className="mx-1">•</span>
                <span>Since {new Date(member.joinDate).getFullYear()}</span>
             </div>
           </div>
        </div>

        <div className="flex gap-3">
            <button className="px-5 py-3 rounded-full bg-surface-200 text-slate-700 font-medium hover:bg-slate-200 transition-colors flex items-center gap-2">
                <Briefcase size={18} />
                <span className="hidden sm:inline">Prospect Mgmt</span>
            </button>
            <button className="px-6 py-3 rounded-full bg-primary-600 text-white font-medium shadow-lg shadow-primary-200 hover:bg-primary-700 hover:shadow-xl transition-all flex items-center gap-2">
                <Save size={18} />
                <span>Save Changes</span>
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Left Sidebar Info (3 cols) */}
        <div className="xl:col-span-3 space-y-6">
            <Card title="Details" action={<button className="text-primary-600 hover:bg-primary-50 p-2 rounded-full"><Edit3 size={18}/></button>}>
                <div className="space-y-5">
                    <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-500">
                            <Mail size={16} />
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Email</p>
                            <p className="text-slate-800 font-medium truncate" title={member.email}>{member.email}</p>
                        </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-500">
                            <Phone size={16} />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Phone</p>
                            <p className="text-slate-800 font-medium">{member.phone}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-500">
                            <Calendar size={16} />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Date of Birth</p>
                            <p className="text-slate-800 font-medium">{member.dob}</p>
                        </div>
                    </div>
                </div>
            </Card>

            <Card className="bg-gradient-to-br from-primary-600 to-primary-800 text-white border-none relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-10 -mt-10"></div>
                <div className="relative z-10">
                    <p className="text-primary-100 text-sm font-medium mb-1">Current Plan</p>
                    <h3 className="text-2xl font-display font-bold mb-4">{currentPlan?.name || 'No Active Plan'}</h3>
                    {currentPlan && (
                        <div className="flex items-center gap-2 mb-6">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.6)]"></span>
                            <span className="text-sm font-medium text-emerald-100">Auto-Renew Active</span>
                        </div>
                    )}
                    <button 
                        onClick={() => setActiveTab(TabType.MEMBERSHIP)}
                        className="w-full py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl text-sm font-medium transition-colors border border-white/10"
                    >
                        Manage Plan
                    </button>
                </div>
            </Card>
        </div>

        {/* Main Content (9 cols) */}
        <div className="xl:col-span-9">
            {/* Tabs */}
            <div className="flex items-center gap-1 bg-surface-200 p-1.5 rounded-[20px] w-full md:w-fit mb-6 overflow-x-auto">
                {(Object.values(TabType) as TabType[]).map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`
                            px-6 py-2.5 rounded-[16px] text-sm font-medium transition-all duration-300 whitespace-nowrap
                            ${activeTab === tab 
                                ? 'bg-white text-primary-900 shadow-sm' 
                                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}
                        `}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                {activeTab === TabType.OVERVIEW && <MemberOverview member={member} />}
                
                {activeTab === TabType.MEMBERSHIP && (
                    <div className="space-y-6">
                        <Card title="Available Plans">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {plans.map(plan => (
                                    <div 
                                        key={plan.id}
                                        onClick={() => updateMember(member.id, { membershipPlanId: plan.id, status: 'Active' })}
                                        className={`
                                            p-4 rounded-2xl border-2 cursor-pointer transition-all flex justify-between items-center
                                            ${member.membershipPlanId === plan.id 
                                                ? 'border-primary-500 bg-primary-50' 
                                                : 'border-slate-100 hover:border-slate-300 hover:bg-slate-50'}
                                        `}
                                    >
                                        <div>
                                            <h4 className="font-bold text-slate-800">{plan.name}</h4>
                                            <p className="text-slate-500 text-sm">${plan.price}/{plan.frequency}</p>
                                        </div>
                                        {member.membershipPlanId === plan.id && <CheckCircle className="text-primary-600" />}
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                )}

                {activeTab === TabType.BILLING && (
                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <Card className="flex-1 bg-slate-900 text-white">
                                <p className="text-slate-400 text-sm font-medium">Outstanding Balance</p>
                                <div className="text-4xl font-display font-bold mt-1">${member.balance.toFixed(2)}</div>
                            </Card>
                            <Card className="flex-1 flex flex-col justify-center gap-3">
                                <button 
                                    onClick={handlePayment}
                                    disabled={member.balance <= 0}
                                    className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                                >
                                    <CreditCard size={18} /> Pay Balance
                                </button>
                                <button 
                                    onClick={handleCharge}
                                    className="w-full bg-surface-200 hover:bg-slate-200 text-slate-700 py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                                >
                                    <Plus size={18} /> Add Charge
                                </button>
                            </Card>
                        </div>

                        <Card title="Transaction History">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                        <tr>
                                            <th className="pb-4">Date</th>
                                            <th className="pb-4">Description</th>
                                            <th className="pb-4">Type</th>
                                            <th className="pb-4 text-right">Amount</th>
                                            <th className="pb-4 text-right">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {member.transactions.map((tx) => (
                                            <tr key={tx.id}>
                                                <td className="py-4 text-sm text-slate-600">{tx.date}</td>
                                                <td className="py-4 font-medium text-slate-800">{tx.description}</td>
                                                <td className="py-4">
                                                    <span className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full w-fit ${
                                                        tx.type === 'Payment' 
                                                            ? 'bg-emerald-100 text-emerald-700' 
                                                            : 'bg-slate-100 text-slate-700'
                                                    }`}>
                                                        {tx.type === 'Payment' ? <ArrowDownLeft size={12}/> : <ArrowUpRight size={12}/>}
                                                        {tx.type}
                                                    </span>
                                                </td>
                                                <td className="py-4 text-right font-medium text-slate-800">${tx.amount.toFixed(2)}</td>
                                                <td className="py-4 text-right">
                                                    <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                                                        {tx.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                        {member.transactions.length === 0 && (
                                            <tr>
                                                <td colSpan={5} className="py-8 text-center text-slate-400">No transactions recorded</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};
