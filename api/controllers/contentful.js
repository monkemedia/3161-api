const contentful = require('contentful')
const client = contentful.createClient({
  space: process.env.SPACE_ID,
  environment: process.env.ENVIRONMENT_ID,
  accessToken: process.env.ACCESS_TOKEN
})

exports.homepage = (req, res, next) => {
  console.log('here', process.env.SPACE_ID)
  console.log('here', process.env.ACCESS_TOKEN)
  client.getEntry('70HeB8Iq9aMC84UG6wCsa0')
    .then(response => {
      console.log('response', response)
      res.status(200).json(response);
    })
    .catch(err => {
      console.log("Error:", err);
      res.status(500).send({ error: err });
    });
};
