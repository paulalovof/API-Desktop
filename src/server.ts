import express, { Request, Response, ErrorRequestHandler } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import apiRoutes from './routes/routes';
import rateLimit from 'express-rate-limit';
import logger from './config/winston';

const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, 
    max: 10, 
    message: { error: "Você excedeu o limite de requisições. Tente novamente mais tarde." },
    headers: true,
});

dotenv.config();

const server = express();

server.use(cors());
server.use(limiter);
server.use(express.json({ limit: '10kb' }));

server.use((req: Request, res: Response, next) => {
    logger.info({
        method: req.method,
        url: req.url,
        ip: req.ip,
        timestamp: new Date().toISOString(),
    });
    next();
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    logger.error({
        message: err.message,
        stack: err.stack,
        method: req.method,
        url: req.url,
        ip: req.ip,
        timestamp: new Date().toISOString(),
    });
    res.status(400).json({ error: 'Ocorreu algum erro.' });
};
server.use(errorHandler);

server.use(express.static(path.join(__dirname, '../public')));

//AQUI EU DIGO O FORMATO QUE EU QUERO A REQUISIÇÃO
//server.use(express.urlencoded({ extended: true })); // USANDO URL ENCODED
server.use(express.json()); //USANDO JSON

server.get('/ping', (req: Request, res: Response) => res.json({ pong: true }));

server.use(apiRoutes);

server.use((req: Request, res: Response) => {
    res.status(404);
    res.json({ error: 'Endpoint não encontrado.' });
});

server.listen(process.env.PORT);