const convertint = (x) =>{
    let result = '';
    const y = x % 3600
    const jam = x / 3600
    const menit = y / 60
    const detik = y % 60
    result = `${Math.floor(jam)} Jam ${Math.floor(menit)} Menit ${Math.floor(detik)} Detik`
    console.log(result)
}
convertint(20000)