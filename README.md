MERN Todo Application

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) Todo Application that allows users to create, update, delete, search, and manage tasks efficiently.


# Features

- Create new tasks
- Update existing tasks
- Delete tasks
- Mark tasks as completed/pending
- Search tasks
- REST API integration
- MongoDB database connection
- Loading and error handling
- Responsive UI
- Environment variable support

# Tech Stack
## Frontend
- React.js
- Axios
- CSS

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

Backend Setup
Step 1: Open Backend Folder
cd backend

Step 2: Install Dependencies
npm install

Step 3: Create .env File
Create a .env file inside the backend folder.
PORT=5000
MONGO_URI=mongodb+srv://TodoUser:checkmate@cluster0.e24rhrq.mongodb.net/?appName=Cluster0



Step 5: Run Backend Server
npm start
OR
npm run dev

Frontend Setup
Step 1: Open Frontend Folder
cd frontend
Step 2: Install Dependencies
npm install
Step 3: Create .env File

Create a .env file inside frontend folder:

const API =http://localhost:5000/api/todo_task

Step 5: Run Frontend
npm run dev

Frontend runs on:

http://localhost:5173
API Endpoints
Base URL
http://localhost:5000/api/todo_task
1. Get All Tasks
Endpoint
GET /
Example Response
[
  {
    "_id": "123",
    "title": "Learn MERN",
    "status": "pending"
  }
]
2. Create Task
Endpoint
POST /
Request Body
{
  "title": "Complete Assignment"
}
3. Update Task
Endpoint
PUT /:id
Request Body
{
  "title": "Updated Task",
  "status": "completed"
}
4. Delete Task
Endpoint
DELETE /:id
5. Search Task
Endpoint
GET /search?query=task
Error Handling


This is a create task image while testing in postman

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/ece01dff-ec76-4c36-8884-772e8be4c5c8" />



This is a  Get All tasks image while testing in postman

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/b066d784-361f-49d8-9ad0-860fd2d6b84f" />



This is a   Search task image while testing in postman

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/c3558d1f-e68b-46d5-9dc3-43d62ebd42d9" />



This is a   Delete task image while testing in postman

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/08c9591a-c024-40b4-9027-7244e9c3655a" />


This is a  Update task image while testing in postman

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/92962959-1d52-4832-92fe-da86378f06f3" />

