# iNotebook - Note Taking App (Frontend)

A **React-based note-taking application** frontend where users can create, edit, and manage their notes efficiently. This project demonstrates React components, state management, routing, and integration with a backend (Node.js + MongoDB).

## 🚀 Live Demo

Check it out here: [iNotebook](https://inotebook-i04d.onrender.com/)

## 🛠 Features

- Create, edit, and delete notes
- Real-time note updates
- User authentication (Login/Signup)
- Dark/Light mode toggle
- Responsive design for mobile and desktop
- Alerts for user actions
- Built with **React 18**, **React Router DOM**, and **Context API**

## 📂 Folder Structure

```text
inotebook-frontend/
├── public/                     # Static assets like index.html, favicon, etc.
├── src/
│   ├── components/             # Reusable components like Navbar, NotesItem, NoteForm, Alert
│   ├── context/                # Context API setup for users, messages, and friends
│   ├── pages/                  # Pages like ChatRoom, Friends, Suggestions
│   ├── App.js                  # Main app component
│   └── index.js                # Entry point of the React app
├── package.json                # Project metadata & dependencies
├── README.md                   # Project README file
└── .gitignore                  # Git ignore file
```

⚡ Technologies Used
- React 18 – For building the user interface
- React Router DOM – For routing between pages
- Context API – State management
- CSS / Tailwind – Styling
- Axios – For API requests
- GitHub Pages / Vercel / Render – For deployment

## 🔧 Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/inotebook-frontend.git
    cd inotebook-frontend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the development server:
    ```bash
    npm start
    ```
    **Or**
    To run both frontend and backend concurrently (if backend is set up) on inotebook-frontend directory:
    ```bash
    npm run both
    ```
4. Open your browser and navigate to `http://localhost:3000`

### 📖 Usage
- Sign up or log in to access your notes.
- Add new notes using the input form.
- Edit or delete notes using the respective buttons.

### 🤝 Contributing

Contributions are welcome! Open an issue or submit a pull request for improvements or bug fixes.
