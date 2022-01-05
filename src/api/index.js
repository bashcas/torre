import axios from "axios"

const cors_proxy = "https://torre-proxy.vercel.app"

async function getUserByUsername(username) {
  const api_endpoint = "https://bio.torre.co/api/bios/"
  const url = cors_proxy + "?url=" + api_endpoint + username
  const response = await axios.get(url)
  return response.data
}

// ggid is necessary for more relevant results
// default ggid is mine
async function searchPeople(payload, cancelToken, ggid = "1239203") {
  const api_endpoint = "https://search.torre.co/people/_search/"
  const url = cors_proxy + "?url=" + api_endpoint
  const response = await axios.post(url, payload, {
    cancelToken: cancelToken?.token,
    headers: {
      "x-torre-ggid": ggid,
    },
  })
  return response.data
}

async function getNextPage(payload, token, ggid = "1239203") {
  const api_endpoint = "https://search.torre.co/people/_search/"
  const url = cors_proxy + "?url=" + api_endpoint + "?after=" + token
  const response = await axios.post(url, payload, {
    headers: {
      "x-torre-ggid": ggid,
    },
  })
  return response.data
}

async function getPreviousPage(token) {
  const api_endpoint = "https://search.torre.co/people/_search/"
  const url = cors_proxy + "?url=" + api_endpoint + "?before=" + token
  const response = await axios.post(url)
  return response.data
}

async function getSkillDetail(user, skill) {
  const api_endpoint = `https://torre.co/api/genome/bios/${user}/strengths-skills/${skill}/detail`
  const url = cors_proxy + "?url=" + api_endpoint
  const response = await axios.get(url)
  return response.data
}

export {
  getUserByUsername,
  searchPeople,
  getNextPage,
  getPreviousPage,
  getSkillDetail,
}
