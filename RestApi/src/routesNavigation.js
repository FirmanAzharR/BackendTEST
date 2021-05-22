const router = require('express').Router()
const user = require('./routes/user')
const nilai = require('./routes/nilai')
const mahasiswa = require('./routes/mahasiswa')

router.use('/user', user)
router.use('/nilai', nilai)
router.use('/mahasiswa', mahasiswa)
module.exports = router
