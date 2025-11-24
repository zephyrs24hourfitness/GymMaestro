import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Card } from '../ui/Card';
import { Search, Filter, MoreHorizontal, UserPlus } from 'lucide-react';
import { MemberStatus } from '../../types';

export const MemberList: React.FC = () => {
  const { members, selectMember, setView } = useStore();
  const [filter, setFilter] = useState<MemberStatus | 'All'>('All');
  const [search, setSearch] = useState('');

  const filtered = members.filter(m => {
    const matchesFilter = filter === 'All' || m.status === filter;
    const matchesSearch = 
        m.firstName.toLowerCase().includes(search.toLowerCase()) || 
        m.lastName.toLowerCase().includes(search.toLowerCase()) ||
        m.email.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-display font-bold text-slate-900">Members</h1>
        <button 
            onClick={() => setView('ADD_MEMBER')}
            className="bg-primary-600 hover:bg-primary-700 text-white px-5 py-2.5 rounded-full font-medium flex items-center gap-2 transition-all shadow-lg shadow-primary-200"
        >
            <UserPlus size={18} />
            <span>Add Member</span>
        </button>
      </div>

      <Card className="p-0 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-surface-50">
            <div className="flex items-center bg-white border border-slate-200 rounded-full px-4 py-2 w-full sm:w-80 focus-within:ring-2 focus-within:ring-primary-200 transition-all">
                <Search size={18} className="text-slate-400" />
                <input 
                    type="text" 
                    placeholder="Search by name, email..." 
                    className="ml-2 w-full outline-none text-sm"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            
            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
                {(['All', 'Active', 'Prospect', 'Suspended', 'Expired'] as const).map((status) => (
                    <button
                        key={status}
                        onClick={() => setFilter(status)}
                        className={`
                            px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors
                            ${filter === status 
                                ? 'bg-slate-800 text-white' 
                                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}
                        `}
                    >
                        {status}
                    </button>
                ))}
            </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold tracking-wider text-left">
                    <tr>
                        <th className="px-6 py-4">Member</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Plan</th>
                        <th className="px-6 py-4">Joined</th>
                        <th className="px-6 py-4 text-right">Balance</th>
                        <th className="px-6 py-4"></th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {filtered.map((member) => (
                        <tr 
                            key={member.id} 
                            onClick={() => selectMember(member.id)}
                            className="hover:bg-slate-50 cursor-pointer transition-colors group"
                        >
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <img src={member.photoUrl} alt="" className="w-10 h-10 rounded-full object-cover bg-slate-200" />
                                    <div>
                                        <div className="font-medium text-slate-900">{member.firstName} {member.lastName}</div>
                                        <div className="text-xs text-slate-500">{member.email}</div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <span className={`
                                    px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider
                                    ${member.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : ''}
                                    ${member.status === 'Suspended' ? 'bg-orange-100 text-orange-700' : ''}
                                    ${member.status === 'Prospect' ? 'bg-blue-100 text-blue-700' : ''}
                                    ${member.status === 'Expired' ? 'bg-slate-100 text-slate-600' : ''}
                                `}>
                                    {member.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-600">
                                {member.membershipPlanId ? 'Standard Access' : 'No Plan'}
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-600">
                                {new Date(member.joinDate).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 text-right font-medium">
                                <span className={member.balance > 0 ? 'text-red-600' : 'text-slate-600'}>
                                    ${member.balance.toFixed(2)}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <button className="p-2 hover:bg-slate-200 rounded-full text-slate-400 group-hover:text-slate-600">
                                    <MoreHorizontal size={18} />
                                </button>
                            </td>
                        </tr>
                    ))}
                    {filtered.length === 0 && (
                        <tr>
                            <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                                No members found matching your criteria.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
      </Card>
    </div>
  );
};
