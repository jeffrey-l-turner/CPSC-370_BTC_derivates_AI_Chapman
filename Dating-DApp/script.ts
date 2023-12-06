import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function createUser(username: string, email: string, password: string) {
  const user = await prisma.user.create({
    data: {
      username: username,
      email: email,
      password: password,
      profiles: {
        create: {
          firstName: username.split(' ')[0],
          lastName: username.split(' ')[1],
          dateOfBirth: new Date(),
          gender: 'Male',
          interestedIn: 'Female',
          bio: 'This is a bio',
          city: 'City',
          wallet: 'Wallet',
          country: 'Country',
        }
      },
      photos: {
        create: {
          photo: new Buffer('Photo'),
        }
      }
    },
  })
  console.log(user)
}

async function main() {
  const users = [
    'Ava Ambuske',
    'Gilberto Arellano',
    'Jesse Arevalo Baez',
    'Parker Escalette',
    'Noah Fuery',
    'Emma Gibson',
    'Alex Haberman',
    'Jack Mazac',
    'Carson McCue',
    'Katherine Monroy',
    'Chris Nam',
    'Devin Ng',
    'Luis Rivas',
    'Peter Senko',
    'James Shan',
    'Jaden Suh'
  ]

  for (const user of users) {
    await createUser(user, `${user.replace(' ', '').toLowerCase()}@prisma.io`, 'password')
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
