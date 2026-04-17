# 🍿 CINECOUNT

> **An AI-Driven, Full-Stack Cinema Booking & Management System**

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)
![Gemini AI](https://img.shields.io/badge/Google_Gemini-8E75B2?style=for-the-badge&logo=google&logoColor=white)
![EmailJS](https://img.shields.io/badge/EmailJS-F1A50E?style=for-the-badge&logo=minutemailer&logoColor=white)

CINECOUNT is a next-generation movie reservation platform that modernizes the digital ticketing experience. By integrating Large Language Models (LLMs) and real-time cloud databases, it bridges the gap between static booking sites and intelligent, user-centric applications.

---

## ✨ Key Features

* 🤖 **Dynamic AI Metadata:** Powered by **Google Gemini 2.5 Flash**, the system analyzes movie plots in real-time to generate personalized insights, including Storylines, Parental Guidance, and Target Audience Recommendations.
* 💺 **Interactive Seat Matrix:** A reactive 2D seating grid that tracks user selection, prevents double-booking logic, and calculates dynamic pricing instantly without page reloads.
* 🎟️ **Automated E-Ticketing:** Utilizes **EmailJS** for an SMTP-less delivery pipeline. Upon successful transaction simulation, users instantly receive a professionally formatted HTML E-Ticket in their inbox.
* 🎬 **Cinematic UI/UX:** A high-fidelity, responsive "Dark Mode" interface built with **Tailwind CSS**, featuring an auto-playing Showcase Slider for featured titles.
* 🛡️ **Resilient Architecture:** Includes API fallback logic. If AI or network services timeout, the system gracefully degrades to local database content to ensure uninterrupted user flow.

---

## 🏗️ System Architecture

1.  **Frontend (React + Vite):** Orchestrates state management and user interface.
2.  **Database (Cloud Firestore):** Stores the movie catalog, showtimes, and featured flags.
3.  **External APIs:**
    * *Google Generative Language API:* For real-time NLP and content generation.
    * *EmailJS:* For compiling React state data into deliverable email payloads.

---

## 🚀 Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites
* Node.js (v18 or higher)
* NPM or Yarn
* A Google Gemini API Key
* An EmailJS Account

### Installation

1. **Clone the repository**
   ```bash
   git clone [https://github.com/yourusername/cinecount.git](https://github.com/yourusername/cinecount.git)
   cd cinecount