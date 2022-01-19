# Поддержка создания записей журнала для приложения

Библиотека предназначена для использования в коде приложения.

Вы создаете в нужном месте

```ts
logger = getLogger('app');
```

и затем

```ts
logger.verbose('работаем');
```

## Настройка

Для настройки вызываем

```ts
init({
  basePath:'./',
  levels:{
    app:'verbose',   
  }
});
```

## Express

для использования в express

```ts
const BASE_URL = '/logs';
const router = Router();
router.get(BASE_URL, handleGetLog);
router.delete(BASE_URL, handleClearLog);
```
