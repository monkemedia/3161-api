exports.page = (req, res, next) => {
  const appRoot = require('app-root-path')
  const client = require(appRoot + '/api/utils/initClient.js')
  const slug = req.params.slug;

  client.initClient()
    .getEntries({
      'content_type': 'pages',
      'fields.slug': slug
    })
      .then(entry => {
        const item = entry.items[0]

        res.status(200).json({
          title: item.fields.title,
          blurb: item.fields.blurb,
          description: item.fields.description,
          slug: item.fields.slug,
          hero: {
            title: item.fields.hero.fields.title,
            subtitle: item.fields.hero.fields.subtitle,
            media: {
              title: item.fields.hero.fields.image.fields.title,
              file: item.fields.hero.fields.image.fields.file.url,
              contentType: item.fields.hero.fields.image.fields.file.contentType
            }
          },
          pageMeta: {
            title: item.fields.pageMeta.fields.title || null,
            description: item.fields.pageMeta.fields.description || null
          }
        });
      })
      .catch(err => {
        res.status(500).send({ error: err });
      });
};