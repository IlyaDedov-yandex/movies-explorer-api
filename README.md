# API для аутентификации пользователей и сохранения фильмов.
## movies-explorer-api
### возвращает информацию о пользователе (email и имя)
* GET /users/me;

### обновляет информацию о пользователе (email и имя)
* PATCH /users/me;

### возвращает все сохранённые текущим  пользователем фильмы
* GET /movies;

### создаёт фильм с переданными в теле 
* POST /movies;

# удаляет сохранённый фильм по id
* DELETE /movies/_id;  
**[Ссылка на backend](https://api.movies.practicum.nomoredomains.work/)**
