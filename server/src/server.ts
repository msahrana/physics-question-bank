import app from './app';
import config from './app/config';
import { transporter } from './app/lib/nodemailer';
import { prisma } from './app/lib/prisma';
import { redisClient } from './app/lib/redis';

import {
    seedSuperAdmin,
    seedTesterAdmin,
    seedTesterTeacher,
} from './app/utils/seed';

const PORT = config.port;

const main = async () => {
    try {
        // Database connection
        await prisma.$connect();
        console.log('🗃️  Database connected successfully!');

        // Redis connection
        await redisClient.connect();
        console.log('🔥 Redis Connected Successfully!');

        await transporter.verify();
        console.log('⭐ Nodemailer Connected Successfully.');

        // await seedSuperAdmin();
        // await seedTesterAdmin();
        // await seedTesterTeacher();

        // Start server
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on port: ${PORT}`);
        });
    } catch (error) {
        console.error('❌ Error starting the server:', error);

        // Cleanup
        if (redisClient.isOpen) {
            await redisClient.quit().catch(console.error);
        }

        await prisma.$disconnect().catch(console.error);

        process.exit(1);
    }
};

main();
