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
- **Instance Type:** t2.micro (free tier)
- **OS:** Amazon Linux
- **Web Server:** Nginx inside Docker
- **Static IP:** AWS Elastic IP

### Access

```
http://15.240.85.52:8080
```

### How to Deploy

**1. SSH into the server**
```bash
ssh portfolio-server
```

**2. Clone the repo**
```bash
git clone git@github.com:Di-exGeneral/Portfolio.git
cd Portfolio
```

**3. Build and run**
```bash
sudo docker build -t portfolio .
sudo docker-compose up -d
```

### Update Deployment

When changes are pushed to GitHub, SSH in and run:

```bash
cd Portfolio
git pull
sudo docker build -t portfolio .
sudo docker-compose down
sudo docker-compose up -d
```

### Stop the Server

Remember to stop the EC2 instance when not in use to preserve free tier hours.

## Stack

- HTML, CSS, JavaScript
- Nginx
- Docker
- Docker Compose
- AWS
