import { LucideIcon } from 'lucide-react';

export interface SidebarItem {
  label: string;
  icon: LucideIcon;
  view: ViewState;
  isActive?: boolean;
}

export type ViewState = 'DASHBOARD' | 'MEMBER_LIST' | 'MEMBER_DETAIL' | 'ADD_MEMBER' | 'POS' | 'SCHEDULE' | 'REPORTS' | 'TASKS' | 'STOCK';

export type MemberStatus = 'Active' | 'Prospect' | 'Expired' | 'Suspended' | 'Cancelled';

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'Payment' | 'Charge' | 'Refund';
  method?: 'Credit Card' | 'Cash' | 'Bank Transfer';
  status: 'Completed' | 'Pending' | 'Failed';
}

export interface MembershipPlan {
  id: string;
  name: string;
  price: number;
  frequency: 'Weekly' | 'Fortnightly' | 'Monthly' | 'Yearly';
}

export interface MemberData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  joinDate: string;
  dob: string;
  gender: string;
  status: MemberStatus;
  photoUrl: string;
  lastVisit: string;
  balance: number;
  membershipPlanId?: string;
  notes: string;
  attendances: { date: string; count: number }[];
  transactions: Transaction[];
}

export enum TabType {
  OVERVIEW = 'Overview',
  MEMBERSHIP = 'Membership',
  BILLING = 'Billing',
  TIMELINE = 'Timeline',
}
