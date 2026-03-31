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

## Stack

- HTML, CSS, JavaScript
- Nginx
- Docker
- Docker Compose
