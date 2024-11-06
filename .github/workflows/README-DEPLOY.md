# Continuous deployment documentation (CD) ([Link to workflow file](./deploy.yml))

## About CD

**Continue deployment**: is a strategy in software development where code changes to an application are released automatically into the production environment.

A series of predefined tests drives the [automation](https://www.ibm.com/topics/automation). Once new updates pass those tests, the system pushes the updates directly to the software's users.

Continuous deployment offers several benefits for enterprises looking to scale their applications and IT portfolio. Above all, it speeds up time to market by eliminating the lag between coding and customer value—typically days, weeks or even months.

In order to achieve this, regression tests must be automated, thereby eliminating expensive manual regression testing. The systems that organizations put in place to manage large bundles of production change—including release planning and approval meetings—can also be eliminated for most changes.

[More about continuous deployment](https://www.ibm.com/topics/continuous-deployment)

## Description

> [!IMPORTANT]
> Make sure to have the right to access amd make modification on your project file on the server

> [!NOTE]
> Here i used apache server. So make sure the server is already installed configured

The deployment is made when new changes are pushed to the `main` branch. The runner used is `ubuntu-20.04` and the node version is `18.x`.

To avoid repetition, because all is already well explained in the article in the reference. I also added some more articles i used for each command to deepen the understanding. [how-to-deploy-a-git-repository-to-a-server-using-github-actions](https://www.programonaut.com/how-to-deploy-a-git-repository-to-a-server-using-github-actions)

### Specificities

- `WORK_DIR`: this is the complete path to your repository on the server. `Eg. /var/www/myProject`

```bash
ssh ${{ secrets.SSH_USER }}@${{ secrets.SSH_HOST }} "cd ${{ secrets.WORK_DIR }} && git checkout main && git pull && npm run build && service apache2 restart && exit"
```

1. We have access to the server `ssh ${{ secrets.SSH_USER }}@${{ secrets.SSH_HOST }}`
2. We go to your repository `cd ${{ secrets.WORK_DIR }}`
3. We go to the `main` branch
4. We get the new changes `git pull`
5. We build the project `npm run build`
6. We restart the server `service apache2 restart`
7. We exit from the server

`NB`: `&&` is used there to chain the commands and also to say that if one command failed, then the remaining one will not be done and the operation will failed.

## References

- [how-to-deploy-a-git-repository-to-a-server-using-github-actions](https://www.programonaut.com/how-to-deploy-a-git-repository-to-a-server-using-github-actions)
- [chmodcommand](https://chmodcommand.com/chmod-600/)
- [Install-command](https://linuxhandbook.com/install-command/#3-create-a-directory-using-the-install-command)
- [echo-command-to-empty-a-file](https://linuxhandbook.com/echo-command/#7-use-echo-command-to-empty-a-file-in-linux)
- [ssh-keyscan](http://man.he.net/man1/ssh-keyscan)
