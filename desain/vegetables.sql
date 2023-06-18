-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 18, 2023 at 06:52 AM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 7.4.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ta_vegetables`
--

-- --------------------------------------------------------

--
-- Table structure for table `vegetables`
--

CREATE TABLE `vegetables` (
  `id` int(11) NOT NULL,
  `image_url` text NOT NULL,
  `name` varchar(45) NOT NULL,
  `latin` varchar(45) NOT NULL,
  `description` text DEFAULT NULL,
  `nutritions` text DEFAULT NULL,
  `benefits` text DEFAULT NULL,
  `source` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `vegetables`
--

INSERT INTO `vegetables` (`id`, `image_url`, `name`, `latin`, `description`, `nutritions`, `benefits`, `source`) VALUES
(1, 'https://cdn.shopify.com/s/files/1/0371/3368/0772/products/Spinach_1000x.jpg?v=1620713074', 'Bayam', 'Spinach', 'Spinach is a leafy green flowering plant native to central and western Asia. It is of the order Caryophyllales, family Amaranthaceae, subfamily Chenopodioideae. Its leaves are a common edible vegetable consumed either fresh, or after storage using preservation techniques by canning, freezing, or dehydration', NULL, NULL, NULL),
(2, 'https://www.crystalvalleyfoods.com/wp-content/uploads/2017/05/Snow-peas-232961347.jpg', 'Bean', 'Kacang Kapri', 'The snow pea is an edible-pod pea with flat pods and thin pod walls. It is eaten whole, with both the seeds and the pod, while still unripened.', NULL, NULL, NULL),
(3, 'https://www.harighotra.co.uk/images/Shutterstock/kerela_560x560.jpg', 'Bitter_Gourd', 'Pare', 'Momordica charantia or Bitter Gourd is a tropical and subtropical vine of the family Cucurbitaceae, widely grown in Asia, Africa, and the Caribbean for its edible fruit. Its many varieties differ substantially in the shape and bitterness of the fruit.', NULL, NULL, NULL),
(4, 'https://cdn.shopify.com/s/files/1/0402/4310/1863/products/Dudhi_1400x.jpg?v=1676315443', 'Bottle_Gourd', 'Labu air', 'Calabash, also known as bottle gourd, white-flowered gourd, long melon, birdhouse gourd, New Guinea bean, Tasmania bean, and opo squash, is a vine grown for its fruit. It can be either harvested young to be consumed as a vegetable, or harvested mature to be dried and used as a utensil, container, or a musical instrument. ', NULL, NULL, NULL),
(5, 'https://cccapi.cococa.in/public/uploads/product_images/product_image_1200x1200/test-Brinjal.jpg', 'Brinjal', 'Terong', 'Eggplant, aubergine or brinjal is a plant species in the nightshade family Solanaceae. Solanum melongena is grown worldwide for its edible fruit. Most commonly purple, the spongy, absorbent fruit is used in several cuisines. Typically used as a vegetable in cooking, it is a berry by botanical definition.', NULL, NULL, NULL),
(6, 'https://domf5oio6qrcr.cloudfront.net/medialibrary/5390/h1218g16207258089583.jpg', 'Broccoli', 'Brokoli', 'Broccoli is an edible green plant in the cabbage family whose large flowering head, stalk and small associated leaves are eaten as a vegetable. Broccoli is classified in the Italica cultivar group of the species Brassica oleracea.', 'Broccoli is high in vitamin A and folate (vitamin B9), as well as vitamins C and K. It\'s also a good source of potassium and dietary fiber, and a half-cup serving has just 15 calories.', NULL, NULL),
(7, 'https://cdn-prod.medicalnewstoday.com/content/images/articles/285/285753/beans.jpg', 'Buncis', 'Green Beans', 'Green beans are young, unripe fruits of various cultivars of the common bean, although immature or young pods of the runner bean, yardlong bean, and hyacinth bean are used in a similar way. Green beans are known by many common names, including French beans, string beans, and snap beans or simply \"snaps.\"', NULL, NULL, NULL),
(8, 'https://images.heb.com/is/image/HEBGrocery/000374791-1', 'Cabbage', 'Kubis', 'Cabbage, comprising several cultivars of Brassica oleracea, is a leafy green, red, or white biennial plant grown as an annual vegetable crop for its dense-leaved heads.', NULL, NULL, NULL),
(9, 'https://t4.ftcdn.net/jpg/02/87/25/37/360_F_287253716_I1seSRet5pt8YGBRRcTbPPV1WesM00n9.jpg', 'Capsicum', 'Paprika', 'Capsicum is a genus of flowering plants in the nightshade family Solanaceae, native to the Americas, cultivated worldwide for their chili pepper or bell pepper fruit.', NULL, NULL, NULL),
(10, 'https://leafy.id/wp-content/uploads/2019/12/p9.jpg', 'Carrot', 'Wortel', 'The carrot is a root vegetable, typically orange in color, though purple, black, red, white, and yellow cultivars exist, all of which are domesticated forms of the wild carrot, Daucus carota, native to Europe and Southwestern Asia. The plant probably originated in Persia and was originally cultivated for its leaves and seeds. The most commonly eaten part of the plant is the taproot, although the stems and leaves are also eaten. ', NULL, NULL, NULL),
(11, 'https://m.media-amazon.com/images/I/91EdPVzD99L._AC_UF1000,1000_QL80_.jpg', 'Cauliflower', 'Kembang Kol', 'Cauliflower is one of several vegetables in the species Brassica oleracea in the genus Brassica, which is in the Brassicaceae family. It is an annual plant that reproduces by seed. Typically, only the head is eaten – the edible white flesh is sometimes called \"curd\".', NULL, NULL, NULL),
(12, 'https://images.delightedcooking.com/sliced-cucumber.jpg', 'Cucumber', 'Timun', 'The cucumber is a widely-cultivated creeping vine plant in the family Cucurbitaceae that bears cylindrical to spherical fruits, which are used as culinary vegetables. Considered an annual plant, there are three main types of cucumber—slicing, pickling, and seedless—within which several cultivars have been created.', NULL, NULL, NULL),
(13, 'https://www.straitsmarket.com/wp-content/uploads/2020/09/long-bean.jpg', 'Kacang_Panjang', 'Long Beans', 'Long Bean is a legume cultivated for its edible green pods containing immature seeds, like the green bean. It is also known as: yardlong bean, pea bean, long-podded cowpea, Chinese long bean, snake bean, bodi, and bora.', NULL, NULL, NULL),
(14, 'https://blue.kumparan.com/image/upload/v1642595208/adgg90ydclwrrvvbkb7w.jpg', 'Papaya', 'Pepaya Muda', 'The papaya, papaw, or pawpaw is the plant species Carica papaya, one of the 21 accepted species in the genus Carica of the family Caricaceae. Unripe or unripe papaya is often used as fresh vegetables by the people of Indonesia. With a slightly crunchy texture and a slightly bland taste, raw papaya is perfect for chili sauce and eaten with warm rice.', NULL, NULL, NULL),
(15, 'https://www.pngitem.com/pimgs/m/104-1043666_transparent-sack-of-potatoes-hd-png-download.png', 'Potato', 'Kentang', 'The potato is a starchy food, a tuber of the plant Solanum tuberosum and is a root vegetable native to the Americas. The plant is a perennial in the nightshade family Solanaceae. Wild potato species can be found from the southern United States to southern Chile.', 'Vitamin C & Potassium', 'They\'re rich in vitamin C, which is an antioxidant. Potatoes were a life-saving food source in early times because the vitamin C prevented scurvy. Another major nutrient in potatoes is potassium, an electrolyte which aids in the workings of our heart, muscles, and nervous system.', 'https://health.ucdavis.edu/blog/good-food/potato-health-benefits-and-why-you-should-eat-more-spuds/2022/05#:~:text=They\'re%20rich%20in%20vitamin,%2C%20muscles%2C%20and%20nervous%20system.'),
(16, 'https://images.immediate.co.uk/production/volatile/sites/30/2020/02/pumpkin-3f3d894.jpg?quality=90&resize=556,505', 'Pumpkin', 'Labu', 'A pumpkin is a vernacular term for mature winter squash of species and varieties in the genus Cucurbita that has culinary and cultural significance but no agreed upon botanical or scientific meaning.', NULL, NULL, NULL),
(17, 'https://freshji.in/wp-content/uploads/2020/09/Radish-1.jpg', 'Radish', 'Lobak', 'The radish is an edible root vegetable of the family Brassicaceae that was domesticated in Asia prior to Roman times.', NULL, NULL, NULL),
(18, 'https://www.veggycation.com.au/siteassets/veggycationvegetable/choy-sum.jpg', 'Sawi_Hijau', 'Choy sum', 'Choy sum is a leafy vegetable commonly used in Chinese cuisine. It is a member of the genus Brassica of the mustard family, Brassicaceae. Choy sum is a transliteration of the Cantonese name, which can be literally translated as \"heart of the vegetable\". It is also known as Chinese flowering cabbage.', NULL, NULL, NULL),
(19, 'https://i5.walmartimages.ca/images/Enlarge/094/528/6000200094528.jpg', 'Sawi_Putih', 'Napa cabbage', 'Napa cabbage is a type of Chinese cabbage originating near the Beijing region of China that is widely used in East Asian cuisine. Since the 20th century, it has also become a widespread crop in Europe, the Americas and Australia. In much of the world, it is referred to as \"Chinese cabbage\".', NULL, NULL, NULL),
(20, 'https://upload.wikimedia.org/wikipedia/commons/8/89/Tomato_je.jpg', 'Tomato', 'Tomat', 'The tomato is the edible berry of the plant Solanum lycopersicum, commonly known as the tomato plant. The species originated in western South America, Mexico, and Central America. The Nahuatl word tomatl gave rise to the Spanish word tomate, from which the English word tomato derived', NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `vegetables`
--
ALTER TABLE `vegetables`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `vegetables`
--
ALTER TABLE `vegetables`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
