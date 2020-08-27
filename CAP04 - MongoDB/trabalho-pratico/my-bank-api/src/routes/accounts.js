import express from 'express';
import mongoose from 'mongoose';
import { accountModel } from '../models/accountModel.js';

const router = express.Router();

router.get('/account', async (req, res, next) => {
  try {
    const account = await accountModel.find({});
    res.send(account);
  } catch (err) {
    next(err);
  }
});
router.get('/account/balance', async (req, res, next) => {
  const { agencia, conta } = req.query;
  try {
    const account = await accountModel.findOne({
      $and: [{ conta: conta }, { agencia: agencia }],
    });

    if (!account) {
      throw new Error('Conta não encontrada');
    }
    res.send({ balance: account.balance });
    //res.send(account);
  } catch (err) {
    next(err);
  }
});
router.patch('/account/deposit', async (req, res, next) => {
  const { agencia, conta, balance } = req.body;
  try {
    const account = await accountModel.findOne({
      $and: [{ conta: conta }, { agencia: agencia }],
    });
    if (!account) {
      throw new Error('Conta não encontrada');
    }
    const newAccount = await accountModel.findOneAndUpdate(
      { $and: [{ conta: conta }, { agencia: agencia }] },
      { $inc: { balance: balance } },
      { new: true }
    );

    res.send({ Balance: newAccount.balance });
  } catch (err) {
    next(err);
  }
});
router.patch('/account/withdraw', async (req, res, next) => {
  const { agencia, conta, value } = req.body;
  try {
    const account = await accountModel.findOne({
      $and: [{ conta: conta }, { agencia: agencia }],
    });

    if (!account) {
      throw new Error('Conta não encontrada');
    }

    if (account.balance < value) {
      throw new Error('Saldo Insuficiente');
    }

    const newAccount = await accountModel.findOneAndUpdate(
      { $and: [{ conta: conta }, { agencia: agencia }] },
      { $inc: { balance: (value + 1) * -1 } },
      { new: true }
    );

    res.send({ Balance: newAccount.balance });
  } catch (err) {
    next(err);
  }
});
router.use((err, req, res, next) => {
  res.status(400).send({
    error: 'Error',
    message: err.message,
  });
  next();
});

export default router;
