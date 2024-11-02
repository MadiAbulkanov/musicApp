# API for music application

This application provides an API to manage users and track history.

## Installing

- **Clone the repository:**

  ```bash
    git@github.com:MadiAbulkanov/musicApp.git
  ```

- **Set up the database:**
  - Create a database and configure the connection in a file `DataSource.ts`.

- **Launching fixtures:**
  ```bash
    npm run seed
  ```

- **Launch the application:**
  ```bash
    npm run dev
  ```

## Endpoints

### Artist

- **GET /artists**
  - Description: Получить список исполнителей для роли 'admin'.
    ```json
    {
      "id": 1,
      "name": "John",
      "description": "desc",
      "published": false,
      "photo": "1db19503-95df-4954-b3b7-9abfee1395ed.png"
    }
    ```

- **GET /artists/publish**
  - Description: Получить список исполнителей.
    ```json
    {
      "id": 1,
      "name": "John",
      "description": "desc",
      "published": true,
      "photo": "1db19503-95df-4954-b3b7-9abfee1395ed.png"
    }
    ```

- **POST /artists**
  - Description: Создать исполнителя.
    ```json
    {
      "name": "John",
      "description": "desc",
      "published": false,
      "photo": "1db19503-95df-4954-b3b7-9abfee1395ed.png"
    }
    ```

- **POST /artists/:id/publish**
  - Description: Производится изменение поля "published" выбранной сущности с false на true

- **DELETE /artists/:id**
  - Description: Удалить исполнителя

### Album

- **GET /albums**
  - Description: Получить все альбомы для роли 'admin'.
    ```json
    {
      "id": 1,
      "title": "Album_1",
      "artistId": 1,
      "release": 2024,
      "published": false,
      "image": "1db19503-95df-4954-b3b7-9abfee1395ed.png"
    }
    ```

- **GET /albums/publish**
  - Description: Получить все альбомы.
    ```json
    {
      "id": 1,
      "title": "Album_1",
      "artistId": 1,
      "release": 2024,
      "published": true,
      "image": "1db19503-95df-4954-b3b7-9abfee1395ed.png"
    }
    ```

- **GET /albums/publish?artist=1**
  - Description: Получить список альбомов конкретного исполнителя.
    ```json
    {
      "id": 1,
      "title": "Album_1",
      "artistId": 1,
      "release": 2024,
      "published": true,
      "image": "1db19503-95df-4954-b3b7-9abfee1395ed.png"
    }
    ```

- **GET /albums/:id**
  - Description: Получить информацию о конкретном альбоме, включая информацию о его исполнителе.
    ```json
    {
      "id": 1,
      "title": "Album_1",
      "artistId": 1,
      "release": 2024,
      "published": true,
      "image": "1db19503-95df-4954-b3b7-9abfee1395ed.png"
    }
    ```

- **POST /albums**
  - Description: Создать альбом.
    ```json
    {
      "title": "Album_1",
      "artistId": 1,
      "release": 2024,
      "published": false,
      "image": "1db19503-95df-4954-b3b7-9abfee1395ed.png"
    }
    ```

- **POST /albums/:id/publish**
  - Description: Производится изменение поля "published" выбранной сущности с false на true

- **DELETE /albums/:id**
  - Description: Удалить альбом

### Track

- **GET /tracks**
  - Description: Получить все треки для роли 'admin'.
    ```json
    {
      "id": 1,
      "title": "Track_1",
      "duration": "2:57",
      "albumId": 1,
      "published": false,
    }
    ```

- **GET /tracks/publish**
  - Description: Получить все треки.
    ```json
    {
      "id": 1,
      "title": "Track_1",
      "duration": "2:57",
      "albumId": 1,
      "published": true,
    }
    ```

- **GET /tracks?album=1**
  - Description: Получить список треков в конкретном альбоме.
    ```json
    {
      "id": 1,
      "title": "Track_1",
      "duration": "2:57",
      "albumId": 1,
      "published": true,
    }
    ```

- **POST /tracks**
  - Description: Создать трек.
    ```json
    {
      "title": "Track_1",
      "albumId": 1,
      "duration": "2:57",
      "published": false,
    }
    ```

- **POST /tracks/:id/publish**
  - Description: Производится изменение поля "published" выбранной сущности с false на true

- **DELETE /tracks/:id**
  - Description: Удалить трек

### User

- **POST /users**
  - Description: Регистрация (создание) нового пользователя.
    ```json
    Request:
    {
      "username": "John",
      "password": "123"
    }
    ```

    ```json
    Response:
    {
      "id": 1,
      "username": "John",
      "password": "$2b$10$.Qp8PekIs.SeWQJejVox3uKIHxMQ2DmBXwm0BYS8kxJq1GS.VSK0i",
      "token": "6819a371-10a0-4f2f-8589-80b83df3a7b4",
      "role": "user",
    }
    ```

- **POST /users/sessions**
  - Description: Логин пользователя.
    ```json
    Request:
    {
      "username": "John",
      "password": "123"
    }
    ```
    
    ```json
    Response:
    {
      "id": 3,
      "username": "John",
      "token": "6819a371-10a0-4f2f-8589-80b83df3a7b4",
      "role": "user",
    }
    ```

- **DELETE /users/logout**
  - Description: Производится "затирание" токена в базе данных.
  - Headers: Authorization: 6819a371-10a0-4f2f-8589-80b83df3a7b4

### TrackHistory

- **POST /track_history**
  - Description: Создание записи о прослушанной композиции.
  - Headers: Authorization: 6819a371-10a0-4f2f-8589-80b83df3a7b4
    ```json
    Request:
    {
      "track": 1
    }
    ```

    ```json
    Response:
    {
      "id": 1,
      "user": 1,
      "track": 1,
      "datatime": "2024-08-09T06:00:03.673Z",
      "trackTitle": "Track_1",
      "artistName": "Artist_1"
    }
    ```

- **GET /track_history**
  - Description: Получить весь список истории добавленных треков.
    ```json
    {
      "id": 1,
      "user": 1,
      "track": 1,
      "datatime": "2024-08-09T06:00:03.673Z",
      "trackTitle": "Track_1",
      "artistName": "Artist_1"
    }
    ```

- **GET /track_history/user**
  - Description: Получить историю добавленных треков пользователя.
  - Headers: Authorization: 6819a371-10a0-4f2f-8589-80b83df3a7b4
    ```json
    {
      "id": 1,
      "user": 1,
      "track": 1,
      "datatime": "2024-08-09T06:00:03.673Z",
      "trackTitle": "Track_1",
      "artistName": "Artist_1"
    }
    ```