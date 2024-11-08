# Continuous integration documentation (CI) ([Link to workflow file](./ci.yml))

## About CI

**Continue integration** is a process where developers integrate new code into the code base throughout the development cycle. When the code is submitted, CI tools verify each integration by creating an iteration of the build and running a battery of automated tests to detect and address integration errors more quickly.

CI was created as a response to the challenges of traditional software development, namely the processes associated with integration and deployment. In traditional development, each developer was responsible for manually integrating new code into new iterations of an app or service, making integration a slow, error-prone process, especially for large development teams.

Different pieces of code didn’t always work well together and developers integrated their changes on different timelines and sometimes at the last minute so feedback on integration issues was often delayed 🙆🏽‍♂️. Delays related to inconsistent integrations made it harder for teams to figure out which change introduced the bug, so debugging also became an arduous process.

Furthermore, software testing was infrequent, with large batch updates made all at once, so bugs could slip through the cracks and accumulate in the code base, leading to errors and glitches for end users. (And more difficult troubleshooting for developers.)

With a CI system, new code is added to a central repository (typically, multiple times a day), where it remains for building and testing. If the system detects an error, it sends out notifications, corrects the code and confirms that the updated code is correct before fully merging it with the code base.

Consequently, the CI approach enables software development teams to catch and fix errors before they affect software performance, resulting in higher-quality software and more predictable delivery schedules.

