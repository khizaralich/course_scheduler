# Course Scheduler

A web application for searching and viewing course information. Built with Spring Boot backend and React frontend.

## What it does
- Search for courses by code, number, and term
- View course enrollment information (capacity, available seats)
- Browse available courses

## Prerequisites
- Java 17+
- Node.js 16+
- npm

## How to run

### Backend
```bash
cd backend
./mvnw spring-boot:run
```

### Frontend
```bash
cd frontend
npm start
```

Visit `http://localhost:3000` to use the application.

## Troubleshooting

**Backend won't start?**
- Check Java version: `java -version`
- Make sure port 8080 is free: `lsof -i :8080`

**Frontend won't start?**
- Install dependencies: `cd frontend && npm install`
- Check if port 3000 is free

**Can't connect to backend?**
- Make sure both apps are running
- Check browser console for errors
