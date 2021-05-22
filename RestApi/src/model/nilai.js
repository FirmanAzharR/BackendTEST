const connection = require('../config/mysql')

module.exports = {
  postNilaiModel: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO data_nilai SET ?', data, (error, result) => {
        if (!error) {
          const newResult = {
            ...data
          }
          resolve(newResult)
        } else {
          reject(new Error(error))
        }
      })
    })
  },
  checkNilaiModel: (nim,matkul) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT*FROM data_nilai WHERE NIM = ? AND ID_mata_kuliah = ?', [nim,matkul], (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  },
  putNilaiModel: (nim,matkul,data) => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE data_nilai SET ? WHERE NIM = ? AND ID_mata_kuliah = ?', [data,nim,matkul], (error, result) => {
        if (!error) {
          result = {
            ...data
          }
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  },
  deleteNilaiModel: (nim,matkul) => {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM data_nilai WHERE NIM = ? AND ID_mata_kuliah = ?', [nim,matkul], (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  },
  getAvgNilaiModel: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT mahasiswa.nim, mahasiswa.nama, round((sum(data_nilai.nilai)/(SELECT count(NIM) FROM data_nilai WHERE NIM = mahasiswa.nim)),2) AS rata_rata FROM mahasiswa inner join data_nilai on mahasiswa.NIM=data_nilai.NIM GROUP BY data_nilai.NIM', (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  },
  totalNilaiJurusan: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT mahasiswa.jurusan,SUM(data_nilai.nilai) as total FROM mahasiswa inner join data_nilai on mahasiswa.NIM=data_nilai.NIM GROUP by mahasiswa.jurusan', (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  },
  totalMhsJurusan: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT count(data_nilai.NIM) as total_mhs FROM mahasiswa INNER JOIN data_nilai ON mahasiswa.NIM=data_nilai.NIM GROUP BY mahasiswa.jurusan', (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  } 
}
