🔗 [tasky-todolist.herokuapp.com](https://tasky-todolist.herokuapp.com/)

## Deployment

This project is based on the LTS version of NodeJS which is currently NodeJS 16. This project may not work correctly on other versions.

### Manual

Firstly, clone the repo to some location, then install the dependencies, `npm ci` is recommended when the `node_modules/` folder does not exist otherwise `npm install` will also work.

```pwsh
# install dependencies
npm ci
# build frontend and backend
npm run build
# start backend which will host the frontend as well
npm start
```

At this point, the project will be available at [localhost:5000](http://localhost:5000).

Once the project has been built you can remove the development dependencies to save space.

```pwsh
npm prune --production
```

Finally, you can seed a database with demo users and tasks using this npm script.

```pwsh
npm run db:seed
```

By default, it will create or reseed a local SQLite database at `src/api/db.sqlite` this can be overridden by setting the `DATABASE_URL` environment variable.

The application will use an in-memory SQLite database by default to make this persistent you can create a `.env` file and set the `DATABASE_URL`, a sample one is provided.

```bash
cd .env.sample .env
```

### Heroku

This project is deployed using Heroku, to set up your own deployment follow the steps below.

```pwsh
# create heroku instance
heroku create
# add postgres addon (optional)
heroku addons:create heroku-postgresql:hobby-dev
# necessary when using the heroku postgres addon
heroku config:set PGSSLMODE=no-verify
# deploy project
git push heroku main
```

Heroku by default will run `npm install`, `npm run build`, `npm prune --production`, and `npm start` commands, this means we do not need a `Procfile`.

If you are using the Heroku Postgres add-on you can seed the remote database using the following command.

```pwsh
PGSSLMODE="no-verify" DATABASE_URL="$(heroku config:get DATABASE_URL)" npm run db:seed
```

**Continuous Deployment (CD)**

You can set up automatic deployment for a GitHub repository on Heroku's website. Heroku will automatically deploy on changes to a specific branch like `main` when the CI checks pass. That is how this project has been set up.

### Database

This project uses [Sequelize](https://sequelize.org) ORM, which means that the project can transparently support many types of SQL databases. Use the `DATABASE_URL` environment variable to specify which database to use. The recommended production database type is Postgres.

## Continuous Integration (CI)

Continuous integration is set up using GitHub Actions and will run on every push and pull request. It will run [two jobs](https://github.com/MQCOMP3120-2021/group-web-project-group-af/blob/main/.github/workflows/ci.yml), the first `lint` will check the code for any linting for formatting errors based on the projects `eslint` and `prettier` configurations. The second job `build` will attempt to build the frontend and backend, if successful, it will run the frontend and backend tests.
