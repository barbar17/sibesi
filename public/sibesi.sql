-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 30, 2025 at 06:00 PM
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

--
-- Dumping data for table `comment`
--

INSERT INTO `comment` (`comment_id`, `jumlah`, `created_at`, `updated_at`) VALUES
(1, 0, '2025-09-27 09:12:27', '2025-09-27 09:12:27'),
(2, 0, '2025-09-27 14:17:30', '2025-09-27 14:17:30'),
(3, 0, '2025-09-27 14:41:55', '2025-09-27 14:41:55'),
(4, 0, '2025-09-28 13:24:10', '2025-09-28 13:24:10'),
(5, 0, '2025-09-28 13:43:54', '2025-09-28 13:43:54'),
(6, 0, '2025-09-28 14:45:29', '2025-09-28 14:45:29'),
(7, 0, '2025-09-28 14:47:10', '2025-09-28 14:47:10'),
(8, 0, '2025-09-28 14:48:50', '2025-09-28 14:48:50'),
(9, 0, '2025-09-28 15:07:35', '2025-09-28 15:07:35');

--
-- Dumping data for table `comment_detail`
--

INSERT INTO `comment_detail` (`comment_detail_id`, `comment_id`, `user_id`, `isi`, `created_at`, `updated_at`) VALUES
(1, 1, '112233', 'test', '2025-09-27 13:37:52', '2025-09-27 13:37:52'),
(2, 1, '112233', 'materi macam apa ini', '2025-09-27 13:51:48', '2025-09-27 13:51:48'),
(3, 3, '998877', 'TEST COMMENT', '2025-09-27 23:21:10', '2025-09-27 23:21:10'),
(4, 1, '998877', 'komen aja', '2025-09-28 13:07:17', '2025-09-28 13:07:17'),
(5, 1, '998877', 'komen ajaaa', '2025-09-28 13:09:00', '2025-09-28 13:09:00'),
(6, 1, '998877', 'komen', '2025-09-28 13:10:56', '2025-09-28 13:10:56'),
(7, 1, '112233', 'maap pak', '2025-09-28 13:13:59', '2025-09-28 13:13:59'),
(8, 5, '998877', 'komennn', '2025-09-28 13:56:52', '2025-09-28 13:56:52'),
(9, 3, '112233', 'komen', '2025-09-28 14:13:06', '2025-09-28 14:13:06');

--
-- Dumping data for table `kelas`
--

INSERT INTO `kelas` (`kelas_id`, `nama_kelas`, `jumlah_siswa`, `created_at`, `updated_at`) VALUES
('12BAHASA3', '12 BAHASA 3', 0, '2025-09-23 14:30:23', '2025-09-23 14:33:15'),
('12IPS2', '12 IPS 2', 0, '2025-09-22 14:42:32', '2025-09-22 14:42:32'),
('12MIPA2', '12 MIPA 2', 0, '2025-09-23 14:44:51', '2025-09-23 14:44:51');

--
-- Dumping data for table `kelas_mapel`
--

INSERT INTO `kelas_mapel` (`id`, `kelas_id`, `mapel_id`, `created_at`) VALUES
(1, '12MIPA2', 'IPA12', '2025-09-27 15:44:42'),
(2, '12MIPA2', 'MTK12', '2025-09-27 15:44:56'),
(3, '12BAHASA3', 'MTK12', '2025-09-27 15:45:11'),
(4, '12BAHASA3', 'BAHASAINDONESIA', '2025-09-28 04:45:52'),
(5, '12IPS2', 'BAHASAINDONESIA', '2025-09-28 04:46:48');

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

--
-- Dumping data for table `mapel`
--

INSERT INTO `mapel` (`mapel_id`, `nama_mapel`, `created_at`, `updated_at`) VALUES
('BAHASAINDONESIA', 'Bahasa Indonesia', '2025-09-28 04:45:52', '2025-09-28 04:45:52'),
('IPA12', 'IPA 12', '2025-09-27 10:48:30', '2025-09-27 10:48:30'),
('MTK12', 'MTK 12', '2025-09-26 12:23:52', '2025-09-27 09:37:41');

--
-- Dumping data for table `materi`
--

INSERT INTO `materi` (`materi_id`, `mapel_id`, `comment_id`, `nama`, `status`, `isi`, `created_at`, `updated_at`) VALUES
(1, 'MTK12', 1, 'ALJABAR 1', 1, '<div>TESTING</div>', '2025-09-27 09:12:59', '2025-09-28 12:58:50'),
(2, 'MTK12', 1, 'ALJABAR 2', 0, '<div>testing</div>', '2025-09-27 09:34:58', '2025-09-28 12:59:03'),
(3, 'IPA12', 1, 'ANATOMI 1', 1, 'testing', '2025-09-27 10:49:11', '2025-09-28 03:18:21'),
(5, 'IPA12', 2, 'ENZYME INTRO', 0, 'TESTING POST', '2025-09-27 14:17:30', '2025-09-27 14:17:30'),
(6, 'MTK12', 4, 'modul terbaru', 0, '<p>pelajari modul ini sebaik mungkin</p>', '2025-09-28 13:24:10', '2025-09-28 13:24:10'),
(7, 'MTK12', 6, 'Materi baru nih bos', 0, '<p>tebak ini gambar apa?</p><p></p><img src=\"/materi/Screenshot 2025-07-21 122127.png\"><p></p>', '2025-09-28 14:45:29', '2025-09-28 14:45:29');

--
-- Dumping data for table `quiz`
--

