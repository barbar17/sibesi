-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 28, 2025 at 05:21 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sibesi`
--

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

CREATE TABLE `comment` (
  `comment_id` int(11) NOT NULL,
  `jumlah` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comment`
--

INSERT INTO `comment` (`comment_id`, `jumlah`, `created_at`, `updated_at`) VALUES
(1, 0, '2025-09-27 09:12:27', '2025-09-27 09:12:27'),
(2, 0, '2025-09-27 14:17:30', '2025-09-27 14:17:30'),
(3, 0, '2025-09-27 14:41:55', '2025-09-27 14:41:55');

-- --------------------------------------------------------

--
-- Table structure for table `comment_detail`
--

CREATE TABLE `comment_detail` (
  `comment_detail_id` bigint(20) NOT NULL,
  `comment_id` int(11) NOT NULL,
  `user_id` varchar(100) NOT NULL,
  `isi` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comment_detail`
--

INSERT INTO `comment_detail` (`comment_detail_id`, `comment_id`, `user_id`, `isi`, `created_at`, `updated_at`) VALUES
(1, 1, '112233', 'test', '2025-09-27 13:37:52', '2025-09-27 13:37:52'),
(2, 1, '112233', 'materi macam apa ini', '2025-09-27 13:51:48', '2025-09-27 13:51:48'),
(3, 3, '998877', 'TEST COMMENT', '2025-09-27 23:21:10', '2025-09-27 23:21:10');

-- --------------------------------------------------------

--
-- Table structure for table `kelas`
--

CREATE TABLE `kelas` (
  `kelas_id` varchar(100) NOT NULL,
  `nama_kelas` varchar(100) NOT NULL,
  `jumlah_siswa` int(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `kelas`
--

INSERT INTO `kelas` (`kelas_id`, `nama_kelas`, `jumlah_siswa`, `created_at`, `updated_at`) VALUES
('12BAHASA3', '12 BAHASA 3', 0, '2025-09-23 14:30:23', '2025-09-23 14:33:15'),
('12IPS2', '12 IPS 2', 0, '2025-09-22 14:42:32', '2025-09-22 14:42:32'),
('12MIPA2', '12 MIPA 2', 0, '2025-09-23 14:44:51', '2025-09-23 14:44:51');

-- --------------------------------------------------------

--
-- Table structure for table `kelas_mapel`
--

CREATE TABLE `kelas_mapel` (
  `id` int(11) NOT NULL,
  `kelas_id` varchar(100) NOT NULL,
  `mapel_id` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `kelas_mapel`
--

INSERT INTO `kelas_mapel` (`id`, `kelas_id`, `mapel_id`, `created_at`) VALUES
(1, '12MIPA2', 'IPA12', '2025-09-27 15:44:42'),
(2, '12MIPA2', 'MTK12', '2025-09-27 15:44:56'),
(3, '12BAHASA3', 'MTK12', '2025-09-27 15:45:11');

-- --------------------------------------------------------

--
-- Table structure for table `log`
--

CREATE TABLE `log` (
  `log_id` int(11) NOT NULL,
  `user` varchar(100) NOT NULL,
  `keterangan` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `log`
--

INSERT INTO `log` (`log_id`, `user`, `keterangan`, `created_at`) VALUES
(1, 'akbar', 'Menambahkan kelas 12 MIPA 2', '2025-09-22 14:16:13'),
(2, 'akbar', 'Menambahkan kelas 12 ips 2', '2025-09-22 14:41:17'),
(3, 'akbar', 'Menambahkan kelas 12 IPS 2', '2025-09-22 14:42:32'),
(7, 'akbar', 'Menghapus kelas 12MIPA2', '2025-09-23 14:27:44'),
(9, 'akbar', 'Menambahkan kelas 12 MIPA 2', '2025-09-23 14:30:23'),
(11, 'akbar', 'Mengubah kelas 12MIPA3', '2025-09-23 14:33:15'),
(12, 'akbar', 'Menambahkan kelas 12 MIPA 2', '2025-09-23 14:44:51'),
(13, 'jhon', 'Menambahkan mapel MTK12', '2025-09-26 12:23:52');

-- --------------------------------------------------------

--
-- Table structure for table `mapel`
--

CREATE TABLE `mapel` (
  `mapel_id` varchar(100) NOT NULL,
  `nama_mapel` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `mapel`
--

INSERT INTO `mapel` (`mapel_id`, `nama_mapel`, `created_at`, `updated_at`) VALUES
('IPA12', 'IPA 12', '2025-09-27 10:48:30', '2025-09-27 10:48:30'),
('MTK12', 'MTK 12', '2025-09-26 12:23:52', '2025-09-27 09:37:41');

-- --------------------------------------------------------

--
-- Table structure for table `materi`
--

CREATE TABLE `materi` (
  `materi_id` int(11) NOT NULL,
  `mapel_id` varchar(100) NOT NULL,
  `comment_id` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `isi` longtext NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `materi`
--

INSERT INTO `materi` (`materi_id`, `mapel_id`, `comment_id`, `nama`, `status`, `isi`, `created_at`, `updated_at`) VALUES
(1, 'MTK12', 1, 'ALJABAR 1', 1, 'TESTING', '2025-09-27 09:12:59', '2025-09-28 03:18:18'),
(2, 'MTK12', 1, 'ALJABAR 2', 0, 'testing', '2025-09-27 09:34:58', '2025-09-27 09:38:40'),
(3, 'IPA12', 1, 'ANATOMI 1', 1, 'testing', '2025-09-27 10:49:11', '2025-09-28 03:18:21'),
(5, 'IPA12', 2, 'ENZYME INTRO', 0, 'TESTING POST', '2025-09-27 14:17:30', '2025-09-27 14:17:30');

-- --------------------------------------------------------

--
-- Table structure for table `quiz`
--

CREATE TABLE `quiz` (
  `quiz_id` int(11) NOT NULL,
  `mapel_id` varchar(100) NOT NULL,
  `comment_id` int(11) NOT NULL,
  `nama_quiz` varchar(100) NOT NULL,
  `deadline_quiz` datetime NOT NULL,
  `time_quiz` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `quiz`
--

INSERT INTO `quiz` (`quiz_id`, `mapel_id`, `comment_id`, `nama_quiz`, `deadline_quiz`, `time_quiz`, `created_at`, `updated_at`) VALUES
(1, 'MTK12', 3, 'Pembagian', '2025-09-28 02:33:43', 3600, '2025-09-28 00:34:27', '2025-09-28 00:34:27');

-- --------------------------------------------------------

--
-- Table structure for table `quiz_siswa`
--

CREATE TABLE `quiz_siswa` (
  `quiz_siswa_id` varchar(100) NOT NULL,
  `user_id` varchar(100) NOT NULL,
  `quiz_id` varchar(100) NOT NULL,
  `nilai_quiz` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `quiz_siswa_detail`
--

CREATE TABLE `quiz_siswa_detail` (
  `quiz_detail_id` bigint(20) NOT NULL,
  `quiz_siswa_id` varchar(100) NOT NULL,
  `quiz_soal_id` varchar(100) NOT NULL,
  `jawaban` text NOT NULL,
  `nilai` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `quiz_soal`
--

CREATE TABLE `quiz_soal` (
  `quiz_soal_id` bigint(20) NOT NULL,
  `quiz_id` int(11) NOT NULL,
  `soal` text NOT NULL,
  `tipe` enum('pg','essay') NOT NULL,
  `kunci_jawaban` enum('a','b','c','d') NOT NULL,
  `pilihan_1` text NOT NULL,
  `pilihan_2` text NOT NULL,
  `pilihan_3` text NOT NULL,
  `pilihan_4` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `quiz_soal`
--

INSERT INTO `quiz_soal` (`quiz_soal_id`, `quiz_id`, `soal`, `tipe`, `kunci_jawaban`, `pilihan_1`, `pilihan_2`, `pilihan_3`, `pilihan_4`, `created_at`, `updated_at`) VALUES
(1, 1, 'APA?', 'pg', 'a', 'test 1', 'test 2', 'test 3', 'test 4', '2025-09-28 00:45:50', '2025-09-28 00:45:50');

-- --------------------------------------------------------

--
-- Table structure for table `tugas`
--

CREATE TABLE `tugas` (
  `tugas_id` int(11) NOT NULL,
  `mapel_id` varchar(100) NOT NULL,
  `comment_id` int(11) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `isi` text NOT NULL,
  `deadline` datetime NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tugas`
--

INSERT INTO `tugas` (`tugas_id`, `mapel_id`, `comment_id`, `nama`, `isi`, `deadline`, `created_at`, `updated_at`) VALUES
(2, 'MTK12', 3, 'Penjumlahan', 'PENJELASAN TUGAS', '2025-09-30 21:00:00', '2025-09-27 14:41:55', '2025-09-27 14:41:55');

-- --------------------------------------------------------

--
-- Table structure for table `tugas_detail`
--

CREATE TABLE `tugas_detail` (
  `tugas_detail_id` bigint(20) NOT NULL,
  `tugas_id` int(11) NOT NULL,
  `user_id` varchar(100) NOT NULL,
  `created_by` varchar(100) NOT NULL,
  `status_deadline` tinyint(1) NOT NULL,
  `file_url` varchar(255) NOT NULL,
  `nilai` int(11) NOT NULL,
  `catatan` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tugas_detail`
--

INSERT INTO `tugas_detail` (`tugas_detail_id`, `tugas_id`, `user_id`, `created_by`, `status_deadline`, `file_url`, `nilai`, `catatan`, `created_at`, `updated_at`) VALUES
(3, 2, '112233', 'jhon', 0, '/tugasPDF/Print Table.pdf', 20, '', '2025-09-27 23:45:38', '2025-09-28 00:25:53');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` varchar(100) NOT NULL,
  `mapel_id` varchar(100) DEFAULT NULL,
  `kelas_id` varchar(100) DEFAULT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` enum('siswa','guru') NOT NULL,
  `nama_user` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `mapel_id`, `kelas_id`, `username`, `password`, `role`, `nama_user`, `created_at`, `updated_at`) VALUES
('112233', '-', '12MIPA2', 'jhondoe', '123', 'siswa', 'jhon doe', '2025-09-27 08:30:39', '2025-09-27 11:55:27'),
('12345', 'IPA12', '-', 'sinta', '123', 'guru', 'sinta', '2025-09-28 03:17:59', '2025-09-28 03:17:59'),
('998877', 'MTK12', '-', 'budi', '123', 'guru', 'budi', '2025-09-27 09:13:52', '2025-09-27 09:13:52');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`comment_id`);

--
-- Indexes for table `comment_detail`
--
ALTER TABLE `comment_detail`
  ADD PRIMARY KEY (`comment_detail_id`),
  ADD KEY `comment_user` (`user_id`),
  ADD KEY `comment_detail` (`comment_id`);

--
-- Indexes for table `kelas`
--
ALTER TABLE `kelas`
  ADD PRIMARY KEY (`kelas_id`);

--
-- Indexes for table `kelas_mapel`
--
ALTER TABLE `kelas_mapel`
  ADD PRIMARY KEY (`id`),
  ADD KEY `kelas_id` (`kelas_id`,`mapel_id`);

--
-- Indexes for table `log`
--
ALTER TABLE `log`
  ADD PRIMARY KEY (`log_id`);

--
-- Indexes for table `mapel`
--
ALTER TABLE `mapel`
  ADD PRIMARY KEY (`mapel_id`);

--
-- Indexes for table `materi`
--
ALTER TABLE `materi`
  ADD PRIMARY KEY (`materi_id`),
  ADD KEY `mapel_materi` (`mapel_id`),
  ADD KEY `materi_comment` (`comment_id`);

--
-- Indexes for table `quiz`
--
ALTER TABLE `quiz`
  ADD PRIMARY KEY (`quiz_id`),
  ADD KEY `mapel_quiz` (`mapel_id`),
  ADD KEY `quiz_comment` (`comment_id`);

--
-- Indexes for table `quiz_siswa`
--
ALTER TABLE `quiz_siswa`
  ADD PRIMARY KEY (`quiz_siswa_id`),
  ADD KEY `user_quiz` (`user_id`),
  ADD KEY `quiz_jawaban` (`quiz_id`);

--
-- Indexes for table `quiz_siswa_detail`
--
ALTER TABLE `quiz_siswa_detail`
  ADD PRIMARY KEY (`quiz_detail_id`),
  ADD KEY `quiz_jawaban_detail` (`quiz_siswa_id`),
  ADD KEY `quiz_soal_detail` (`quiz_soal_id`);

--
-- Indexes for table `quiz_soal`
--
ALTER TABLE `quiz_soal`
  ADD PRIMARY KEY (`quiz_soal_id`),
  ADD KEY `quiz_soal` (`quiz_id`);

--
-- Indexes for table `tugas`
--
ALTER TABLE `tugas`
  ADD PRIMARY KEY (`tugas_id`),
  ADD KEY `mapel_tugas` (`mapel_id`),
  ADD KEY `tugas_comment` (`comment_id`);

--
-- Indexes for table `tugas_detail`
--
ALTER TABLE `tugas_detail`
  ADD PRIMARY KEY (`tugas_detail_id`),
  ADD UNIQUE KEY `tugas_id` (`tugas_id`,`user_id`),
  ADD KEY `user_tugas` (`user_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `kelas_user` (`kelas_id`),
  ADD KEY `mapel_user` (`mapel_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comment_detail`
--
ALTER TABLE `comment_detail`
  MODIFY `comment_detail_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `kelas_mapel`
--
ALTER TABLE `kelas_mapel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `log`
--
ALTER TABLE `log`
  MODIFY `log_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `materi`
--
ALTER TABLE `materi`
  MODIFY `materi_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `quiz`
--
ALTER TABLE `quiz`
  MODIFY `quiz_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `quiz_siswa_detail`
--
ALTER TABLE `quiz_siswa_detail`
  MODIFY `quiz_detail_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `quiz_soal`
--
ALTER TABLE `quiz_soal`
  MODIFY `quiz_soal_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tugas`
--
ALTER TABLE `tugas`
  MODIFY `tugas_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tugas_detail`
--
ALTER TABLE `tugas_detail`
  MODIFY `tugas_detail_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comment_detail`
--
ALTER TABLE `comment_detail`
  ADD CONSTRAINT `comment_detail` FOREIGN KEY (`comment_id`) REFERENCES `comment` (`comment_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comment_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `materi`
--
ALTER TABLE `materi`
  ADD CONSTRAINT `mapel_materi` FOREIGN KEY (`mapel_id`) REFERENCES `mapel` (`mapel_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `materi_comment` FOREIGN KEY (`comment_id`) REFERENCES `comment` (`comment_id`);

--
-- Constraints for table `quiz`
--
ALTER TABLE `quiz`
  ADD CONSTRAINT `mapel_quiz` FOREIGN KEY (`mapel_id`) REFERENCES `mapel` (`mapel_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `quiz_comment` FOREIGN KEY (`comment_id`) REFERENCES `comment` (`comment_id`);

--
-- Constraints for table `tugas`
--
ALTER TABLE `tugas`
  ADD CONSTRAINT `mapel_tugas` FOREIGN KEY (`mapel_id`) REFERENCES `mapel` (`mapel_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tugas_comment` FOREIGN KEY (`comment_id`) REFERENCES `comment` (`comment_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
