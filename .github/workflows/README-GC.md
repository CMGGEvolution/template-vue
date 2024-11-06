# Generate coverage documentation ([Link to workflow file](./generate-coverage.yml))

GitHub readme badges provide a quick and visual way to convey vital information about your project, enhancing its credibility and readability.
Readme badges make GitHub projects easier to notice and trust for a few reasons:

- Enhanced readability - Badges make the text easier to read by adding color and symbols. This helps you quickly get the info you need.
- Accessibility - Badges show important details that might be hidden in long texts. This makes it simpler for developers to see if they're interested in the project.
- Social proof - Badges from third-party services show that the project follows professional standards. This makes people more confident in the project's quality.
- Professional appearance - When badges are used well, they make the project look neat and welcoming. This can attract more contributors and leave a good first impression.

In short, readme badges help projects stand out by making them look well-kept and easy to understand. This encourages more people to take a look and possibly contribute. If you want to know more, take a look at this [readme-badges-github-best-practices](https://daily.dev/blog/readme-badges-github-best-practices)

## Description

> [!NOTE]
> This workflow is to generate coverage for units tests

In this workflow, the badge is generated when new changes are pushed either to the `main` or `staging` branches. The runner used is `ubuntu-20.04` and the node version is `18.x`.

To generate the coverage, we need to launch the units tests to collect the coverage; And for that, we need to checkout to the working directory where the project is located using this _**[actions/checkout@v4](https://www.github.com/actions/checkout/tree/v4/)**_ action. And once there, install nodejs on the runner using this _**[actions/setup-node@v4](https://github.com/actions/setup-node/tree/v4/)**_ action.

On all prerequisites are ready, we can now install all the dependencies needed to launch units tests using the safe command `npm ci` and then using `npm run test:unit:coverage` to generate tests coverages. Once coverage generated, we extract the information needed (`line result`) inside the file generated using a bash script. After extracting the line coverage from the `coverage-summary.json` file, we save it inside the GitHub environment with the env name `COVERAGE`

```bash
"$(npm run test:unit:coverage)"
cd coverage && ls
SUMMARY=$(jq '.total.lines.pct' coverage-summary.json)
SUMMARY_PERCENTAGE="${SUMMARY}%"
echo "COVERAGE=$(echo ${SUMMARY_PERCENTAGE})" >> $GITHUB_ENV
```

### Badge creation

To create a badge, we will use the actions _**[schneegans/dynamic-badges-action@v1.7.0](https://github.com/schneegans/dynamic-badges-action/tree/v1.7.0/)**_. To use the action, we will need:

1. Go to [gist.github.com](https://gist.github.com/) and create a new gist. You will need the ID of the gist (this is the long alphanumerical part of its URL) later. You will need to fill the `Gist description (coverage Badge fro me)` and the `file name including extension (template_vue.json for me)`
2. Go to [github.com/settings/tokens](https://github.com/settings/tokens) and create a new token with the gist scope
3. Go to the Secrets page of the settings of your repo and add this token as a new secret with the name `GIST_SECRET`.

- `auth`: must be replace by the `GIST_TOKEN`. It is used to have access to github gist
- `gistID`: must be replace by the ID (this is the long alphanumerical part in teh URL when we open the gist created). It is used to locate where we will find the file we will used to read the report
- `filename`: file name will be created inside the gist and where we will read the report. This can be generated dynamically
- `label`: Label that will be display on the left part of the badge
- `message`: this is the message to display at the right part (coverage)
- `color`: the label color
- `namedLogo`: this is used to identify which logo display on the badge.

To go deeper and customize more,you can visit the actions _**[schneegans/dynamic-badges-action@v1.7.0](https://github.com/schneegans/dynamic-badges-action/tree/v1.7.0/)**_.

## References

- [coverage-badge-with-github-actions-finally-59fa](https://dev.to/thejaredwilcurt/coverage-badge-with-github-actions-finally-59fa)
- [jq command](https://www.baeldung.com/linux/jq-command-json)
- [dynamic-badges-action](https://github.com/schneegans/dynamic-badges-action/tree/v1.7.0/)
