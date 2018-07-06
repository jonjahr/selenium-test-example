# Selenium Testing

## Introduction

[https://www.seleniumhq.org/](Selenium) automates browsers. It provides language bindings in JavaScript (and other languages) that let you execute high-level actions in the browser for testing web applications, as well as automating boring web administration tasks.

Some actions include:

- Navigate the browser to a URL
- Click a button.
- Wait for an element to be added to the DOM, become visible, etc.
- Take a screenshot.

Advantages: It's high level, and very faithful to the user experience. Disadvantage: It's very slow compared to JavaScript unit tests. Selenium can run locally (you'll see the browser do your actions), can be local "headless" (no visible browser) which runs faster, saves memory, and lets you do other stuff while you wait for tests to finish.

[https://github.com/SeleniumHQ/selenium/wiki/Grid2](Selenium Grid) lets you run tests in parallel on a grid of machines. This is nice because it's faster and you can test on many operating systems and browsers.

Many paid services let you run Selenium tests, such as:

- [https://www.browserstack.com](BrowserStack)
- [https://saucelabs.com](Sauce Labs)
- [https://experitest.com](Experitest)
- [https://crossbrowsertesting.com](CrossBrowserTesting)

[https://jenkins.io/doc/](Jenkins) is an automation server that can automate tasks related to testing web apps (as well as building and deploying them). Jenkins can be used to manage running

For a browser instance to receive Selenium commands, you must have the Selenium browser driver installed. Drivers exist for all major browsers in many operating systems.

## Quick Start

To run Selenium browser tests, you'll need the `selenium-webdriver` node package and the Selenium browser driver for your preferred browser(s).

### Download everything

First, add the [https://www.npmjs.com/package/selenium-webdriver](Selenium Webdriver) node package to your project:

```
yarn add selenium-webdriver
```

Next, install [https://github.com/mozilla/geckodriver/releases](Firefox Geckodriver). Or, see the [https://www.seleniumhq.org/download/](full list of drivers at SeleniumHQ). In my case, I downloaded the Firefox MacOS tarball into `~/selenium-browser-testing/` and extracted it. I added this path to the bottom of `~/.zshrc` and restarted my shell:

```
# Add WebDriver browser drivers to PATH
export PATH=$PATH:/Users/jjahr/selenium-browser-testing
```

Now, typing `which geckodriver` should show that it's in this path.

Now we're ready to run the tests!

### Prepare your tests

We'll run the tests on our local development server. So, fire up your local server with `npm start`, and grab the address (such as http://localhost:3000)

Next, set up your test. Copy the example test from this repo to your project, `selenium-tests/test.js`, and customize it with the path to your local development server and whatever tests you want to run.

### Run the test!

```
cd path/to/selenium-tests
node ccd-test-01.js
```

If the test works, you'll see a Firefox window appear, and see the viewport jump around, text get typed in, etc. You'll see console output:

```
[test name] Starting...
[test name] Success...
```

![Screenshot of test in action](./img/screenshot.jpg)
