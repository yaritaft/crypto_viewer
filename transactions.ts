import { ValidCryptos } from './validCryptos';
export interface Transaction {
  cryptoName: string;
  priceWhenBuyed: number;
  amountOfCoinBought: number;
}

type ValidCryptosT = keyof typeof ValidCryptos;
const rawTxs: [ValidCryptosT, number, number][] = [
  ['ETH', 0.1033, 2857],
  ['USDT', 1350, 1],
  ['ARPA', 7093.2, 0.069],
  ['ETH', -0.5161, 3006],
  ['DOT', 10.05, 19.9],
  ['ETH', 0.7538461538, 2600],
  ['SOL', 5.34, 89.8],
  ['LUNA', 5.8, 86.2],
  ['XRP', 627, 0.79]
];

export const transactions: Transaction[] = rawTxs.map((tx) => ({
  cryptoName: tx[0],
  amountOfCoinBought: tx[1],
  priceWhenBuyed: tx[2]
}));
