import express from 'express';
import cors from 'cors';
import config from './config/config';
import router from './router';
import session from 'express-session';

const PORT = config.port;

const app = express();

// app.use(cors());

// Allow requests from the specified origin
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true, // Allow credentials (e.g., cookies)
  })
);

app.use(express.json());

// Use session middleware
app.use(
  session({
    name: 'sid',
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60, // 1hr,
      sameSite: true,
      httpOnly: false,
      secure: false,
    },
  })
);

app.use(router);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
