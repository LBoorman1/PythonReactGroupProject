### Installation and Running Instructions

* Install Node.js, NPM and pipenv
* Run `npm install` to install the required packages
* `cd` into the root directory of the project
* Create a virtual environment with `virtualenv <environment-name>`
* Start the virtual environment with running `pipenv shell`
* Install the required packages within this virtual environment: `pipenv install requirements.txt`
* `cd` into the `mentoringsystem` directory
* To start the backend server, run `python3 manage.py runserver`
* In another terminal, `cd` into the `frontend` directory
* To start the frontend site, run `npm run start`
* The backend should run on `localhost:8000` and the frontend on `localhost:3000` by default
* We have provided an account with username admin and password admin which has access to all of the functionalities (mentee, mentor and admin) of the system
