import { Web3Storage } from "web3.storage";

const token = process.env.NEXT_PUBLIC_WEB3_API_TOKEN!;

export const web3Client = new Web3Storage({ token });
