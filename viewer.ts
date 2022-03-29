import { transactions } from './transactions';
import { CryptoPrice, CryptoName, AmountCrypto, Results } from './types';

const promptF = require('prompt-sync')({ sigint: true });

const gatherCryptoPrices = (): CryptoPrice => {
  const prices: CryptoPrice = {};
  [
    ['XRP', 0.8718],
    ['LUNA', 106.98],
    ['SOL', 112.77],
    ['ETH', 3425],
    ['DOT', 22.14],
    ['ARPA', 0.0861],
    ['USDT', 1]
  ].forEach((cryptoPrice) => ({
    cryptoName: (prices[cryptoPrice[0]] = cryptoPrice[1])
  }));
  return prices;
};

const loadTransaction = () => {};

const sumAmounts = (): AmountCrypto => {
  const cryptoAmounts: AmountCrypto = {};
  for (const tx of transactions) {
    const amount =
      cryptoAmounts[tx.cryptoName] !== undefined
        ? cryptoAmounts[tx.cryptoName]['amount'] + tx.amountOfCoinBought
        : tx.amountOfCoinBought;
    const usdInvested =
      cryptoAmounts[tx.cryptoName] !== undefined
        ? cryptoAmounts[tx.cryptoName]['usdInvested'] +
          tx.amountOfCoinBought * tx.priceWhenBuyed
        : tx.amountOfCoinBought * tx.priceWhenBuyed;
    cryptoAmounts[tx.cryptoName] = {
      amount,
      usdInvested
    };
  }
  return cryptoAmounts;
};

const calculateInvestedMoneyAndCurrentMoney = (
  prices: CryptoPrice
): Results => {
  const amounts = sumAmounts();
  console.log(JSON.stringify(amounts));
  let grandTotalInvestedMoney = 0;
  let grandTotalCurrentMoney = 0;
  const results: Results = {};
  Object.keys(amounts).forEach((cryptoName) => {
    const currentTotalMoney =
      amounts[cryptoName]['amount'] * prices[cryptoName];
    const totalInvestedMoney = amounts[cryptoName]['usdInvested'];
    results[cryptoName] = {
      currentTotalMoney,
      totalInvestedMoney,
      diff: currentTotalMoney - totalInvestedMoney
    };
    grandTotalInvestedMoney = grandTotalInvestedMoney + totalInvestedMoney;
    grandTotalCurrentMoney = grandTotalCurrentMoney + currentTotalMoney;
  });
  console.log(`
  ================================================================
  Report

  Grand Total Current Money: ${grandTotalCurrentMoney}
  Grand Total Invested: ${grandTotalInvestedMoney}
  Diff: ${
    grandTotalCurrentMoney - grandTotalInvestedMoney > 0
      ? `+${grandTotalCurrentMoney - grandTotalInvestedMoney}`
      : `-${grandTotalCurrentMoney - grandTotalInvestedMoney}`
  }
  ================================================================
  
  `);

  return results;
};

const viewResults = () => {
  const prices = gatherCryptoPrices();
  const results = calculateInvestedMoneyAndCurrentMoney(prices);
  console.log(JSON.stringify(results));
};

const menu = () => {
  // let optionChosen;
  // while (optionChosen !== 3) {
  //   console.log(`
  //   1. Load Transaction
  //   2. View results
  //   3. Exit
  //   `);
  //   optionChosen = Number(promptF('> '));
  //   if (optionChosen === 1) {
  //   }
  // if (optionChosen === 2) {
  viewResults();
  // }
  // }
};

menu();
