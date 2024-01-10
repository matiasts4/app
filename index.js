const express = require('express');
const session = require('express-session');
const app = express();
const port = 3000;

app.use('/', express.static('static'));
function formatFecha(fecha) {
  const date = new Date(fecha);
  return date.toLocaleDateString('es-ES');
}

app.use(session({
  secret: 'my-secret',  
  resave: false,  
  saveUninitialized: false 
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/';
var dbName = 'databasePrueba';
var mongo= require('mongodb');

var userData = {
  email: '21503630@gmail.com',
  clave: '1234',
  nombre: 'Juan'
};



app.post('/login', (req, res) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(dbName);
    dbo.collection('usuarios').findOne({ email: req.body.email, clave: req.body.clave }, function (err, result) {
     
	 if (err) throw err;
      if (result) {
		req.session.nombre = result.nombre;
       res.send(true);
      } else {
        res.send(false);
      }
      db.close();
    });
  });
});

app.post('/verificardatos', (req, res) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(dbName);
    dbo.collection('usuarios').findOne({ email: req.body.email, clave: req.body.clave }, function (err, result) {
      if (err) throw err;
      if (result) {
		 req.session.nombre=result.nombre;
        res.redirect('/crear');
      } else {
        res.send('datos incorrectos');
      }
      db.close();
    });
  });
})
app.get('/crear', (req, res) => {
  if (req.session.nombre) {
		   res.render('crear', {
		  nombre: req.session.nombre
		});
  } else {
    res.redirect('/registro');
  }
});

app.get('/usuarios/corriente', (req, res) => {
  if (req.session.nombre) {
	  var json= {
		  nombreUsuario: req.session.nombre}
    res.send(json);
  } else {
    res.send(false);
  }
});

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/salir', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

app.get('/usuarios/salir', (req, res) => {
  req.session.destroy();
  res.send(true);
});

app.get('/votaciones', (req, res) => {
  res.render('votaciones');
});

app.get('/inicioSesion', (req, res) => {
  res.render('inicioSesion');
});

app.get('/registro', (req, res) => {
  res.render('registro');
});

app.get('/proyectosanteriores', (req, res) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(dbName);
    dbo.collection('eventos').find({ activo: false }).toArray(function (err, result) {
      if (err) throw err;
      res.render('proyectosanteriores', { eventosAnteriores: result });
      db.close();
    });
  });
})



app.get('/verDetalles1', (req, res) => {
  res.render('verDetalles1');
});

app.get('/verDetalles3', (req, res) => {
  res.render('verDetalles3');
});

app.post('/agregarUsuario', (req, res) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(dbName);

    dbo.collection('usuarios').findOne ({ email: req.body.email }, function (err, result) {
      if (err) throw err;

      if (result) {
        db.close();
        res.send("El usuario ya está registrado");
      } else {
        var myobj = { nombre: req.body.nombre, email: req.body.email, clave: req.body.clave };
        dbo.collection("usuarios").insertOne(myobj, function (err, result) {
          if (err) {
            db.close();
            res.send('Error al insertar el usuario');
            return;
          }
          db.close();
          res.redirect("/inicioSesion");
        });
      }
    });
  });
})

app.post('/usuarios/crear', (req, res) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(dbName);

    dbo.collection('usuarios').findOne ({ email: req.body.email }, function (err, result) {
      if (err) throw err;

      if (result) {
        db.close();
        res.send(false);
      } else {
        var myobj = { nombre: req.body.nombre, email: req.body.email, clave: req.body.clave };
        dbo.collection("usuarios").insertOne(myobj, function (err, result) {
          if (err) throw err;
          db.close();
          res.send(true);
        });
      }
    });
  });
})

app.post('/usuarios/ingresar', (req, res) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(dbName);
    dbo.collection('usuarios').findOne({ email: req.body.email, clave: req.body.clave }, function (err, result) {
      if (err) throw err;
      if (result) {
		 req.session.nombre=result.nombre;
        res.send(true);
      } else {
        res.send(false);
      }
      db.close();
    });
  });
})

app.get('/crearVotacion', (req, res) => {
  if (req.session.nombre) {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db(dbName);

      var evento = {
        titulo: req.query.titulo,
        participantes: req.query.participantes,
        participantesCantidad: 0,
        activo: true,
        timestamp: Date.now(),
        fechaTerminoEsperada: formatFecha(req.query.fechaTerminoEsperada)
      };
      dbo.collection("eventos").insertOne(evento, function (err, result) {
        if (err) {
          db.close();
          res.send('Error al insertar el evento');
          return;
        }
        db.close();
        res.redirect("/eventos");
      });
    });
  } else {
    res.send('Acceso no autorizado'); 
  }
});

