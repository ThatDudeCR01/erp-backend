const moment = require("moment-timezone");

const obtenerFechaCostaRica = (fecha) => {
  return moment(fecha).tz("America/Costa_Rica").format();
};

module.exports = {
  obtenerFechaCostaRica,
};
