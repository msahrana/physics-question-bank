import app from './app';
import config from './app/config';
import { prisma } from './app/lib/prisma';
import { redisClient } from './app/lib/redis';

const PORT = config.port;

const main = async () => {
    try {
        // Database connection
        await prisma.$connect();
        console.log('🗃️  Database connected successfully!');

        // Redis connection
        await redisClient.connect();
        console.log('🔥 Redis Connected Successfully!');

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
