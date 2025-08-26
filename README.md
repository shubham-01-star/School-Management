# 🏫 Node School API

A robust **Node.js** backend API for managing schools, built with **TypeScript**, **Express**, and **TypeORM**.  
Supports adding schools, listing them by coordinates, and validating data efficiently.  

---

## ✨ Features

- ➕ Add a new school with **name, address, latitude, longitude**  
- 🔍 List schools near given coordinates  
- ✅ Input validation using **custom middleware**  
- 🗄️ Automatic schema sync with **TypeORM**  
- ⚠️ Centralized error handling using `AppError` class  
- ☁️ Ready for **production deployment** (Render, Heroku, etc.)  

---

## 🛠 Tech Stack

| Layer          | Technology        |
|----------------|-------------------|
| Backend        | Node.js + TypeScript |
| Framework      | Express           |
| Database       | MySQL             |
| ORM            | TypeORM           |
| Validation     | Custom Middleware |
| Error Handling | AppError Utility  |
| Deployment     | Render / Any Node.js host |

---

## ⚙️ Setup & Installation

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/shubham-01-star/School-Management.git
cd School-Management
2️⃣ Install Dependencies
bash
Copy
Edit
npm install
3️⃣ Configure Environment
Create a .env file in the root:

env
Copy
Edit
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=yourpassword
DB_NAME=schooldb
PORT=3000
4️⃣ Run Schema Sync
bash
Copy
Edit
npm run sync:schema
5️⃣ Start the Server
bash
Copy
Edit
# Development (nodemon + ts-node)
npm run dev

# Production Build
npm run build
npm start
🌐 Deployment (Render Example)
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
⚠️ Ensure server listens on process.env.PORT

📌 API Endpoints
1️⃣ Add School
POST /api/addSchool

Request
json
Copy
Edit
{
  "name": "Mode2 School",
  "address": "Barakhamba Road, Sector 14, Delhi",
  "latitude": 28.6315,
  "longitude": 77.2200
}
Curl Example
bash
Copy
Edit
curl --location 'https://school-management-wz47.onrender.com/api/addSchool' \
--header 'Content-Type: application/json' \
--data '{
  "name": "Mode2 School",
  "address": "Barakhamba Road, Sector 14, Delhi",
  "latitude": 28.6315,
  "longitude": 77.2200
}'
✅ Success Response
json
Copy
Edit
{
  "id": 3,
  "name": "Mode2 School",
  "address": "Barakhamba Road, Sector 14, Delhi",
  "latitude": 28.6315,
  "longitude": 77.2200
}
❌ Error Response
json
Copy
Edit
{
  "error": "School with this name already exists"
}
2️⃣ List Schools
GET /api/listSchools?lat=28&lng=77.23

Curl Example
bash
Copy
Edit
curl --location 'https://school-management-wz47.onrender.com/api/listSchools?lat=28&lng=77.23'
✅ Success Response
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
Open Postman → Import a new collection

Create two requests inside:

➕ Add School
Method: POST

URL: https://school-management-wz47.onrender.com/api/addSchool

Body (JSON):

json
Copy
Edit
{
  "name": "Mode2 School",
  "address": "Barakhamba Road, Sector 14, Delhi",
  "latitude": 28.6315,
  "longitude": 77.2200
}
🔍 List Schools
Method: GET

URL:

bash
Copy
Edit
https://school-management-wz47.onrender.com/api/listSchools?lat=28&lng=77.23
👉 Full Postman Collection:
Postman Collection Link: https://warped-robot-72486.postman.co/workspace/Team-Workspace~2aa89ee4-9903-461f-8eef-c0a69a32bab9/request/26922555-c0154769-9979-492b-bc1d-8e35c3a1e845?action=share&creator=26922555&ctx=documentation

📄 License
MIT License © 2025
