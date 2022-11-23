import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';
import { v4 as uuid } from 'uuid';

const prisma = new PrismaClient();

async function main() {
  await prisma.$connect();

  const user = await prisma.user.upsert({
    where: { email: 'john@email.com' },
    update: {},
    create: {
      id: uuid(),
      name: 'John Doe',
      email: 'john@email.com',
      password: await hash('password', 10),
      todos: {
        create: [
          {
            id: uuid(),
            title: 'Estudar Programação',
            completed: true,
            updatedAt: null
          },
          {
            id: uuid(),
            title: 'Conseguir um emprego',
            completed: false,
            updatedAt: null
          }
        ]
      },
      createdAt: new Date(),
      updatedAt: null
    },
    include: {
      todos: true
    }
  });

  console.log(user);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
