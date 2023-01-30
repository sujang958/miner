import EventEmitter from 'events';
import { Socket } from 'net';
import handshake from '../handler/handshake';
import Server from '../server';
import SupportedProtocolVersions from '../data/protocolVersion';
import { PongResponse, StatusResponse } from '../handler/status';
import { readVarInt } from '../utils/varint';

export enum ProtocolStates {
  HANDSHAKING,
  STATUS,
  LOGIN,
  PLAY,
}

class Client extends EventEmitter {
  public protocolVersion?: number;

  constructor(
    public state: ProtocolStates = ProtocolStates.HANDSHAKING,
    public readonly id: string,
    public socket: Socket,
    public server: Server,
  ) {
    super();

    socket.on('data', async (packet) => {
      const { value: packetLength, length: plVarintLength } = readVarInt(packet);
      const { value: packetId, length: piVarintLength } = readVarInt(
        packet.subarray(plVarintLength),
      );
      const data = packet.subarray(plVarintLength + piVarintLength);

      if (this.state === ProtocolStates.HANDSHAKING) {
        const { nextState, protocolVersion } = await handshake(data);

        this.protocolVersion = protocolVersion;

        if (nextState == 1) {
          this.state = ProtocolStates.STATUS;
          return socket.write(await StatusResponse(server));
        } else if (nextState == 2) return (this.state = ProtocolStates.LOGIN);
        else socket.end();
      }
      if (this.state === ProtocolStates.STATUS) {
        if (packetId == 0x00) return socket.write(await StatusResponse(server));
        else if (packetId == 0x01) return socket.write(await PongResponse(data));
      }
    });
  }
}

export default Client;
