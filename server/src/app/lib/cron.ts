import cron from 'node-cron';
import { prisma } from '../lib/prisma';
import { UserStatus } from '../../../generated/prisma/enums';

export const deleteUnverifiedUsers = () => {
    cron.schedule('0 * * * *', async () => {
        try {
            const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

            const deletedUsers = await prisma.user.deleteMany({
                where: {
                    emailVerified: false,
                    createdAt: {
                        lt: oneHourAgo,
                    },
                    status: {
                        not: UserStatus.DELETED,
                    },
                },
            });

            if (deletedUsers.count > 0) {
                console.log(
                    `Cron: Deleted ${deletedUsers.count} unverified users older than 1 hour!`,
                );
            }
        } catch (error) {
            console.error('Cron: Failed to delete unverified users!', error);
        }
    });

    console.log('Unverified User Delete cron scheduled (every 1 hour)!');
};
