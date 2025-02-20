# 📝 **Task Manager App**

A feature-rich Task Manager application built using **Next.js**, **Tailwind CSS**, **Framer Motion**, and **NextAuth**. This app allows users to create, read, update, delete, and filter tasks with ease. 🎯

## 🌟 **Features**

- **User Authentication** 🔒: Secure login/logout functionality using Google, GitHub, and Credentials via NextAuth.
- **Task Management** ✅: Create, update, and delete tasks with detailed descriptions.
- **Task Filtering** 🔍: Filter tasks based on:
  - **Title** 📝
  - **Priority** ⚡
  - **Status** 📊
  - **Tags** 🏷️
  - **Due Date** 📅
- **Tagging System** 🏷️: Add multiple tags to tasks for better categorization.
- **Responsive UI** 📱: Built with Tailwind CSS for a modern, responsive design.
- **Smooth Animations** 💫: Integrated Framer Motion for fluid animations.

## 📁 **Folder Structure**

```bash
src/
├── app/
│   ├── actions/               # Backend logic (create.js, update.js, delete.js, read.js)
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/route.js  # Authentication routes
│   │   ├── delete/route.js    # Delete task API
│   │   ├── fetch/route.js     # Fetch tasks API
│   │   ├── filter/route.js    # Filter tasks API
│   │   └── update/route.js    # Update task API
│   ├── task/
│   │   └── page.js            # Fetch task list (frontend)
│   └── page.js                # Main homepage
├── components/
│   ├── button/
│   │   ├── button.js
│   │   └── editbutton.js
│   ├── modal/
│   │   ├── submit-button.js
│   │   ├── modal-header.js
│   │   ├── modal-footer.js
│   │   └── input-field.js
│   │   ├── AddTaskModal/
│   │   │   ├── modal-body.js
│   │   │   └── add-task.js
│   │   └── UpdateTaskModal/
│   │       ├── modal-body.js
│   │       └── update-task.js
│   ├── filter-task/
│   ├── header.js
│   ├── home-page.js
│   └── list-task.js
│   └── login.js
├── lib/
│   └── db.js                  # Database connection
└── models/
    └── task.js                # Task schema
```

## ⚙️ Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Krisha1703/task-manager-app.git
   cd task-manager-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables 🌍:**
   Create a `.env.local` file with the following:
     ```env
     NEXTAUTH_URL=http://localhost:3000
     NEXTAUTH_SECRET=your_secret_key

     # Google OAuth
     GOOGLE_CLIENT_ID=your_google_client_id
     GOOGLE_CLIENT_SECRET=your_google_client_secret

     # GitHub OAuth
     GITHUB_CLIENT_ID=your_github_client_id
     GITHUB_CLIENT_SECRET=your_github_client_secret

     # MongoDB Database 
     MONGODB_URI=your_mongodb_connection_string

     ```
    ### 📌 Note:
    For testing purposes, you can use **test credentials**:

    - **Email:** `testuser@mail.com`
    - **Password:** `testuser`


4. **Run the development server 🚀:**
   ```bash
   npm run dev
   ```

5. **Build for production ⚡:**
   ```bash
   npm run build
   npm start
   ```

## 📸 Screenshots

- **Login Modal 🏠:**
  ![Home Page](/public/screenshots/login.png) 

- **Login Home Page 🏠:**
  ![Home Page](/public/screenshots/homepage.png) 

- **Task Creation Modal 📝:**
  ![Create Task](/public/screenshots/create.png) 

- **View Task Details 📝:**
  ![Create Task](/public/screenshots/view-task-details.png) 

- **Task Update Modal 🔄:**
  ![Update Task](/public/screenshots/update.png) 

- **Task Filtering 🔎:**
  ![Filter Tasks](/public/screenshots/filter-task.png) 

- **Delete Task 🗑️:**
  ![Delete Task](/public/screenshots/delete.png) 

## 🔧 Technologies Used

- **Next.js** 
- **Tailwind CSS** 
- **Framer Motion**
- **NextAuth**
- **MongoDB**


*Happy Task Managing!* 🚀

