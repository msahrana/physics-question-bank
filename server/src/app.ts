import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, {
    type Application,
    type Request,
    type Response,
} from 'express';
import config from './app/config';
import { globalErrorHandler } from './app/middleware/globalErrorHandler';
import { notFound } from './app/middleware/notFound';
import router from './app/routes';

const app: Application = express();

app.use(
    cors({
        origin: config.frontend_url,
        credentials: true,
    }),
);

// Enable URL-encoded form data parsing / parser
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cookieParser());

// Application routes
app.use('/api/v1', router);

// Basic route
app.get('/', (req: Request, res: Response) => {
    res.send(`<h2 style="
            color: black;
            background-color: cyan;
            font-size: 45px;
            text-align: center;
            padding: 20px;
        ">
            Hello, Welcome Our 
            <span style="color: yellow; ">Physics Mentor BD</span><span style="color: red;">– MCQ, CQ & Short Questions</span>
            Backend Server ...!
        </h2>`);
});

// Not Found
app.use(notFound);

// Global Error Handler
app.use(globalErrorHandler);

export default app;
