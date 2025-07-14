const express = require("express");
const mail = require("./singup-mail");
//import * as mail from "./singup-mail";
const path = require("path");
const port = process.env.PORT || 5500;
const app = express();
const server = require("http").createServer(app);

const iniciarServer = () => {
  var publicPath = path.resolve(__dirname, "../views");
  var publicSEOPath = path.resolve(__dirname, "../public");
  
  // Servir archivos estáticos
  app.use(express.static(publicPath));
  app.use(express.static(publicSEOPath));
  
  // Middleware para parsing de formularios
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  
  // set the view engine to ejs
  app.set("view engine", "ejs");

  // Rutas SEO específicas
  app.get("/robots.txt", function (req, res) {
    res.type('text/plain');
    res.sendFile(path.join(__dirname, "../public/robots.txt"));
  });
  
  app.get("/sitemap.xml", function (req, res) {
    res.type('application/xml');
    res.sendFile(path.join(__dirname, "../public/sitemap.xml"));
  });

  // Rutas principales
  app.get("/", function (req, res) {
    res.render("pages/index.ejs");
  });
  app.get("/redes", function (req, res) {
    res.render("pages/redes.ejs");
  });
  app.get("/contacto", function (req, res) {
    res.render("pages/contacto.ejs");
  });
  
  // Ruta para manejo de formulario de contacto
  app.post('/mail', function(req, res) {
    var titulo = req.body.txtNombre;
    console.log(titulo);
    // Aquí iría la lógica del mail
    res.redirect('/contacto');
  }); 
  
  // Función para intentar iniciar el servidor en el puerto especificado
  const startServer = (portToTry) => {
    server.listen(portToTry, () => {
      console.log(`El server esta corriendo en el puerto: ${portToTry}`);
    }).on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.log(`Puerto ${portToTry} está ocupado, intentando puerto ${portToTry + 1}`);
        startServer(portToTry + 1);
      } else {
        console.error('Error al iniciar el servidor:', err);
        process.exit(1);
      }
    });
  };
  
  // Iniciar servidor con manejo de errores
  startServer(port);
};

// Manejo de cierre graceful del servidor
process.on('SIGINT', () => {
  console.log('\nCerrando servidor...');
  server.close(() => {
    console.log('Servidor cerrado correctamente');
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  console.log('\nCerrando servidor...');
  server.close(() => {
    console.log('Servidor cerrado correctamente');
    process.exit(0);
  });
});

iniciarServer();
