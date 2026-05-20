# Portfolio

Personal portfolio website for Di-exGeneral, DevOps Engineer.

Built with HTML, CSS, and JavaScript. Served with Nginx inside a Docker container.

## Run with Docker Compose
```bash
docker-compose up -d
```

Then open http://localhost:8080 in your browser.

## Run with Docker
```bash
docker build -t portfolio .
docker run -d -p 8080:80 portfolio
```

## Stop
```bash
docker-compose down
```

# AWS Deployment

The portfolio is deployed on AWS EC2 and served via Docker and Nginx.

### Infrastructure

- **Cloud Provider:** AWS EC2 (af-south-1)
- **Instance Type:** t3.micro (free tier)
- **OS:** Amazon Linux
- **Web Server:** Nginx inside Docker
- **Static IP:** AWS Elastic IP

### Access

```
http://15.240.85.52:8080
```

### Deployment

The portfolio is automatically deployed to AWS using a GitHub Actions workflow called `Deploy Portfolio`.

Every time code is pushed to the `main` branch, the workflow automatically SSHes into the EC2 instance, pulls the latest changes, rebuilds the Docker image, and restarts the container. No manual steps needed.


To trigger a deployment, just push to main:

```bash
git push origin main
```

The Actions tab on GitHub shows the live deployment status and logs.
## Stack

- HTML, CSS, JavaScript
- Nginx
- Docker
- Docker Compose
- AWS
