/*
Selenium Test
Quick Start:
  * yarn add selenium-webdriver (This installs Selenium Webdriver: https://www.npmjs.com/package/selenium-webdriver)
  * Go here and follow instructions to install the Firefox geckodriver, and make sure it's in your console's PATH: https://www.npmjs.com/package/selenium-webdriver
  * cd path/to/selenium-tests
  * node ccd-test-01.js
  * You should see a Firefox window appear, and see the viewport jump around and text get typed in.
  * You should see your console say "[test name] Starting...", "[test name] Success..."
*/

const { Builder, By, Key, until } = require("selenium-webdriver");
const driver = new Builder().forBrowser("firefox").build();
const url = "http://localhost:8000";
var testIndex = 0;

const tests = [
  {
    name: "Sector Grid 1",
    test: "clickAndCheckVisible",
    el1: ".sector-grid-0",
    el2: "#sectorFilterMessage"
  },
  {
    name: "Sector Grid 2",
    test: "clickAndCheckVisible",
    el1: ".sector-grid-1",
    el2: "#sectorFilterMessage"
  },
  {
    name: "Sector Grid 3",
    test: "clickAndCheckVisible",
    el1: ".sector-grid-2",
    el2: "#sectorFilterMessage"
  },
  {
    name: "Sector Grid 4",
    test: "clickAndCheckVisible",
    el1: ".sector-grid-3",
    el2: "#sectorFilterMessage"
  },
  {
    name: "Sector Grid 5",
    test: "clickAndCheckVisible",
    el1: ".sector-grid-4",
    el2: "#sectorFilterMessage"
  },
  {
    name: "Sector Grid 6",
    test: "clickAndCheckVisible",
    el1: ".sector-grid-5",
    el2: "#sectorFilterMessage"
  },
  {
    name: "Sector Grid 7",
    test: "clickAndCheckVisible",
    el1: ".sector-grid-6",
    el2: "#sectorFilterMessage"
  },
  {
    name: "Sector Grid 8",
    test: "clickAndCheckVisible",
    el1: ".sector-grid-7",
    el2: "#sectorFilterMessage"
  },
  {
    name: "Sector Grid 9",
    test: "clickAndCheckVisible",
    el1: ".sector-grid-8",
    el2: "#sectorFilterMessage"
  },
  {
    name: "Sector Grid 10",
    test: "clickAndCheckVisible",
    el1: ".sector-grid-9",
    el2: "#sectorFilterMessage"
  },
  {
    name: "Sector Grid 11",
    test: "clickAndCheckVisible",
    el1: ".sector-grid-10",
    el2: "#sectorFilterMessage"
  },
  {
    name: "Sector Grid 12",
    test: "clickAndCheckVisible",
    el1: ".sector-grid-11",
    el2: "#sectorFilterMessage"
  },
  {
    name: "Test ZIP Filter with 95811",
    test: "typeAndClickAndCheckText",
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
 * The Tests
 **************************************/

function clickAndCheckText(options) {
  // Click a button (el1), then check for text (in el2)
  const { name, el1, el2, el2_text } = { ...options };
  // name: for console logging
  // el1: element to click (css selector)
  // el2: element to look for text in (css selector)
  // el2_text: text substring to look for
  console.log(name, "Starting...");
  driver
    .get(url)
    // Click Element 1
    .then(_ => click(el1))
    .then(_ => checkIfElementContainsText(el2, el2_text))
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

function typeAndClickAndCheckText(options) {
  // Type text (into el1), click a button (el2), then check for text (in el3).
  const { name, el1, el1_text, el2, el3, el3_text } = { ...options };
  // name: for console logging
  // el1: element to click (css selector)
  // el2: element to look for text in (css selector)
  // text: text substring to look for
  console.log(name, "Starting...");
  driver
    .get(url)
    .then(_ => typeTextInto(el1, el1_text))
    .then(_ => click(el2))
    .then(_ => checkIfElementContainsText(el3, el3_text))
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

function clickAndCheckVisible(options) {
  // Click a button (el1), then check if element is visible (in el2)
  const { name, el1, el2 } = { ...options };
  // name: for console logging
  // el1: element to click (css selector)
  // el2: element to look for (css selector)
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

function getNextTest() {
  testIndex++;
  runTest(testIndex);
}

function runTest(index) {
  if (index >= tests.length) {
    // var str = driver.toString();
    console.log("Tests done.");
    // if (str) {
    driver.quit();
    // }
  } else {
    const test = tests[index];
    if (test.test == "clickAndCheckVisible") {
      clickAndCheckVisible(test);
    } else if (test.test == "clickAndCheckText") {
      clickAndCheckText(test);
    } else if (test.test == "typeAndClickAndCheckText") {
      typeAndClickAndCheckText(test);
    }
  }
}
