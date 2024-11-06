# template-vue

A complete vue template for a robust project.This includes link to different tools used.

[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=CMGGEvolution_template-vue&metric=bugs)](https://sonarcloud.io/summary/new_code?id=CMGGEvolution_template-vue) [![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=CMGGEvolution_template-vue&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=CMGGEvolution_template-vue) [![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=CMGGEvolution_template-vue&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=CMGGEvolution_template-vue) ![badge](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/IT-WIBRC/4eb7afd82efc633d830c54f4a3d26456/raw/template-vue.json) [![template-vue](https://img.shields.io/endpoint?url=https://cloud.cypress.io/badge/simple/frc51p/develop&style=plastic&logo=cypress)](https://cloud.cypress.io/projects/frc51p/runs)

## Libraries used

- [Typescript](https://www.typescriptlang.org/)
- [Vue.js](https://vuejs.org/)
- [vue-router](https://router.vuejs.org/)
- [Pinia store](https://pinia.vuejs.org/)
- [vue-i18n](https://vue-i18n.intlify.dev/)
- [TailwindCss](https://tailwindcss.com/)
- [openapi-typescript-codegen](https://github.com/ferdikoomen/openapi-typescript-codegen)
- [vitest](https://vitest.dev/)
- [vite](https://vite.dev/)
- [Cypress](https://www.cypress.io/)
- [husky](https://www.npmjs.com/package/husky)
- [Eslint](https://eslint.org/)
- [Prettier](https://prettier.io/)

## Project structure

Having a good structure is one of the key points for a good, maintainable and evolution project 🤙. But, this also helps developer when dealing with the project in the future and also when they want to improve it 😉. Here is an example of project structure we proposed

The most crucial things in web development are the tests (units, integration, e2e, etc.). In this one, there are the units tests and the e2e.

### E2E

End-to-end testing is a key part of software development, especially in agile methodologies. It’s more than just checking parts of the code 🤭; it’s about testing the whole application as a user would, from start to finish. This method checks that every system and feature works together correctly, ensuring the software does what it’s supposed to do 👷🏽‍♂️.

In essence, end-to-end testing examines the application’s workflow—the path a user follows to complete tasks. It combines different testing types, such as GUI, database, and security testing. Tools such as Selenium and Cypress help automate these tests, making them more efficient and reliable. [End To End Testing: Tools, Types, & Best Practices](https://www.browserstack.com/guide/end-to-end-testing)

In our case, we used [Get started with cypress](https://docs.cypress.io/app/get-started/why-cypress) to conduct our e2e tests. For the structure, I placed the cypress folder that contains all about it outside the `src` file; The reason is that the tests are not needed in our end build.
The e2e test are placed in the `cypress/e2e` folder where we have many folders depending on the device.

- `desktop`: Where we place all the test related to desktop (>1280)
- `laptop`: Where we place all the test related to laptop (>1024)
- `tablet` : Where we place all the test related to tablet (>640)
- `mobile` : Where we place all the test related to mobile (>320)

We also created a `cypress/utils` folder where we can place all reusable interceptors and helpers used in our e2e tests. This is also to separate our e2e tests to our main code inside the `src` folder. The folder like `fixtures, support` are generated by cypress. You can find more in the documentation.

### Public folder

This folder is most likely we place the icons for each device (ios, android, etc.) and these are referenced in the `index.html` file inside the `head` tag.

### Specs

This file contains all the specifications (contracts `.yaml | .yml`) files our app will need to call the backend services. The files used there are used to generate the typeScript types and functions we will use in our module. There can have many depending on the architecture(microservice).
To generate this, we used `openapi-typescript-codegen` and they commands are on the `package.json` file. I recommend to use a contract first approach 👍🏽, why? because this reduces the risk and incomprehension between both teams (BE/FE). The contract is made first with all the types and services. With this, we can make our tests more accurate and reflecting the most what we will have on the prod environment

### Assets

This folder contain all the assets (images, icons and css files) globally used like for the components, layouts, etc.

### Core

The `core` folder inside the `src` folder is where we place all the general types/interfaces we used almost everywhere and that our app depend on; classes that defined the shape of our models(Entity), our errors and more.

### Router

The `router` folder inside the `src` folder is the folder where our project routes are defined. In Vue.js, we use `vue-router`

### Services

The `Services` folder inside the `src` folder is the one containing our services.

- `apis`: this folder contain our generated services from the contract(specifications)
- `user`: this folder is the one related to the users of our app containing `entities, errors` related to the user. (It can be Person, Client, Prospect depending on the business language)
- `utils`: is the folder containing the utils used by our entities to manage the business logic

### Utils

The `utils` folder inside the `src` folder is the one containing all our utilities (text utilities, date utilities, etc.)

### Modules

This folder contains all our modules depending on the fragmentation made by your team. There are commons folders

- `common`: this contains what is common among our modules `(components, composables, directives, layouts)`. Inside our components we can have the `form` folder which contains all the custom inputs widely used.
- `layouts`: this one contain the base layouts
- `i18n.json`: this file contains the base internationalization where we place all the commons on widely used translations
- `user`: this is an example of module. Each one contains its `components`, `views`, `stores`, `icons` and also its internationalization file

Each module will contain its own `__tests__` folder where we place all our units tests (`src/modules/users/components/__tests__`). Don't worry these files are excluded during the build.😮‍💨

## Workflows

### Prerequisites

Basic knowledge about yaml file and workflow using GitHub Action _[Workflow syntax for GitHub Actions](https://docs.github.com/en/actions/writing-workflows/workflow-syntax-for-github-actions)_.
For the rest I will provide a link for each subject which could be useful for your own understanding throughout the explanation.

Here are the documentation about each workflow:

- [Continuous integration](.github/workflows/README-CI.md)
- [Generate coverage](.github/workflows/README-GC.md)
- [Continuous deployment](.github/workflows/README-DEPLOY.md)
- [Release](.github/workflows/README-RELEASE.md)

## Other

Want a place to find link toward resources in dev, visit this repos [Dev-and-it-resource](https://github.com/masterivanic/Dev-and-it-ressource).

Please if this has helped you a bit, add a start. If not, please give me a feed back on [this discussion](https://github.com/CMGGEvolution/template-vue/discussions/16)
