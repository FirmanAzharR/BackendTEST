const router = require('express').Router()
const { authorization,isDosen } = require('../middleware/auth')

const {
  postNilai,
  updateNilai,
  deleteNilai,
  getAverageNilai,
  getAverageNilaiJurusan
} = require('../controller/nilai')

router.post('/post-nilai', authorization,isDosen,postNilai)
router.put('/update-nilai', authorization,isDosen,updateNilai)
router.delete('/delete-nilai', authorization,isDosen,deleteNilai)
router.get('/average-nilai-mhs', authorization,getAverageNilai)
router.get('/average-nilai-jurusan', authorization,getAverageNilaiJurusan)

module.exports = router
