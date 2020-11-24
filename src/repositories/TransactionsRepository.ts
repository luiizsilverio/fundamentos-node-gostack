import Transaction from '../models/Transaction';
// import CreateTransactionService from '../services/CreateTransactionService';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  /*
  public all(): Transaction[] {
    return this.transactions;
  }
  */

  public all(): { transactions: Transaction[]; balance: Balance } {
    return { transactions: this.transactions, balance: this.getBalance() };
  }

  public getBalance(): Balance {
    const balance: Balance = { income: 0, outcome: 0, total: 0 };

    this.transactions.forEach(transaction => {
      balance[transaction.type] += transaction.value;
      if (transaction.type === 'income') {
        balance.total += transaction.value;
      } else if (transaction.type === 'outcome') {
        balance.total -= transaction.value;
      }

      return balance;
    });

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
