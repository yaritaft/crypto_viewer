import { ValidCryptos } from './validCryptos';

export type CryptoName = keyof typeof ValidCryptos;

export type CryptoPrice = {
  [key in CryptoName]?: number;
};

export type AmountCrypto = {
  [key in CryptoName]?: {
    usdInvested: number;
    amount: number;
  };
};

export type Results = {
  [key in CryptoName]?: {
    totalInvestedMoney: number;
    currentTotalMoney: number;
    diff: number;
  };
};
