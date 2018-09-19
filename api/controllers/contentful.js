const contentful = require('contentful');
const client = contentful.createClient({
  space: process.env.SPACE_ID,
  environment: process.env.ENVIRONMENT_ID,
  accessToken: process.env.ACCESS_TOKEN
});

exports.homepage = (req, res, next) => {
  client.getEntry('2IfAAvzwH6kScQGCwsUgic')
    .then(entry => {
      res.status(200).json(entry.fields);
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
  console.log('slug', slug)

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
