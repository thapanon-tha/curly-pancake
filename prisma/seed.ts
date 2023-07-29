import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const alice = await prisma.user.upsert({
    where: { id: '4f364222-c8ce-4c1a-9d3b-8903ec0f8fc0' },
    update: {},
    create: {
      id: '4f364222-c8ce-4c1a-9d3b-8903ec0f8fc0',
      imageUrl:
        'https://e7.pngegg.com/pngimages/304/275/png-clipart-user-profile-computer-icons-profile-miscellaneous-logo.png',
      name: 'alice',
    },
  });

  const bob = await prisma.user.upsert({
    where: { id: 'd2fdc4bf-c80b-4b5d-98a7-0372003d009b' },
    update: {},
    create: {
      id: 'd2fdc4bf-c80b-4b5d-98a7-0372003d009b',
      imageUrl:
        'https://e7.pngegg.com/pngimages/304/275/png-clipart-user-profile-computer-icons-profile-miscellaneous-logo.png',
      name: 'bob',
    },
  });

  const alex = await prisma.user.upsert({
    where: { id: '9fcc6cd4-eb15-4f6b-882d-1b3588f9a6f8' },
    update: {},
    create: {
      id: '9fcc6cd4-eb15-4f6b-882d-1b3588f9a6f8',
      imageUrl:
        'https://e7.pngegg.com/pngimages/304/275/png-clipart-user-profile-computer-icons-profile-miscellaneous-logo.png',
      name: 'bob',
    },
  });

  const interview = await prisma.interview.upsert({
    where: {
      id: 'd3aef5ed-7dbc-4724-8070-9f3ba19bab22',
    },
    update: {},
    create: {
      id: 'd3aef5ed-7dbc-4724-8070-9f3ba19bab22',
      title: 'Mock Interview',
      message: 'example interview data mock',
      status: 'TODO',
      creatorId: bob.id,
    },
  });

  await prisma.comment.upsert({
    where: {
      id: '4a38f984-2df0-11ee-be56-0242ac120002',
    },
    update: {},
    create: {
      id: '4a38f984-2df0-11ee-be56-0242ac120002',
      interviewId: interview.id,
      message: 'Very Good!',
      userId: bob.id,
    },
  });

  await prisma.comment.upsert({
    where: {
      id: '5f22d4cb-f386-4d81-906d-7fad29d1f7fc',
    },
    update: {},
    create: {
      id: '5f22d4cb-f386-4d81-906d-7fad29d1f7fc',
      interviewId: interview.id,
      message: 'Very Good!!',
      userId: alex.id,
    },
  });

  await prisma.comment.upsert({
    where: {
      id: 'dace7ed3-db10-4cc2-ac98-03e33b4dd4a2',
    },
    update: {},
    create: {
      id: 'dace7ed3-db10-4cc2-ac98-03e33b4dd4a2',
      interviewId: interview.id,
      message: 'Ultra Very Good!!',
      userId: alice.id,
    },
  });
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
