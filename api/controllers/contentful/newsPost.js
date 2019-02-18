const appRoot = require('app-root-path')
const client = require(appRoot + '/api/utils/initClient.js')
const axios = require('axios')
const restDb = process.env.REST_DB_URL
const restDbHeaders = {
  'x-apikey': process.env.REST_DB_API
}

exports.newsPost = (req, res, next) => {
  const postId = req.params.postId;

   client.initClient()
    .getEntry(postId)
      .then(entry => {
        let query = {
          'postId': postId
        }
        query = JSON.stringify(query)

        return axios.get(`${restDb}/rest/likes?q=${query}`, {
          headers: restDbHeaders
        })
          .then(res => {
            return {
              ...entry.fields,
              likes: {
                ...res.data[0]
              }
            }
          })
      })
      .then(response => {
        res.status(200).json(response);
      })
      .catch(err => {
        res.status(500).send({ error: err });
      });
};