app.post('/eventos/crear', (req, res) => {
  if (req.session.nombre) {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db(dbName);
      var evento = {
        titulo: req.body.titulo,
        participantes: req.body.participantes,
        participantesCantidad: 0,
        activo: true,
        timestamp: Date.now(),
        fechaTerminoEsperada: formatFecha(req.body.fechaTerminoEsperada)
      };
      dbo.collection("eventos").insertOne(evento, function (err, result) {
        if (err) {
          db.close();
          res.send(false);
          return;
        }
        db.close();
        res.send(true);
      });
    });
  } else {
    res.send(false); 
  }
  
});

//encontrarEvento
app.get('/eventos', (req, res) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(dbName);
    dbo.collection('eventos').find({}).toArray(function (err, result) {
      if (err) throw err;
       res.render('eventos',{
		   eventos: result
	   });
      db.close();
    });
  });
});

app.get('/agregarvoto', (req, res) => {
	MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(dbName);
    var o_id = new mongo.ObjectID(req.query.id);
	dbo.collection("eventos").updateOne({_id: o_id}, { $inc: { ["candidato" + req.query.candidato + "votos"]: 1 } });
    res.redirect("/votoConfirmado");
	
	});
})
app.post('/eventos/:id/votar', (req, res) => {
	MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(dbName);
    var o_id = new mongo.ObjectID(req.body.id);
	dbo.collection("eventos").updateOne({_id: o_id}, { $inc: { ["candidato" + req.body.candidato + "votos"]: 1 } });
    res.send(true);
	});
})
 //Eliminar evento 
app.get('/eliminarEvento', (req, res) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(dbName);
    dbo.collection('eventos').deleteOne({ _id: mongo.ObjectID(req.query.id) }, function(err, result) {
      if (err) throw err;
      console.log("Proyecto eliminado correctamente");
      res.send(true);
      db.close();
    });
  });
})
app.get('/eliminarEvento/:id', async (req, res) => {
  var eventId = req.params.id;
  try {
    let db = await MongoClient.connect(url);
    var dbo = db.db(dbName);
    var result = await dbo.collection('eventos').deleteOne({ _id: new mongo.ObjectID(eventId) });
    if (result.deletedCount > 0) {
 
      res.redirect('/app/');
    } else {
     
      res.status(404).send('Evento no encontrado para eliminar');
    }
    db.close();
  } catch (err) {
  
    console.error("Error al eliminar evento", err);
    res.status(500).send('Error interno del servidor');
  }
});

app.get('/verDetalles', (req, res) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(dbName);
    var o_id = new mongo.ObjectID(req.query.id); 
    dbo.collection('eventos').findOne({ _id: o_id }, function(err, result){
      if (err) throw err;
      const fecha = new Date(result.timestamp).toISOString().split('T')[0];
      res.render('verDetalles', { 
        eventos: result,
        fecha: fecha
      }); 
      db.close();
    });
  });
})
app.post('/eventos/actualizarEstado', (req, res) => {
  if (req.session.nombre) {
    mongoClient.connect(url, function(err, db) {
      if (err) throw err;
      const dbo = db.db(dbName);
      const query = { _id: mongo.ObjectID(req.body.id) };
      const newValues = { $set: { activo: req.body.activo } };
      dbo.collection("eventos").updateOne(query, newValues, function(err, result) {
        if (err) {
          db.close();
          res.send(false); 
        } else {
          db.close();
          res.send(true); 
        }
      });
    });
  } else {
    res.send(false);  
  }
});
app.get('/insertData', (req, res) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(dbName);
    var myobj = { name: 'Juan', correo: 'otrojuan@ciao.cl', contrasena: '4566' };
    dbo.collection('usuarios').insertOne(myobj, function (err, result) {
      if (err) throw err;
      res.send(result);
      db.close();
    });
  });
});

app.get('/findOneData', (req, res) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(dbName);
    dbo.collection('usuarios').findOne({ name: 'Juan' }, function (err, result) {
      if (err) throw err;
      res.send(result);
      db.close();
    });
  });
});
app.get('/eventos/:id', (req, res) => {
	
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(dbName);
    var o_id = new mongo.ObjectID(req.params.id);
    dbo.collection('eventos').findOne({ _id: o_id }, function(err, result){
      if (err) throw err;
      res.send( result );
      db.close();
    });
  });
})

app.get('/events', (req, res) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(dbName);
    var query = {};
    dbo.collection('eventos').find(query).toArray(function (err, result) {
      if (err) throw err;
      res.send(result);
      db.close();
    });
  });
});


	
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
}) 
 