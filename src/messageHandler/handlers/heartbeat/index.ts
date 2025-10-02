import { MessageType } from "../../../enums.ts";
import type { IClient } from "../../../models/client.ts";

/**
 * When a heartbeat comes in:
 * 1. update the client lastPing timestamp
 * 2. send back a HEARTBEAT message so clients can detect “alive” signals
 */
export const HeartbeatHandler = (
  client: IClient | undefined
): boolean => {
  if (client) {
    const nowTime = Date.now();
    client.setLastPing(nowTime);

    // ↳ send the ACK back to the same client
    client.send({
      type: MessageType.HEARTBEAT,
      // optional: include payload if you want to echo timestamp
      payload: { timestamp: nowTime },
    });
  }
  return true;
};
