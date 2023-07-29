-- CreateEnum

CREATE TYPE "InterviewStatus" AS ENUM ('TODO', 'INPROGRESS', 'DONE');

-- CreateTable

CREATE TABLE
    "User" (
        "id" TEXT NOT NULL,
        "name" TEXT NOT NULL,
        "imageUrl" TEXT NOT NULL DEFAULT 'https://e7.pngegg.com/pngimages/304/275/png-clipart-user-profile-computer-icons-profile-miscellaneous-logo.png',
        CONSTRAINT "User_pkey" PRIMARY KEY ("id")
    );

-- CreateTable

CREATE TABLE
    "Interview" (
        "id" TEXT NOT NULL,
        "title" TEXT NOT NULL,
        "message" TEXT NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        "status" "InterviewStatus" NOT NULL DEFAULT 'TODO',
        "creatorId" TEXT NOT NULL,
        CONSTRAINT "Interview_pkey" PRIMARY KEY ("id")
    );

-- CreateTable

CREATE TABLE
    "Comment" (
        "id" TEXT NOT NULL,
        "message" TEXT NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        "interviewId" TEXT NOT NULL,
        "userId" TEXT NOT NULL,
        CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
    );

-- AddForeignKey

ALTER TABLE "Interview"
ADD
    CONSTRAINT "Interview_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey

ALTER TABLE "Comment"
ADD
    CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey

ALTER TABLE "Comment"
ADD
    CONSTRAINT "Comment_interviewId_fkey" FOREIGN KEY ("interviewId") REFERENCES "Interview"("id") ON DELETE CASCADE ON UPDATE CASCADE;