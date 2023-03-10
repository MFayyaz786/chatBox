// listener.js
module.exports = function (io) {
  io.on("message", (data) => {
    console.log(data);
  });
};
