-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 22 Bulan Mei 2021 pada 21.08
-- Versi server: 10.4.18-MariaDB
-- Versi PHP: 7.4.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test_be`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `data_nilai`
--

CREATE TABLE `data_nilai` (
  `NIM` varchar(50) NOT NULL,
  `ID_mata_kuliah` int(11) NOT NULL,
  `ID_dosen` int(11) NOT NULL,
  `nilai` int(11) NOT NULL,
  `keterangan` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `data_nilai`
--

INSERT INTO `data_nilai` (`NIM`, `ID_mata_kuliah`, `ID_dosen`, `nilai`, `keterangan`) VALUES
('5150411153', 1, 1, 85, 'PASS'),
('5150411154', 1, 1, 90, 'PASS'),
('5150411155', 1, 1, 68, 'NOT PASS'),
('5150411156', 1, 1, 65, 'NOT PASS'),
('5150411153', 2, 1, 95, 'PASS'),
('5150411155', 2, 1, 95, 'PASS');

-- --------------------------------------------------------

--
-- Struktur dari tabel `dosen`
--

CREATE TABLE `dosen` (
  `ID` int(11) NOT NULL,
  `nama` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `dosen`
--

INSERT INTO `dosen` (`ID`, `nama`) VALUES
(1, 'Donny');

-- --------------------------------------------------------

--
-- Struktur dari tabel `mahasiswa`
--

CREATE TABLE `mahasiswa` (
  `NIM` varchar(50) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `alamat` varchar(255) NOT NULL,
  `tanggal_lahir` date NOT NULL,
  `jurusan` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `mahasiswa`
--

INSERT INTO `mahasiswa` (`NIM`, `nama`, `alamat`, `tanggal_lahir`, `jurusan`) VALUES
('5150411153', 'Firman', 'Yogyakarta', '1996-03-04', 'Informatika'),
('5150411154', 'Fian', 'Yogyakarta', '1996-05-28', 'Akuntansi'),
('5150411155', 'Suci', 'Yogyakarta', '1996-01-14', 'Informatika'),
('5150411156', 'Rizky', 'Yogyakarta', '1996-11-12', 'Informatika'),
('5150411160', 'Alifia', 'Yogyakarta', '1996-10-12', 'Akuntansi'),
('5150411161', 'Intan', 'Yogyakarta', '1996-09-12', 'Akuntansi'),
('5150411162', 'Putri', 'Yogyakarta', '1996-09-11', 'Akuntansi');

-- --------------------------------------------------------

--
-- Struktur dari tabel `mata_kuliah`
--

CREATE TABLE `mata_kuliah` (
  `ID` int(11) NOT NULL,
  `nama_mata_kuliah` varchar(100) NOT NULL,
  `NIM` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `mata_kuliah`
--

INSERT INTO `mata_kuliah` (`ID`, `nama_mata_kuliah`, `NIM`) VALUES
(1, 'Kalkulus 1', '5150411153'),
(2, 'Microprocesor', '5150411153');

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `ID` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('mahasiswa','dosen') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`ID`, `email`, `password`, `role`) VALUES
(4, 'firman@gmail.com', '$2b$10$LGJchgCUysiwNOcKel4P8.8.PGISeEwdActqwgQi/5hXfNmIWdBwi', 'mahasiswa'),
(5, 'donny@gmail.com', '$2b$10$BqMZPLo14A3yaZhB9vP7pu21.vIe73lEEXvMgx1v8fkkAKeI2RSQe', 'dosen');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `data_nilai`
--
ALTER TABLE `data_nilai`
  ADD KEY `NIM` (`NIM`),
  ADD KEY `ID_mata_kuliah` (`ID_mata_kuliah`),
  ADD KEY `ID_dosen` (`ID_dosen`);

--
-- Indeks untuk tabel `dosen`
--
ALTER TABLE `dosen`
  ADD PRIMARY KEY (`ID`);

--
-- Indeks untuk tabel `mahasiswa`
--
ALTER TABLE `mahasiswa`
  ADD PRIMARY KEY (`NIM`);

--
-- Indeks untuk tabel `mata_kuliah`
--
ALTER TABLE `mata_kuliah`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `NIM` (`NIM`);

--
-- Indeks untuk tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `dosen`
--
ALTER TABLE `dosen`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `mata_kuliah`
--
ALTER TABLE `mata_kuliah`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `user`
--
ALTER TABLE `user`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `data_nilai`
--
ALTER TABLE `data_nilai`
  ADD CONSTRAINT `data_nilai_ibfk_1` FOREIGN KEY (`NIM`) REFERENCES `mahasiswa` (`NIM`),
  ADD CONSTRAINT `data_nilai_ibfk_2` FOREIGN KEY (`ID_mata_kuliah`) REFERENCES `mata_kuliah` (`ID`),
  ADD CONSTRAINT `data_nilai_ibfk_3` FOREIGN KEY (`ID_dosen`) REFERENCES `dosen` (`ID`);

--
-- Ketidakleluasaan untuk tabel `mata_kuliah`
--
ALTER TABLE `mata_kuliah`
  ADD CONSTRAINT `mata_kuliah_ibfk_1` FOREIGN KEY (`NIM`) REFERENCES `mahasiswa` (`NIM`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
