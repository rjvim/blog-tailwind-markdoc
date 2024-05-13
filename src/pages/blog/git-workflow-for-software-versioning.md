---
title: 'Git Workflow for Versioning & Releases'
date: '2020-06-03T05:35:07.322Z'
---

## About

Developers regularly use Git, but also run into the general use-case of how to maintain versioning of their codebase & how to deploy. You might have come across: Feature Branch Workflow which is what the flow I am going to take about is based on - the feature branch workflow didn't solve my problem entirely - so, I am writing it down again for reference. This is not just for teams, but also solo devs.

## Versioning

The typical way to version software is using x.y.z (SemVer) we will continue using the same. But "version" is too broad a word to oversimplify it. We are here strictly refering to codebase version? When we publish a mobile app to android or iOS it insists for a version - are we discussing that version? We will discuss both - else the problem is not solved much.

The core problem is actually created by Git itself, the way it works is, you change any file, you need to make a commit. Once you commit, the code has moved ahead. Git gives a way to tag codebase with a version - and because of that we end-up with various scenarios which we didn't predict.

You might have run your software development without even using versions - and it does have it's effect. You just are not able to talk in terms of releases anymore! You need some convention to talk about a release. When what you actually release is a codebase, why not use the same SemVer! We will do the same.

## Concepts

I want to guide this process with an example to make much more efficient.

### Concept 1

Once you created a git repo you are usually blessed with a `main` branch. Fixate that you will never push code directly to `main` and also never take a branch from it and work on it.

### Concept 2

You need to take a `develop` branch from `main`, and this is the branch where you develop.

There are two types of branches you should use:

- `feature` branch: This is where you develop a feature, big/small, it has impact on the product
- `hotfix` branch: This is where you fix bugs, or do some tweaking

## Developing a Feature(s)

Let's assume your current software version is 1.2.0, and now you want to make a release: 1.3.0. What are going to release in 1.3.0? Few features! It's not essential that you develop a single feature in every release. Now as that confusion is out of way, your team has a great way to align, what is the team working on? "Release 1.3.0" - What goes into it? A,B,C,D!

### Step 1: Make a feature branch

For each feature, you would be taking out a feature branch. Let's say the feature is "Change Signup Page".

```bash
// Create a new branch from develop
git checkout -b feature/change-signup-page develop
```

### Step 2: Merge feature branch to develop

What? Merge? Obviously you have done whatever development you need to for the feature, and now you are ready to merge. There's no point of putting "Step 2: Code the feature"

Usually to merge you would be raising a PR and going through the entire code reviewing process with +2 upvotes minimum, but generally you will endup merging feature branch to develop branch.

```bash
git checkout develop
git merge feature/change-signup-page
```

### Step 3: Create a Release Branch & Version it

There is no one to say you can't create this branch before you develop a feature or developing all features, but this is subjective - If it's an improvement or not is your subjective call. In the end, there is a release branch!

```bash
// Create a release branch from develop branch
git checkout -b release/1.3.0 develop
```

Now, I always had my doubts when do I actually increment version in package.json or pom.xml file? It happens now! Once you create a release, you are basically "preparing" (not completing) the code for release, and you are clearly marking it with version you intend to release. In package.json put 1.3.0 (You can just run some command too!)

```
// Increment in package.json
"version": "0.1.0"
```

### Step 4: Stabilize Release Branch

Depending on approach you took, you might have created release after all features or some features. Eventually note that somehow all the code relevant for release reached the branch, now all you can do is:

- Make any last-minute bug fixes in the release branch.
- Update documentation, run tests, and finalize the release.

You might merge things back to release branch using other release stabilization branches, this is not very important to whole structure, you can just call them `stabilize-move-button-to-left`, or if you are a single developer you might directly push to release. All is cool!

### Step 5: Release!

This is where I got confused previously, but I got it much later. Release is basically releasing the code and not an environment. Let's come to releasing for testing, and releasing to environment little later - and in fact it is a different topic.

```bash
git checkout main
git merge release/1.3.0
```

