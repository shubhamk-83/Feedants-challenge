# Feedants Competition

A full-stack Competition Details module built for the Feedants Full Stack Development Internship technical assignment.

Built with React Native, Node.js, Express.js, and MongoDB. Competition info, registration, lifecycle, and submissions are handled dynamically through the backend.

## Tech Stack

React Native, Expo, JavaScript, NativeWind, Node.js, Express.js, MongoDB, Mongoose

## Features

- Dynamic competition details, lifecycle handling, and countdown timer
- Registration availability, remaining spots, and registration state
- Judge info, previous winners, rules/eligibility, rewards
- Submission URL upload and submission state
- Pull-to-refresh, loading/error states, responsive UI

## Project Structure

```
Feedants-Competition/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── constants/
│   │   ├── hooks/
│   │   ├── screens/
│   │   ├── services/
│   │   └── utils/
│   ├── App.jsx
│   ├── global.css
│   └── package.json
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── seed/
│   │   └── utils/
│   ├── server.js
│   └── package.json
└── README.md
```

## Running the Project

1. Clone the repository
```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd Feedants-Competition
```

2. Backend Setup
```bash
cd server
npm install
```
Create server/.env:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
CLIENT_ORIGIN=*
```
Start the backend:
```bash
npm run dev
```
Backend runs at http://localhost:5000

3. Frontend Setup
```bash
cd client
npm install
npx expo start
# or for web:
npx expo start --web
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/competitions/featured | Get featured competition |
| GET | /api/competitions/:id | Get competition by ID |
| POST | /api/competitions/:id/register | Register for a competition |
| POST | /api/competitions/:id/submissions | Submit an entry |

## Assumptions

- A user can register only once per competition; a max participant limit applies.
- Registration and submission are each allowed only within their configured time windows, and a user must be registered before submitting.
- Competition lifecycle state is derived from server-side timestamps — the backend is the source of truth, not the frontend.
- Uses a demo user identity instead of a full auth system; payment processing is out of scope.

## Key Technical Decisions

- React Native + Expo / NativeWind — required stack for the assignment; Expo simplifies dev/testing, NativeWind keeps styling concise.
- Express.js — REST APIs organized into routes, controllers/services, models, middleware, and utilities.
- MongoDB + Mongoose — fits the nested competition data (judges, winners, rules, rewards) with schema validation and indexes.
- Server-side lifecycle — status (UPCOMING → REGISTRATION_OPEN → FULL → REGISTRATION_CLOSED → SUBMISSION_OPEN → JUDGING → COMPLETED) is computed on the backend so it doesn't depend on the user's device clock.
- Atomic registration — participant count is incremented only when participantsCount < maxParticipants, as a single atomic DB operation, backed by a unique compound index on competitionId + userId to prevent duplicate/race-condition registrations.
- Reusable components — CompetitionHero, CompetitionStats, ImportantDates, JudgeCard, PreviousWinners, CompetitionTabs, Rewards, CompetitionBottomSection, SubmissionModal, BottomNav.

## Trade-offs

- Auth — no full authentication/authorization system; a demo user ID stands in for it. Production would need real auth.
- Payments — entry-fee UI is shown, but actual payment processing (order creation, verification, webhooks) is out of scope.
- Referral/feedback sections — included visually to match the reference design, without added backend systems.
- MongoDB over SQL — fits the nested data model well; a relational DB could offer stronger constraints for some transactional flows, but isn't necessary here.

## What I'd Improve for Production

- Auth — proper authentication, JWT/session management, refresh tokens, role-based access, protected APIs
- Payments — integrate a provider (e.g. Razorpay) with order creation, verification, webhooks, and idempotent handling
- Scalability — Redis caching, rate limiting, horizontal scaling, index optimization, background jobs
- Notifications — registration/submission/deadline/result emails or push notifications
- Testing — unit, integration, concurrency, and E2E tests
- Security — stricter CORS, input sanitization, secure headers, secrets management
- Observability — structured logging, error monitoring, metrics, health checks
- CI/CD — automated tests, builds, and environment-specific deployment pipelines

## Environment Variables

Do not commit .env files or secrets. Example:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
CLIENT_ORIGIN=*
```

Add to .gitignore:
```
node_modules/
.env
.expo/
dist/
web-build/
*.log
```

## Author

Shubham Kumar
Gmail - shubhamrajput5641@gmail.com
Phone - 6206881394
B.Tech Computer Science, SIRT, Bhopal