# Tasky

*Tasky is a clean and efficient todo list application. This is a demo project and was created as part of a university group assignment.*

![task-view](screenshots/task-view.png)

Tasky is a modern single-page application for people who are obsessed with GTD, it’s a personal to-do manager that helps people to plan their daily life, plan their projects, and make progress towards their goals. It’s designed to allow a user to keep track of what needs to be done by adding tasks to their ‘task’ list. Currently, these tasks can have a title, description, priority, and due date.

**Target Users**

Tasky is mainly designed for anyone with a busy schedule and needs an application to keep track of the tasks that they need to accomplish. When support for collaboration and groups is added this scope will be expanded to include groups of people or businesses that need to efficiently manage a project.

## Demo

The demo is available at [tasky-todolist.herokuapp.com](https://tasky-todolist.herokuapp.com/).
The demo credentials are `david:12345678`, this user is an admin.

There are an additional 5 other blank non-admin users `user1`...`user5` with the password `12345678`.

The database can be reset to the default demo state at any point by clicking the "*Reset Database*" button in the options menu on the app bar.

## Features

**Frontend** – built using React and [Material UI](https://mui.com/)

* Landing page
* **Light/dark/system theme support**
  * The current theme is stored in local storage and live synced between tabs
* Login/register views
* **Admin View** – view and delete all users
  * The view is lazy-loaded to reduce bundle size as most users will not see it
* **Task View** – default view for logged in users
  * Tasks are automatically sorted when modified
  * Task priority is shown in different colours
* **Account View** – for editing and viewing the users’ details
* **Contexts** (Auth, Task, ThemeMode)
  * Store global application state and provide method abstractions for interaction with the backend.
* **Local storage caching**
  * The user details and tasks are cached in local storage, so we can immediately present show them to the user while checking if they are still logged in and fetching the updated tasks in the background. This also allows changes to be live synced between tabs.
* Profile picture is automatically generated based on the user's name (using [Jdenticon](https://jdenticon.com))
* Live form validation using [Yup](https://github.com/jquense/yup) and [Formik](https://formik.org).

**Backend** – built using Express and [Sequelize](https://sequelize.org/)

* CRUD endpoints for tasks
* CRUD endpoints for users
* Admin only endpoints for listing and deleting all users
* Authentication using JWT cookies
* **Role-based authentication** – allow access only to users in a specific group
* SQL database for users and tasks (using Sequelize ORM)
* **Schema-based data validation** (using [Yup](https://github.com/jquense/yup)) for validating the body of API requests and stripping unknown keys. This allows us to ensure the API gets exactly the input it expects.
* Full test coverage (using Jest)

**Misc**

* CI/CD integration (using GitHub actions and Heroku)
* **Instant UI feedback**
  * Actions that wait for the backend, show a spinner while waiting, otherwise, the action is immediately performed locally, and the backend is updated in the background, if the request fails, the state is then reverted to its original state.
* **Database seeding script** – adds default users and tasks to the database


## Project Structure

The core technologies used in the project are Typescript, React, Express, and Sequelize (an SQL database ORM).

- `src/` — contains the actual application code
    * `src/components` — all of the React components that make up the views as well as the contexts ([`AuthContext`](/src/components/AuthContext.tsx), [`TaskContext`](/src/components/TaskContext.tsx), [`ThemeModeContext`](/src/components/ThemeModeContext.tsx)) that are used for storing the global state.

    * `src/views` — these are the pages (or views) that can be navigated to in the application such as [`LandingView`](/src/views/LandingView.tsx) or [`TaskView`](/src/views/TaskView.tsx).

    * The remaining folders are more general and contain typings (`src/models`), schema validation (`src/schemas`), utilities (`src/utils`, `src/hooks`) and configuration files (`src/config`).

* `src/api` — backend code
    - Express API, routes and middlewares.
    - `src/api/database` — contains the database models and code for connecting to the database.

- `.vscode`
    - Code snippets for easy consistent component definitions throughout the project.
    - Recommended extensions and workspace settings

* `.github` — continuous integration jobs

## Future Development

The main features that would be focused on next are:

* PWA/semi-offline support
* Task syncing (changes are pushed to the client)
* Social login (e.g., Google, Facebook)
* Email login and verification
* Advanced task features like labels and projects
* Further enhancements for mobile devices
* Session tracking and invalidation
* Deleting own user account
* Upload profile pictures
* Sharing/collaboration between users

## Roles & Contributions

**Joshua Cowie-Willox** (@jcwillox)

* Project setup and administration
  * I was responsible for setting up CI/CD, as well as setting up the repo and npm scripts to support the technologies we were using.
* Backend & Frontend
  * Most of my contributions were on the technical side, this included writing the backend API and setting up the database. I also handled global state storage in the frontend and the frontend to backend interaction.
  * I created the `AdminView` and `LandingView`, as well as other UI or performance tweaks.
* Deployment documentation, and partial work on other documentation

**Kent Cho**
* Frontend
  * `AccountView` and `LoginView`
  * Delete task option as well as edit and change password dialogs
* Documentation, in particular, the outline and target users’ sections

**Haohang Zhou**

* UI/UX prototyping
* Drafted project plan
* Frontend development
  * Register View
  * Task View
  * UI/UX improvement
* Sprint Report PPT design from sprint 2 onwards

### Communication

Communication was handled mainly through Discord, we created multiple channels to help organise tasks and discussions, as well as screen-sharing and voice chat to discuss ideas or work out issues. We also used GitHub pull requests and branches to focus on specific features and PR reviews to discuss changes or questions regarding new features.
