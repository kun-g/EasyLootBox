import axios from 'axios'
import dotenv from "dotenv";

dotenv.config();

async function startTutorial(tutorial_id) {
  console.log("Start tutorial")
  let url = "https://gcyrkvfwpvlwjrrklxnh.supabase.co/rest/v1/tutorial_starts"
  let data = {
    "user_id": process.env.USER_ID,
    "tutorial_id":tutorial_id
  }
  await axios.post(url, data, {
    headers: {
      "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MDY0NzQ1MywiZXhwIjoxOTU2MjIzNDUzfQ.aMlksrJ6pR0aqG-xb9hl_usDQw83Wj1pSBWoLefMEp0",
     "authorization": `Bearer ${process.env.TOKEN}`,
    }
  })
}

async function verify (tutorial_id) {
  console.log('Verify')

  let contractAddress = process.env.PACK_ADDRESS
  let url = "https://www.pointer.gg/api/verify-deployment"
  let data = {
    "tutorialId":tutorial_id,
    "contractAddress":contractAddress,
    "blockchain":{"name":"polygon","network":"testnet"}
  }
  await axios.post(url, data, {
    headers: {
     "auth-token": `${process.env.TOKEN}`,
    }
  })
}

;(async () => {
  let tutorial_id = "f47fb347-7e6a-47b2-8657-24a7e3ff11e6"
  await startTutorial(tutorial_id)
  await verify(tutorial_id)
})()
