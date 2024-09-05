# Tic-tac-toe (OX Game) Web Application

## Overview

This is a web application for playing Tic-tac-toe (OX Game) where users can play against a bot. The application supports OAuth 2.0 authentication with Google, tracks user scores, and provides a system to monitor player scores.

## Features

- **OAuth 2.0 Authentication**: Users can log in using their Google account.
- **Gameplay**: Play Tic-tac-toe against a bot.
- **Score Tracking**: Users earn and lose points based on game outcomes.
- **Consecutive Wins Bonus**: Users receive extra points for winning three games consecutively.
- **Score Monitoring**: View scores of all players.

## Technologies Used

- **Frontend**: React (Next.js with TypeScript)
- **Backend**: Node.js (Next.js API Routes)
- **Database**: Prisma with MariaDB
- **Authentication**: NextAuth.js with Google Provider
- **Styling**: Tailwind CSS

## Project Structure

- **`/pages`**: Contains Next.js pages, including login, game and scores page.
- **`/lib`**: Contains utility files, including Prisma and session management.
- **`/public`**: Contains static assets such as images.
- **`/api`**: Contains API routes for managing scores and authentication.

## Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/tic-tac-toe.git
cd tic-tac-toe
and
cd ox-game

setup .env

how to setup google oauth https://ethanmick.com/how-to-set-up-google-oauth-with-next-js-using-next-auth/

npm install

npx prisma migrate dev --name init

npm run dev

Open http://localhost:3000/login
```
