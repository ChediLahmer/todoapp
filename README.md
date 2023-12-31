## **1. Introduction**
Welcome to the documentation for the ToDo app! This document provides an overview of the technologies used, project structure, and how to set up and use the app.
- [Demo](https://youtu.be/GoK9MJwVJLc)
  ### Overview
  ![image](https://github.com/ChediLahmer/todoapp/assets/131680831/d7e776d7-5f27-490a-9d51-2f079612d86f)

## **2. Frontend**

### **2.1 Technologies Used**

- **React**: Used for building the user interface. [Learn React](https://react.dev/learn)
- **Redux Toolkit**: Implemented for efficient state management. [Redux Toolkit Documentation](https://redux-toolkit.js.org/introduction/getting-started)
- **TypeScript**: Used for static typing and enhanced code quality.
- **Material-UI**: Utilized for designing UI components and achieving a polished, responsive user experience. [Material-UI Documentation](https://mui.com/material-ui/)

## **3. Backend**

### **3.1 Technologies Used**

- **Node.js**: Used for developing the server-side.
- **Express.js**: Utilized for building the RESTful API. [Express.js Documentation](https://expressjs.com/en/starter/installing.html)
- **Sequelize**: Employed as the ORM for interacting with the database. [Sequelize Documentation](https://sequelize.org/)

### **3.2 API Endpoints**
retrieve data : http://localhost:3001/tasks

for progress : http://localhost:3001/tasks/{taskID}/progress

edit a task : http://localhost:3001/tasks/{taskID}

add a task : http://localhost:3001/tasks

delete a task : http://localhost:3001/tasks/{taskID}

### **3.3 Database**

mysql database

## **4. Installation**

npm install

## **5. Usage**

you can manage your tasks using this app 

## **6. Contributing**

the app is all yours


## **8. Documentation URLs**

- [Frontend Documentation](https://react.dev/learn)
- [Backend Documentation](https://sequelize.org/)
- [Express.js Documentation](https://expressjs.com/en/starter/installing.html)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/introduction/getting-started)
- [Material-UI Documentation](https://mui.com/material-ui/)

Dear user,

I hope this message finds you well. I wanted to bring to your attention that this version is yet to be optimized. It was my first time using Redux Toolkit, and during the development process, I created three separate states for each action. Upon completion, I realized that I could have streamlined the implementation by using a single state. Despite this realization, time constraints led me to proceed with the initial design.
In the code, you will notice a "general" state, and I suggest that i could have deleted the "edit," "add," and "delete" states, retaining only the "general" state.i could have kept the reducers and updated the state within the extra reducers on each dispatch of any thunk function. Additionally, I could have dispatched the fetchData function after each update.
I acknowledge the oversight and plan to refactor the code at the earliest opportunity
Best regards,
