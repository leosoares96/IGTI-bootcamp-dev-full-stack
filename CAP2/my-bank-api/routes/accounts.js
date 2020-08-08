import express from 'express';
import { promises as fs, write } from 'fs';

const { readFile, writeFile } = fs;

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    let account = req.body;

    if (!account.name || account.balance == null) {
      throw new Error('Name e Balance são obrigatorios');
    }
    const data = JSON.parse(await readFile(global.fileName));

    account = {
      id: data.nextId++,
      name: account.name,
      balance: account.balance,
    };

    data.accounts.push(account);

    res.send(account);
    writeFile(global.fileName, JSON.stringify(data, null, 2));
    global.logger.info(`POST /account - ${JSON.stringify(account)}`);
  } catch (err) {
    next(err);
  }

  res.end;
});
router.get('/', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    res.send(data.accounts);
    global.logger.info(`GET /account`);
  } catch (err) {
    next(err);
  }
});
router.get('/:id', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    const account = data.accounts.find(
      (account) => account.id === parseInt(req.params.id)
    );
    res.send(account);
    global.logger.info(`GET /account/:id`);
  } catch (err) {
    next(err);
  }
});
router.delete('/:id', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    data.accounts = data.accounts.filter(
      (account) => account.id !== parseInt(req.params.id)
    );
    await writeFile(global.fileName, JSON.stringify(data, null, 2));
    res.send(data.accounts);
    global.logger.info(`DELETE /account - ${req.params.id}`);
  } catch (err) {
    next(err);
  }
});
router.put('/', async (req, res, next) => {
  try {
    const account = req.body;

    if (!account.name || account.balance == null) {
      throw new Error('Name e Balance são obrigatorios');
    }

    const data = JSON.parse(await readFile(global.fileName));

    const index = data.accounts.findIndex((a) => a.id === parseInt(account.id));

    if (index === -1) {
      throw new Error('Registro não encontrado');
    }
    data.accounts[index].name = account.name;
    data.accounts[index].balance = account.balance;
    await writeFile(global.fileName, JSON.stringify(data, null, 2));
    res.send(data.accounts[index]);
    global.logger.info(`PUT /account - ${JSON.stringify(account)}`);
  } catch (err) {
    next(err);
  }
});
router.patch('/updateBalance', async (req, res, next) => {
  try {
    const account = req.body;

    if (!account.id || account.balance == null) {
      throw new Error('Name e Balance são obrigatorios');
    }
    const data = JSON.parse(await readFile(global.fileName));

    const index = data.accounts.findIndex((a) => a.id === parseInt(account.id));
    if (index === -1) {
      throw new Error('Registro não encontrado');
    }
    data.accounts[index].balance = account.balance;

    await writeFile(global.fileName, JSON.stringify(data, null, 2));
    res.send(data.accounts[index]);
    global.logger.info(
      `PATCH /account/updateBalance - ${JSON.stringify(account)}`
    );
  } catch (err) {
    next(err);
  }
});
router.use((err, req, res, next) => {
  global.logger.error(`${req.method} ${req.baseUrel} - ${err.message}`);
  res.status(400).send({ error: err.message });
  next();
});
export default router;
