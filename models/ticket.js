const mongoose = require("mongoose");
//shortcut to mongoose Schema
const Schema = mongoose.Schema; 

const ticketSchema = new Schema(
    {
        seat: {
            type: String,
            match: /[A-F][1-9]\d?/
        },
        price: {
            type: Number,
            default: 10,
            min: 0,
        },
        flight: {
            type: Schema.Types.ObjectId,
            ref: 'Flight'
        }   
    },
    {
        timestamps: true, 
    },
);

module.exports = mongoose.model("Ticket", ticketSchema)
