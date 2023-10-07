-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 07, 2023 at 03:45 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `blogdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `articles`
--

CREATE TABLE `articles` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `image_path` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `articles`
--

INSERT INTO `articles` (`id`, `title`, `content`, `user_id`, `image_path`) VALUES
(24, 'The Thrill of Space Exploration: Unraveling the Mysteries of the Universe', 'In this immersive and informative blog post, we invite you to embark on a captivating journey through the cosmos. We will delve deep into the world of space exploration, exploring not only the latest missions but also the profound questions they seek to answer. From the groundbreaking success of the Perseverance rover on Mars to the audacious plans for lunar exploration and ambitious missions to distant asteroids, we will uncover the awe-inspiring technological marvels that make these endeavors possible. Moreover, we will discuss the significance of these missions, how they contribute to our evolving understanding of the universe, and what they mean for the future of human space exploration. Join us as we peer into the vastness of space and unravel the mysteries of the cosmos.', 1, 'uploads\\2023-10-05T14-49-40.506Zimage_2023-10-05_203437961.png'),
(26, 'Journey to the Abyss: Discovering the Hidden Wonders of the Deep Sea', '<p>Prepare to be transported to the most enigmatic and mysterious part of our planet—the deep sea. This blog post is a deep dive into the mesmerizing world of deep-sea exploration, where scientists and adventurers embark on daring expeditions to uncover the hidden wonders of the abyss. We\'ll take you on a voyage through the evolution of submersibles and remotely operated vehicles (ROVs), which allow us to reach the darkest and most remote parts of the ocean. You\'ll encounter the bizarre creatures and otherworldly landscapes that inhabit these depths, and you\'ll gain insight into the unique ecosystems that thrive in extreme conditions. Join us on this exploration of the unknown, where each dive reveals new and astounding discoveries, challenging our understanding of life on Earth.</p>', 1, 'uploads\\2023-10-05T14-59-48.036Zimage_2023-10-05_204447181.png'),
(27, 'Braving the Extremes: A Look at Polar Exploration and Climate Research', '<p>Venture into the polar regions in this comprehensive blog post, where we shine a spotlight on the daring explorers and dedicated scientists who brave some of the harshest environments on Earth. Polar exploration isn\'t just about conquering the extremes; it\'s also a critical endeavor in climate research.</p><p><br></p><p>We\'ll explore the pivotal role these regions play in understanding global climate change, with expeditions involving ice-core drilling, wildlife monitoring, and the study of melting ice caps. Discover the incredible challenges faced by explorers in the Arctic and Antarctic, from sub-zero temperatures to treacherous terrain, and how their relentless efforts provide invaluable insights into the complex interplay of our planet\'s climate systems.</p>', 1, 'uploads\\2023-10-05T15-01-03.902Zimage_2023-10-05_204602671.png'),
(28, 'Great Explorers of History: Stories of Courage and Discovery', '<p>Prepare to step back in time and relive the legendary journeys of some of history\'s greatest explorers. In this blog post, we will celebrate the extraordinary feats of individuals who fearlessly ventured into uncharted territories, forever altering our understanding of the world.</p><p><br></p><p>From Christopher Columbus\'s pioneering voyages that opened up the Americas to Ferdinand Magellan\'s daring circumnavigation of the globe, and the epic expedition of Lewis and Clark as they traversed the American West, we will delve deep into the remarkable stories of these trailblazers. Through their motivations, the hardships they endured, and the lasting impact of their journeys on our world today, we\'ll gain a profound appreciation for the courage and determination that define exploration.</p>', 1, 'uploads\\2023-10-05T15-03-40.366Zimage_2023-10-05_204835851.png'),
(29, 'The Final Frontier: Is Humanity Ready for Space Colonization?', '<p>Join us on a thought-provoking odyssey as we explore the concept of space colonization, a dream that has captivated scientists, visionaries, and science fiction enthusiasts for decades. In this blog post, we will navigate the complexities of this futuristic endeavor, considering both the incredible technological advancements that have brought us closer to the possibility of living on other planets, particularly Mars, and the ethical and practical challenges that such colonization presents. </p><p><br></p><p>We will examine issues such as sustainability, resource management, and the potential impact on any indigenous life forms that may exist. Ultimately, we will engage in a deep exploration of whether humanity is genuinely prepared for the monumental challenges and responsibilities that come with becoming an interplanetary species.</p>', 1, 'uploads\\2023-10-05T15-05-05.183Zimage_2023-10-05_205004076.png');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`) VALUES
(1, 'Himal ', 'Panta', NULL),
(6, 'Himal 1', 'Panta', NULL),
(7, 'Himal 13', 'Panta', NULL),
(8, 'Himal 4333', 'Panta', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `articles`
--
ALTER TABLE `articles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `articles`
--
ALTER TABLE `articles`
  ADD CONSTRAINT `articles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
