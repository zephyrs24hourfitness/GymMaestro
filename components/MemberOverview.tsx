import React from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Card } from './ui/Card';
import { TrendingUp, CreditCard, Clock, AlertCircle } from 'lucide-react';
import { MemberData } from '../types';

interface Props {
  member: MemberData;
}

export const MemberOverview: React.FC<Props> = ({ member }) => {
  const data = member.attendances;

  return (
    <div className="space-y-6">
      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-primary-50 p-5 rounded-[24px] border border-primary-100 flex flex-col justify-between h-32 relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 bg-primary-100 w-20 h-20 rounded-full opacity-50 group-hover:scale-110 transition-transform"></div>
            <div className="flex items-start justify-between relative z-10">
                <span className="text-sm font-medium text-primary-700">Account Balance</span>
                <CreditCard size={18} className="text-primary-500" />
            </div>
            <div className="relative z-10">
                <div className="text-3xl font-display font-bold text-primary-900">${member.balance.toFixed(2)}</div>
                <div className="text-xs text-primary-600 mt-1">{member.balance === 0 ? 'Paid in full' : 'Outstanding'}</div>
            </div>
        </div>

        <div className="bg-emerald-50 p-5 rounded-[24px] border border-emerald-100 flex flex-col justify-between h-32 relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 bg-emerald-100 w-20 h-20 rounded-full opacity-50 group-hover:scale-110 transition-transform"></div>
            <div className="flex items-start justify-between relative z-10">
                <span className="text-sm font-medium text-emerald-700">Attendance</span>
                <TrendingUp size={18} className="text-emerald-500" />
            </div>
            <div className="relative z-10">
                <div className="text-3xl font-display font-bold text-emerald-900">
                  {member.attendances.reduce((acc, curr) => acc + curr.count, 0)}
                </div>
                <div className="text-xs text-emerald-600 mt-1">Visits this week</div>
            </div>
        </div>

        <div className="bg-orange-50 p-5 rounded-[24px] border border-orange-100 flex flex-col justify-between h-32 relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 bg-orange-100 w-20 h-20 rounded-full opacity-50 group-hover:scale-110 transition-transform"></div>
            <div className="flex items-start justify-between relative z-10">
                <span className="text-sm font-medium text-orange-700">Last Visit</span>
                <Clock size={18} className="text-orange-500" />
            </div>
            <div className="relative z-10">
                <div className="text-2xl font-display font-bold text-orange-900">{member.lastVisit}</div>
                <div className="text-xs text-orange-600 mt-1">Check-in at Front Desk</div>
            </div>
        </div>

        <div className="bg-blue-50 p-5 rounded-[24px] border border-blue-100 flex flex-col justify-between h-32 relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 bg-blue-100 w-20 h-20 rounded-full opacity-50 group-hover:scale-110 transition-transform"></div>
            <div className="flex items-start justify-between relative z-10">
                <span className="text-sm font-medium text-blue-700">Tasks</span>
                <AlertCircle size={18} className="text-blue-500" />
            </div>
            <div className="relative z-10">
                <div className="text-3xl font-display font-bold text-blue-900">1</div>
                <div className="text-xs text-blue-600 mt-1">Pending action</div>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attendance Chart */}
        <Card title="Weekly Attendance" className="lg:col-span-2">
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12 }} 
                  dy={10}
                />
                <Tooltip 
                  cursor={{ fill: '#f1f5f9', radius: 8 }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="count" radius={[6, 6, 6, 6]} barSize={32}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.count > 0 ? '#8b5cf6' : '#e2e8f0'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Tasks List */}
        <Card title="Next Steps">
            <div className="space-y-4">
                <div className="p-4 bg-surface-200 rounded-2xl flex items-start gap-3">
                    <div className="mt-1 w-5 h-5 rounded border-2 border-slate-300 flex items-center justify-center shrink-0 cursor-pointer hover:border-primary-500"></div>
                    <div>
                        <h4 className="font-medium text-slate-800 text-sm">Prospect Follow-up</h4>
                        <p className="text-xs text-slate-500 mt-1">Call to discuss feedback on first PT session.</p>
                        <span className="inline-block mt-2 text-[10px] font-bold text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full uppercase tracking-wider">High Priority</span>
                    </div>
                </div>
            </div>
            <button className="w-full mt-4 py-2 text-sm font-medium text-primary-600 hover:bg-primary-50 rounded-xl transition-colors">
                View All Tasks
            </button>
        </Card>
      </div>
    </div>
  );
};
