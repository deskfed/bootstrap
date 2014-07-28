We are always looking for the quality contributions and will be happy to accept your Pull Requests as long as those adhere to some basic rules:

# Core AngularUI Project

* Please make sure that your contribution fits well in the project's context:
  * we are aiming at rebuilding bootstrap directives in pure AngularJS, without any dependencies on any external JavaScript library;
  * the only dependency should be bootstrap CSS and its markup structure;
  * directives should be html-agnostic as much as possible which in practice means:
        * templates should be referred to using the `templateUrl` property
        * it should be easy to change a default template to a custom one
        * directives shouldn't manipulate DOM structure directly (when possible)
* Please assure that you are submitting quality code, specifically make sure that:
  * your directive has accompanying tests and all the tests are passing; don't hesitate to contact us (angular-ui@googlegroups.com) if you need any help with unit testing
  * your PR doesn't break the build; check the Travis-CI build status after opening a PR and push corrective commits if anything goes wrong

# Customizing UI-Bootstrap

* Our `angular-ui` branch is set up to be a tracking branch that we can keep updated with the AngularUI Bootstrap project. In order to develop locally (and pull in the most
  recent updates from the AngularUI project), you will want to check out the angular-ui branch and set up to remotely track the AngularUI project:
  * `git checkout angular-ui`
  * `git remote add --track master angular-ui git://github.com/angular-ui/bootstrap.git` (will create an `angular-ui` remote, tracking the `master` branch)
  * `git fetch angular-ui` (get most current changes from the new remote)
  * `git rebase angular-ui/master` (pull in the changes)
* Patching and adding features:
  * Not all changes we want to make will require pulling in updates from AngularUI. There is a version naming scheme for the AngularUI project that looks like this:
    * `MAJOR.MINOR.PATCH` with an optional suffix `-SNAPSHOT`. The `-SNAPSHOT` version will be the one they are currently working on. At the time of this writing,
    the AngularUI project is working on version 0.12.0, so the version is `0.12.0-SNAPSHOT`. Any snapshot versions could have instabilities or untested features
    so should be pulled in with extreme caution. (NOTE: See ([Semantic Versioning](http://semver.org/)) for more detail on versioning scheme)
    * For our customizations of AngularUI, we use the `PATCH` number. So the current stable AngularUI version is `0.11.0`. Therefore we can have a version `0.11.1`.
    * When starting development of a feature, you can use the `grunt version` command to update package.json version. Command should be run like this: `grunt version:patch:SNAPSHOT`
    * When completing development of a feature, run `grunt version` which will remove the "-SNAPSHOT" suffix.
    * Update CHANGELOG.md by running `grunt changelog`. This will pull in feature commit messages.
  * Update tests for your new feature. Run tests using `grunt watch` during development.
  * Update documentation to include your new feature.
* Building and updating ([docs site](http://deskfed.github.io/bootstrap)):
  * After updating documentation to include your new features, delete any existing `dist` folder.
  * Run `grunt`. This will build all JavaScript and HTML files, run the tests, and create the `dist` folder.
  * Switch branches to `gh-pages`.
  * Copy the `ui-bootstrap-xxx`, `index.html`, and `assets` files/folder to the root of the project. The `ui-bootstrap-xxx` files should not overwrite, but `index.html` and `assets` will.
  * `git push` to send changes to the server.
