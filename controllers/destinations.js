const FlightModel = require('../models/flights');

module.exports = {
	create
}

function create(req, res){
	console.log(req.body, ' <- req.body in create destinations')

	FlightModel.findById(req.params.id)
			   .then(function(flightDocument){
					console.log(flightDocument)
					flightDocument.destinations.push(req.body);
					flightDocument.save()
								 .then(function(){
									res.redirect(`/flights/${req.params.id}`)
								 })
			   }).catch(err =>{
				console.log(err);
				res.send(err)
			   })

}