const jsonServer = require('json-server');
const path = require('path');
let jsonServerPort = process.env.JSON_SERVER_PORT || 4050;

module.exports = fixture => {
  return new Promise((resolve) => {
    let fixtureData = require(path.join(__dirname, 'fixtures', fixture + '.json'));
    const server = jsonServer.create();
    const router = jsonServer.router(fixtureData);
    const middlewares = jsonServer.defaults();

    server.use(middlewares);
    server.use(router);
    const serverHandle = server.listen(jsonServerPort, () => {
      resolve(serverHandle);
    });
  });
};

module.exports.close = world => {
  if (world.jsonServer) {
    world.jsonServer.close();
    world.jsonServer = null;
  }
};
