exports.pages = (req, res, next) => {
  const appRoot = require('app-root-path')
  const client = require(appRoot + '/api/utils/initClient.js')

  client.initClient()
    .getEntries()
      .then(entries => {
        const newArray = [];

        entries.items.forEach(entry => {
          if (entry.fields) {
            newArray.push(entry.fields)
          }
        })

        res.status(200).json(newArray);
      })
      .catch(err => {
        res.status(500).send({ error: err });
      });
};