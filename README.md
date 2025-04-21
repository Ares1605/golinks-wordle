<div align="center">

[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
[![Gunicorn](https://img.shields.io/badge/Gunicorn-499848?style=for-the-badge&logo=gunicorn&logoColor=white)](https://gunicorn.org/)
[![Svelte](https://img.shields.io/badge/Svelte-%23f1413d.svg?logo=svelte&logoColor=white&style=for-the-badge)](https://svelte.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff&style=for-the-badge)](https://www.typescriptlang.org/)
[![Sass](https://img.shields.io/badge/Sass-C69?logo=sass&logoColor=fff&style=for-the-badge)](https://sass-lang.com/)

</div>
# 🎯 Wordle App Clone

A stylish, responsive, and engaging Wordle clone developed for the **2025 Full Stack Engineering Intern position at GoLinks**. This enhanced version of the popular Wordle game includes smooth transitions, interactive features, and a sleek, modern design.

## 🚀 Tech Stack

### 🔧 Backend
- Python <img align="center" height="20" src="https://raw.githubusercontent.com/gilbarbara/logos/master/logos/python.svg">
- Flask <img align="center" src="https://raw.githubusercontent.com/gilbarbara/logos/master/logos/flask.svg" width="20">
- Gunicorn <img align="center" src="https://raw.githubusercontent.com/gilbarbara/logos/master/logos/gunicorn.svg" width="20">

### 🎨 Frontend
- TypeScript <img align="center" height="20" src="https://raw.githubusercontent.com/gilbarbara/logos/master/logos/typescript.svg">
- Svelte <img align="center" height="20" src="https://raw.githubusercontent.com/gilbarbara/logos/master/logos/svelte.svg">
- SASS <img align="center" height="20" src="https://raw.githubusercontent.com/gilbarbara/logos/master/logos/sass.svg">

## 🌟 Features

- **🔥 Heat Signatures:** Keyboard heat signatures visually highlight frequently used keys.
- **🔔 Notifications:** Dynamic notifications to improve user interaction.
- **✨ Smooth Transitions:** Eye-catching, "poppy" transitions for enhanced gameplay.
- **🎨 Neutral Color Scheme:** A clean and aesthetically pleasing interface.
- **🔄 Clear Grid:** Quickly reset the puzzle to retry the current word.
- **🆕 New Word Generation:** Instantly generate fresh puzzles beyond the daily challenge.
- **📚 Optimized Word Lists:** In-memory loading of words and answers with a relevancy threshold for engaging puzzles.
- **📱 Fully Responsive:** Optimized for seamless gameplay across desktops and mobile devices.

## 🖥️ Application Previews

### Desktop View

<img src="https://github.com/user-attachments/assets/3d22b12c-a51a-4a97-a502-107402d66417" alt="Desktop View Screenshot" width="600"/>

### Mobile View

<img src="https://github.com/user-attachments/assets/1d19f785-8895-4be6-a383-38640f6aa5ea" alt="Mobile View Screenshot" width="300"/>

## 🛠️ Installation and Setup

### Clone the Repository
```bash
git clone https://github.com/Ares1605/golinks-wordle
cd golinks-wordle
```

### Environment Configuration

Copy `.base-env` to `.env` in both the frontend and backend directories and populate the necessary key values.

### Backend Setup

Navigate to the backend directory and install dependencies:
```bash
cd backend
pip install -r requirements.txt
```

Start the backend server (development):
```bash
python app.py
```

For production:
```bash
nohup gunicorn app:app &
```

### Frontend Setup

Navigate to the frontend directory and install dependencies:
```bash
cd ../frontend
npm install
```

Build the frontend:
```bash
npm run build
```

## 📄 License

This project is licensed under the Apache 2.0 License.
