const Email = require('./models/Email');

const listEmails = (_req, res) => {
    Email.find()
        .sort({ date: -1 })
        .then(items => console.log(res.json(items)));
};

const registerEmail = (req, res) => {
    const newEmail = new Email({
        name: req.body.name,
        isEndangered: req.body.isEndangered || false,
    });
    newEmail
        .save()
        .then(item => res.json(item));
};

const updateEmail = (req, res) => {
    Email.findOneAndUpdate({ _id: req.params.id }, req.body)
        .then(() => res.json({ success: true }))
        .catch(err => res.status(404).json({ success: false }));
};

const deleteEmail = (req, res) => {
    Email.findOneAndDelete({ _id: req.params.id })
        .then(() => res.json({ success: true }))
        .catch(err => res.status(404).json({ success: false }));
};

module.exports = {
    listEmails,
    registerEmail,
    updateEmail,
    deleteEmail,
}
