const Flight = require('../models/flight');

module.exports = {
    create,
    delete: deleteDestination,
  };

  function create(req, res) {
    let d = new Date();
    d.setFullYear(d.getFullYear() + 1);
    Flight.findById(req.params.id, function(err, flight) {
      flight.destinations.push(req.body);
      flight.save(function(err) {
        console.log(flight);

        res.redirect(`/flights/${flight._id}`);
      });
    });
  }

  function deleteDestination(req, res, next) {
    Flight.findOne( { "destinations._id": req.params.id}, function(err, flight) {
        // console.log(flight);
        flight.destinations.id(req.params.id).remove();
        flight.save(function(err) {
          res.redirect(`/flights/${flight._id}`)
         })
      });
    };
  