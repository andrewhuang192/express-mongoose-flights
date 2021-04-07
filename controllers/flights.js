// const flight = require("../models/flight");
const Flight = require("../models/flight");
const Ticket = require('../models/ticket');

module.exports = {
    index,  
    new: newFlight, 
    create: create, 
    show: show, 
    delete: deleteFlight, 
}

function index(req, res) {
    Flight.find({}, function(err, flights) {
        let d = new Date();
        d.setFullYear(d.getFullYear() + 1);
        let newFlight = new Flight();
        let dt = newFlight.departs;
        let destDate = `${dt.getFullYear()}-${dt.getMonth() + 1}-${dt.getDate()}T${dt.getHours().toString().padStart(2, '0')}:${dt.getMinutes().toString().padStart(2, '0')}`;
        flights.sort((a,b) => (a.departs > b.departs) ? 1 : -1);
        res.render("flights/index", {flights, destDate, d});
    });
}

function show(req, res) {
    Flight.findById(req.params.id, function(err, flight) {
        let newFlight = new Flight();
        let dt = newFlight.departs;
        // let destDate = `0${dt.getMonth() + 1}-0${dt.getDate()}-${dt.getFullYear()}T${dt.getHours().toString().padStart(2, '0')}:${dt.getMinutes().toString().padStart(2, '0')}`;
        let destDate = dt.toISOString().slice(0, 16);
        flight.destinations.sort((a,b) => (a.arrival > b.arrival) ? 1 : -1);
        Ticket.find({ flight: flight._id}, function(err, tickets){
            res.render('flights/show', { title: 'Flight Destinations', flight, destDate, tickets });
        });
    });
  }

function newFlight (req, res) {
    // res.render('flights/new', { title: 'Add Flight' }, );
    let d = new Date();
    d.setFullYear(d.getFullYear() + 1);
    let newFlight = new Flight();
    let dt = newFlight.departs;
    // let destDate = `0${dt.getMonth() + 1}-0${dt.getDate()}-${dt.getFullYear()}T${dt.getHours().toString().padStart(2, '0')}:${dt.getMinutes().toString().padStart(2, '0')}`;
    let destDate = dt.toISOString().slice(0, 16);
    res.render("flights/new", {destDate, d});
    return d, destDate;
}

function create (req, res) {
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key];
    }
    const flight = new Flight(req.body);
    flight.save(function(err) {
        // one way to handle errors
        if (err) return res.redirect('/flights/new');
        console.log(flight);
        // for now, redirect right back to index.ejs
        res.redirect('/flights');
    });
}

function deleteFlight(req, res, next) {
    Flight.findByIdAndDelete(req.params.id, function(err, flights) {
        res.redirect(`/flights`);
    });
}