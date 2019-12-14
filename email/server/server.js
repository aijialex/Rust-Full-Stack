const chalk = require("chalk");
const express = require('express');
const app = express();
app.use(express.json());

const useMongo = require("./db/mongoose");
useMongo();

const Animal = require('./models/Animal');

// Use async router and refactor the project
// Read all entries
app.get('/', (_req, res) => {
  Animal.find()
    .sort({ date: -1 })
    .then(items => console.log(res.json(items)));
});

// Add a new entry
app.post('/', (req, res) => {
  const newAnimal = new Animal({
    name: req.body.name,
    isEndangered: req.body.isEndangered || false,
  });
  newAnimal
    .save()
    .then(item => res.json(item));
});

// Delete an entry
app.delete('/:id', (req, res) => {
  Animal.findOneAndDelete({ _id: req.params.id })
    .then(() => res.json({ success: true }))
    .catch(err => res.status(404).json({ success: false }));
});

// Update an entry
app.put('/:id', (req, res) => {
  Animal.findOneAndUpdate({ _id: req.params.id }, req.body)
    .then(() => res.json({ success: true }))
    .catch(err => res.status(404).json({ success: false }));
});

const PORT = 8000;

app.listen(PORT, () => {
  const blue = chalk.blue;
  const target = blue(`http://localhost:${PORT}`);
  console.log(`🚀 Server ready at ${target}`);
});
