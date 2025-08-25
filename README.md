# 🛒 GrowwCarry

GrowwCarry is a **full-stack grocery shopping platform** built using the **MERN stack**.  
It is designed to provide a **secure, scalable, and user-friendly experience** for online grocery shopping with real-world eCommerce flows, including product browsing, cart management, secure payments, and an admin dashboard.

🔗 **Live Demo:** [GrowwCarry](https://growcarry.vercel.app)  
📂 **GitHub Repo:** [GrowwCarry Repository](https://github.com/AmitPandey-AP/Grow-Carry)

---

## 📖 Project Overview

In today’s fast-paced world, online grocery shopping platforms need to balance **performance, security, and usability**.  
GrowwCarry was developed with these principles in mind. It leverages **React** for a responsive front-end, **Node.js & Express** for scalable backend APIs, **MongoDB** for database management, and **Stripe** for secure payments.

This project demonstrates:
- **Real-world eCommerce architecture** (frontend + backend + DB + payments)  
- **Secure user management** (JWT authentication & bcrypt password hashing)  
- **Media handling** with Multer and Cloudinary  
- **Admin workflows** (product and order management)  

---

## 🚀 Tech Stack

### Frontend
- **React.js** – component-based UI, fast rendering  
- **Tailwind CSS** – modern utility-first styling  
- **HTML5** – semantic structure  

### Backend
- **Node.js** – event-driven backend runtime  
- **Express.js** – RESTful API framework  

### Database
- **MongoDB** with **Mongoose ORM** – schema modeling, flexible NoSQL  

### Authentication & Security
- **JWT (JSON Web Tokens)** – secure route protection  
- **bcryptjs** – password encryption  
- **cookie-parser, CORS** – session & cross-origin handling  

### File & Media Handling
- **Multer** – middleware for file uploads  
- **Cloudinary** – cloud storage and optimized image delivery  

### Payments
- **Stripe API** – tokenized, secure online payments  

---

## ✨ Key Features

- 🔐 **Authentication & Authorization** – JWT-protected routes and bcrypt password hashing  
- 🛍️ **Product Browsing & Search** – users can explore, filter, and search groceries  
- 🛒 **Cart & Orders** – add to cart, update quantities, and place orders  
- 👨‍💼 **Admin Dashboard** – manage products, orders, and users with role-based access  
- 💳 **Secure Checkout** – integrated with **Stripe** for real-time payment confirmation  
- 📸 **Product Image Uploads** – seamless image storage with Multer & Cloudinary  
- ⚡ **React Context API** – real-time cart synchronization across the app  

---

## 📡 Backend & API Highlights

- RESTful API endpoints built with **Express.js**  
- **MongoDB models with Mongoose** for structured data storage  
- **JWT authentication middleware** to protect sensitive routes  
- **Stripe integration** for handling payments securely  
- Example API routes:
  - `POST /api/auth/register` – Register new users  
  - `POST /api/auth/login` – User login & token generation  
  - `GET /api/products` – Fetch product list  
  - `POST /api/orders` – Place an order  

---

## 🛠 Challenges & Solutions

| Challenge | Solution |
|-----------|----------|
| Real-time cart updates | Implemented **React Context API** to synchronize cart state |
| User data security | Used **JWT, bcryptjs, HTTPS** for secure authentication |
| Image handling | Integrated **Multer & Cloudinary** for fast, optimized media uploads |

---

## 🔮 Future Enhancements

- 🧠 **AI Chatbot** – assist users with queries and feedback  
- 📊 **Advanced Analytics Dashboard** – insights for admins on orders & sales  
- 🔎 **Better Product Search** – with advanced filtering (category, price, availability)  

---

## 📦 Installation & Setup

Clone the repository:

```bash
git clone https://github.com/AmitPandey-AP/Grow-Carry.git
cd Grow-Carry
