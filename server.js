import express from 'express';
import routes from './routes/index.route.js';
import dotenv from 'dotenv';
import { connectToMongo } from './configs/mongoose.config.js';
import i18n from 'i18n';
import path from 'path';

dotenv.config();

i18n.configure({
    locales: ['es'],
    directory: path.join(process.cwd(), 'locales'),
    defaultLocale: 'es',
    objectNotation: true,
    queryParameter: 'lang',
});

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(i18n.init);

app.use('/', routes);

const startServer = async () => {
    try {
        await connectToMongo();
        app.listen(port, () => console.log(`Servidor iniciado en puerto ${port}`));
    } catch (error) {
        console.error('Error al iniciar el servidor:', error);
    }
};

startServer();