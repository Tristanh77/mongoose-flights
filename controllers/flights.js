const FlightModel = require('../models/flights');

module.exports = {
	new: newflight,
    create,
    index,
    show
}

function show(req, res) {
	
	FlightModel.findById(req.params.id)
			  .then(function(flightDoc){
				console.log(flightDoc) // <- movieDoc is the object from the database!
					res.render('flights/show', {
                        flight: flightDoc,
                    })
			  }).catch((err) =>{
				console.log(err);
				res.send(err)
			  })
  }

function newflight(req, res){
	res.render('flights/new');
}

function create(req, res){

	console.log(req.body, " <- contents of the form, req.body");
	FlightModel.create(req.body)
	.then(function(flightWeCreatedInTheDb){
				console.log(flightWeCreatedInTheDb, " <- flight document")
				res.redirect(`/flights/${flightWeCreatedInTheDb._id}`); 
		
			}).catch((err) => {
				console.log(err);
				res.send('There was an error check the terminal, or log the err object')
			})
        }
function index(req, res){

	//  the empty object {} is called a
	// query object, mongoose
	FlightModel.find({})
	// MovieModel.find is our mongoose model going to mongodb
	// to find all the movies in the movies collection
	// when the model comes back from the database
	// we want a function to run
	// that is the .then
			  .then(function(allFlights){

				console.log(allFlights, " <_ data from the db")
				// respond to the client in the .then, we have to wait 
				// for the data to come back from the database
				res.render('flights/index', {flights: allFlights})
			  }).catch(function(err){
				console.log(err);
				res.send(err)
			  })

	
}

