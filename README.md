# 🍽 Restaurant Website — Full Stack

A complete restaurant website with a **Node.js / Express** backend and a plain **HTML + CSS + JavaScript** frontend. Customers can browse the menu, add items to a cart, book a table and create an account.

## ✨ Features

- **User authentication** — signup / login with bcrypt password hashing
- **Menu** — 16 cuisine categories loaded from JSON (`data/*.json`)
- **Shopping cart** — add/remove items, quantity and totals
- **Table booking** — reservation form saved to the database
- **Gallery, blog and about pages**
- **MySQL storage** — menu, bookings, orders and users
- **REST API** — Express routes used by the frontend

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Backend | Node.js, Express 5 |
| Database | MySQL (`mysql2`) |
| Auth | bcrypt |
| Frontend | HTML5, CSS3, vanilla JavaScript |
| Tooling | body-parser, cors |

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Create the database

```bash
mysql -u root -p -e "CREATE DATABASE restaurant_db"
mysql -u root -p restaurant_db < database-schema.sql
```

### 3. Configure the connection

Edit the MySQL settings at the top of `server.js`:

```js
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'restaurant_db'
});
```

### 4. Run

```bash
node server.js
```

The server starts on **http://localhost:3001** and serves the frontend as static files.

## 📁 Project Structure

```
PROJECT/
├── server.js              # Express server + API
├── database-schema.sql    # MySQL schema
├── data/                  # Menu data by cuisine (16 JSON files)
├── image/                 # Food and site images
├── index.html             # Landing page
├── menu.html              # Menu + cart
├── cart.html              # Cart page
├── blog.html / gallery.html / about.html
├── login.html / singup.html
├── auth.js                # Client-side auth helpers
├── *.css / *.js           # Page styles and scripts
└── package.json
```

## 📌 Notes

- Built as a Semester 5 (JSF) project.
- Change the default MySQL credentials before deploying.
- `node_modules/` and `.env` files are not committed.
