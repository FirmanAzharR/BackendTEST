const helper = require('../helper/response')
const {
  postNilaiModel,
  putNilaiModel,
  checkNilaiModel,
  deleteNilaiModel,
  getAvgNilaiModel,
  totalNilaiJurusan,
  totalMhsJurusan
} = require('../model/nilai')

// const nodemailer = require('nodemailer')
module.exports = {
  postNilai: async (request, response) => {
    try {
      const { NIM,ID_mata_kuliah,ID_dosen,nilai,keterangan } = request.body
      const data = {
        NIM,
        ID_mata_kuliah,
        ID_dosen,
        nilai,
        keterangan
      }
      const result = await postNilaiModel(data)
      return helper.response(response, 200, 'success', result)
    } catch (error) {
      return helper.response(response, 400, 'bad request', error)
    }
  },
  updateNilai: async (request, response) => {
    try {
      const { NIM,ID_mata_kuliah,nilai,keterangan } = request.body
      const data = {
        NIM,
        ID_mata_kuliah,
        nilai,
        keterangan
      }
      const check = await checkNilaiModel(data.NIM,data.ID_mata_kuliah)
      if(check.length>0){
        const result = await putNilaiModel(data.NIM,data.ID_mata_kuliah,data)
        return helper.response(response, 200, 'success', result)
      }else{
        return helper.response(response, 400, 'data nilai not found')
      }
    } catch (error) {
      return helper.response(response, 400, 'bad request', error)
    }
  },
  deleteNilai: async (request, response) => {
    try {
      const { NIM,ID_mata_kuliah } = request.body
      const data = {
        NIM,
        ID_mata_kuliah
      }
      const check = await checkNilaiModel(data.NIM,data.ID_mata_kuliah)
      if(check.length>0){
        const result = await deleteNilaiModel(data.NIM,data.ID_mata_kuliah)
        return helper.response(response, 200, 'success delete', result)
      }else{
        return helper.response(response, 400, 'data nilai not found')
      }
    } catch (error) {
        console.log(error)
      return helper.response(response, 400, 'bad request', error)
    }
  },
  getAverageNilai: async (request, response) => {
    try {
      const result = await getAvgNilaiModel()
        if(result.length>0){
          return helper.response(response, 200, 'success get data', result)
        }else{
          return helper.response(response, 400, 'data rata-rata nilai mahasiswa empty')
        }
    } catch (error) {
        console.log(error)
        return helper.response(response, 400, 'bad request', error)
    }
  },
  getAverageNilaiJurusan: async (request, response) => {
    try {
      let result = []
      const totalNilai = await totalNilaiJurusan()
      const totalMhs = await totalMhsJurusan()
        if(totalNilai.length==totalMhs.length){
          for(let i = 0; i < totalNilai.length;i++){
            let data = {
              jurusan:totalNilai[i].jurusan,
              avgNilai:totalNilai[i].total / totalMhs[i].total_mhs
            }
            result.push(data)
          }
          return helper.response(response, 200, 'success get data', result)
        }else{
          return helper.response(response, 400, 'data nilai mahasiswa empty')
        }
    } catch (error) {
        console.log(error)
        return helper.response(response, 400, 'bad request', error)
    }
  }
}
