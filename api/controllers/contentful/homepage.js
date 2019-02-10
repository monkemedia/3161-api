exports.homepage = (req, res, next) => {
  const appRoot = require('app-root-path')
  const client = require(appRoot + '/api/utils/initClient.js')

  client.initClient()
    .getEntries({
      'sys.id[in]': '7tT62M3wjYWqGMqOyAEoC2',
      'include': 2
    })
      .then(entry => {
        const item = entry.items[0]

        const featuredItems = item.fields.featuredItems.map(it => {
            return {
              title: it.fields.title || null,
              path: it.fields.path || null,
              media: {
                title: it.fields.image.fields.title || null,
                file: it.fields.image.fields.file.url || null,
                contentType: it.fields.image.fields.file.contentType || null
              }
            }
        })

        res.status(200).json(
          {
            title: item.fields.title || null,
            description: item.fields.description || null,
            slug: item.fields.slug || null,
            hero: {
              title: item.fields.hero.fields.title || null,
              subtitle: item.fields.hero.fields.subtitle || null,
              button: {
                title: item.fields.hero.fields.cta.fields.title || null,
                path: item.fields.hero.fields.cta.fields.path || null,
              },
              media: {
                title: item.fields.hero.fields.image.fields.title || null,
                file: item.fields.hero.fields.image.fields.file.url || null,
                contentType: item.fields.hero.fields.image.fields.file.contentType || null
              }
            },
            contentBlock: {
              title: item.fields.contentBlock.fields.title || null,
              subtitle: item.fields.contentBlock.fields.subtitle || null,
              description: item.fields.contentBlock.fields.description || null,
              slug: item.fields.contentBlock.fields.slug || null,
              media: {
                title: item.fields.contentBlock.fields.image.fields.title || null,
                file: item.fields.contentBlock.fields.image.fields.file.url || null,
                contentType: item.fields.contentBlock.fields.image.fields.file.contentType || null
              },
              button: {
                title: item.fields.contentBlock.fields.button.fields.title || null,
                path: item.fields.contentBlock.fields.button.fields.path || null
              }
            },
            banner: {
              title: item.fields.banner.fields.title || null,
              subtitle: item.fields.banner.fields.subtitle || null,
              description: item.fields.banner.fields.description || null,
              button: {
                title: item.fields.banner.fields.button.fields.title || null,
                path: item.fields.banner.fields.button.fields.path || null
              },
              media: {
                title: item.fields.banner.fields.backgroundImage.fields.title || null,
                file: item.fields.banner.fields.backgroundImage.fields.file.url || null,
                contentType: item.fields.banner.fields.backgroundImage.fields.file.contentType || null
              }
            },
            featuredItems,
            pageMeta: {
              title: item.fields.pageMeta.fields.title || null,
              description: item.fields.pageMeta.fields.description || null
            }
          }
        )
      })
      .catch(err => {
        res.status(500).send({ error: err });
      });
};