INSERT INTO `quiz` (`quiz_id`, `mapel_id`, `comment_id`, `nama_quiz`, `deadline_quiz`, `time_quiz`, `created_at`, `updated_at`) VALUES
(16, 'MTK12', 0, 'kuis', '2025-09-30 22:07:44', 120, '2025-09-30 15:07:44', '2025-09-30 15:07:44');

--
-- Dumping data for table `quiz_siswa`
--

INSERT INTO `quiz_siswa` (`quiz_siswa_id`, `user_id`, `quiz_id`, `nilai_quiz`, `created_at`, `updated_at`) VALUES
(1, '112233', '16', '30', '2025-09-30 15:31:54', '2025-09-30 15:44:13');

--
-- Dumping data for table `quiz_siswa_detail`
--

INSERT INTO `quiz_siswa_detail` (`quiz_detail_id`, `quiz_siswa_id`, `quiz_soal_id`, `jawaban`, `nilai`, `created_at`, `updated_at`) VALUES
(8, '1', '6', 'cc', 0, '2025-09-30 15:31:54', '2025-09-30 15:31:54'),
(9, '1', '7', 'jawaban essai', 0, '2025-09-30 15:31:54', '2025-09-30 15:31:54');

--
-- Dumping data for table `quiz_soal`
--

INSERT INTO `quiz_soal` (`quiz_soal_id`, `quiz_id`, `soal`, `tipe`, `kunci_jawaban`, `pilihan_1`, `pilihan_2`, `pilihan_3`, `pilihan_4`, `created_at`, `updated_at`) VALUES
(5, 15, '<p>soal essay</p>', 'essay', '', '', '', '', '', '2025-09-30 15:04:47', '2025-09-30 15:04:47'),
(6, 16, '<p>soal pg</p>', 'pg', 'b', 'aa', 'bb', 'cc', 'dd', '2025-09-30 15:07:44', '2025-09-30 15:07:44'),
(7, 16, '<p>soal essay</p>', 'essay', '', '', '', '', '', '2025-09-30 15:07:44', '2025-09-30 15:07:44');

--
-- Dumping data for table `tugas`
--

INSERT INTO `tugas` (`tugas_id`, `mapel_id`, `comment_id`, `nama`, `isi`, `deadline`, `created_at`, `updated_at`) VALUES
(2, 'MTK12', 3, 'Penjumlahan', 'PENJELASAN TUGAS', '2025-09-30 21:00:00', '2025-09-27 14:41:55', '2025-09-27 14:41:55'),
(3, 'MTK12', 5, 'tugas baruu', '<p>kerjain woiii</p>', '2025-09-26 20:43:00', '2025-09-28 13:43:54', '2025-09-28 14:09:06'),
(4, 'MTK12', 7, 'tugas baruu', '<p>liat nih tugas</p><p></p><img src=\"/tugas/Screenshot 2025-07-21 122127.png\"><p></p>', '2025-09-30 21:46:00', '2025-09-28 14:47:10', '2025-09-28 14:47:10'),
(5, 'MTK12', 8, 'tugas baruu111', '<p>ini ada gambarnyaa</p><p></p><img src=\"/tugas/Screenshot 2025-08-06 115014.png\"><p></p>', '2025-09-30 21:48:00', '2025-09-28 14:48:50', '2025-09-28 14:48:50'),
(6, 'MTK12', 9, 'tugas dl', '<p>pasti telat</p>', '2025-09-28 22:08:00', '2025-09-28 15:07:35', '2025-09-28 15:07:35');

--
-- Dumping data for table `tugas_detail`
--

INSERT INTO `tugas_detail` (`tugas_detail_id`, `tugas_id`, `user_id`, `created_by`, `status_deadline`, `file_url`, `nilai`, `catatan`, `created_at`, `updated_at`) VALUES
(3, 2, '112233', 'jhon', 0, '/tugasPDF/Print Table.pdf', 20, '', '2025-09-27 23:45:38', '2025-09-28 00:25:53'),
(5, 5, '112233', 'jhon doe', 0, '/tugasPDF/SURAT AKUAN.pdf', 0, '', '2025-09-28 15:03:03', '2025-09-28 15:03:03'),
(6, 6, '112233', 'jhon doe', 1, '/tugasPDF/SURAT AKUAN.pdf', 80, 'okeee', '2025-09-28 15:09:13', '2025-09-28 15:18:29');

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `mapel_id`, `kelas_id`, `username`, `password`, `role`, `nama_user`, `created_at`, `updated_at`) VALUES
('112233', '-', '12MIPA2', 'jhondoe', '123', 'siswa', 'jhon doe', '2025-09-27 08:30:39', '2025-09-27 11:55:27'),
('12333', 'BAHASAINDONESIA', '-', 'guru11', '123', 'guru', 'guru1', '2025-09-28 05:13:18', '2025-09-28 05:13:18'),
('12345', 'IPA12', '-', 'sinta', '123', 'guru', 'sinta', '2025-09-28 03:17:59', '2025-09-28 03:17:59'),
('5677', 'BAHASAINDONESIA', '-', 'guru111', '123', 'guru', 'guru11', '2025-09-28 12:44:50', '2025-09-28 12:44:50'),
('88776', '-', '12BAHASA3', 'murid22', '123', 'guru', 'murid22', '2025-09-28 12:45:58', '2025-09-28 12:45:58'),
('98777', 'BAHASAINDONESIA', '-', 'murid1111', '123', 'guru', 'murid11', '2025-09-28 12:45:31', '2025-09-28 12:45:31'),
('998877', 'MTK12', '-', 'budi', '123', 'guru', 'budi', '2025-09-27 09:13:52', '2025-09-27 09:13:52'),
('9999', '-', '12IPS2', 'siswa999', '123', 'siswa', 'siswa99', '2025-09-28 12:47:43', '2025-09-28 12:47:43');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
