-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "roles" SET NOT NULL,
ALTER COLUMN "roles" SET DEFAULT 'user',
ALTER COLUMN "roles" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "public"."Contact" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);
