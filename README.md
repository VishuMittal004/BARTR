# BARTR - Swap Your Skills

BARTR is a modern platform that enables users to exchange skills, send money, and collaborate on projects. Built with Next.js and Tailwind CSS, BARTR offers a seamless and responsive user experience across all devices.

**Live Demo: [https://bartr1.vercel.app/](https://bartr1.vercel.app/)**

![BARTR Platform](git%20banner%20bartr.png)

## 💻 Installation

Follow these steps to set up the BARTR platform:

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/bartr-frontend.git
   cd bartr-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   This will create the `node_modules` folder with all necessary dependencies.

3. **Environment setup**
   No additional environment setup is required as the project uses mock data for demonstration purposes.

## 🚀 Quick Start

After installing dependencies, the project includes multiple launchers to get you started quickly:

1. **Double-click on `BARTR-Launcher.bat`** - Recommended! Visually enhanced launcher with step-by-step progress
2. **Alternatively, use `Start BARTR.vbs`** - A user-friendly launcher with simple GUI
3. **For developers: `start-bartr.bat`** - Command-line launcher for development and debugging
4. **Or run directly with npm**:
   ```bash
   npm run dev
   ```

Once started, the application will be available at: **http://localhost:9002**

### ⚠️ Stopping the Server

To stop the server, close the Node.js command window or use `taskkill /f /im node.exe` in a new command prompt.

## 🔑 Login Information

The application accepts any credentials for testing purposes:

- **Login**: Enter any phone number and password
- **Sign Up**: Fill in any details to create an account

## ✨ Features

### Mobile App Integration
- Download options for both Android and iOS mobile apps
- Streamlined mobile experience with the same feature set as the web platform
- QR code scanning option for quick downloads (coming soon)

### User Authentication
- Complete login/signup flow with instant feedback
- Localized for Indian users with +91 country code and Indian names
- Responsive design for all device sizes

### Dashboard
- Activity overview with user statistics
- Skill matching recommendations
- Course recommendations with detailed popups

### Skill Matching
- Advanced skill matcher that connects users based on complementary skills
- Interactive profile cards with detailed information
- Profile popups for quick user information access

### Messaging System
- Real-time chat interface between users
- Barter request functionality directly from conversations
- Money transfer capability with Indian Rupee support
- User safety with report and block functionality

### Barter Requests
- Create and manage barter requests
- Track incoming and outgoing requests
- Accept or decline requests with status updates

### Course Recommendations
- Curated courses based on user skills
- Detailed course popups with curriculum information
- Easy enrollment process

### Global Search
- Search across users, messages, and barter requests
- Filter results by various criteria
- Quick access to relevant information

### User Safety & Protection
- Report system with categorized reasons and detailed descriptions
- User blocking functionality with visual indicators

## 💻 Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, Shadcn/UI components
- **State Management**: React Hooks
- **Data Handling**: Mock APIs with simulated network delays

## 🔄 Deployment

BARTR can be easily deployed to Vercel:

1. **Create a Vercel account** at [vercel.com](https://vercel.com) if you don't have one

2. **Connect your GitHub repository**
   - Push your code to GitHub (remember to exclude node_modules)
   - In Vercel dashboard, click "Import Project" and select your repository

3. **Configure deployment settings**
   - Framework Preset: Next.js (auto-detected)
   - Build Command: next build
   - Output Directory: .next

4. **Deploy**
   - Click "Deploy" and Vercel will build and deploy your application
   - You'll get a URL like `bartr.vercel.app` where your application is live

### Live Deployment

**The current version of BARTR is deployed at: [https://bartr1.vercel.app/](https://bartr1.vercel.app/)**

You can visit this link to explore the full platform with all features implemented including:
- User authentication (use any credentials)
- Dashboard with skill matching
- Messaging with report/block functionality
- Barter request system
- Money transfer capabilities

## 📁 Project Structure

```
src/
├── app/              # Next.js app directory with page components
├── components/       # Reusable UI components
│   ├── ai/           # AI-powered components like skill matcher
│   ├── courses/      # Course recommendation components
│   ├── layout/       # Layout components (header, sidebar, etc.)
│   ├── messaging/    # Chat and messaging components
│   ├── profile/      # User profile components
│   ├── requests/     # Barter request components
│   ├── search/       # Search components
│   └── ui/           # Base UI components
├── data/             # Mock data for users, messages, requests
├── hooks/            # Custom React hooks
├── lib/              # Utility functions
├── styles/           # Global styles
└── types/            # TypeScript type definitions
```

## 🧩 Extensibility

The modular architecture of BARTR allows for easy extension and integration with real APIs. The current implementation uses mock data, which can be replaced with actual API calls without significant changes to the UI components.

## 📱 Responsive Design

BARTR is fully responsive and optimized for:
- Desktop computers
- Tablets
- Mobile phones

The interface automatically adapts to different screen sizes to provide the best user experience on any device.

---

Developed for skill exchange and collaboration. © 2025 BARTR Platform.
