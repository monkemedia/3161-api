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
            title: it.fields.title,
            subtitle: it.fields.subtitle,
            description: it.fields.description,
            slug: it.fields.slug,
            image: {
              title: it.fields.image.fields.title,
              file: it.fields.image.fields.file.url
            },
            button: {
              title: it.fields.button.fields.title,
              path: it.fields.button.fields.path
            }
          }
      })

      res.status(200).json(
        {
          title: item.fields.title,
          description: item.fields.description,
          slug: item.fields.slug,
          hero: {
            title: item.fields.hero.fields.title,
            subtitle: item.fields.hero.fields.subtitle,
            button: {
              title: item.fields.hero.fields.cta.fields.title,
              path: item.fields.hero.fields.cta.fields.path,
            },
            image: {
              title: item.fields.hero.fields.image.fields.title,
              file: item.fields.hero.fields.image.fields.file.url
            }
          },
          contentBlocks,
          banner: {
            title: item.fields.banner.fields.title,
            subtitle: item.fields.banner.fields.subtitle,
            description: item.fields.banner.fields.description,
            button: {
              title: item.fields.banner.fields.button.fields.title,
              path: item.fields.banner.fields.button.fields.path
            },
            image: {
              title: item.fields.banner.fields.backgroundImage.fields.title,
              file: item.fields.banner.fields.backgroundImage.fields.file.url
            }
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
      res.status(200).json(entry.items[0].fields);
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
      const newArray = [];
      console.log('entries', entries)

      entries.items.map(entry => {
        if (entry.fields) {
          console.log('entry', entry.fields)
          newArray.push({
            label: entry.fields.title,
            slug: entry.fields.slug
          })
        }
      })

      res.status(200).json(newArray);
    })
    .catch(err => {
      res.status(500).send({ error: err });
    });
};
