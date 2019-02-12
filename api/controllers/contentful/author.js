exports.details = (req, res, next) => {
  const appRoot = require('app-root-path')
  const client = require(appRoot + '/api/utils/initClient.js')
  const userId = req.params.userId;

  client.initClient()
    .getEntries({
      'content_type': 'user',
      'fields.userId': userId
    })
      .then(entry => {
        const item = entry.items[0]

        res.status(200).json({
          name: item.fields.name,
          about: item.fields.about
        });
      })
      .catch(err => {
        res.status(500).send({ error: err });
      });
};