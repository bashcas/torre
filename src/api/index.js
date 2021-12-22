import axios from "axios"

const cors_proxy = "https://torre-proxy.vercel.app?url="

async function getUserByUsername(username) {
  const api_endpoint = "https://bio.torre.co/api/bios/"
  const url = cors_proxy + api_endpoint + username
  const response = await axios.get(url)
  console.log(response.data)
  return response.data
}

export { getUserByUsername }
