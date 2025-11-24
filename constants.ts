import { 
  Home, 
  UserPlus, 
  Search, 
  Users, 
  CalendarDays, 
  CreditCard, 
  BarChart3, 
  CheckSquare, 
  Package
} from 'lucide-react';
import { SidebarItem, MemberData, MembershipPlan } from './types';

export const SIDEBAR_ITEMS: SidebarItem[] = [
  { label: 'Home', icon: Home, view: 'DASHBOARD' },
  { label: 'Add Member', icon: UserPlus, view: 'ADD_MEMBER' },
  { label: 'Find Member', icon: Search, view: 'MEMBER_LIST' },
  { label: 'Visitors', icon: Users, view: 'SCHEDULE' }, // Placeholder
  { label: 'Schedule', icon: CalendarDays, view: 'SCHEDULE' },
  { label: 'Point of Sale', icon: CreditCard, view: 'POS' },
  { label: 'Reports', icon: BarChart3, view: 'REPORTS' },
  { label: 'Tasks', icon: CheckSquare, view: 'TASKS' },
  { label: 'Stock', icon: Package, view: 'STOCK' },
];

export const MEMBERSHIP_PLANS: MembershipPlan[] = [
  { id: 'p1', name: 'Platinum Access', price: 99.00, frequency: 'Monthly' },
  { id: 'p2', name: 'Gold Standard', price: 69.00, frequency: 'Monthly' },
  { id: 'p3', name: 'Student Saver', price: 39.00, frequency: 'Monthly' },
  { id: 'p4', name: 'Casual Visit', price: 20.00, frequency: 'Weekly' },
];

export const INITIAL_MEMBERS: MemberData[] = [
  {
    id: 32145,
    firstName: 'Mary',
    lastName: 'McCutcheon',
    email: 'mccutcheon322@gmail.com',
    phone: '+1 (555) 123-4567',
    address: '123 Pine St, San Francisco, CA',
    joinDate: '2025-10-24',
    dob: '1963-08-22',
    gender: 'Female',
    status: 'Active',
    photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400&h=400',
    lastVisit: '2 days ago',
    balance: 0.00,
    membershipPlanId: 'p1',
    notes: 'Prefer morning classes. Allergic to latex.',
    attendances: [
      { date: 'Mon', count: 1 },
      { date: 'Tue', count: 0 },
      { date: 'Wed', count: 1 },
      { date: 'Thu', count: 1 },
      { date: 'Fri', count: 0 },
      { date: 'Sat', count: 1 },
      { date: 'Sun', count: 0 },
    ],
    transactions: [
      { id: 't1', date: '2025-10-24', description: 'Joining Fee', amount: 50.00, type: 'Charge', status: 'Completed' },
      { id: 't2', date: '2025-10-24', description: 'Payment (Credit Card)', amount: 50.00, type: 'Payment', method: 'Credit Card', status: 'Completed' },
      { id: 't3', date: '2025-11-24', description: 'Monthly Membership (Platinum)', amount: 99.00, type: 'Charge', status: 'Completed' },
      { id: 't4', date: '2025-11-24', description: 'Payment (Auto-pay)', amount: 99.00, type: 'Payment', method: 'Credit Card', status: 'Completed' },
    ]
  },
  {
    id: 32146,
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@example.com',
    phone: '+1 (555) 987-6543',
    address: '456 Oak Ave, San Francisco, CA',
    joinDate: '2025-09-15',
    dob: '1985-03-12',
    gender: 'Male',
    status: 'Suspended',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400&h=400',
    lastVisit: '1 month ago',
    balance: 99.00,
    membershipPlanId: 'p1',
    notes: 'Failed payment on last cycle.',
    attendances: [
      { date: 'Mon', count: 0 },
      { date: 'Tue', count: 0 },
      { date: 'Wed', count: 0 },
      { date: 'Thu', count: 0 },
      { date: 'Fri', count: 0 },
      { date: 'Sat', count: 0 },
      { date: 'Sun', count: 0 },
    ],
    transactions: [
      { id: 't10', date: '2025-11-15', description: 'Monthly Membership', amount: 99.00, type: 'Charge', status: 'Completed' },
      { id: 't11', date: '2025-11-15', description: 'Payment Failed', amount: 0.00, type: 'Payment', status: 'Failed' },
    ]
  }
];

export const STAFF_USER = {
  name: "Zephyrs Front Desk",
  avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200&h=200"
};
