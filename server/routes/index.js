const peopleRoutes = require('./people');

const constructorMethod = (app) => {
  app.use('/people', peopleRoutes);
  app.use('/', (req, res) => {
    res.status(200).json("Hello World!")
  }); 
  app.use('*', (req, res) => {
    // console.log('yo')
    res.status(400).json("Error: Page not found.")
  });
};

module.exports = constructorMethod;
