export interface WeddingMoney {
  _id: string;
  name: string;
  money: number;
  phoneNumber: string;
  note: string;
  user: string;
  createdAt: string;
  updatedAt: string;
}

export interface MoneyRequest {
  name: string;
  money: number;
  phoneNumber: string;
  note: string;
}

export interface SingleMoney {
  _id: string;
  name: string;
  money: number;
  phoneNumber: string;
  note: string;
  user: {
    _id: string;
    email: string;
    username: string;
  };
  createdAt: string;
  updatedAt: string;
}
