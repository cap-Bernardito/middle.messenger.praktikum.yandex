import WSTransport from "shared/utils/ws-transport";

import { getWS } from "./get-ws";

export const closeWS = async () => {
  const sockets = await getWS("all");

  if (!sockets) {
    return;
  }

  for (const socket of Object.values(sockets) as WSTransport[]) {
    socket.close();
  }
};
