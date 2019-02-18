const appRoot = require('app-root-path')
const client = require(appRoot + '/api/utils/initClient.js')
const axios = require('axios')
const restDb = process.env.REST_DB_URL
const restDbHeaders = {
  'x-apikey': process.env.REST_DB_API
}

exports.news = (req, res, next) => {
  const limit = req.query.limit
  const tag = req.query.tag
  const search = req.query.search

   client.initClient()
    .getEntries({
      'content_type': 'news',
      'limit': limit || 100,
      'fields.tags': tag || null,
      'query': search || null
    })
      .then(entries => {
        const newArray = []
        const promises = []

        entries.items.forEach(entry => {
          if (entry.fields) {
            const payload = {
              id: entry.sys.id,
              ...entry.fields
            }
            newArray.push(payload)
          }
        })
          
        newArray.map(entry => {
          const postId = entry.id
          let query = {
            'postId': postId
          }
          query = JSON.stringify(query)

          promises.push(
            axios.get(`${restDb}/rest/likes?q=${query}`, {
              headers: restDbHeaders
            })
              .then(resp => {
                return {
                  ...entry,
                  likes: {
                    ...resp.data[0]
                  }
                }
              }))
        })

        return Promise.all(promises)
      })
      .then(response => {
        res.status(200).json(response);
      })
        // 
        // res.status(200).json(newArray);
      .catch(err => {
        res.status(500).send({ error: err });
      });
};
