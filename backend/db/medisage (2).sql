-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 15, 2022 at 08:51 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `medisage`
--

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `phone_number` varchar(50) DEFAULT NULL,
  `email` varchar(80) DEFAULT NULL,
  `country` varchar(50) DEFAULT NULL,
  `country_code` varchar(20) DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL,
  `isActive` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `name`, `phone_number`, `email`, `country`, `country_code`, `createdAt`, `updatedAt`, `isActive`) VALUES
(1, 'abc', '1111111111', 'jhsdjhasjjk@ghs.121', 'india', '91', '2022-11-14 19:57:06', NULL, 1),
(4, 'Lavi', '8899092727', 'lavi@123.in', 'india', '91', '2022-11-14 21:06:37', NULL, 1),
(5, 'Lavi', '1234567890', 'lavi@123.in', 'india', '91', '2022-11-14 21:10:28', NULL, 1),
(6, 'Lavi', '8899092727', 'lavi@123.in', 'india', '91', '2022-11-14 21:10:38', NULL, 1),
(7, 'Lavi', '8899092727', 'lavi@123.com', 'india', '91', '2022-11-14 21:12:52', NULL, 1),
(8, 'Lavi', '8899092727', 'lavi@123.in', 'India', '91', '2022-11-14 21:29:10', NULL, 1),
(9, 'Lavi', '8899092727', 'lavi@123.in', 'Peru', '51', '2022-11-14 21:29:38', NULL, 1),
(10, 'Lavi', '8899092727', 'lavi@123.in', 'Afghanistan', '93', '2022-11-14 21:31:48', NULL, 1),
(11, 'Lavi', '8899092727', 'lavi@123.in', 'Tuvalu', '688', '2022-11-14 21:33:14', NULL, 1),
(12, 'Lavi', '8899092727', 'lavi@123.in', 'Tuvalu', '688', '2022-11-14 21:35:52', NULL, 1),
(13, 'Lavi', '8899092727', 'lavi@123.in', 'Iraq', '964', '2022-11-14 21:36:22', NULL, 1),
(14, 'Lavi', '8899092727', 'lavi@123.in', 'India', '91', '2022-11-14 21:37:26', NULL, 1),
(15, 'ravi', '8899092727', 'lavi@123.in', 'India', '91', '2022-11-15 02:32:18', NULL, 1),
(16, 'neeraj', '8899092727', 'lavi@123.in', 'India', '91', '2022-11-15 02:32:25', NULL, 1),
(17, 'harish', '8899092727', 'lavi@123.in', 'India', '91', '2022-11-15 02:32:31', NULL, 1),
(18, 'dinesh', '8899092727', 'lavi@123.in', 'India', '91', '2022-11-15 02:32:38', NULL, 1),
(19, 'rupoesh', '8899092727', 'lavi@123.in', 'India', '91', '2022-11-15 02:32:46', NULL, 1),
(22, 'mahesh', '8899092727', 'lavi@123.in', 'India', '91', '2022-11-15 02:57:03', NULL, 1),
(23, 'mahesh', '8899092727', 'lavi@123.in', 'India', '91', '2022-11-15 02:57:05', NULL, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
