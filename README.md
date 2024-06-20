# Online-Educational-Platform
This repository contains the project files for Academy IQ. 

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

