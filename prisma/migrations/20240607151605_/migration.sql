-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'USER'
);

-- CreateTable
CREATE TABLE "Buku" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "judul" TEXT NOT NULL,
    "ISBN" TEXT NOT NULL,
    "penulis" TEXT NOT NULL,
    "tahun_terbit" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
