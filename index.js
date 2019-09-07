const requestp = require('request-promise')

const repoDispatch = (url, body, token) => requestp({
  url,
  json: true,
  headers: {
    'Authorization': 'token ' + token,
    'User-Agent': process.env.APP_NAME,
    'Accept': 'application/vnd.github.everest-preview+json'
  },
  method: 'POST',
  body
})

const repo = process.env.REPO
const apiURL = `http://api.github.com/repos/${repo}/dispatches`
const body = `{ "event_type": "${process.env.EVENT_TYPE}" }`

if (typeof process.env.TOKEN === 'undefined') {
  console.error('No token defined! Abort.')
} else {
  repoDispatch(apiURL, body, process.env.TOKEN)
    .then((response) => {
      console.log('Response: ' + response)
      return response
    }).catch((error) => {
      console.error(error)
    })
}

module.exports = { repoDispatch }
