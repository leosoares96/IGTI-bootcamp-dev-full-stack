import express from 'express';
import { promises as fs, write } from 'fs';

const { readFile, writeFile } = fs;

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    let account = req.body;
    const data = JSON.parse(await readFile(global.FileName));

    account = { id: data.nextId++, ...account };

    data.accounts.push(account);

    writeFile(global.FileName, JSON.stringify(data, null, 2));

    res.send(account);
  } catch (err) {
    next();
  }

  res.end;
});
router.get('/', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.FileName));

    res.send(data.accounts);
  } catch (err) {
    next();
  }
});
router.get('/:id', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.FileName));
    const account = data.accounts.find(
      (account) => account.id === parseInt(req.params.id)
    );
    res.send(account);
  } catch (err) {
    next();
  }
});
router.delete('/:id', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.FileName));
    data.accounts = data.accounts.filter(
      (account) => account.id !== parseInt(req.params.id)
    );
    await writeFile(global.FileName, JSON.stringify(data, null, 2));
    res.send(data.accounts);
  } catch (err) {
    next();
  }
});
router.put('/', async (req, res, next) => {
  try {
    const account = req.body;
    const data = JSON.parse(await readFile(global.FileName));

    const index = data.accounts.findIndex((a) => a.id === parseInt(account.id));
    data.accounts[index] = account;

    await writeFile(global.FileName, JSON.stringify(data, null, 2));
    res.send(data.accounts[index]);
  } catch (err) {
    next();
  }
});
router.patch('/updateBalance', async (req, res, next) => {
  try {
    const account = req.body;
    const data = JSON.parse(await readFile(global.FileName));

    const index = data.accounts.findIndex((a) => a.id === parseInt(account.id));

    data.accounts[index].balance = account.balance;

    await writeFile(global.FileName, JSON.stringify(data, null, 2));
    res.send(data.accounts[index]);
  } catch (err) {
    next();
  }
});

router.use((err, req, res, next) => {
  console.log(err);
  res.status(400).send({ error: err.message });
  next();
});
export default router;
