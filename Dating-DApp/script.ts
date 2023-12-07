import { PrismaClient } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient()

async function createUser(username: string, email: string, password: string) {
  const femaleUsers = ['Ava Ambuske', 'Emma Gibson', 'Katherine Monroy'];
  const gender = femaleUsers.includes(username) ? 'Female' : 'Male';
  const interestedIn = femaleUsers.includes(username) ? 'Male' : 'Female';

  const user = await prisma.profile.create({
    data: {
      id: uuidv4(),
      firstname: username.split(' ')[0],
      lastname: username.split(' ')[1],
      email: email,
      dateOfBirth: new Date(),
      gender: gender,
      interestedIn: interestedIn,
      bio: 'This is a bio',
      city: 'City',
      wallet: 'Wallet',
      country: 'Country',
      photoUrl: 'Photo',
    },
  })
  console.log(user)
}

async function getUsers() {
  const users = await prisma.profile.findMany()
  console.log(users)
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

  // Writes users into the database
  // for (const user of users) {
  //   await createUser(user, `${user.replace(' ', '').toLowerCase()}@prisma.io`, 'password')
  // }

  // Returns all users
  getUsers()
  
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
