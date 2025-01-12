![run-app](https://github.com/user-attachments/assets/82d708a4-4e5a-4d2e-a5b0-577f729ef8ad)
![mongo-secret](https://github.com/user-attachments/assets/0a3f9c80-7492-40e0-abc0-8e5605e0f6d8)
![check-pods](https://github.com/user-attachments/assets/74ad25d1-ef9b-4d7d-9bed-dc0869e12274)
![load-balancer](https://github.com/user-attachments/assets/252bdfd3-04cb-458d-b136-9e196b26f984)
![docker-file](https://github.com/user-attachments/assets/8335adda-9127-4a86-a963-6353e4dd3b28)
![app-running](https://github.com/user-attachments/assets/e4d2dce6-eec4-477a-8aaf-e6b834a6c392)
![docker-image](https://github.com/user-attachments/assets/7b6689e8-755b-4376-90a0-c4f54f8d469b)
Movie Display Application
A simple Next.js application that displays a grid of movies fetched from MongoDB Atlas, containerized with Docker, and deployed on Kubernetes (Minikube).

Application Overview
This application:

Fetches and displays movies from MongoDB Atlas
Uses Next.js for the frontend with Tailwind CSS for styling
Runs in a Docker container
Deployed on Kubernetes (Minikube) with proper secret management
Implements CI/CD using GitHub Actions
Prerequisites
Node.js 20+
Docker
Minikube
kubectl
WSL2 (for Windows users)
MongoDB Atlas account

2. Install dependencies:


```shellscript
npm install
```

3. Create a `.env.local` file with your MongoDB URI:


```plaintext
MONGODB_URI=your_mongodb_connection_string
```

4. Run the development server:


```shellscript
npm run dev
```

## Docker Setup

1. Build the Docker image:


```shellscript
docker build -t movie-app .
```

2. Run the Docker container:


```shellscript
docker run -d movie-app
```

## Kubernetes Deployment

### Setting up Minikube

1. Install Minikube following the [official documentation](https://minikube.sigs.k8s.io/docs/start/)
2. Start Minikube:


```shellscript
minikube start
```

### Deploying the Application

1. Create the production namespace:


```shellscript
kubectl create namespace prod
```

2. Apply the secret manifest (contains MongoDB URI):


```shellscript
kubectl apply -f secret.yaml -n prod
```

3. Apply the deployment manifest:


```shellscript
kubectl apply -f deployment.yaml -n prod
```

4. Apply the service manifest:


```shellscript
kubectl apply -f service.yaml -n prod
```

### Verifying the Deployment

1. Check secrets:


```shellscript
kubectl get secret -n prod
```

2. Check deployment status:


```shellscript
kubectl get deployment -n prod
```

3. Verify pods are running:


```shellscript
kubectl get pods -n prod
```

4. Check application logs:


```shellscript
kubectl logs -f deployment/movie-app -n prod
```

### Accessing the Application

Port forward the service to access locally:

```shellscript
kubectl port-forward service/movie-app-service 3000:80 -n prod
```

The application will be available at `http://localhost:3000`

## CI/CD Pipeline

The application uses GitHub Actions for continuous integration and deployment. The pipeline:

1. Builds the application
2. Runs tests
3. Builds Docker image
4. Deploys to Kubernetes


### Environment Variables

The following secrets must be set in GitHub repository settings:

- `MONGODB_URI`: MongoDB Atlas connection string
- `DOCKER_USERNAME`: Docker Hub username
- `DOCKER_PASSWORD`: Docker Hub password
- `KUBE_CONFIG`: Base64 encoded kubeconfig file


## Design Decisions

### Security

- Database connection string stored in Kubernetes secrets
- Sensitive information stored in GitHub secrets
- No exposure of secrets in code or Docker images


### Infrastructure

- Multi-stage Docker builds for optimized image size
- Namespace isolation in Kubernetes
- Proper resource limits in Kubernetes deployments


## Challenges and Solutions

### WSL2 Configuration for Windows

- Ensure WSL2 is properly installed and configured
- Docker Desktop settings properly configured for WSL2
- Proper network configuration between WSL2 and Windows


### Docker Image Optimization

- Multi-stage builds to reduce final image size
- Only copying necessary files
- Proper layer caching
- Using lightweight base images


## Troubleshooting

### Common Issues

1. WSL2 Network Issues:

1. Restart WSL: `wsl --shutdown`
2. Restart Docker Desktop



2. Minikube Issues:

1. Clear cache: `minikube delete`
2. Start fresh: `minikube start`



3. MongoDB Connection Issues:

1. Verify network access in MongoDB Atlas
2. Check secret configuration in Kubernetes
