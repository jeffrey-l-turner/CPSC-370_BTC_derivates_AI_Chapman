import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface PotentialMatches {
  userId: string;
  potentialMatchId: string;
}

interface MatchRequests {
  userId: string;
  requestedMatchId: string;
}

interface AcceptedMatches {
  userId: string;
  acceptedMatchId: string;
}

async function addPotentialMatch(newUserId: string) {
  const newUser = await prisma.profile.findUnique({ where: { id: newUserId } });
  const existingUsers = await prisma.profile.findMany();

  for (const user of existingUsers) {
    if (user.gender === newUser.interestedIn && user.interestedIn === newUser.gender) {
      // Add new user to the potentialMatches of the existing user
      // This assumes that potentialMatches is a field in the Profile model
      user.potentialMatches.push(newUserId);
      await prisma.profile.update({
        where: { id: user.id },
        data: { potentialMatches: user.potentialMatches },
      });
    }
  }
}

async function makeMatchRequests(userId: string, potentialMatchId: string) {
  const matchRequest = await prisma.like.create({
    data: {
      userId: userId,
      requestedMatchId: potentialMatchId,
    },
  });
  return matchRequest;
}

async function addAcceptedMatch(userId: string, likedUserId: string) {
  const user = await prisma.profile.findUnique({ where: { id: userId } });
  const likedUser = await prisma.profile.findUnique({ where: { id: likedUserId } });

  if (user.potentialMatches.includes(likedUserId) && likedUser.potentialMatches.includes(userId)) {
    // Add each other to the acceptedMatches
    // This assumes that acceptedMatches is a field in the Profile model
    user.acceptedMatches.push(likedUserId);
    likedUser.acceptedMatches.push(userId);

    await prisma.profile.update({
      where: { id: userId },
      data: { acceptedMatches: user.acceptedMatches },
    });

    await prisma.profile.update({
      where: { id: likedUserId },
      data: { acceptedMatches: likedUser.acceptedMatches },
    });
  }
}

async function rejectMatch(userId: string, requestedMatchId: string) {
  const rejectedMatch = await prisma.like.delete({
    where: {
      userId_requestedMatchId: {
        userId: userId,
        requestedMatchId: requestedMatchId,
      },
    },
  });
  return rejectedMatch;
}

async function chatWithMatch(userId: string, matchId: string, message: string) {
  const chatMessage = await prisma.Message.create({
    data: {
      senderId: userId,
      receiverId: matchId,
      message: message,
    },
  });
  return chatMessage;
}

async function filterAndRank(userId: string) {
  const user = await prisma.profile.findUnique({ where: { id: userId } });
  const potentialMatches = await prisma.profile.findMany({
    where: {
      gender: user.interestedIn,
      interestedIn: user.gender,
    },
    orderBy: {
      dateOfBirth: 'asc',
      city: 'asc',
    },
  });
  return potentialMatches;
}
