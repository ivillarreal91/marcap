const Servicio = require('../models/catalogo_servicios');

exports.create = (req, res) => {
	let service = new Servicio({
		cat: req.body.cat,
		area: req.body.area,
		item: req.body.item
	});

	service.save((err)=>{
		if (err) {
			return res.send({message:err,error:1});;
		}
		res.send({message:'Se creo con exito la insidencia',error:0})
	})
};

exports.detail = (req,res) => {
	Servicio.findById(req.params.id,(err, service) => {
		if (err) return res.send({message:err,error:1});;
		res.send(service);
	})
}

exports.detailAll = (req,res) => {
	Servicio.find((err, service) => {
		if (err) return res.send({message:err,error:1});
		res.send(service);
	})
}

exports.update = (req, res) => {
	Servicio.findOneAndUpdate({_id:req.params.id}, {
		$set: req.body
	}, (err) => {
		if (err) return res.send({message:err,error:1});
		res.send({message:'Insidencia actualizada',error:0});
	});
}

exports.delete = (req, res) => {
	Servicio.findOneAndDelete({_id:req.params.id}, (err) => {
		if (err) return res.send({message:err,error:1});
		res.send({ message:'Insidencia eliminada',error:0 });
	})
}