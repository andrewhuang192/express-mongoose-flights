const Flight = require("../models/flight");
const Ticket = require('../models/ticket');

module.exports = {
    new: newTicket, 
    create: create,  
    delete: deleteTicket, 
}

function newTicket (req, res) {
    Flight.findById(req.params.id, function(err, flight) {
        Ticket.find({ flight: flight._id }, function(err, tickets) {
            res.render("tickets/new", { title: 'Add Ticket', tickets, flightId: req.params.id});
         });
    });
}

function create (req, res) {
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key];
    }
    req.body.flight = req.params.id;
    Flight.findById(req.params.id, function(err, flight){
        Ticket.create(req.body, function(err, ticket) {
            console.log(flight)
            console.log(ticket)
            res.redirect(`/flights/${flight._id}`);
        });
    });
    // const ticket = new Ticket(req.body);
    // ticket.save(function(err) {
    //     // one way to handle errors
    //     if (err) return res.redirect('/tickets/new');
    //     console.log(ticket);
    //     // for now, redirect right back to index.ejs
    //     res.redirect(`/flights/${flight._id}`);
    };


function deleteTicket(req, res, next) {
    Ticket.findByIdAndDelete(req.params.id, function(err, ticket) {
        res.redirect(`/flights/${ticket.flight}`);
    });
}