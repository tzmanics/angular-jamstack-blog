---
title: Environment variables and preview deploys get a boost
description: With our automatic preview deploys you get 3 ways to handle
  sensitive environment variables. Learn how we've improved them for even
  greater control.
authors:
  - Phil Hawksworth
date: 2020-05-19T00:00:00.000Z
lastmod: 2020-04-27T00:00:00.000Z
topics:
  - tutorials
tags:
  - Feature
  - CI/CD
  - Deploy Previews
tweet: Announcing improved control over sensitive environment variables in your
  preview deploys
format: blog
canonical_url: https://www.netlify.com/blog/2020/05/19/environment-variables-and-preview-deploys-get-a-boost/
relatedposts:
  - Introducing Deploy Previews in Netlify
  - Introducing Deploy Contexts in Netlify
seo:
  metatitle: See How We Improved Environment Variables and Deploy Previews
  metadescription: Netlify's automated Deploy Previews give you 3 ways to handle
    sensitive environment variables. Learn how we've improved them for even
    greater control.
  ogimage: /img/blog/netlify-ci-cd-deploy-previews.png
publish: true
---

# Environment variables and preview deploys get a boost

Ever since [Deploy Previews](/products/build/) were [first introduced by Netlify in 2016](/blog/2016/07/20/introducing-deploy-previews-in-netlify/), users have been able to use them to see what the results of merging a pull request would be. They offer a valuable glimpse into the future and give insights and visibility to contributors and maintainers alike.

Making Deploy Previews and their corresponding build logs visible has proven to be popular and empowering. But what if a build uses environment variables which we'd rather not make public, like API keys or other secrets? If we're not careful someone could create a pull request which exposes our environment variables as part of an automated Deploy Preview. We'd rather not have that.

In projects with public repositories, Netlify offers [control over how environment variable are handled](https://docs.netlify.com/configure-builds/environment-variables/#sensitive-variable-policy) in the automated builds triggered by pull requests from unrecognized authors. Or "untrusted deploys" as we call them. You can choose from the following options:

- **Deploy without sensitive variables** - Untrusted deploys continue to build automatically, but any environments identified as being sensitive are omitted. You could either let your build continue without the features requiring the environment variables, or you could specify public fallback values thanks to deploy contexts and your [netlify.toml configuration](https://docs.netlify.com/configure-builds/file-based-configuration/).

- **Require approval to deploy** - Rather than automatically building all pull requests, sites can be configured to require approval from a [team member](https://docs.netlify.com/accounts-and-billing/team-management/) before an untrusted deploy can continue.

- **Deploy without restrictions** - If you are sure that your environment variables do not contain sensitive content, you can opt out of these controls and allow your site to automatically build Deploy Previews as normal.

## Greater visibility

In order to help you keep track of which environment variables, if any, were omitted from each build, we'll include such details in the deploy logs.

We'll also include the information that sensitive environment variable were omitted in your [deploy notifications](https://docs.netlify.com/site-deploys/notifications) to help you keep aware of what is happening in your builds.

## Exploring Deploy Previews

If you've not yet worked on a project which used Deploy Previews, you can see an example of how they surface in places like GitHub pull requests thanks to our deep integrations with git providers. Here's [an example from the Yarn site](https://github.com/yarnpkg/website/pull/1043#event-3008852473).

We believe that enabling this type of visibility during the development and content authoring activities in web projects brings a huge boost in a productive and confident development pipeline.

If you have questions or suggestions about how we might continue to improve this powerful feature, join the conversation over in the [Netlify Community](https://community.netlify.com)
