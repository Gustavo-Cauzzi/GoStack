import { getRepository, EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactionsRepository = getRepository(Transaction);
    const transactions = await transactionsRepository.find();

    const balance = transactions.reduce(
      (acc: Balance, atual: Transaction) => {
        if (atual.type == 'income') {
          acc.income += atual.value;
          acc.total += atual.value;
        } else {
          acc.outcome += atual.value;
          acc.total -= atual.value;
        }

        return acc;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );
    return balance;
  }
}

export default TransactionsRepository;
