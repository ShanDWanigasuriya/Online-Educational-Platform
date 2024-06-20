# Online-Educational-Platform 
#### ACADEMY IQ is an advanced online educational platform designed to provide a seamless learning experience for both instructors and learners. It leverages modern technologies to offer a robust and user-friendly interface for accessing and managing educational content.

## Key Features
### Web/Mobile Interface:
* **User-friendly Interface:** ACADEMY IQ offers a responsive and intuitive interface optimized for both web and mobile devices, ensuring a consistent experience across various screen sizes.
* **Responsive Design:** The platform uses responsive web design principles to adapt to different devices and screen resolutions seamlessly.

### Course Management:
* **Instructor Tools:** Instructors have full control over course content. They can add, update, and delete course materials such as lecture notes, videos, and quizzes.
* **Admin Approval:** Admins review and approve course content before it goes live, ensuring quality and consistency across courses.
* **Payment Integration:** Integrated payment gateways allow for secure financial transactions related to course enrollments.

### Learner Services:
* **Enrollment and Progress Tracking:** Learners can easily enroll in courses, track their progress through course materials, and manage their enrollments.
* **Notification System:** A notification system sends SMS and email alerts to learners upon successful enrollment, ensuring they stay informed.

### Multiple Course Enrollment:
* **Flexible Enrollment:** Learners can enroll in multiple courses simultaneously without scheduling conflicts, offering flexibility in learning paths.

## Technology Stack
### Backend:
* **Node.js:** Server-side environment for scalable and efficient backend development.
* **Express.js:** Fast and minimalist web framework for Node.js.
* **MongoDB:** NoSQL database for storing course content, user data, and transaction records.
* **JWT (JSON Web Tokens):** Secure authentication mechanism for API endpoints.
* **RESTful APIs:** Follows REST architectural principles for seamless communication between frontend and backend services.

### Microservices:
* **Docker:** Containerization technology for packaging applications and dependencies into standardized units.
* **Kubernetes:** Orchestration tool for managing and scaling containerized applications across a cluster of nodes.

### Frontend:
* **NEXT.js:** React framework for building server-side rendered and statically generated applications.
* **TypeScript:** Typed superset of JavaScript for improved code quality and developer productivity.
* **EJS:** Embedded JavaScript templates for server-side rendering.
* **Socket.io:** Real-time bidirectional event-based communication between clients and server.
* **RTK Query:** Powerful data fetching and caching tool for efficient API communication.
* **Cloudinary:** Cloud-based image and video management for storing and optimizing multimedia content.

### Additional Technologies:
* **Redis:** In-memory data structure store used for caching to improve application performance.
* **Tailwind CSS:** Utility-first CSS framework for designing custom and responsive user interfaces.

## Deployment Instructions

Follow these steps to deploy the project locally:

1. **Download Docker Desktop**: Download and install Docker Desktop from [Docker's official website](https://www.docker.com/products/docker-desktop).

2. **Clone the Repository**: Clone this repository to your local machine using the following command:
    ```
    git clone https://github.com/ShanDWanigasuriya/Online-Educational-Platform.git
    ```

3. **Open with Visual Studio Code**: Open the cloned repository using Visual Studio Code or any other code editor of your choice.

4. **Navigate to Backend Directory**: Using your terminal, navigate to the 'Backend' directory inside the cloned repository:
    ```
    cd Online-Educational-Platform/Backend
    ```

5. **Start Docker Containers**: Run the following command to build the Docker images and start the containers:
    ```
    docker-compose up
    ```

6. **Start Frontend Development Server**: Open a new terminal window/tab and navigate to the root directory of the project. Then, run the following command to start the development server for the frontend:
    ```
    npm run dev
    ```

7. **Access the Application**: Once the development server starts successfully, open your web browser and visit the following URL:
    ```
    http://localhost:3000
    ```

You should now be able to access and use the application locally.

