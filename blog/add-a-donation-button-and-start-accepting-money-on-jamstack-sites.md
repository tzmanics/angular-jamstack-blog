---
title: >
  Add a Donation Button & Start Accepting Money On Jamstack Sites
description: >
  Taking donations is a fast & powerful way to take in money on your website. Whether you’re a non-profit or an indie creator, get started with Stripe in minutes!

authors:
  - Jason Lengstorf
  - Thor 雷神
date: 2020-04-28T00:00:00.000Z
lastmod: 2020-04-28T00:00:00.000Z
topics:
  - tutorials
tags:
  - stripe
  - tutorial
  - ecommerce
tweet: ""
format: blog
canonical_url: https://www.netlify.com/blog/2020/04/28/add-a-donation-button-start-accepting-money-on-jamstack-sites/
relatedposts:
  - Learn How to Accept Money on Jamstack Sites in 38 Minutes
  - Automate Order Fulfillment w/Stripe Webhooks & Netlify Functions
seo:
  metatitle: >
    How to: Donation Button to Start Accepting Money On Jamstack Sites
  metadescription: >
    See how accepting donations is a fast &#x26; powerful way to make money on your website. Whether you’re a non-profit or an indie creator, learn how to get started with Stripe in minutes!
publish: true
---

# Add a Donation Button & Start Accepting Money On Jamstack Sites

Taking donations is a fast & powerful way to take in money on your website. Whether you’re a non-profit or an indie creator, get started with Stripe in minutes!

We recently teamed up again on _Learn With Jason_ to [build a Jamstack site with a donation button](https://www.learnwithjason.dev/accept-donations-on-jamstack-sites). In this tutorial, we’ll walk through the process of adding a donate button to a Jamstack site and processing donations securely through Stripe Checkout.

## tl;dr

- Demo: https://stripe-donations-lwj.netlify.app/
- Source code: https://github.com/jlengstorf/stripe-donations
- [Deploy your own copy to Netlify](https://app.netlify.com/start/deploy?repository=https://github.com/jlengstorf/stripe-donations&utm_source=blog&utm_medium=stripe-donations-jl&utm_campaign=devex)

## Watch this tutorial in video format

If you prefer video, this tutorial is also available as [an egghead lesson](https://jason.af/egghead/stripe-donations).

## Create a donation product on Stripe

To get started, we need to create a product on Stripe that represents the donation.

1. Go to https://dashboard.stripe.com/products
2. Click "+ New"
3. Leave "one-time purchase products" selected
4. Add a descriptive name, such as "Donate \$5"
5. Set the amount (e.g. \$5.00)
6. Click "Save product"
7. Copy the SKU on the next page (will look similar to `sku_H7BEsLD3uMHLVB`)

Keep the SKU handy, because we’ll need it in a minute.

## Get your Stripe publishable key

Next, we need our Stripe publishable key, which tells Stripe which account the donations should be sent to. Go to [your API keys](https://dashboard.stripe.com/test/apikeys) and copy the publishable key.

![API keys section of the Stripe dashboard](https://cdn.netlify.com/17e9caa9fca890dedfd4f6ddb9266212b2f3ba13/a7097/img/blog/stripe-api-keys.png)

## Add a button to your site

Next, we need to add the HTML to our page that displays the donation button, as well as a div to display error messages in case something goes wrong.

Update `index.html`

```diff-html
    <main>
      <h1>Donate To Our Cause!</h1>
      <p>
        This demo is in test mode. That means you can check out using any of the
        <a href="https://stripe.com/docs/testing#cards">test card numbers</a>.
      </p>

+     <button id="donate-button" role="link">
+       Donate $5
+     </button>
+
+     <div id="error-message"></div>
    </main>
```

## Include Stripe.js and listen for button clicks

Next, we need to add the JavaScript that initializes Stripe and sends the user to Checkout for payment when they click the donate button.

Update `index.html` with the following:

```diff-js

     </footer>

+    <script src="https://js.stripe.com/v3"></script>
+    <script>
+      (function () {
+        // initialize Stripe using your publishable key
+        const stripe = Stripe('pk_test_Uczh5PNhB0aS0MZHnm2fkODM00MSoV8j3h');
+
+        // find the button and error message elements
+        const checkoutButton = document.getElementById('donate-button');
+        const errorMessage = document.getElementById('error-message');
+
+        // on click, send the user to Stripe Checkout to process the donation
+        checkoutButton.addEventListener('click', () => {
+          stripe
+            .redirectToCheckout({
+              items: [{ sku: 'sku_H7BEsLD3uMHLVB', quantity: 1 }],
+              successUrl: `${window.location.origin}/success.html`,
+              cancelUrl: window.location.origin,
+            })
+            .then(function (result) {
+              if (result.error) {
+                errorMessage.textContent = result.error.message;
+              }
+            });
+        });
+      })();
+    </script>
   </body>
```

This code will:

1. Include [Stripe.js](https://stripe.com/docs/js)
1. Initialize Stripe with your publishable key
1. Find the button and the error message elements in the DOM
1. Add an event listener to the button
1. Redirect to Stripe Checkout with the donation SKU

## Create a success page

Our redirect code tells Stripe to send successful purchases to `success.html` — let’s create that:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="/css/style.css" />
    <title>Donation Successful — Thank You!</title>
  </head>
  <body>
    <header>
      <a href="/" rel="home">Accept Donations on the Jamstack Using Stripe</a>
    </header>

    <main>
      <h1>Donation Successful!</h1>
      <p>Thank you so much!</p>
    </main>
  </body>
</html>
```

## Test the donation flow

All that’s left to do now is test things out!

Start the site locally using `npx serve src` or your preferred server utility, then click the donate button.

Alternatively, you can [deploy the site to Netlify](https://docs.netlify.com/#get-started) and see it running live!

![Stripe Donation Page](https://cdn.netlify.com/d0cac4d4bec9036cad184d4eaca92f37cdb4024b/45236/img/blog/stripe-donation-workflow.png)

Pay using one of Stripe’s [test credit cards](https://stripe.com/docs/testing#cards) and you’ll be redirected to the success page.

## Go live and start accepting real donations

To go live, change your Stripe account into [live mode](https://stripe.com/docs/keys#test-live-modes), replace the test key with your production publishable key, then deploy the site and you’re in business!

## What to do next

For more information, check out [the source code](https://github.com/jlengstorf/stripe-donations) for this example or [deploy your own copy to Netlify](https://app.netlify.com/start/deploy?repository=https://github.com/jlengstorf/stripe-donations&utm_source=learnwithjason&utm_medium=github&utm_campaign=devex) and give it a try!

**Other resources**:

- [Learn How to Accept Money on Jamstack Sites in 38 Minutes](https://www.netlify.com/blog/2020/04/13/learn-how-to-accept-money-on-jamstack-sites-in-38-minutes/) by Jason and Thor
- [Automate Order Fulfillment w/Stripe Webhooks & Netlify Functions](https://www.netlify.com/blog/2020/04/22/automate-order-fulfillment-w/stripe-webhooks-netlify-functions/) also by Jason and Thor
