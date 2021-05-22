const helper = require('../helper/response')
const excelToJson = require('convert-excel-to-json')
const fs = require('fs')
const {
    getMahasiswaModel,
    checkMahasiswa,
    excelModel
} = require('../model/mahasiswa')

module.exports = {
  getMahasiswa: async (request, response) => {
    try {
      const { jurusan,dosen } = request.query
      const result = await getMahasiswaModel(jurusan,dosen)
      if(result.length>0){
        return helper.response(response, 200, 'success', result)
      }else{
        return helper.response(response, 400, 'data empty', result)
      }
    } catch (error) {
        console.log(error)
      return helper.response(response, 400, 'bad request', error)
    }
  },
  excelJson: async (request, response) => {
    try {
      let success_insertRecord = 0;
      let fail_insertRecord = 0;
      let total_record = 0;
      const data = {
        excelFile: request.file === undefined ? '' : request.file.filename
      }

      function delExcel(){
        fs.unlink(`./uploads/${data.excelFile}`, function (err) {
          if (err) {
            console.log('error')
          }
        })
      }
      
      if(data.excelFile){
          const result = excelToJson({
          sourceFile: `./uploads/${data.excelFile}`,
          header: {
            rows: 1
          },
          columnToKey: {
            A: 'NIM',
            B: 'nama',
            C: 'alamat',
            D: 'tanggal_lahir',
            E: 'jurusan'
          },
          sheets: ['Sheet1']
        })
        if (result.Sheet1.length > 0) {
          for (let i = 0; i < result.Sheet1.length; i++) {
            const check = await checkMahasiswa(result.Sheet1[i].NIM)
            if(check.length>0){
              fail_insertRecord++
            }else{
              const insert = await excelModel(result.Sheet1[i])
              success_insertRecord++
            }
          }
          delExcel()
          total_record = result.Sheet1.length
          if(success_insertRecord===0){
            return helper.response(response, 200, `failed import from excel`, {success_insert:success_insertRecord,failed_insert:fail_insertRecord, total_data: total_record, pesan:'check excel file pada kolom NIM'})

          }else if(fail_insertRecord!==0 & success_insertRecord!==0){
            return helper.response(response, 200, `success with ${fail_insertRecord} fail import from excel`, {data_excel:result,success_insert:success_insertRecord,failed_insert:fail_insertRecord, total_data: total_record, pesan:'jika failed_insert>0 maka terdapat NIM yang sama'})

          }else if(fail_insertRecord===0){
            return helper.response(response, 200, `success import from excel`, {data_excel:result,success_insert:success_insertRecord,failed_insert:fail_insertRecord, total_data: total_record})
          }
        } else {
          delExcel()
          return helper.response(response, 400, 'Excel Fils is Empty')
        }
      }else{
        return helper.response(response, 400, 'Please Choose Excel File')
      }
    } catch (error) {
      console.log(error)
      return helper.response(response, 400, 'Bad Req')
    }
  }
}
