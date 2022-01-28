import { ThirdwebSDK } from "@3rdweb/sdk";
import ethers from "ethers";
import axio from 'axios'
import FormData from 'form-data';

// Read environment variables from .env
import dotenv from "dotenv";
dotenv.config();

import { readFile } from 'fs/promises';
const abi = JSON.parse(
  await readFile(
    new URL('./Registry.json', import.meta.url)
  )
);

const walletPrivateKey = process.env.WALLET_PRIVATE_KEY;

if (!walletPrivateKey) {
  console.error("Wallet private key missing")
  process.exit(1)
}

export const sdk = new ThirdwebSDK(
  new ethers.Wallet(
    // Wallet private key. NEVER CHECK THE KEY IN. ALWAYS USE ENVIRONMENT VARIABLES.
    process.env.WALLET_PRIVATE_KEY,
    // We use Polygon Mumbai network
    ethers.getDefaultProvider("https://rpc-mumbai.maticvigil.com")
  ),
);

const appAddress = process.env.THIRDWEB_PROJECT; // your project address from thirdweb

export async function getApp() {
  const app = await sdk.getAppModule(appAddress);
  return app;
}

export async function requestTokenFromFaucet (addr) {
  let url = "https://api.faucet.matic.network/transferTokens"

  console.log("Request Matic")

  let data = {
    "network":"mumbai",
    "address": addr,
    "token":"maticToken"
  }
  await axio.post(url, data)

  console.log("Request Link")

  data.token = 'link'

  await axio.post(url, data)
}

export async function login (wallet) {
  let url = "https://www.pointer.gg/api/auth/nonce"

  console.log("Login")

  let data = {"walletAddress": wallet.address}
  let res = await axio.post(url, data)
  let nonce = res.data.nonce

  data = {
    "walletAddress": wallet.address,
    "nonce": nonce,
    "signature": await wallet.signMessage(nonce)
  }
  url = "https://www.pointer.gg/api/auth/wallet"
  res = await axio.post(url, data)

  return res.data
}

export async function createProject(wallet) {
  let contract = new ethers.Contract('0x902a29f2cfe9f8580ad672AaAD7E917d85ca9a2E', abi, wallet);

  let addr = await contract.getProtocolControl(wallet.address, 1)
  if ('0x0000000000000000000000000000000000000000' != addr) {
    return addr
  }

  let url = "https://upload.nftlabs.co/upload"
  let formData = new FormData();
  let projectName = 'Huston'+wallet.address.slice(0,6)
  formData.append('file', JSON.stringify({name: projectName, description: ''}));
  let res = await axio.post(url, formData, {
    headers: formData.getHeaders()
  })

  let { IpfsUri } = res.data

  // console.log("Deploy Protocol", projectName, IpfsUri)

  let tx = await contract.deployProtocol(IpfsUri)
  await tx.wait()

  return await contract.getProtocolControl(wallet.address, 1)
}
