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
  const user = await prisma.profile.findUnique({ where: { id: userId } });
  const potentialMatches = await prisma.profile.findMany({
    where: {
      gender: user.interestedIn,
      interestedIn: user.gender,
    },
  });
  return potentialMatches;
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

async function acceptMatch(userId: string, requestedMatchId: string) {
  const acceptedMatch = await prisma.like.create({
    data: {
      userId: userId,
      acceptedMatchId: requestedMatchId,
    },
  });
  return acceptedMatch;
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
