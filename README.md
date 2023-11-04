# eSchool_JS
Библиотека для взаимодействия с eschool.center.

## Установка
```bash
npm install eschoolapi
```

## Пример получения имени и номера телефона
```js
const { eSchool } = require(eschoolapi");

const main = async () => {
    const school = new eSchool("Username", "Password");
    await school.login();

    let profile = await school.getProfile()
    console.log(`Hello, ${profile.firstName}. Your phone num is: ${profile.phoneMob}`)
};

main();
```

## Помощь проекту
Если вам понравился проект и вы хотите помочь в его развитии, но не знаете что чем - пишите [мне](https://t.me/mikhaillav). Либо сразу кидайте изменения сюда. 

Буду рад любой обратной связи =)
