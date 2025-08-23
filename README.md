# Rezume - Simple Resume Builder

A simple, modern resume builder that takes user input and immediately builds a professional resume.

## Features

- 🚀 **Simple Interface**: Clean step-by-step form to input your information
- 🎨 **Professional Templates**: Choose from multiple resume templates
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 📄 **PDF Export**: Download your resume as a PDF
- 💾 **Real-time Preview**: See your resume update as you type

## Tech Stack

- **Frontend**: React with TypeScript, Tailwind CSS
- **Backend**: Express.js
- **Build Tool**: Vite
- **PDF Generation**: Server-side HTML to PDF conversion

## Getting Started

1. **Install dependencies:**
```bash
npm install
```

2. **Start the development server:**
```bash
npm run dev
```

3. **Open your browser:**
Visit `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run check` - Type check with TypeScript

## How to Use

1. Open the application in your browser
2. Fill out the step-by-step form with your information:
   - Personal Information
   - Education
   - Work Experience
   - Skills
   - Summary
3. Choose a template you like
4. Download your professional resume as PDF

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # UI components and form steps
│   │   ├── pages/         # Main pages (landing, resume builder)
│   │   └── lib/           # Utility functions
├── server/                # Backend Express application
├── shared/                # Shared TypeScript types
└── dist/                  # Built application (generated)
```

## Author

Created by **Dipesh Mahat**
