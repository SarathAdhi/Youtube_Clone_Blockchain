import { create } from "ipfs-core";

export const ipfsClient = async () => {
  const client = await create({ repo: "ok" + Math.random() });
  return client;
};
