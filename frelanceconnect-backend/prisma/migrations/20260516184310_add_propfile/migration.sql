-- AlterTable
ALTER TABLE "Employer" ADD COLUMN     "companySize" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "industry" TEXT,
ADD COLUMN     "location" TEXT;

-- AlterTable
ALTER TABLE "Freelancer" ADD COLUMN     "availability" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "github" TEXT,
ADD COLUMN     "linkedin" TEXT,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "title" TEXT,
ADD COLUMN     "website" TEXT;
