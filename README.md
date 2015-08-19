# Survey App

This is a demo app to showcase the following javascript skills:

* NodeJs: Including Express (routing), Passport (authentication), MySQL and SequelizeJS (Database), Bower (client side dependencies), and bcrypt (password encryption) modules 

* npm and bower for declaring server side and client side dependencies

* RequireJS and AngularAMD for client side dependency managment and AMD

* AngularJS and various services to handling the application data, routing, and storage

* AngularMaterial to implement a responsive modern UI/UX


## Installation

Follow these steps to run the application (NOTE: This application requires access to a mysql database)

* Clone this repository

```js
git clone https://github.com/astechdev/survey.git
```

* Install 3rd party dependencies with npm (from the root directory of this project)

```js
npm install
```

* Update database configuration variables at the top of server.js

```js
process.env.dbName = 'your_db_name';
process.env.username = 'your_db_username';
process.env.password = 'your_db_password';
process.env.port = your_db_port;
```

* Start the server (from the root directory of this project)

```js
node server.js
```

## License

The app is released under the [MIT license]. You are free to use, modify and distribute this software.

## TODO

This app was produced to demonstrate several JS competencies. However, for the sake of time, some aspects of production code have intentionally been ommitted. These include:

* Unit Testing

* Integration Testing

* Automated Testing (Selenium)

* Documentation

Had this been production code these items would have been completed.