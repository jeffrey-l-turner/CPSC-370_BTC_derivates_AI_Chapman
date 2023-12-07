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

async function makePotentialMatches(userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  const potentialMatches = await prisma.user.findMany({
    where: {
      gender: user.interestedIn,
      interestedIn: user.gender,
    },
  });
  return potentialMatches;
}

async function makeMatchRequests(userId: string, potentialMatchId: string) {
  const matchRequest = await prisma.matchRequests.create({
    data: {
      userId: userId,
      requestedMatchId: potentialMatchId,
    },
  });
  return matchRequest;
}

async function acceptMatch(userId: string, requestedMatchId: string) {
  const acceptedMatch = await prisma.acceptedMatches.create({
    data: {
      userId: userId,
      acceptedMatchId: requestedMatchId,
    },
  });
  return acceptedMatch;
}

async function rejectMatch(userId: string, requestedMatchId: string) {
  const rejectedMatch = await prisma.matchRequests.delete({
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
  const chatMessage = await prisma.message.create({
    data: {
      senderId: userId,
      receiverId: matchId,
      message: message,
    },
  });
  return chatMessage;
}

async function filterAndRank(userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  const potentialMatches = await prisma.user.findMany({
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
