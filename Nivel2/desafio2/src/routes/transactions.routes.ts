import { Router } from 'express';
import { getCustomRepository, getRepository } from 'typeorm';

import Category from '../models/Category';
import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
// import DeleteTransactionService from '../services/DeleteTransactionService';
// import ImportTransactionsService from '../services/ImportTransactionsService';

const transactionsRouter = Router();

transactionsRouter.get('/', async (_, response) => {
  const transactionsRepository = getCustomRepository(TransactionsRepository);

  const transactions = await transactionsRepository.find({
    relations: ['category'],
  });
  const balance = await transactionsRepository.getBalance();

  return response.json({ transactions, balance });
});

transactionsRouter.post('/', async (request, response) => {
  const { title, value, type, category } = request.body;

  const createTransaction = new CreateTransactionService();

  const transaction = await createTransaction.execute({
    title,
    value,
    type,
    category,
  });

  return response.status(200).json(transaction);
});

transactionsRouter.delete('/:id', async (request, response) => {
  // TODO
});

transactionsRouter.post('/import', async (request, response) => {
  // TODO
});

export default transactionsRouter;

/*


const transactionsWithCategories = transactions.map(async tran => {
    const {
      id,
      title,
      value,
      type,
      created_at,
      updated_at,
      category_id,
    } = tran;

    const categoryInfo = await categoriesRepository.findOne({
      where: { id: category_id },
    });

    // eslint-disable-next-line no-console
    console.log('object:', {
      title,
      value,
      id,
      type,
      category: categoryInfo,
      created_at,
      updated_at,
    });

    return {
      title,
      value,
      id,
      type,
      category: categoryInfo,
      created_at,
      updated_at,
    };




*/
