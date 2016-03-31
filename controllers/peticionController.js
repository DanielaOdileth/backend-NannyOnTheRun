var peticion = require('../schemas/peticion');
var SHA3 = require("crypto-js/sha3");
var boom = require('boom');

exports.createPeticion = {
    auth: {
      mode:'try',
      strategy:'session',
      scope: 'regular'
    },
    handler: function(request, reply) {
      console.log(request.payload);
       var newPeticion = new peticion({
         idnanny: request.params.userId,
         iduser : request.params.userId,
         //Validar si la nanny esta disponible
         datein : request.payload.datein,
         dateout : request.payload.dateout,
         statusnanny : request.payload.statusnanny,
         statususer : request.payload.statususer
       });
       newPeticion.save(function (err) {
        return reply('ok');
      });
  }
}

  exports.aceptarPeticion = {
    auth: {
      mode: 'required',
      strategy: 'session',
      scope: 'nanny'
    },
    handler: function(request, reply) {
      var filterBy = request.paramas.peticionId;

      peticion.findOneAndUpdate(
        { _id: filterBy },
        {
          statusnanny : 'aceptado',
          statususer : 'aceptado',
        }, function (err, peticion){
          peticion.save(function(err){
            return reply('ok');
            console.log('Solicutud aprobada');
          });
        });
    }
  }

  exports.negarPeticion = {
    auth: {
      mode : 'required',
      strategy : 'session',
      scope: 'nanny'
    },
    handler: function(request, reply){
      var filterBy = request.paramas.peticionId;

      peticion.findOneAndUpdate(
        {_id: filterBy },
        {
          statusnanny: 'rechazado',
          statususer: 'denegado'
        }, function (err, peticion){
          peticion.save(function(err){
            return reply('ok');
            console.log('Solicitud Denegada');
          });
        });
    }
  }

  exports.cancelarPeticion = {
    auth: {
      mode : 'required',
      strategy: 'session',
      scope: ['regular']
    },
    handler: function(request, reply){
      var filterBy = request.params.peticionId;

      peticion.findOneAndUpdate(
        {_id: filterBy},
        {
          //Validar si esta a tiempo de CANCELAR la Solicitud
          statusnanny: 'cancelado',
          statususer: 'cancelado'
        }, function (err, peticion) {
          peticion.save(function(err){
            return reply('ok');
            console.log('Solicitud Cancelada');
          });
        });
    }
  }

  exports.getPeticion = {
    auth: {
      mode : 'required',
      strategy : 'session',
    },
    handler: function(request, reply){
        var peticiones = peticiones.find({});
        reply(peticiones);
    }
  }
