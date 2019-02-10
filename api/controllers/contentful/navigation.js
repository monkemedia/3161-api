exports.navigation = (req, res, next) => {
  const appRoot = require('app-root-path')
  const client = require(appRoot + '/api/utils/initClient.js')

  client.initClient()
    .getEntries({
      'content_type': 'pages',
      'fields.mainNavigation': true
    })
      .then(entries => {
        const promises = [];

        entries.items.map(entry => {
          if (entry.fields) {
            promises.push({
              label: entry.fields.title,
              slug: entry.fields.slug,
              id: entry.sys.id,
              order: entry.fields.order
            })
          }
        })

        // Change order of navigation
        promises.sort((a, b) => {
          if (a.order > b.order) {
            return 1
          }
          return -1
        })

        res.status(200).json(promises);
      })
      .catch(err => {
        res.status(500).send({ error: err });
      });
}
