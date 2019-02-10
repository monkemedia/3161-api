exports.initClient = () => {
  const contentful = require('contentful')

  return contentful.createClient({
    space: process.env.SPACE_ID,
    environment: process.env.ENVIRONMENT_ID,
    accessToken: process.env.ACCESS_TOKEN,
    resolveLinks: true
  })
}