const appRoot = require('app-root-path')
const client = require(appRoot + '/api/utils/initClient.js')

exports.newsPost = (req, res, next) => {
  const postID = req.params.postId;

   client.initClient()
    .getEntry(postID)
      .then(entry => {
        res.status(200).json(entry);
      })
      .catch(err => {
        res.status(500).send({ error: err });
      });
};