///////////////////////// PASO 1 (Herramientas-FONTEND) /////////////////////////
/* Estoy en la 52
  // Editor: ATOM (Obcional)
    Plugins:
      atom-babel-compiler
      atom-typescript
      file-icons
      hyperclick
      language-graphql
      less-than-slash
      linter
      linter-eslint
      linter-tslint
      linter-ui-default
  // Terminal: hyper.is
  // Interfaz de linea de comandos de Angular: cli.angular.io
    Instalar:
      > npm install -g @angular/cli
  // Utilizar modulos de npm: npmjs.com
    Buscar todos los módulos es esta página para ver como utilizarlos
  // Utilizar la ultima versión de NodeJS: nodejs.org
*/
///////////////////////// PASO 2 (Crear Proyecto) /////////////////////////
/*
  // Creamos e ingresamos al directorio del proyecto
    > ng new my-app && cd my-app
    > ng serve
  // Abrimos con el editor Atom
    > atom .
  // Modulos a utilizar (Front-End)
    // material.angular.io
      Seguimos la Documentación getting-started
      En el Paso 3 importamos módulos con la segunda alternativa
    // konpa.github.io/devicon
      iconos de desarrollo
    // angular2-moment (MomentModule)
      Maneja Fechas, EJ:
    // MomentModule
    // FormsModule
    // ReactiveFormsModule
    // Routing

*/

///////////////////////// PASO 3 /////////////////////////
// Hay varias maneras de organizar los archivos
  // (1) Siguiendo la funcionalidad de cada uno de los archivos
    // EJ. en un directorio colocamos todo lo relacionado a preguntas
    // EJ. en un directorio colocamos todo lo relacionado a la autenticacion de Usuarios
  // (2) Siguiendo una arquitectura
    // EJ: Modelos, Pantallas, Componentes, Servicios

///////////////////////// PASO 1 BACKEND /////////////////////////

// Install dependencies
> npm install --save babel-cli babel-preset-es2015

// Edit package.json and add scripts
{"start:server": "DEBUG=platzi-overflow* babel-node server/index.js"}

// Create .babelrc and add
{
  "presets": ["es2015"]
}

// Execute script
> npm run start:server

// Content server/index.js
import http from 'http'
import Debug from 'debug'

const PORT = 3000
const debug = Debug('platzi-overflow:root')

const app = http.createServer((req,res) => {
  debug('New request')
  res.writeHead(200, {'Content-Type':'text/plain'})
  res.write('Hola desde PlatziOverflow')
  res.end()
})

app.listen(PORT, () => {
  debug(`Server running at port ${PORT}`)
})

// Install Express
// express: Framework for NodeJs
// nodemon: Como un servidor(Node) que va a refrescar cada vez que cambiemos
// nuestros archivos (Similar a lo que haciamos con Angular cuando cambiamos
// un archivo se refrescaba la pantalla)
// concurrently: Permite correr procesos en paralelo con un comando (Nada mas)
// nos servirá mucho para levantar nuestro servidor de backend y levantar nuestra
// app de Angular al mismo tiempo
npm install --save express nodemon concurrently
// body-parser: leer los datos que vengan con el request desde el front-end
npm install --save body-parser
// Crea y administra los Token
npm install --save jsonwebtoken
// mongoosejs, es un framework de MongoDB
npm install --save mongoose
// Define un valor único en el Schema
npm install --save mongoose-unique-validator
// Para que reconozca la sintaxis de las ultimas propiedades de ecamscript
npm install --save-dev babel-preset-stage-0
// Módulo para encriptar contraseña
npm install --save bcryptjs

// Create file server/app.js
