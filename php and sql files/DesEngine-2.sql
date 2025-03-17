-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 17, 2025 at 11:49 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `DesEngine`
--

DROP DATABASE IF EXISTS `DesEngine`;
CREATE DATABASE IF NOT EXISTS `DesEngine`;
USE `DesEngine`;

-- --------------------------------------------------------

--
-- Table structure for table `weapons`
--

CREATE TABLE IF NOT EXISTS `weapons` (
  `id` int(11) NOT NULL DEFAULT 7001,
  `name` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT 'debugged',
  `icon_file_path` varchar(260) DEFAULT NULL,
  `quality` enum('debug','cheap','ok','decent','good','superior','excellent','rare','special','extreme') NOT NULL DEFAULT 'debug',
  `sl` int(11) NOT NULL DEFAULT 1,
  `price` decimal(6,2) NOT NULL DEFAULT 0.00,
  `stamina` int(11) NOT NULL DEFAULT 0,
  `nerve` int(11) NOT NULL DEFAULT 0,
  `speed` int(11) NOT NULL DEFAULT 0,
  `charge` int(11) NOT NULL DEFAULT 0,
  `melee_damage` int(11) NOT NULL DEFAULT 0,
  `ranged_damage` int(11) NOT NULL DEFAULT 0,
  `spell_damage` int(11) NOT NULL DEFAULT 0,
  `healing` int(11) NOT NULL DEFAULT 0,
  `gouge` int(11) NOT NULL DEFAULT 0,
  `resilience` int(11) NOT NULL DEFAULT 0,
  `guard` int(11) NOT NULL DEFAULT 0,
  `dominance` int(11) NOT NULL DEFAULT 0,
  `description` varchar(256) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `use_text` varchar(256) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `weapons`
--

INSERT INTO `weapons` (`id`, `name`, `icon_file_path`, `quality`, `sl`, `price`, `stamina`, `nerve`, `speed`, `charge`, `melee_damage`, `ranged_damage`, `spell_damage`, `healing`, `gouge`, `resilience`, `guard`, `dominance`, `description`, `use_text`) VALUES
(5, 'BIG GUN', 'inv_weapon_gun_0.jpg', 'ok', 1, 3.00, 0, 5, 0, 0, 0, 0, 0, 0, 0, 3, 5, 0, 'It blows up!', 'Sets the ranged damage to an astronomical amount for 0.5 seconds, causing destruction beyond your comprehension. Conjures one (1) slice of Elderon Cheese.'),
(6, 'Angry Cake', 'inv_food_cake_0.jpg', 'decent', 1, 4.50, 0, 1, 0, 5, 3, 0, 0, 0, 2, 2, 1, 5, '', 'Launches itself at a nearby foe, penetrating half defense. Violently explodes into frosting shrapnel on impact, dealing minor damage to all nearby entities.'),
(4001, 'Dimmy\'s Everyday Jester Hat', 'inv_head_hat_0.jpg', 'decent', 1, 1.83, 1, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 'HOORAY EVERYDAY’S A GOOD DAY FOR	\r\nDIMMY AND HIS PALS IN A WINTER		\r\nWONDERLAND FILLED WITH CHOCOLATE	\r\nSHELLS', ''),
(5007, 'Integral Knife', 'inv_weapon_knife_0.jpg', 'superior', 4, 8.32, 10, 4, 0, 0, 4, 0, 0, 0, 7, 0, 0, 2, 'It’s real and firmer than any normal blade. It reminds you of being REAL and CHEESEY. Real pleasure. Real mac and cheese..', ''),
(6001, 'Sharpened Training Sword', 'inv_weapon_sword_0.jpg', 'ok', 1, 0.61, 0, 0, 0, 0, 0, 0, 0, 0, 4, 1, 0, 0, 'Good, but not bad, but it begs the question…', ''),
(6002, 'Bee Stinger Cutlass', 'inv_weapon_sword_1.jpg', 'ok', 1, 0.91, -2, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 'It’s heavy. Used by bees to keep you protected from beeting the game (You don’t want to beat it, right? Because you are a pirate and didn\'t buy the game. Would you suffer that bee-lated death?)', ''),
(6003, 'Stocky Shortsword', 'inv_weapon_sword_0.jpg', 'debug', 1, 1.19, 0, 6, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 'If the blacksmith is good, it’s easily and cheaply made, but good blacksmithing doesn’t come cheap. It’s an iron turd on a stick. Useful but slightly rare.', ''),
(6005, 'Crumbling Wavy Sword', 'inv_weapon_sword_2.jpg', 'debug', 1, 0.40, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'It may look scary to a dumbo, but to someone who uses blades, it looks like it was sitting in the jungle too long. Or not put under that high of heat. Or just not very strong metal. What are swords supposed to be made of these days?', ''),
(6006, 'Pineapple Hilt Sword', 'inv_weapon_sword_3.jpg', 'cheap', 1, 0.81, -2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'Oh, these suck bad. They have a freaking pineapple on the end. Not that the decoration is the worst thing.', ''),
(7000, 'Debug Sword', NULL, 'question_mark_v4.jpg', 1, 0.00, 0, 0, 0, 0, 10, 0, 0, 0, 5, 0, 0, 0, 'A sword for debugging purposes.', 'Use to slay bugs.'),
(7001, 'Spent Carving Knife', 'inv_weapon_knife_0.jpg', 'cheap', 1, 0.50, 0, -6, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 'Looks like someone cut too much wet wood with it. Too bad.', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `weapons`
--
ALTER TABLE `weapons`
  ADD PRIMARY KEY (`id`),
  ADD KEY `index_weapon_name` (`name`),
  ADD KEY `index_icon_file_path` (`icon_file_path`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
