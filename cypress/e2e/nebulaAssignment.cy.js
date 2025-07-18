import { objectInitializer } from "../../utils/ObjectInitilizer.js";

// Initializing objects from ObjectInitializer
const { utilsObject, searchPageObject } = objectInitializer;
const collectedDates = {};

describe("Fetch dates and their difference", () => {
  
  // Fetching data from fixture files
  before("Load data", function () {
    cy.fixture("UrlData.json").as("UrlData");
    cy.fixture("DynamicData.json").as("DynamicData");
  })

  //  Method is used to fetch the dates and print, also save a copy of date in fixture
  it("Should fetch and store dates", function () {
    utilsObject.performVisit(this.UrlData.url);
    searchPageObject.navigateToDates(this.DynamicData.searchText);
    searchPageObject.fetchAndStoreDates(collectedDates);
  })

  // Method is used to fetch the date available in fixture and provide the difference
  it("Calculates detailed date differences if dates are available", () => {
    cy.fixture("dateOutput.json").then((datesFetched) => {
      searchPageObject.calculateAndLogDateDiffs(datesFetched);
    })
  })
})
