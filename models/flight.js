const mongoose = require("mongoose");
//shortcut to mongoose Schema
const Schema = mongoose.Schema; 

const destinationSchema = new Schema(
    {
        airport: {
            type: String, 
            enum: ["AUS", "DFW", "DEN", "LAX", "SAN"],
        },
        cabin: {
            type: String,
            enum: ["First Class", "Business", "Economy"],
        },
        arrival: {
            type: Date, 
            default: function() {
                let d = new Date();
                d.setFullYear(d.getFullYear() + 1);
                return d;
            },
        },
    }, {
    timestamps: true
});

const flightSchema = new Schema(
    {
        airline: {
            type: String, 
            enum: ["American", "Southwest", "United"],
        },
        airport: {
            type: String, 
            enum: ["AUS", "DFW", "DEN", "LAX", "SAN"],
            default: function(){
                return "DEN";
            },
        },
        flightNo: {
            type: Number, 
            min: 10, 
            max: 9999, 
            required: true,
            default: 10,
        },
        departs: {
            type: Date,  
            default: function() {
                let d = new Date();
                d.setFullYear(d.getFullYear() + 1);
                return d;
            },
        },
        destinations: [destinationSchema],
    },
        {
            timestamps: true, 
        },
);

module.exports = mongoose.model("Flight", flightSchema)






