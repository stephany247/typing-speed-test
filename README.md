# Typing Speed Test

A fast, clean typing speed test app that measures WPM, accuracy, and errors in real time. Built to feel smooth, responsive, and distraction-free. This is a solution to the [Typing Speed Test challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/typing-speed-test), which helps improve real-world coding skills.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [How It Works](#how-it-works)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [My process](#my-process)
  - [Features](#features)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Future Improvements](#future-improvements)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Links

- Solution URL: [Github Repo](https://github.com/stephany247/typing-speed-test)
- Live Site URL: [Live Demo](https://typing-speed-test-steph.vercel.app/)

## How It Works

- Pick a difficulty and/or category
- Start typing when the test begins
- Stats update live as you type
- Results show when the test ends

## Getting Started

### Prerequisites

- Node.js (latest LTS recommended)
- npm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/stephany247/typing-speed-test.git

cd typing-speed-test
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

Open http://localhost:5173 in your browser to view the app.

## My process

### Features

- Real-time WPM tracking
- Accuracy tracking with error counting
- Multiple difficulty levels and text categories
- Progress bar with live updates
- Best score and first test detection
- Shareable results card
- Mobile-first, fully responsive design

### Built with

- Semantic HTML5 markup
- [Tailwind-css](https://tailwindcss.com) - A utility-first CSS framework
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- TypeScript
- [React](https://reactjs.org/) - JS library

### What I learned

I learned how to manage complex typing state like errors, backspaces, and live WPM updates without breaking the UI. I also got better at handling edge cases, syncing state with visuals, and keeping the app responsive and smooth.

I improved my understanding of TypeScript by fixing undefined states early, which helped avoid runtime bugs. I also learned how to generate shareable result cards using an HTML-to-image package and deal with font-loading issues across browsers.

## Future Improvements

- Custom text passages
- Theme toggle
- Leaderboard
- Mobile optimizations

### Continued development

I want to keep improving my state management for more complex interactions and edge cases. I also plan to refine performance, improve mobile support, and explore more advanced UI feedback and animations.

## Author

- Github - [Onyinye Stephanie Oguocha](https://github.com/stephany247)
- Frontend Mentor - [@stephany247](https://www.frontendmentor.io/profile/stephany247)
- Twitter - [@stephanyoguocha](https://www.twitter.com/stephanyoguocha)

## Acknowledgments

Thanks to the Frontend Mentor community for the challenge and inspiration from seeing different approaches. Also appreciate the helpful discussions and solutions shared by other developers.
