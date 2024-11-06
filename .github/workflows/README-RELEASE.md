# Release documentation ([Link to workflow file](./release.yml))

## About release

A `release` is the distribution of the final version or the newest version of a software application. A software release may be public or private and generally signifies the unveiling of a new or upgraded version of the application.

In agile software development, a release is a deployable software package culminating in several iterations and can be made before the end of an iteration.

To be successful, software release management requires careful planning and execution, with customer-centric goals, time and budget efficiency, and minimal negative impact on customers.

[More about continuous release](https://www.techtarget.com/searchsoftwarequality/definition/release)

## Description

> [!NOTE]
> You need to have a docker hub account. You can create one [here](https://app.docker.com/signup).

1. In a GitHub workflow, we are in a different repository and to checkout to our project, we often used the action _**[actions/checkout@v4](https://www.github.com/actions/checkout/tree/v4/)**_.

2. _**[docker/setup-buildx-action@v3](https://github.com/docker/setup-buildx-action/tree/v3/)**_ This action will create and boot a builder that can be used in the following steps of your workflow if you're using `Buildx` which is what is used by the next actions

3. The next step is to connect to docker hub via _**[docker/login-action@v3](https://github.com/docker/login-action/tree/v3/)**_ action. Here you will need to provide your `username` and `password` used when you want to connect to docker hub. The registry used here is `docker.io` to point to docker hub directly

4. We extract metadata from Git reference and GitHub events. This _**[docker/metadata-action@v4](https://github.com/docker/metadata-action/tree/v4/)**_ is particularly useful if used with `Docker Build Push action` to tag and label Docker images.

5. We build and push the image using the _**[docker/build-push-action@v6](https://github.com/docker/build-push-action/tree/v6/)**_. To achieve it we need to specify some information like:

   - `context`: Build's context is the set of files located in the specified PATH or URL
   - `push`: Push is a shorthand for `--output=type=registry`. It is set to `true` to accept to be push once the image is build
   - `tags`: list of tags. `${{ steps.meta.outputs.tags }}` will ge the release version that trigger the action
   - `annotations`: List of annotation to set to the image
   - `labels`: List of metadata for an image

### References

- [Example of script to publish docker images](https://docs.github.com/en/actions/use-cases-and-examples/publishing-packages/publishing-docker-images)
