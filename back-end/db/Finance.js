const mongoose = require('mongoose');

const financeSchema = new mongoose.Schema({
    description: String,
    category: String,
    amount: Number,
});

module.exports = mongoose.model("finance", financeSchema);