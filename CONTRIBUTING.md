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

* Our `angular-ui` branch within the deskfed repository is set up to be a tracking branch that we can keep updated with the AngularUI Bootstrap project. In order to develop locally (and pull in the most
  recent updates from the AngularUI project), check out the angular-ui branch and set it up to remotely track the AngularUI project. Note that we do not necessarily always want to pull in the most recent changes from AngularUI. See the comments beclow about their naming scheme. 
  * `git checkout angular-ui`
  * `git remote add --track master angular-ui git://github.com/angular-ui/bootstrap.git` (this creates an `angular-ui` remote that tracks the `master` branch)
  * `git fetch angular-ui` (get most current changes from the new remote)
  * `git rebase angular-ui/master` (pull in the changes)
* Patching and adding features:
  * Not all changes we want to make will require pulling in updates from AngularUI because we generally do not want to pull in unstable versions. There is a version naming scheme for the AngularUI project that looks like this:
    * `MAJOR.MINOR.PATCH` with an optional suffix `-SNAPSHOT`. The `-SNAPSHOT` version is the one AngularUI team is  currently working on. At the time of this writing,
    the AngularUI team is working on version 0.12.0, so their version is `0.12.0-SNAPSHOT`. Any snapshot versions could have instabilities or untested features
    so should be pulled in to ours with extreme caution. (NOTE: See ([Semantic Versioning](http://semver.org/)) for more detail on the versioning scheme and what MAJOR, MINOR and PATCH mean.)
    * To identify our customizations of AngularUI, we increment the `PATCH` number. So the current stable AngularUI version is `0.11.0`. Therefore our first version of that will be `0.11.1`.
    * When starting development of a feature, use the `grunt version` command to update the package.json version. Run this commmand to update the patch number and append "SNAPSHOT" as a suffix: `grunt version:patch:SNAPSHOT`
    * When you complete development of a feature, run `grunt version` which removes the "-SNAPSHOT" suffix.
    * Update CHANGELOG.md by running `grunt changelog`. This pulls in your feature commit messages.
  * Update tests for your new feature. Run tests using `grunt watch` during development so when you finish development you also have passing tests. 
  * Update documentation to include your new feature.
* Building and updating ([docs site](http://deskfed.github.io/bootstrap)):
  * After updating the documentation to include your new features, delete any existing `dist` folder in your local environment.
  * Run `grunt`. This builds all JavaScript and HTML files, runs the tests, and creates the `dist` folder.
  * Switch branches to `gh-pages`.
  * From the `dist` folder, copy the `ui-bootstrap-xxx`, `index.html`, and `assets` files/folder to the root of the project. The `ui-bootstrap-xxx` file will not overwrite anything, but `index.html` and `assets` will.
  * `git push` to send changes to the server.
* Updating our bootstrap-bower
  * Copy the `ui-bootstrap-xxx.js` file into the bootstrap-bower project, naming the file `ui-bootstrap.js`.
  * Update `bower.json` with the new version number.
  * Commit and push.
  * Create a corresponding tag number: `git tag 0.11.1`
  * Push this tag: `git push origin 0.11.1`
  * Update Agent v3 `bower.json` file to match the new version number.
