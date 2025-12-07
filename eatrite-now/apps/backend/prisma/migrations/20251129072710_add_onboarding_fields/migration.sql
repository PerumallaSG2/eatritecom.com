-- AlterTable
ALTER TABLE "companies" ADD COLUMN     "employeeCount" INTEGER,
ADD COLUMN     "industry" TEXT,
ADD COLUMN     "onboardingCompleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "onboardingCompletedAt" TIMESTAMP(3);
