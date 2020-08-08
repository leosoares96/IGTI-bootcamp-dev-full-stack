import express from 'express';
import { promises as fs } from 'fs';

const router = express.Router();
const { writeFile, readFile } = fs;

router.post('/', async (req, res, next) => {
  try {
    const params = req.body;
    const data = JSON.parse(await readFile(global.fileName));

    const newGrade = {
      id: data.nextId++,
      student: params.student,
      subject: params.subject,
      type: params.type,
      value: params.value,
      timestamp: new Date(),
    };
    data.grades.push(newGrade);
    await writeFile(global.fileName, JSON.stringify(data, null, 0));
    res.send(newGrade);
  } catch (err) {
    next(err);
  }
});
router.put('/', async (req, res, next) => {
  try {
    const params = req.body;
    const data = JSON.parse(await readFile(global.fileName));

    const index = data.grades.findIndex((a) => a.id == parseInt(params.id));
    if (index === -1) {
      throw new Error('Id não encontrado.');
    }

    const newGrade = {
      id: params.id,
      student: params.student,
      subject: params.subject,
      type: params.type,
      value: params.value,
      timestamp: new Date(),
    };
    data.grades[index] = newGrade;

    await writeFile(global.fileName, JSON.stringify(data, null, 0));
    res.send(newGrade);
  } catch (err) {
    next(err);
  }
});
router.delete('/:id', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));

    data.grades = data.grades.filter((a) => a.id !== parseInt(req.params.id));

    await writeFile(global.fileName, JSON.stringify(data, null, 0));
    res.send(data.grades);
  } catch (err) {
    next(err);
  }
});
router.get('/notaTotal', async (req, res, next) => {
  try {
    const { student, subject } = req.query;
    const data = JSON.parse(await readFile(global.fileName));

    data.grades = data.grades.filter((a) => {
      return a.student === student && a.subject === subject;
    });
    const notaTotal = data.grades.reduce((acc, cur) => {
      return acc + parseInt(cur.value);
    }, 0);
    const result = {
      student,
      subject,
      notaTotal,
    };
    res.send(result);
  } catch (err) {
    next(err);
  }
});
router.get('/mediaNotas', async (req, res, next) => {
  try {
    const { subject, type } = req.query;
    const data = JSON.parse(await readFile(global.fileName));

    data.grades = data.grades.filter((a) => {
      return a.type === type && a.subject === subject;
    });
    const mediaNota =
      data.grades.reduce((acc, cur) => {
        return acc + parseInt(cur.value);
      }, 0) / data.grades.length;

    const result = {
      subject,
      type,
      mediaNota,
    };
    res.send(result);
  } catch (err) {
    next(err);
  }
});
router.get('/maioresNotas', async (req, res, next) => {
  try {
    const { subject, type } = req.query;
    const data = JSON.parse(await readFile(global.fileName));

    data.grades = data.grades.filter((a) => {
      return a.type === type && a.subject === subject;
    });
    data.grades.sort((a, b) => {
      return b.value - a.value;
    });

    res.send(data.grades);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res) => {
  const data = JSON.parse(await readFile(global.fileName));
  data.grades = data.grades.filter((a) => a.id === parseInt(req.params.id));
  res.send(data.grades);
});

router.get('/', async (req, res) => {
  const data = JSON.parse(await readFile(global.fileName));
  res.send(data.grades);
});

router.use((err, req, res, next) => {
  res.status(400).send(err);
});

export default router;
