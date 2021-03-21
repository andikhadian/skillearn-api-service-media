var express = require('express');
var router = express.Router();
const isBase64 = require('is-base64');
const base64Img = require('base64-img');
const fs = require('fs');

const { media: Media } = require('../models');

router.get('/', async (req, res) => {
  const allMedia = await Media.findAll({
    attributes: ['id', 'image']
  });

  const mappedMedia = allMedia.map(el => {
    el.image = `${req.get('host')}/${el.image}`
    return el
  })

  return res.status(200).json({
    status: 'success',
    data: mappedMedia,
  })
})

router.post('/', (req, res) => {
  const { image } = req.body

  if (!isBase64(image, { mimeRequired: true })) {
    return res.status(400).json({ status: 'error', message: 'invalid base64' })
  }

  base64Img.img(image, './public/images', Date.now(), async (err, filepath) => {
    if (err) {
      return res.status(400).json({ status: 'error', message: err.message })
    }
    // /public/images/img.png
    const filename = filepath.split('/').pop();
    const media = await Media.create({ image: `images/${filename}` });

    return res.json({
      status: 'success',
      data: {
        id: media.id,
        image: `${req.get('host')}/images/${filename}`,
      }
    })
  })
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params

  const findMedia = await Media.findByPk(id);

  if (!findMedia) {
    return res.status(404).json({ status: 'error', message: 'media not found' })
  }

  fs.unlink(`./public/${findMedia.image}`, async (err) => {
    if (err) {
      return res.status(400).json({ status: 'error', message: err.message });
    }

    await findMedia.destroy();

    return res.status(200).json({
      status: 'success',
      message: 'image has been deleted'
    })
  })
})

module.exports = router;
 