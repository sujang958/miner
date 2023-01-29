import EventEmitter from "events"
import { Socket } from "net"
import handshake from "../handler/handshake"
import Server from "../server"
import ProtocolVersions from "../data/protocolVersion"

export enum ProtocolStates {
  HANDSHAKING,
  STATUS,
  LOGIN,
  PLAY,
}

class Client extends EventEmitter {
  public protocolVersion?: number

  constructor(
    public state: ProtocolStates = ProtocolStates.HANDSHAKING,
    public readonly id: string,
    public socket: Socket,
    public server: Server
  ) {
    super()

    socket.on("data", async (packet) => {
      if (this.state === ProtocolStates.HANDSHAKING) {
        const { nextState, protocolVersion } = await handshake(packet)

        this.protocolVersion = protocolVersion

        if (nextState == 1) return (this.state = ProtocolStates.STATUS)
        else if (nextState == 2) return (this.state = ProtocolStates.LOGIN)
        else socket.end()
      }
    })
  }
}

export default Client
