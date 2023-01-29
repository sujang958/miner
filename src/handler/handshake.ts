import { readVarInt } from "../utils/varint"

const handshake = async (packet: Buffer) => {
  const fields = packet.subarray(2)
  const { value: protocolVersion, length: pvLength } = readVarInt(fields)

  let restOfFields = fields.subarray(pvLength)

  const { value: serverAddressOffset, length: saLength } =
    readVarInt(restOfFields)
  const serverAddress = [
    ...restOfFields.subarray(saLength, serverAddressOffset + saLength),
  ]
    .map((v) => String.fromCharCode(v))
    .join("")

  restOfFields = restOfFields.subarray(serverAddressOffset + saLength)

  const serverPort = parseInt(restOfFields.subarray(0, 2).toString("hex"), 16)

  restOfFields = restOfFields.subarray(2)

  const { value: nextState } = readVarInt(restOfFields)

  return { protocolVersion, serverAddress, serverPort, nextState }
}

export default handshake
