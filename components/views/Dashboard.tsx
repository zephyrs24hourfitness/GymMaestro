import React from 'react';
import { Card } from '../ui/Card';
import { useStore } from '../../context/StoreContext';
import { Users, TrendingUp, AlertCircle, DollarSign, ArrowUpRight } from 'lucide-react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell, AreaChart, Area } from 'recharts';

export const Dashboard: React.FC = () => {
  const { members } = useStore();
  
  const activeMembers = members.filter(m => m.status === 'Active').length;
  const recentJoins = members.filter(m => {
    const joinDate = new Date(m.joinDate);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - joinDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    return diffDays <= 30;
  }).length;

  const totalBalance = members.reduce((acc, curr) => acc + curr.balance, 0);

  const visitData = [
    { name: 'Mon', visits: 124 },
    { name: 'Tue', visits: 145 },
    { name: 'Wed', visits: 132 },
    { name: 'Thu', visits: 156 },
    { name: 'Fri', visits: 189 },
    { name: 'Sat', visits: 210 },
    { name: 'Sun', visits: 167 },
  ];

  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-8">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-500 mt-1">Welcome back, here's what's happening at Zephyrs Fitness today.</p>
        </div>
        <div className="text-right">
            <p className="text-sm font-medium text-slate-500">Last updated</p>
            <p className="text-slate-900 font-medium">Just now</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between h-40">
            <div className="flex justify-between items-start">
                <div className="w-10 h-10 bg-primary-50 rounded-full flex items-center justify-center text-primary-600">
                    <Users size={20} />
                </div>
                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1">
                    <ArrowUpRight size={12} /> 12%
                </span>
            </div>
            <div>
                <h3 className="text-3xl font-display font-bold text-slate-800">{activeMembers}</h3>
                <p className="text-slate-500 text-sm">Active Members</p>
            </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between h-40">
            <div className="flex justify-between items-start">
                <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center text-orange-600">
                    <TrendingUp size={20} />
                </div>
                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1">
                    <ArrowUpRight size={12} /> 5%
                </span>
            </div>
            <div>
                <h3 className="text-3xl font-display font-bold text-slate-800">{recentJoins}</h3>
                <p className="text-slate-500 text-sm">New Joins (30 Days)</p>
            </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between h-40">
             <div className="flex justify-between items-start">
                <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600">
                    <DollarSign size={20} />
                </div>
            </div>
            <div>
                <h3 className="text-3xl font-display font-bold text-slate-800">${Math.abs(totalBalance).toFixed(2)}</h3>
                <p className="text-slate-500 text-sm">Outstanding Balance</p>
            </div>
        </div>

        <div className="bg-primary-600 p-6 rounded-3xl border border-primary-500 shadow-lg shadow-primary-200 text-white flex flex-col justify-between h-40">
             <div className="flex justify-between items-start opacity-80">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white">
                    <AlertCircle size={20} />
                </div>
            </div>
            <div>
                <h3 className="text-3xl font-display font-bold">3</h3>
                <p className="text-primary-100 text-sm">Urgent Tasks</p>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card title="Club Visits" className="lg:col-span-2">
            <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={visitData}>
                        <defs>
                            <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} dy={10} />
                        <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px -2px rgba(0,0,0,0.1)'}} />
                        <Area type="monotone" dataKey="visits" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorVisits)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </Card>

        <Card title="Recent Activity">
            <div className="space-y-6">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex gap-4 items-start">
                        <div className="w-2 h-2 rounded-full bg-primary-400 mt-2 shrink-0"></div>
                        <div>
                            <p className="text-sm font-medium text-slate-800">New member joined</p>
                            <p className="text-xs text-slate-500">Sarah Connor signed up for Platinum Access</p>
                            <p className="text-xs text-slate-400 mt-1">2 hours ago</p>
                        </div>
                    </div>
                ))}
            </div>
            <button className="w-full mt-6 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                View All Activity
            </button>
        </Card>
      </div>
    </div>
  );
};