[More about continuous integration](https://www.ibm.com/topics/continuous-integration)

## How does it work here ?

`name` is used to name your workflow and will be the one display under your `Actions` tab. There is also `run-name` which is the name for workflow runs generated from the workflow. In our case i decided to choose `name` instead as it will help me identify on the list of workflows a specific one according to the pull request message. Contrary to `run-name` which will always display the same message no matter what.

`on` is used to define the events which will trigger the workflow to run. In our case we will trigger the event when a `pull_request` is `opened` or `reopened` or `synchronize`. Also when we `push` onto the develop branch

| pull_request types | Description                                      |
| ------------------ | ------------------------------------------------ |
| `opened`           | When a pull request is opened for the first time |
| `reopened`         | When a closed pull request has been reopen       |
| `synchronize`      | When a pull request is updated                   |

A workflow run is made up of one or more `jobs`, which run in parallel by default. In our case, we have **6 jobs** **_(build, vulnerabilities-check, ui-desktop-tests, ui-laptop-tests, ui-mobile-tests, ui-tablet-tests)_**.

### Build job

This job is responsible to check if the build work well as well as if the units tests respect the thresholds requirements for the project. And it will also display these requirements on the current pull request in other it will need to write on the pull request. We need to know that in order to write it will need the permissions (`contents: read`, `pull-requests: write`) which are those required to write a threshold summary on the pull request.

A job run on a runner more simple on a OS (ubuntu, windows, etc..). As a linux user i chose `ubuntu-20.4` which can be changed of course according to your need.

Also to be sure that my application is compatible with some Nodejs version(define on requirements), i used to run my job using many versions. To run a same script on different configuration, Github Action provide a property name `matrix` (read about [what is matrix and how to use it](https://docs.github.com/en/actions/writing-workflows/workflow-syntax-for-github-actions#jobsjob_idstrategymatrix)). This job run on `node js 18.x and 20.x in parallel`.

A job contains a sequence of tasks called `steps`. Steps can run commands, run setup tasks, or run an action in your repository, a public repository, or an action published in a Docker registry.

An `action` is a custom application for the GitHub Actions platform that performs a complex but frequently repeated task. Use an action to help reduce the amount of repetitive code that you write in your workflow files.
In a job step, `name` is used as a title of what is done on its context and `run` is used to launch a script (bash, shell)

- _**[actions/checkout@v4](https://github.com/actions/checkout/tree/v4.2.1)**_: this action checks out your repository to $GITHUB_WORKSPACE, so that your workflow can access the contents of your repository.
- _**[actions/setup-node@v4](https://github.com/actions/setup-node/tree/v4/)**_: this action helps to install nodejs and manage it efficiently
- One nodejs installed, we use the command `node -v` to check the nodejs version installed
- We check de the dependency vulnerabilities using `npm audit`
- We install dependencies using the package-log versions with `npm ci` command. This will help to have the same dependencies as what you have in local without any update.
- We check if the code is well formatted. This is good to have the same format no matter who write the code, respect the same rules when coding (have a standard) and also to detect smell code. This is archived using linter like (`prettier and eslint`). Here we use the command `npm run lint`
- We launch units tests to check if those respect the threshold and also to display the coverage result of the units tests on teh pull request using _**[davelosert/vitest-coverage-report-action@v2](https://github.com/davelosert/vitest-coverage-report-action/tree/v2/)**_ action.
- We check if the build work as expected.

NB: If the units tests do not respect the requirements defined, this will failed and the pull request will be unable to be merge. This is the same if the build failed or any command.

- At the end, we save the build artifact for usage by other jobs like the `ui` one. To achieve that, we used this actions _**[actions/upload-artifact@v4](https://www.github.com/actions/upload-artifact/tree/v4/)**_. To avoid unnecessary artifacts, we upload the build file only when the node version is `20.x` `(if: matrix.version == '20.x')`.

### Vulnerabilities Check job

> [!IMPORTANT]
> You will need to have a GitHub organization to do this part

> [!NOTE]
> For a better analyze, create an external `tests` folder alongside `src` or inside where all your unit test will be done. Add the argument `-Dsonar.test=src/tests/` or `-Dsonar.test=tests/`

> [!NOTE]
> Don't worry i included some link to help you to be at the same page as me

This will run only after the `Build` as configured on the `needs` property.

This job use sonarCloud ([What is sonarCloud?](https://www.sonarsource.com/products/sonarcloud/)); It provides instant feedback, in the right context, with minimal distractions so Clean Code is delivered every day. It is also a widely used static analysis solution for continuous code quality and security inspection. It helps developers identify and fix issues in their code that could lead to bugs, vulnerabilities, or decreased development velocity. SonarQube supports the most popular programming languages, including Java, JavaScript, TypeScript, C#, Python, C, C++, and many more.

First, you will need to connect your Github account to SonarCloud. But in order to do that, you will need to have an organization on GitHub but don't worry you can do that freely using this article [Creating a new organization from scratch](https://docs.github.com/en/organizations/collaborating-with-groups-in-organizations/creating-a-new-organization-from-scratch). After creating your organization, here is the next step to help you connect it with sonarCloud [SonarCloud | Getting started with SonarCloud | Analyzing GitHub projects](https://docs.sonarsource.com/sonarcloud/getting-started/github/)

Here we will be focused on the the last part.

To inform sonarCloud about the project that it will analyze, we will need to give it some information and to help us achieve it easily, we will use an action called _**[sonarsource/sonarqube-scan-action](https://github.com/sonarsource/sonarqube-scan-action/tree/v2.2.0/)**_. There are all the explanation about it configuration for different needs.

Here are some that we will used. You will need to create them in the repository environment of your repository

- `SONAR_TOKEN`: This is the token used to authenticate access to SonarQube
- `ORGANIZATION`: this is your organization name created in SonarQube. You can have access by going to _**`My projects > choose the organization's project (CMGGEvolution/template-vue in my case) > choose the project (template-vue for me) > on the sidebar click on 'information' > You will see on the 'About This Project' section the 'Organization Key'`**_.
- `PROJECT_KEY`: Same process as `ORGANIZATION`
- `SONAR_HOST_URL`: environment variable in the "Variables" settings page of your repository, or you can add them at the level of your GitHub organization (recommended).

As we will need to configure more to avoid analyzing unwanted folder and more. For that we need to configure some arguments (args)

- `Dsonar.organization`: Organization name
- `Dsonar.projectKey`: project key name
- `Dsonar.test.exclusions`: here you list all files you want to exclude like `node_modules`
- `Dsonar.javascript.lcov.reportPaths`: This parameter must be set to the path of the report file produced by your coverage tool. The path can be either absolute or relative to the project root. This doesn't work for me 🤫 but don't worry if you want it, you will need to remove `coverage` folder inside the `.gitignore` as sonarCloud will need to read it to generate the coverage report. After that, go to the menu `information` inside your project on `sonarCloud`, choose the badge `coverage` inside the select and copy the `markdown` link anfd then paste it inside your `README.md` file.

You need to change the `Analysis Method` to avoid some error. You can have access by going to _**`My projects > choose the organization's project (CMGGEvolution/template-vue in my case) > choose the project (template-vue for me) > on the sidebar hover the menu 'Administration' > you will see on its sub-menus 'Analysis Method' and click on it > Disabled 'Automatic Analysis'`**_

For more you can see the doc on the action documentation and also [SonarCloud | Advanced setup | CI-based analysis | Github Actions for SonarCloud](https://docs.sonarsource.com/sonarcloud/advanced-setup/ci-based-analysis/github-actions-for-sonarcloud/).

### UI test (End to end test on different devices)

> [!NOTE]
> You cannot have the cypress badge if you don't have a cypress cloud account

These job are about the End-to-End test wrote for your project. This will run only after the `Build and Vulnerability check` as configured on the `needs` property.

As see on the `matrix`, we will run using different browser (`chrome, firefox, edge`) in parallel. but you can add more by updating the array of `browser` under the `matrix` property. Here are the list of supported browser [GitHub Actions supported Browser](https://docs.github.com/en/get-started/using-github/supported-browsers).

To start the integration test, we need to download the `dist` artifact we downloaded and saved above on the `build` job using _**[actions/download-artifact@v4](https://github.com/actions/download-artifact/tree/v4/)**_ if you want to use it or you can directly launch it use `npm run preview`.

The step responsible of running these test is name `UI Test for chrome|firefox|edge`. We will use the actions called _**[cypress-io/github-action@v6](https://github.com/cypress-io/github-action/tree/v6/)**_.

- `config`: Is used fi you want to add some more configurations depending on the job. There are the same as the cypress config file [config parameter in cypress github action](https://github.com/cypress-io/github-action/tree/v6/?tab=readme-ov-file#config). Here i set the `viewportWidth` according to the device. Here is a reference link for device size [common-screen-sizes-for-responsive-web-design](https://www.altamira.ai/blog/common-screen-sizes-for-responsive-web-design/).
- `start`: to configure the command to start the server cypress will use to run the tests.You can start multiple server processes. For example, if you have an API to start using npm run api and the web server to start using npm run web you can put those commands in start using comma separation. Here we will use the `build` artifact download above and run the `preview` command to start the server
- `wait-on`: If you are starting a local server and it takes a while to start, you can add a parameter wait-on and pass url to wait for the server to respond.
- `wait-on-timeout`: By default, wait-on will retry for 60 seconds. You can pass a custom timeout in seconds using `wait-on-timeout`
- `record`: is used to record your test. But you will need to configure the record key. T have a record key, you need to created a project on cypress cloud [Getting started with cypress cloud](https://docs.cypress.io/cloud/get-started/setup). If you don't want to have an account, you can remove it.
- `config-file`: is used to specify the path to the cypress config file in your project
- `spec`: is used to specify the path to the designated folder that contain our tests files

Environment variable

- `CYPRESS_RECORD_KEY`: Here is the record key provided by cypress in your project. You might have seen it in the article about to get started with cypress cloud. (Provide this if you have created an account on cypress cloud)
- `GITHUB_TOKEN`: used to have access to your project by cypress
- `CYPRESS_PROJECT_ID`: Id of your project present on your cypress cloud account. (Provide this if you have created an account on cypress cloud)
- `COMMIT_INFO_SHA`: (recommended by cypress) to re-enable Cypress bot PR comments. See [link to the cypress recommendation](https://github.com/cypress-io/github-action/issues/124#issuecomment-716584972) for more details.
- `DEBUG`: this is a command gave by cypress to see what happen during the process to help debugging when we have error

The last step is to `Print Cypress Cloud URL` to directly have access to your account (Provide this if you have created an account on cypress cloud)

NB: To add the cypress badge, go to your project in your cypress cloud account. click to `project settings`; Under the general menu scroll down till title `README Badges`; click on the button`Configure Badge`; Fill the form branch inside the form display (I choose `develop` in my case), choose `style, type` and copy the markdown and pase it to your readme file.

This will be the same for all the `ui test`.
