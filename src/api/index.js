import axios from "axios"

const cors_proxy = "https://torre-proxy.vercel.app"

async function getUserByUsername(username) {
  const api_endpoint = "https://bio.torre.co/api/bios/"
  const url = cors_proxy + "?url=" + api_endpoint + username
  const response = await axios.get(url)
  return response.data
}

async function searchPeople(payload) {
  const api_endpoint = "https://search.torre.co/people/_search/"
  const url = cors_proxy + "?url=" + api_endpoint
  const response = await axios.post(url, payload)
  return response.data
}

export { getUserByUsername, searchPeople }
