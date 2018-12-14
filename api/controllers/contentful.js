const contentful = require('contentful');
const client = contentful.createClient({
  space: process.env.SPACE_ID,
  environment: process.env.ENVIRONMENT_ID,
  accessToken: process.env.ACCESS_TOKEN,
  resolveLinks: true
});

exports.homepage = (req, res, next) => {
  client.getEntries({
    'sys.id[in]': '7tT62M3wjYWqGMqOyAEoC2',
    'include': 2
  })
    .then(entry => {
      const item = entry.items[0]

      const contentBlocks = item.fields.contentBlocks.map(it => {
          return {
            title: it.fields.title || null,
            subtitle: it.fields.subtitle || null,
            description: it.fields.description || null,
            slug: it.fields.slug || null,
            media: {
              title: it.fields.image.fields.title || null,
              file: it.fields.image.fields.file.url || null,
              contentType: it.fields.image.fields.file.contentType || null
            },
            button: {
              title: it.fields.button.fields.title || null,
              path: it.fields.button.fields.path || null
            }
          }
      })

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
          contentBlocks,
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

exports.location = (req, res, next) => {
  client.getEntries({
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

exports.pages = (req, res, next) => {
  client.getEntries()
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

exports.page = (req, res, next) => {
  const slug = req.params.slug;

  client.getEntries({
    'content_type': 'pages',
    'fields.slug': slug
  })
    .then(entry => {
      const item = entry.items[0]

      res.status(200).json({
        title: item.fields.title,
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

exports.contact = (req, res, next) => {
  client.getEntries({
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

exports.navigation = (req, res, next) => {
  client.getEntries({
    'content_type': 'pages',
    'fields.mainNavigation': true
  })
    .then(entries => {
      const promises = [];

      entries.items.map(entry => {
        if (entry.fields) {
          console.log('entry.fields', entry.fields);
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
};
