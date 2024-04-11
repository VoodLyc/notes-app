# Notes App
This application allows you to create notes and tags. Additionally, you can filter your notes by tag.

## Technologies

### Backend
- Java JDK 21
- Spring Boot 3.2.4

### Frontend
- Nodejs v20.5.0
- npm 10.4.0
- Angular CLI 17.0.9

### Database
- PostgreSQL 16

## Requirements
- Docker

## Documentation
[Swagger UI](http://localhost:8080/api/v1/swagger-ui/index.html#/).
  
## Deployment
Run ```docker-compose build``` and then ```docker-compose up -d``` in the root folder (where docker-compose.yml is located)

- The backend is running in port 8080
- The frontend is running in port 4200

Try the [application](http://localhost:4200) (After running the docker compose).
