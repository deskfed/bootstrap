## Got a question or problem?

Firstly, please go over our FAQ: https://github.com/angular-ui/bootstrap/wiki/FAQ

Please, do not open issues for the general support questions as we want to keep GitHub issues for bug reports and feature requests. You've got much better chances of getting your question answered on [StackOverflow](http://stackoverflow.com/questions/tagged/angular-ui-bootstrap) where maintainers are looking at questions questions tagged with `angular-ui-bootstrap`.

StackOverflow is a much better place to ask questions since:
* there are hundreds of people willing to help on StackOverflow
* questions and answers stay available for public viewing so your question / answer might help someone else
* SO voting system assures that the best answers are prominently visible.

To save your and our time we will be systematically closing all the issues that are request for general support and redirecting people to StackOverflow. 

## You think you've found a bug?

Oh, we are ashamed and want to fix it asap! But before fixing a bug we need to reproduce and confirm it. In order to reproduce bugs we will systematically ask you to provide a _minimal_ reproduce scenario using http://plnkr.co/. Having a live reproduce scenario gives us wealth of important information without going back & forth to you with additional questions like:
* version of AngularJS used
* version of this library that you are using
* 3rd-party libraries used, if any
* and most importantly - a use-case that fails 

A minimal reproduce scenario using http://plnkr.co/ allows us to quickly confirm a bug (or point out coding problem) as well as confirm that we are fixing the right problem. 

We will be insisting on a minimal reproduce scenario in order to save maintainers time and ultimately be able to fix more bugs. Interestingly, from our experience users often find coding problems themselves while preparing a minimal plunk. We understand that sometimes it might be hard to extract essentials bits of code from a larger code-base but we really need to isolate the problem before we can fix it.

The best part is that you don't need to create plunks from scratch - you can for one from our [demo page](http://angular-ui.github.io/bootstrap/).

Unfortunately we are not able to investigate / fix bugs without a minimal reproduce scenario using http://plnkr.co/, so if we don't hear back from you we are going to close an issue that don't have enough info to be reproduced.


## You want to contribute some code?

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
