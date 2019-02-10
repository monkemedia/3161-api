exports.contact = (req, res, next) => {
  const appRoot = require('app-root-path')
  const client = require(appRoot + '/api/utils/initClient.js')

  client.initClient()
    .getEntries({
      'content_type': 'contact'
    })
      .then(entry => {
        const item = entry.items[0]

        console.log(item);

        res.status(200).json({
            title: item.fields.title || null,
            description: item.fields.description || null,
            hero: {
              title: item.fields.hero.fields.title || null,
              subtitle: item.fields.hero.fields.subtitle || null,
              media: {
                title: item.fields.hero.fields.image.fields.title || null,
                file: item.fields.hero.fields.image.fields.file.url || null,
                contentType: item.fields.hero.fields.image.fields.file.contentType || null
              }
            }
        });
      })
      .catch(err => {
        res.status(500).send({ error: err });
      });
};