You merged release branch to main, and that's awesome! But right now Git itself is not tagged with 1.3.0 version, 1.3.0 is only in package.json and that's not enough. That's why I called it "preparing", now let's complete it.

```bash
git tag -a v1.3.0 -m "Release version 1.3.0"
```

All you did is tagged Git commit with a tag number, and still you called it a "release". This is code release.

To close the loop, merge the changes from release back to develop, so that any stabilization done in release branch comes back to develop branch.

```bash
git checkout develop
git merge release/1.3.0
```

That's done. You have developed a feature, and released it to main. Now, what about deployment? Let's come to it after hotfixes!

## Developing a Hotfix

You found a bug - where did it happen? It might be UAT or Production - That's the reason this topic was kept out. Because, the step where we mentioned "stabilize the release" - if we keep finding bugs, we will keep merging code to release branch just with PRs, we won't increment it everytime.

### Step 1: Create a hotfix branch

Create a hotfix branch from main (yes main) - assuming the current codebase of main is actually at 1.3.0

```bash
git checkout -b hotfix/1.3.1 main
```

### Step 2: Bump the version

Fix the bug, bump the version to `1.3.1` in package.json file

### Step 3: Merge to main and Tag

- Merge the hotfix branch into both `main` and `develop`
- Tag `main` with `v1.3.1`.

### Step 4: Push tags to main

Push all the branches and tags to the remote repository

```bash
git push origin main develop
git push --tags
```

## Deployment

Deployment is your team/project/organization specific. If you are solo developer, doing your own personal project, you might not have a staging environment. If you are an big org you might have dev -> staging -> pre-prod -> prod. Number of environments has nothing to do with your codebase versioning.

### Environments

When you want to deploy, there are two questions:

- What do you want to deploy?
- Where do you want to deploy?

_Where_ is your environment, your environment would have it's own environment variables. _what_ is to simplify which "git commit" you want to deploy at the end of the day! As that's not flexible, you use branch names, or tags.

Let's take an example to drive the point home. You have the following environments:

- **staging** (Maybe QA tests here)
- **pre-prod** (Maybe Final QA happens here)
- **prod** (You should know better)

Once you made a release branch, you want to make it available for testing, what you can do is:

- Connect automated CI/CD to deploy `release/1.3.0` to staging everytime you push
- Once you are happy with release branch, then make the release to main. At this point main has a tag called v1.3.0
- Release v1.3.0 tag to pre-prod environment
- Oops, you found a bug. So you make a `hotfix/1.3.1` branch!
- Merge `hotfix/1.3.1` to main and tag v1.3.1
- Release v1.3.1 tag to pre-prod environment

### Alternatives

- You might want to connect `main` to pre-prod directly if it helps
- If you have multiple releases in plan
  - You might have a new "release environment" (else why do you need CaaS!)
  - Create release environment, destroy after release
- Call it "release" environment instead of "staging", so that you can deploy upcoming release to it
- Some might also call it preview environments, where each release branch has a deployment for itself

### Mobile Apps Versioning

Android and iOS Versioning has it's own versioning, everytime you need to upload to these stores you need to increment version in few files which are specific to Android and iOS. But, issue is when we touch these files, they change git history essentially moving the main branch.

For such things, simply do following:

- Follow the same process of hotfix, call it `storefix/1.3.2`

## Summary

Let's take several steps back and understanding/validate why does this process even work

- The code which reached users has always been a tagged commit in `main` branch
- In your team/org, you all align that you are working on a release, and it has a version: 1.3.0
- Your language is centered around it too, like:
  - Hey, is 1.3.0 in staging?
  - Is QA done for 1.3.0?
  - What the hell is going on with 1.3.0
  - While we are working on 1.3.0, can we plan 1.4.0!
- `develop` is always key up-to-date by merging main & release branches to it
- The `develop` branch is used for ongoing work
- `feature` branches for new features
- `release` branches for preparing releases
- `hotfix` branches for urgent fixes.
- Each significant release is tagged in Git, providing clear reference points for each version of your software.
- You can actually use some tool which reads version from `package.json` and display on your app like `Software Version: 1.3.1`
- Your bug tracking tools or analytics tools can put this version and helps you find issues/bugs
