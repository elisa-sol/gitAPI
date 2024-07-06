# CPS - Ремонт техники

---
<img width="1162" alt="image" src="https://github.com/Binatik/images/assets/47430210/f1b24cdb-f226-42e3-8c7b-e8b3539968aa">

## Проверить

Проверить последнюю версию web приложения можно [здесь](https://binatik.github.io/cps/).

## Сборка
Веб упаковка была выполнена при помощи `webpack` используя настройку из `webpack.config`

## Разработчикам

Для запуска у вас должен быть установлен [Node.js](http://nodejs.org)
y
Для установки пакетов используется [npm](https://www.npmjs.com)

```bash
npm install -g npm
```

```bash
$ git clone repository # Клонирование репозитория
$ npm i # Установка зависимостей
$ npm run # Запуск в mode режиме
```

```js
//scripts в package.json
"dev": "npx webpack serve --mode development",
"build": "webpack --mode production",
```

Запуск в режиме `dev` использует мод development и исполняется на локальном сервере.
```js
  devServer: {
    port: 3000,
    ...
  },
```
Cтилизация происходит используя `sass` или `scss`
```js
// по примеру
import '../styles/style.scss'
...
```
Для компиляции функций в более старые версии из менее ранних мы используем `@babel/preset-env` и `babel-loader`
```js
use: {
    loader: "babel-loader",
    options: {
    presets: ["@babel/preset-env"],
  },
},
```

`Поддержка Edge, Chrome, Yandex последних версий`



