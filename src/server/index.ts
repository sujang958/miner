import { createServer, Server as SocketServer } from "net"
import Client from "../client"
import { EventEmitter } from "stream"
import { v4 } from "uuid"

class Server extends EventEmitter {
  public clients: Map<string, Client> = new Map()
  public socketServer: SocketServer

  constructor(public readonly version: string) {
    super()

    this.socketServer = createServer()

    this.socketServer.on("connection", (socket) => {
      let id = v4()
      while (true) {
        if (!this.clients.has(id)) break
        id = v4()
      }

      this.clients.set(id, new Client(undefined, id, socket, this))

      socket.on("data", (packet) => {
        console.log(packet, packet.length, packet.BYTES_PER_ELEMENT)
      })

      socket.on("close", () => {
        console.log("close")
      })
    })
  }

  listen(port: number) {
    this.socketServer.listen(port, () => {
      console.log("Listening on port", port)
    })
  }
}

export default Server
