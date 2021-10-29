import { User } from 'src/model/user.model';

export const MockUsers: User[] = [
  {
    userName: 'trustyAlireza',
    FName: 'alireza',
    LName: 'bayat',
    gender: 'MALE',
    phoneNo: '+989023452277',
    password: '1234',
    roleKind: 'ADMIN',
    orders: null,
  },
  {
    userName: 'shrezaaa',
    FName: 'reza',
    LName: 'shakeri',
    gender: 'MALE',
    phoneNo: '+989226410968',
    password: '1234',
    roleKind: 'CUSTOMER',
    orders: null,
  },
];
