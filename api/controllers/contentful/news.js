exports.news = (req, res, next) => {
  const appRoot = require('app-root-path')
  const client = require(appRoot + '/api/utils/initClient.js')

  client.initClient()
    .getEntries({
      'content_type': 'news'
    })
      .then(entries => {
        const newArray = [];

        entries.items.forEach(entry => {
          if (entry.fields) {
            const payload = {
              id: entry.sys.id,
              ...entry.fields
            }
            newArray.push(payload)
          }
        })

        res.status(200).json(newArray);
      })
      .catch(err => {
        res.status(500).send({ error: err });
      });
};