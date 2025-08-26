# 🏫 Node School API

A robust **Node.js** backend API for managing schools, built with **TypeScript**, **Express**, and **TypeORM**.  
Supports adding schools, listing them, and validating data efficiently.  

---

## 🚀 Features

- ➕ Add a new school with **name, address, latitude, longitude**  
- 🔍 List schools based on coordinates  
- ✅ Validate input data using **custom middleware**  
- 🗄️ Automatic database schema sync via **TypeORM**  
- ⚠️ Clean error handling using **custom AppError class**  
- ☁️ Ready for production deployment (supports **Render**, **Heroku**, etc.)  

---

## 🛠 Tech Stack

| Layer           | Technology                   |
|-----------------|------------------------------|
| Backend         | Node.js + TypeScript         |
| Framework       | Express                      |
| Database        | MySQL                        |
| ORM             | TypeORM                      |
| Validation      | Custom Middleware            |
| Error Handling  | AppError Utility Class       |
| Deployment      | Render / Any Node.js host    |

---

## ⚙️ Setup

### 1. Clone the repo
```bash
git clone https://github.com/shubham-01-star/School-Management.git
cd node-school-api
2. Install dependencies
bash
Copy
Edit
npm install
3. Configure Environment
Create a .env file in project root:

env
Copy
Edit
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=yourpassword
DB_NAME=schooldb
PORT=3000
4. Run migrations / schema sync
bash
Copy
Edit
npm run sync:schema
5. Run locally
bash
Copy
Edit
# Dev mode (with nodemon + ts-node)
npm run dev

# Build + Run
npm run build
npm start
🌐 Deployment (Render Example)
In Render dashboard:

Build Command:

bash
Copy
Edit
npm install && npm run build
Start Command:

bash
Copy
Edit
npm start
Ensure your server listens on process.env.PORT.

📌 API Endpoints
1️⃣ Add School
POST /api/addSchool

Request:

json
Copy
Edit
{
  "name": "Mode2 School",
  "address": "Barakhamba Road , sector 14 , Delhi",
  "latitude": 28.6315,
  "longitude": 77.2200
}
Curl Example:

bash
Copy
Edit
curl --location 'https://school-management-wz47.onrender.com/api/addSchool' \
--header 'Content-Type: application/json' \
--data '{
  "name": "Mode2 School",
  "address": "Barakhamba Road , sector 14 , Delhi",
  "latitude": 28.6315,
  "longitude": 77.2200
}'
✅ Success Response:

json
Copy
Edit
{
  "id": 3,
  "name": "Mode2 School",
  "address": "Barakhamba Road , sector 14 , Delhi",
  "latitude": 28.6315,
  "longitude": 77.2200
}
❌ Error Response:

json
Copy
Edit
{
  "error": "School with this name already exists"
}
2️⃣ List Schools
GET /api/listSchools?lat=28&lng=77.23

Curl Example:

bash
Copy
Edit
curl --location 'https://school-management-wz47.onrender.com/api/listSchools?lat=28&lng=77.23'
✅ Success Response:

json
Copy
Edit
[
  {
    "id": 1,
    "name": "ABC Public School",
    "address": "Connaught Place, Delhi",
    "latitude": 28.632,
    "longitude": 77.219
  },
  {
    "id": 2,
    "name": "XYZ International",
    "address": "Karol Bagh, Delhi",
    "latitude": 28.645,
    "longitude": 77.210
  }
]
🧪 Testing with Postman
You can test APIs using Postman.

Open Postman → Import a new collection.

Create two requests inside collection:

➕ Add School
Method: POST

URL: https://school-management-wz47.onrender.com/api/addSchool

Body (JSON):

json
Copy
Edit
{
  "name": "Mode2 School",
  "address": "Barakhamba Road , sector 14 , Delhi",
  "latitude": 28.6315,
  "longitude": 77.2200
}
🔍 List Schools
Method: GET

URL: https://school-management-wz47.onrender.com/api/listSchools?lat=28&lng=77.23

✅ Save the collection as School-Management-API and share with stakeholders.

📄 License
MIT License © 2025