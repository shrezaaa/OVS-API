export interface User {
  userName: string;
  FName: string;
  LName: string;
  gender: 'MALE' | 'FEMALE' | 'LGBTQ+';
  phoneNo: string;
  password: string;
  DateOfIssue?: string;
  Address?: Address;
  roleKind: 'ADMIN' | 'CUSTOMER';
  orders?: Order[] | any;
}

export interface Order {
  productIDs: string[];
  count: number;
  sum?: number;
  mode: 'IN_CART' | 'NEXT_CART' | 'ARCHIVE';
}

export interface Address {
  code?: string;
  city: string;
  street: string;
}
