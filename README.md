
# 📝 BlogNow

**BlogNow** is a dynamic multi-user blogging platform where anyone can write and publish blogs in real-time, while also staying updated with the latest **world trending news** — with an option to **listen** to the news through voice narration.

<img width="1836" height="866" alt="image" src="https://github.com/user-attachments/assets/89935e59-2330-4c33-b988-b3daf6cd78d8" />
<img width="1827" height="892" alt="image" src="https://github.com/user-attachments/assets/c0b1006f-1989-4fb1-ba86-09256f0ea66b" />

<!-- Optional: Add an image -->

## 🚀 Features

* ✍️ **Create & Share Blogs**: Users can register and start writing blogs instantly.
* 🌍 **Trending News Feed**: Integrated live news feed using News API.
* 🔊 **Listen to News**: Text-to-speech functionality to listen to the latest headlines.
* 🔐 **Authentication**: Secure sign-in and sign-up for every user.
* 👤 **User Profiles**: View blogs by specific users and manage your own profile.
* ❤️ **Likes & Saves**: Like and save blogs for later.
* 🧠 **Modern UI/UX**: Sleek, responsive interface built for all screen sizes.

## 🧑‍💻 Tech Stack

### Frontend:

* **Next.js**
* **Tailwind CSS**
* **Shadcn/ui** (for dialogs, modals, and form components)

### Backend:

* **Node.js**
* **Express.js**
* **MongoDB** with **Mongoose**

### APIs & Auth:

* **Clerk** (for authentication)
* **NewsAPI.org** (for latest headlines)
* **OpenAI / Google Text-to-Speech** (for voice narration)

---

## 🖼️ Live Demo

🌐 [Visit BlogNow](https://blognow-one.vercel.app)
Video [https://youtu.be/_P8TshMPyZE]

---

## 📦 Installation & Setup

```bash
# 1. Clone the repo
git clone https://github.com/your-username/blognow.git
cd blognow

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Add your MongoDB URI, Clerk Keys, and NewsAPI Key

# 4. Run the development server
npm run dev
```

---

## 📂 Folder Structure

```
blognow/
├── app/                   # Next.js App Directory
├── components/            # Reusable UI Components
├── models/                # Mongoose Models (User, Blog, Comment)
├── lib/                   # Utility functions
├── public/                # Static assets
├── styles/                # Global styles
└── .env.example           # Environment variable template
```

---

## 🔐 Environment Variables

Create a `.env` file and add the following:

```env
MONGODB_URI=your_mongodb_uri
CLERK_SECRET_KEY=your_clerk_key
NEWS_API_KEY=your_newsapi_key
```

---

## 📸 Screenshots

> Add some screenshots here showing:

* Blog creation
* Trending news section
* Voice playback feature
* Responsive mobile view

---

## 🤝 Contributing

Contributions are welcome! If you'd like to improve or extend BlogNow:

1. Fork the repo
2. Create your feature branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature-name`)
5. Open a Pull Request

---

## 📬 Contact

For questions, suggestions, or collaboration:

* 🧑 Aryan Rastogi


## 📄 License

This project is licensed under the [MIT License](LICENSE).

