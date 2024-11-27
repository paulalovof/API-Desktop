CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(45) NOT NULL,
  `senha` varchar(45) NOT NULL,
  `nome` varchar(45) NOT NULL,
  `disciplina` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
)

CREATE TABLE `notificacao` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(30) NOT NULL,
  `corpo` varchar(30) NOT NULL,
  `mostrar` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
)