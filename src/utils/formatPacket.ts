import { LEB128 } from "@minhducsun2002/leb128"

/**
 *
 * @param id {number} Should be hex value
 */
const formatPacket = async (id: number, buffer: Buffer) => {
  const packetLength = Buffer.from(LEB128.encode(buffer.length + 1))

  return Buffer.concat([
    packetLength,
    Buffer.from(id.toString(), "hex"),
    buffer,
  ])
}

export default formatPacket
