---
title: Introducing Edge Handlers in Preview
description: The recent collective return to static has challenged what is
  possible on edge infrastructure. We're incredibly excited to announce edge
  handlers in preview, a way to directly run code right from the CDN.
authors:
  - Divya Tagtachian
date: 2020-05-27T00:00:00.000Z
lastmod: 2020-05-27T00:00:00.000Z
topics:
  - news
tweet: ""
format: blog
canonical_url: https://www.netlify.com/blog/2020/05/27/introducing-edge-handlers-in-preview/
publish: true
---

# Introducing Edge Handlers in Preview

As adoption of the Jamstack model has become more widespread, so have the needs of a traditional CDN shifted. Today, content is expected to be fast, highly customizable, and up to date within a fraction of a second. Strictly static CDNs, which store static assets and serve them indistinguishably for every request, are insufficient to handle the more dynamic, personalized nature of modern content.

We believe that the CDN should not just be a store for static assets, it should also be an avenue to run your code alongside it. We’re therefore incredibly delighted to release Edge Handlers, a way to directly run code right from the CDN.

## A little background

We at Netlify have been acutely aware of the challenges a _strictly static_ CDN raises, and have been exploring ways in which we can offer our users programmability at the CDN level so content can be more dynamic. Redirects was one aspect of this exploration. With redirects, users can control how content is served right from the edge nodes. This makes serving content based on language, country or user permissions possible. Even so, edge based functionalities that Netlify offers (such as redirects) are finite. Try as we might, we will never fully cover the spectrum of possibilities when it comes to edge functionalities.

## How it works

With Edge Handlers, you get full control over how your content is served to the end user. Here's an example of how you can take advantage of it to augment content so users get highly personalized content.

In this example, we are serving users a page with data showing the number of covid 19 cases in their area. To do this, we read the headers from the incoming request and re-write the content based on where the request is coming from, so if you're in San Francisco, you'll get covid data specific to San Francisco and so on. Here's what that might look like:

```js
import td from ./data.json
import { render } from './render.js'

export async function onRequest(event) {
  const request = await event.getRequest()
  const state = request.headers.get('X-NF-Subdivision-Code')
  const data = state && td.find(el => el.state === state)

  if (data) {
    const props = {
      cityName: request.headers.get('X-NF-City-Name'),
      stateName: request.headers.get('X-NF-Subdivision-Name'),
      dcLocation: request.headers.get('X-NF-Availability-Zone'),
      ...data
    }
    await event.respondWith(200, render(props), {})
  }
}
```

## Coming soon to Netlify Edge

Edge Handlers bring new possibilities to the CDN and pushes the boundaries of what is possible within a Jamstack model. We are incredibly excited for this release and look forward to seeing all the inventive things you create with this. We plan on rolling this feature out gradually, so if you're keen on getting beta access or want to be notified when it ships, sign up [here.](https://www.netlify.com/products/edge/edge-handlers)
