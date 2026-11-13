-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'TEACHER', 'STUDENT');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'BLOCKED', 'DEACTIVATED', 'DELETED');

-- CreateEnum
CREATE TYPE "AccessType" AS ENUM ('FREE', 'PREMIUM');

-- CreateEnum
CREATE TYPE "AuthProvider" AS ENUM ('GOOGLE', 'CREDENTIAL');

-- CreateEnum
CREATE TYPE "QuestionStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- CreateEnum
CREATE TYPE "CQPartType" AS ENUM ('KA', 'KHA', 'GA', 'GHA');

-- CreateEnum
CREATE TYPE "AuthTokenType" AS ENUM ('EMAIL_VERIFICATION', 'PASSWORD_RESET');

-- CreateEnum
CREATE TYPE "TeacherVerificationStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('STRIPE', 'SSLCOMMERZ');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "EducationBoard" AS ENUM ('DHAKA', 'RAJSHAHI', 'CUMILLA', 'JASHORE', 'CHITTAGONG', 'BARISHAL', 'SYLHET', 'DINajPUR', 'MYMENSINGH', 'MADRASAH', 'TECHNICAL', 'OTHER');

-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('PENDING', 'ACTIVE', 'EXPIRED', 'CANCELLED');

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "provider" "AuthProvider" NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "passwordHash" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth_tokens" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "type" "AuthTokenType" NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "usedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "auth_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chapters" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "chapterNo" INTEGER NOT NULL,
    "description" TEXT,
    "thumbnail" TEXT,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "courseId" TEXT NOT NULL,
    "createdById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "chapters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "courses" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "thumbnail" TEXT,
    "accessType" "AccessType" NOT NULL DEFAULT 'FREE',
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "courses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cq_parts" (
    "id" TEXT NOT NULL,
    "cqQuestionId" TEXT NOT NULL,
    "type" "CQPartType" NOT NULL,
    "question" JSONB NOT NULL,
    "questionText" TEXT,
    "answer" JSONB,
    "answerText" TEXT,
    "marks" INTEGER NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cq_parts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cq_questions" (
    "id" TEXT NOT NULL,
    "question" JSONB NOT NULL,
    "questionText" TEXT,
    "difficulty" "Difficulty" NOT NULL DEFAULT 'MEDIUM',
    "status" "QuestionStatus" NOT NULL DEFAULT 'DRAFT',
    "isPremium" BOOLEAN NOT NULL DEFAULT false,
    "source" TEXT,
    "sourceYear" INTEGER,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "publishedAt" TIMESTAMP(3),
    "photoUrl" TEXT,
    "chapterId" TEXT NOT NULL,
    "stimulusId" TEXT,
    "createdById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cq_questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mcq_options" (
    "id" TEXT NOT NULL,
    "text" JSONB NOT NULL,
    "textPlain" TEXT,
    "isCorrect" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "questionId" TEXT NOT NULL,

    CONSTRAINT "mcq_options_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mcq_questions" (
    "id" TEXT NOT NULL,
    "question" JSONB NOT NULL,
    "questionText" TEXT,
    "explanation" JSONB,
    "explanationText" TEXT,
    "difficulty" "Difficulty" NOT NULL DEFAULT 'MEDIUM',
    "status" "QuestionStatus" NOT NULL DEFAULT 'DRAFT',
    "isPremium" BOOLEAN NOT NULL DEFAULT false,
    "source" TEXT,
    "sourceYear" INTEGER,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "publishedAt" TIMESTAMP(3),
    "chapterId" TEXT NOT NULL,
    "stimulusId" TEXT,
    "createdById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mcq_questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "media_assets" (
    "id" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "altText" TEXT,
    "uploadedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "media_assets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payments" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "transactionId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "method" "PaymentMethod" NOT NULL,
    "provider" TEXT NOT NULL,
    "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "paidAt" TIMESTAMP(3),
    "stripeCustomerId" TEXT NOT NULL,
    "currentPeriodEnd" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "plans" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "price" DECIMAL(10,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'BDT',
    "duration" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "short_questions" (
    "id" TEXT NOT NULL,
    "question" JSONB NOT NULL,
    "questionText" TEXT,
    "answer" JSONB,
    "answerText" TEXT,
    "explanation" JSONB,
    "explanationText" TEXT,
    "difficulty" "Difficulty" NOT NULL DEFAULT 'MEDIUM',
    "status" "QuestionStatus" NOT NULL DEFAULT 'DRAFT',
    "isPremium" BOOLEAN NOT NULL DEFAULT false,
    "source" TEXT,
    "sourceYear" INTEGER,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "publishedAt" TIMESTAMP(3),
    "photoUrl" TEXT,
    "chapterId" TEXT NOT NULL,
    "createdById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "short_questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stimulus" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "content" JSONB NOT NULL,
    "contentText" TEXT,
    "chapterId" TEXT NOT NULL,
    "createdById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "stimulus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "students" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "classLevel" TEXT,
    "institution" TEXT,
    "board" TEXT,
    "academicYear" TEXT,
    "contactNumber" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "students_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscriptions" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'BDT',
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "status" "SubscriptionStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teachers" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "contactNumber" TEXT,
    "resume" TEXT,
    "resumePublicId" TEXT,
    "additionalFiles" JSONB,
    "verificationStatus" "TeacherVerificationStatus" NOT NULL DEFAULT 'PENDING',
    "qualification" TEXT,
    "designation" TEXT,
    "experienceYears" INTEGER,
    "bio" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "teachers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "topics" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "chapterId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "topics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "role" "UserRole" NOT NULL DEFAULT 'STUDENT',
    "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE',
    "needPasswordChange" BOOLEAN NOT NULL DEFAULT false,
    "imageUrl" TEXT NOT NULL DEFAULT '',
    "imagePublicId" TEXT NOT NULL DEFAULT '',
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_providerAccountId_key" ON "accounts"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_userId_provider_key" ON "accounts"("userId", "provider");

-- CreateIndex
CREATE UNIQUE INDEX "auth_tokens_tokenHash_key" ON "auth_tokens"("tokenHash");

-- CreateIndex
CREATE INDEX "auth_tokens_userId_type_idx" ON "auth_tokens"("userId", "type");

-- CreateIndex
CREATE INDEX "auth_tokens_expiresAt_idx" ON "auth_tokens"("expiresAt");

-- CreateIndex
CREATE INDEX "chapters_courseId_isPublished_sortOrder_idx" ON "chapters"("courseId", "isPublished", "sortOrder");

-- CreateIndex
CREATE INDEX "chapters_createdById_idx" ON "chapters"("createdById");

-- CreateIndex
CREATE UNIQUE INDEX "chapters_courseId_slug_key" ON "chapters"("courseId", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "chapters_courseId_chapterNo_key" ON "chapters"("courseId", "chapterNo");

-- CreateIndex
CREATE UNIQUE INDEX "courses_slug_key" ON "courses"("slug");

-- CreateIndex
CREATE INDEX "courses_isPublished_sortOrder_idx" ON "courses"("isPublished", "sortOrder");

-- CreateIndex
CREATE INDEX "courses_createdById_idx" ON "courses"("createdById");

-- CreateIndex
CREATE INDEX "cq_parts_cqQuestionId_sortOrder_idx" ON "cq_parts"("cqQuestionId", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "cq_parts_cqQuestionId_type_key" ON "cq_parts"("cqQuestionId", "type");

-- CreateIndex
CREATE INDEX "cq_questions_chapterId_status_sortOrder_idx" ON "cq_questions"("chapterId", "status", "sortOrder");

-- CreateIndex
CREATE INDEX "cq_questions_chapterId_difficulty_idx" ON "cq_questions"("chapterId", "difficulty");

-- CreateIndex
CREATE INDEX "cq_questions_stimulusId_idx" ON "cq_questions"("stimulusId");

-- CreateIndex
CREATE INDEX "cq_questions_createdById_idx" ON "cq_questions"("createdById");

-- CreateIndex
CREATE INDEX "cq_questions_status_publishedAt_idx" ON "cq_questions"("status", "publishedAt");

-- CreateIndex
CREATE UNIQUE INDEX "mcq_options_questionId_sortOrder_key" ON "mcq_options"("questionId", "sortOrder");

-- CreateIndex
CREATE INDEX "mcq_questions_chapterId_status_sortOrder_idx" ON "mcq_questions"("chapterId", "status", "sortOrder");

-- CreateIndex
CREATE INDEX "mcq_questions_chapterId_difficulty_idx" ON "mcq_questions"("chapterId", "difficulty");

-- CreateIndex
CREATE INDEX "mcq_questions_stimulusId_idx" ON "mcq_questions"("stimulusId");

-- CreateIndex
CREATE INDEX "mcq_questions_createdById_idx" ON "mcq_questions"("createdById");

-- CreateIndex
CREATE INDEX "mcq_questions_status_publishedAt_idx" ON "mcq_questions"("status", "publishedAt");

-- CreateIndex
CREATE INDEX "media_assets_uploadedById_idx" ON "media_assets"("uploadedById");

-- CreateIndex
CREATE UNIQUE INDEX "Payments_studentId_key" ON "Payments"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "Payments_transactionId_key" ON "Payments"("transactionId");

-- CreateIndex
CREATE UNIQUE INDEX "plans_slug_key" ON "plans"("slug");

-- CreateIndex
CREATE INDEX "plans_isActive_displayOrder_idx" ON "plans"("isActive", "displayOrder");

-- CreateIndex
CREATE INDEX "short_questions_chapterId_status_sortOrder_idx" ON "short_questions"("chapterId", "status", "sortOrder");

-- CreateIndex
CREATE INDEX "short_questions_chapterId_difficulty_idx" ON "short_questions"("chapterId", "difficulty");

-- CreateIndex
CREATE INDEX "short_questions_createdById_idx" ON "short_questions"("createdById");

-- CreateIndex
CREATE INDEX "short_questions_status_publishedAt_idx" ON "short_questions"("status", "publishedAt");

-- CreateIndex
CREATE INDEX "stimulus_chapterId_idx" ON "stimulus"("chapterId");

-- CreateIndex
CREATE INDEX "stimulus_createdById_idx" ON "stimulus"("createdById");

-- CreateIndex
CREATE UNIQUE INDEX "students_userId_key" ON "students"("userId");

-- CreateIndex
CREATE INDEX "students_classLevel_idx" ON "students"("classLevel");

-- CreateIndex
CREATE INDEX "students_board_idx" ON "students"("board");

-- CreateIndex
CREATE INDEX "subscriptions_studentId_status_idx" ON "subscriptions"("studentId", "status");

-- CreateIndex
CREATE INDEX "subscriptions_planId_idx" ON "subscriptions"("planId");

-- CreateIndex
CREATE INDEX "subscriptions_endDate_idx" ON "subscriptions"("endDate");

-- CreateIndex
CREATE UNIQUE INDEX "teachers_userId_key" ON "teachers"("userId");

-- CreateIndex
CREATE INDEX "topics_chapterId_sortOrder_idx" ON "topics"("chapterId", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "topics_chapterId_slug_key" ON "topics"("chapterId", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_role_status_idx" ON "users"("role", "status");

-- CreateIndex
CREATE INDEX "users_deletedAt_idx" ON "users"("deletedAt");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auth_tokens" ADD CONSTRAINT "auth_tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chapters" ADD CONSTRAINT "chapters_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chapters" ADD CONSTRAINT "chapters_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cq_parts" ADD CONSTRAINT "cq_parts_cqQuestionId_fkey" FOREIGN KEY ("cqQuestionId") REFERENCES "cq_questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cq_questions" ADD CONSTRAINT "cq_questions_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "chapters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cq_questions" ADD CONSTRAINT "cq_questions_stimulusId_fkey" FOREIGN KEY ("stimulusId") REFERENCES "stimulus"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cq_questions" ADD CONSTRAINT "cq_questions_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mcq_options" ADD CONSTRAINT "mcq_options_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "mcq_questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mcq_questions" ADD CONSTRAINT "mcq_questions_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "chapters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mcq_questions" ADD CONSTRAINT "mcq_questions_stimulusId_fkey" FOREIGN KEY ("stimulusId") REFERENCES "stimulus"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mcq_questions" ADD CONSTRAINT "mcq_questions_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_assets" ADD CONSTRAINT "media_assets_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "short_questions" ADD CONSTRAINT "short_questions_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "chapters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "short_questions" ADD CONSTRAINT "short_questions_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stimulus" ADD CONSTRAINT "stimulus_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "chapters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stimulus" ADD CONSTRAINT "stimulus_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_planId_fkey" FOREIGN KEY ("planId") REFERENCES "plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teachers" ADD CONSTRAINT "teachers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "topics" ADD CONSTRAINT "topics_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "chapters"("id") ON DELETE CASCADE ON UPDATE CASCADE;
