import { LEB128 } from "@minhducsun2002/leb128"

const formatPacket = async (id: string, buffer: Buffer) => {
  const packetId = Buffer.from(LEB128.encode(parseInt(id)))
  const packetLength = Buffer.from(
    LEB128.encode(buffer.length + packetId.length)
  )

  return Buffer.concat([packetLength, packetId, buffer])
}

export default formatPacket
