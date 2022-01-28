import dotenv from "dotenv";
import { Wallet, getDefaultProvider } from 'ethers';
import { requestTokenFromFaucet, login, createProject } from './helpers.js'

dotenv.config();

const provider = getDefaultProvider('https://matic-mumbai.chainstacklabs.com')
const walletPrivateKey = process.env.WALLET_PRIVATE_KEY;

;(async () => {
  let wallet = new Wallet(walletPrivateKey, provider)

  console.log('Address', wallet.address);

  await requestTokenFromFaucet(wallet.address)

  let res = await login(wallet);
  console.log('Token:', res.token)
  console.log('User ID:', res.user.id)

  // Create Project
  let appAddress = await createProject(wallet)
  console.log("Project Address:", appAddress)
})()
