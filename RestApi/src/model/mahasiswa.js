const connection = require('../config/mysql')

module.exports = {
  getMahasiswaModel: (jurusan,dosen) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT mahasiswa.NIM,mahasiswa.nama, mahasiswa.jurusan, TIMESTAMPDIFF(YEAR, mahasiswa.tanggal_lahir, CURDATE()) as umur, dosen.nama as nama_dosen, mata_kuliah.nama_mata_kuliah,data_nilai.nilai FROM mahasiswa INNER JOIN data_nilai ON mahasiswa.NIM=data_nilai.NIM INNER JOIN mata_kuliah ON mata_kuliah.ID=data_nilai.ID_mata_kuliah INNER JOIN dosen ON dosen.ID = data_nilai.ID_dosen WHERE mahasiswa.jurusan like '%${jurusan}%' AND dosen.nama like '%${dosen}%' ` , (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  },
  checkMahasiswa: (nim) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT NIM FROM mahasiswa WHERE NIM = '${nim}'` , (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  },
  excelModel: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO mahasiswa SET ? ', data, (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  }
}
