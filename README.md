# Survey App

This is a demo app to showcase the following javascript skills:

* NodeJs: Including Express (routing), Passport (authentication), MySQL and SequelizeJS (Database), Bower (client side dependencies), and bcrypt (password encryption) modules 

* npm and bower for declaring server side and client side dependencies respectively

* RequireJS and AngularAMD for client side dependency managment and AMD

* AngularJS and various available Angular services for handling the application data, routing, and data storage

* AngularMaterial to implement a responsive modern UI/UX and form validation


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

The package.json has a postinstall script that should install all client side dependencies

```js
cd ./public && node ../node_modules/bower/bin/bower install
```

I have tested this installation on Windows and it works but I have not been able to test it on any other OS. If you experience any console errors referencing anything in '/bower_components' it is because the postinstall script failed. Please navigate to './public' and run 'bower install'.

* Update database configuration variables at the top of server.js file

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

## Administration

Before you can take the survey you will need to navigate to 'http://localhost:3000/admin/create' to add questions and their corresponding available answers to the survey. You will need to login:

```js
Email: admin@appsumo.com
Password: Un1corn
```

You can then view survey results at 'http://localhost:3000/admin/results'. The results of the survey are calculated each time you visit.

## Take the survey

Once you have questions available for the survey you can navigate to 'http://localhost:3000/survey'. You will be presented with a random, previously unanswered survey question. Answers are persisted in the database (once submitted) but they do not have a reference to the user who submitted them. The way the app keeps track of previously answered questions is to store them in the browsers local storage.

## License

The app is released under the [MIT license]. You are free to use, modify and distribute this software.

## TODO

This app was produced to demonstrate several JS competencies. However, for the sake of time, some aspects of production code have intentionally been ommitted. These include:

* Unit Testing

* Integration Testing

* Automated Testing

* Documentation

Had this been production code these items would have been completed.