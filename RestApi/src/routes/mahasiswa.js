const router = require('express').Router()
const { authorization,isDosen } = require('../middleware/auth')
const uploadExcel = require('../middleware/multerExcel')

const {
    getMahasiswa,
    excelJson
} = require('../controller/mahasiswa')

router.get('/', authorization, getMahasiswa)
router.post('/post-mhs-excel', authorization, isDosen, uploadExcel, excelJson)

module.exports = router
