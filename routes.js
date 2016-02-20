'use strict';
var express = require( 'express' );
var router = express.Router();

module.export = function ( app ) {
  app.get( '/', function ( req, res ) {
    res.redirect( '/app.html' );
  });

  app.all( '/:obj_type/*?', function ( req, res, next ) {
    res.contentType( 'json' );
    next();
  });

  app.get( '/:obj_type/list', function ( req, res ) {
    res.send({ title: req.params.obj_type + ' list' });
  });

  app.post( '/:obj_type/create', function ( req, res ) {
    res.send({ title: req.params.obj_type + ' created' });
  });

  app.get( '/:obj_type/read/:id([0-9]+)',
    function ( req, res ) {
        res.send({
        title: req.params.obj_type
            + ' with id ' + req.params.id + ' found'
        });
    }
  );

  app.post( '/:obj_type/update/:id([0-9]+)',
    function ( req, res ) {
        res.send({
        title: req.params.obj_type
            + ' with id ' + req.params.id + ' updated'
        });
    }
  );

  app.get( '/:obj_type/delete/:id([0-9]+)',
    function ( req, res ) {
        res.send({
        title: req.params.obj_type
            + ' with id ' + req.params.id + ' deleted'
        });
    }
  );
};