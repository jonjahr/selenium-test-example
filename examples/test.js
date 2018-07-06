// Import the Selenium package
const { Builder, By, Key, until } = require("selenium-webdriver");

// Create one driver.  We'll run tests in series on one driver (one browser window).
const driver = new Builder().forBrowser("firefox").build();

// Path to your local development server.  We'll run tests on this page.
const url = "http://localhost:8000";

// Keep track of what test we're on.
var testIndex = 0;

/***************************************
 * ARRAY OF TESTS
 **************************************/

// Add your tests here.

// PROPERTIES:
// name: Your test's name (human readable)
// test: Which function to call (see functions below)
// el1, el2... : These are the page elements we'll click on, check, etc.
// All selectors are browser css selectors (some jquery selectors won't work)
// When checking for text, providing a substring is ok.

const tests = [
  {
    name: "Sector Grid 1",
    test: "click__checkVisible",
    el1: ".sector-grid-0",
    el2: "#sectorFilterMessage"
  },
  {
    name: "Sector Grid 2",
    test: "click__checkVisible",
    el1: ".sector-grid-1",
    el2: "#sectorFilterMessage"
  },
  {
    name: "Sector Grid 3",
    test: "click__checkVisible",
    el1: ".sector-grid-2",
    el2: "#sectorFilterMessage"
  },
  {
    name: "Sector Grid 4",
    test: "click__checkVisible",
    el1: ".sector-grid-3",
    el2: "#sectorFilterMessage"
  },
  {
    name: "Sector Grid 5",
    test: "click__checkVisible",
    el1: ".sector-grid-4",
    el2: "#sectorFilterMessage"
  },
  {
    name: "Sector Grid 6",
    test: "click__checkVisible",
    el1: ".sector-grid-5",
    el2: "#sectorFilterMessage"
  },
  {
    name: "Sector Grid 7",
    test: "click__checkVisible",
    el1: ".sector-grid-6",
    el2: "#sectorFilterMessage"
  },
  {
    name: "Sector Grid 8",
    test: "click__checkVisible",
    el1: ".sector-grid-7",
    el2: "#sectorFilterMessage"
  },
  {
    name: "Sector Grid 9",
    test: "click__checkVisible",
    el1: ".sector-grid-8",
    el2: "#sectorFilterMessage"
  },
  {
    name: "Sector Grid 10",
    test: "click__checkVisible",
    el1: ".sector-grid-9",
    el2: "#sectorFilterMessage"
  },
  {
    name: "Sector Grid 11",
    test: "click__checkVisible",
    el1: ".sector-grid-10",
    el2: "#sectorFilterMessage"
  },
  {
    name: "Sector Grid 12",
    test: "click__checkVisible",
    el1: ".sector-grid-11",
    el2: "#sectorFilterMessage"
  },
  {
    name: "Test ZIP Filter with 95811",
    test: "type__click__checkText",
    el1: "#input-sectors-zip",
    el1_text: "95811",
    el2: "#input-sectors-zip-button",
    el3: "#zipFilterSuccess",
    el3_text: "95811"
  }
];

// RUN IT
runTest(0);

/***************************************
 * TEST FUNCTIONS
 **************************************/

// These functions perform common Selenium actions
// They let us work at a higher level in the "tests" array above.

function click__checkText(options) {
  // Click a button, then check that an element contains text
  const { name, el1, el2, el2_text } = { ...options };
  // el1: element to click (css selector)
  // el2: element to check for text (css selector)
  // el2_text: text to look for (substring is ok)
  console.log(name, "Starting...");
  driver
    .get(url)
    .then(_ => click(el1))
    .then(_ => checkIfElementContainsText(el2, el2_text))
    // Catch error
    .catch(err => {
      console.error(name, "Error:", err);
    })
    // Success
    .then(_ => {
      console.log(name, "Success");
      getNextTest();
    });
}

function type__click__checkText(options) {
  // Type text into an element, click a button, then check that an element contains text.
  const { name, el1, el1_text, el2, el3, el3_text } = { ...options };
  // el1: element to click (css selector)
  // el1_text
  // el2: element to check for text (css selector)
  // text: text to look for (substring is ok)
  console.log(name, "Starting...");
  driver
    .get(url)
    .then(_ => typeTextInto(el1, el1_text))
    .then(_ => click(el2))
    .then(_ => checkIfElementContainsText(el3, el3_text))
    // Catch error
    .catch(err => {
      console.error(name, "Error:", err);
    })
    // Success
    .then(_ => {
      console.log(name, "Success");
      getNextTest();
    });
}

function click__checkVisible(options) {
  // Click a button, then check that an element is visible
  const { name, el1, el2 } = { ...options };
  // name: for console logging
  // el1: element to click (css selector)
  // el2: element to check for visibility (css selector)
  console.log(name, "Starting...");
  driver
    .get(url)
    // Click Element 1
    .then(_ => click(el1))
    .then(_ => checkIfVisible(el2))
    // Catch error
    .catch(err => {
      console.error(name, "Error:", err);
      // getNextTest();
    })
    // Success
    .then(_ => {
      console.log(name, "Success");
      getNextTest();
    });
}

/***************************************
 * Helper Functions
 **************************************/

function runTest(index) {
  if (index < tests.length) {
    // Call function based on the current string.
    const test = tests[index];
    if (test.test == "click__checkVisible") {
      click__checkVisible(test);
    } else if (test.test == "click__checkText") {
      click__checkText(test);
    } else if (test.test == "type__click__checkText") {
      type__click__checkText(test);
    }
  } else {
    // We've reached end of array.  All tests are done.
    // Close the browser window and the Selenium instance.
    driver.quit();
    console.log("Tests done.");
  }
}

function getNextTest() {
  testIndex++;
  runTest(testIndex);
}

function typeTextInto(el, text) {
  return driver.findElement(By.css(el)).sendKeys(text);
}

function click(el) {
  return driver.findElement(By.css(el)).click();
}

function checkIfVisible(el) {
  return driver.wait(
    until.elementIsVisible(driver.findElement(By.css(el))),
    1000
  );
}

function checkIfElementContainsText(el, text) {
  driver.wait(
    until.elementTextContains(driver.findElement(By.css(el)), text),
    1000
  );
}
