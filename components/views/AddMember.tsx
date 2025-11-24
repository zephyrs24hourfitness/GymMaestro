import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Card } from '../ui/Card';
import { ArrowLeft, Save, User, Mail, MapPin, Calendar, Smartphone } from 'lucide-react';
import { MemberStatus } from '../../types';

export const AddMember: React.FC = () => {
  const { setView, addMember } = useStore();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    dob: '',
    gender: 'Male',
    status: 'Prospect' as MemberStatus,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addMember({
        ...formData,
        joinDate: new Date().toISOString(),
        photoUrl: `https://ui-avatars.com/api/?name=${formData.firstName}+${formData.lastName}&background=random`,
        lastVisit: 'Never',
        balance: 0,
        notes: '',
        attendances: [],
        transactions: []
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <button 
        onClick={() => setView('MEMBER_LIST')}
        className="flex items-center gap-2 text-slate-500 hover:text-slate-900 mb-6 transition-colors"
      >
        <ArrowLeft size={18} /> Back to Members
      </button>

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-display font-bold text-slate-900">Add New Member</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
                <Card title="Personal Information">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">First Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input 
                                    name="firstName"
                                    required
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                                    placeholder="Jane"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Last Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input 
                                    name="lastName"
                                    required
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                                    placeholder="Doe"
                                />
                            </div>
                        </div>
                        
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Date of Birth</label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input 
                                    type="date"
                                    name="dob"
                                    required
                                    value={formData.dob}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Gender</label>
                            <select 
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-200 outline-none transition-all appearance-none"
                            >
                                <option>Male</option>
                                <option>Female</option>
                                <option>Non-binary</option>
                                <option>Other</option>
                            </select>
                        </div>
                    </div>
                </Card>

                <Card title="Contact Details">
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input 
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                                        placeholder="jane@example.com"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Phone Number</label>
                                <div className="relative">
                                    <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input 
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                                        placeholder="+1 (555) 000-0000"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Address</label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-3 text-slate-400" size={18} />
                                <input 
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                                    placeholder="123 Main St, City, Country"
                                />
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

            <div className="space-y-6">
                <Card>
                    <h3 className="text-lg font-medium text-slate-800 mb-4">Initial Status</h3>
                    <div className="space-y-3">
                        {['Prospect', 'Active', 'Suspended'].map((status) => (
                            <label key={status} className="flex items-center p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 has-[:checked]:border-primary-500 has-[:checked]:bg-primary-50 transition-all">
                                <input 
                                    type="radio" 
                                    name="status" 
                                    value={status}
                                    checked={formData.status === status}
                                    onChange={handleChange}
                                    className="w-4 h-4 text-primary-600 border-slate-300 focus:ring-primary-500"
                                />
                                <span className="ml-3 font-medium text-slate-700">{status}</span>
                            </label>
                        ))}
                    </div>
                </Card>

                <div className="sticky top-24">
                    <button 
                        type="submit"
                        className="w-full bg-primary-600 hover:bg-primary-700 text-white py-4 rounded-2xl font-medium shadow-xl shadow-primary-200 transition-all flex items-center justify-center gap-2 group"
                    >
                        <Save size={20} className="group-hover:scale-110 transition-transform" />
                        Create Member Profile
                    </button>
                    <p className="text-center text-xs text-slate-400 mt-4">
                        By creating this profile you agree to the data processing terms.
                    </p>
                </div>
            </div>
        </div>
      </form>
    </div>
  );
};
