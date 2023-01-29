import { LEB128 } from "@minhducsun2002/leb128"
import DefaultImageBase64 from "../data/defaultImage"
import Server from "../server"
import formatPacket from "../utils/formatPacket"

export const StatusResponse = async (server: Server) => {
  const status = JSON.stringify({
    version: {
      name: server.version,
      protocol: server.protocolVersion,
    },
    players: {
      max: 10,
      online: 0,
    },
    description: {
      text: "Motd",
    },
    // favicon: DefaultImageBase64,
    previewsChat: true,
    enforcesSecureChat: true,
  })

  return await formatPacket(
    "00",
    Buffer.concat([
      Buffer.from(LEB128.encode(status.length)),
      Buffer.from(status),
    ])
  )
}

export const PongResponse = async (data: Buffer) => {
  return await formatPacket("01", data)
}
