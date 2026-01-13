# 📝 AI Scorer: Handwritten-Exam-Checker-Record-Keeping-Mobile-Application using React Native

> **Status:** 🚧 Work in Progress (Frontend Development Phase)

## 📖 Overview
**AI Scorer** is a mobile application designed to streamline the grading process for educators. It aims to automate the checking of handwritten exams—including essays, multiple-choice, identification, and essay grading—using Artificial Intelligence, while simultaneously serving as a digital class record for managing student data (names, sections, and classes).

## 📱 Features

### Current Implementation (Frontend)
* **Authentication System:**
    * Secure Login & Signup flows.
    * OTP Verification & Password Reset functionality.
* **Class Management:** Tools to organize students by class and section.
* **Exam Capture:** Interface for capturing images of handwritten exam papers.
* **Analytics Dashboard:** (UI Layout) Visualizing student performance and class averages.
* **Profile Management:** User settings and instructor profile.

### Roadmap & Upcoming Features
* **Backend Integration:** Database setup using Firebase for storing student records and exam history.
* **AI Integration:**
    * OCR (Optical Character Recognition) for handwriting.
    * Automated scoring logic for different exam types (Essay, Identification, Multiple Choice).
* **Export Data:** Generating CSV/PDF reports of class grades.

## 🛠️ Tech Stack
* **Framework:** [React Native](https://reactnative.dev/) with [Expo](https://expo.dev/)
* **Routing:** Expo Router
* **Language:** TypeScript
* **Styling:** NativeWind / StyleSheet (Adjust based on what you are actually using)


## 📂 Project Structure
The project follows the [Expo Router](https://docs.expo.dev/router/introduction/) file-based routing convention:

```text
/
├── app/
│   ├── (auth)/                 # 🔐 Authentication Route Group
│   │   ├── login.tsx           # Login Screen
│   │   ├── signup.tsx          # Registration Screen
│   │   ├── otp.tsx             # OTP Verification
│   │   ├── forgotpass.tsx      # Password Recovery
│   │   └── _layout.tsx         # Auth Stack Layout
│   │
│   ├── (tabs)/                 # 📱 Main Application Tabs
│   │   ├── home.tsx            # Dashboard/Home Screen
│   │   ├── analytics/          # Analytics Feature
│   │   ├── capture/            # Camera & Scanning Feature
│   │   ├── classes/            # Class Management Feature
│   │   ├── profile/            # User Settings & Profile
│   │   └── _layout.tsx         # Tab Bar Layout
│   │
│   ├── _layout.tsx             # Root Layout (Entry point)
│   └── index.tsx               # Redirect logic (or Landing page)
│
├── assets/images/              # 🖼️ Static Assets (Logos, Icons)
├── app.json                    # Expo Project Configuration
└── tsconfig.json               # TypeScript Configuration

## ⚙️ Installation & Setup

To run this project locally:

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-link-here>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the application:**
    ```bash
    npx expo start
    ```

## 📸 Screenshots
*(You can add screenshots of your Login screen or Home dashboard here later)*

---
*Created by Clarise Mae Elle*