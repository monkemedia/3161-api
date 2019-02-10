exports.location = (req, res, next) => {
  const appRoot = require('app-root-path')
  const client = require(appRoot + '/api/utils/initClient.js')

  client.initClient()
    .getEntries({
      'sys.id[in]': '4HQ5XgrC242EwIggikSiUE',
      'include': 2
    })
      .then(entry => {
        const item = entry.items[0]

        res.status(200).json(
          {
            address: item.fields.address || null,
            location: {
              lat: item.fields.location.lat || null,
              lon: item.fields.location.lon || null
            }
          }
        )
      })
      .catch(err => {
        res.status(500).send({ error: err });
      });
};