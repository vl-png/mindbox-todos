# todos

ToDo‑приложение для управления списком дел.

## Демо

Demo: [Vercel](https://mindbox-todos-ashy.vercel.app/)

## Возможности

- Добавление и удаление задач
- Переключение выполненности, «отметить все» и «снять все»
- Редактирование по двойному клику
- Фильтры All / Active / Completed
- Счётчик оставшихся задач
- Очистка выполненных задач
- Сохранение данных в LocalStorage
- Светлая/тёмная/авто темы
- Юнит‑тесты, e2e‑тесты Cypress

## Стек

- React
- TypeScript
- Vite
- Jest (unit), Cypress (e2e)

## Установка и запуск:

Для запуска приложения выполните следующие шаги:

1. Склонируйте репозиторий:
    ```bash
    git clone https://github.com/vl-png/mindbox-todos.git
    ```
2. Установите зависимости:
    ```bash
    npm install
    ```
3. Запустите приложение:
    ```bash
    npm run start
    ```
    
## Тесты

Unit (Jest):
- `src/hooks/__tests__/todosReducer.test.ts` — add/toggle/edit/remove/toggleAll/clearCompleted/setFilter
- `src/hooks/__tests__/useTodos.test.ts` — init из LocalStorage, сохранение в LocalStorage

E2E (Cypress):
- Добавление задач
- Переключение одной и всех задач
- Фильтры Active/Completed
- Редактирование задачи
- Очистка выполненных задач
- Удаление задачи
- Персист после перезагрузки

Запуск тестов:
- Jest:
    ```bash
    npm run test
    ```
    
- Cypress: 

    ```bash
    npm run start
    ``` 

    ```bash
    npm run cypress:open
    ``` 