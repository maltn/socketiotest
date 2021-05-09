const app = require("express")()
const http = require("http").createServer(app)
const io = require("socket.io")(http, {
  cors: {origin: "*"} 
});

io.on("connection", (socket) => {
	console.log("connection established");

	socket.on("message", (data) => {
		console.log("Message sent: ", data);
		io.emit("message", {
			msg: data,
			senderid: socket.id
		})
	})
})

http.listen(4000, () => {
	console.log("listening on 4000")
})
