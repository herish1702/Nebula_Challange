import { objectInitializer } from "../../utils/ObjectInitilizer.js";

// Initializing objects from ObjectInitializer
const { utilsObject, searchPageObject } = objectInitializer

describe("Fetch dates and their difference", () => {
    
    // Fetching data from fixture files
    before("Load data",function () {
        
        // URL data wiil be loaded
        cy.fixture("UrlData.json").as("UrlData")

        //Dynamic data will be loaded
        cy.fixture("DynamicData.json").as("DynamicData") 
    });

    // Test Case starts to execute
    it("Should fetch and calculate date differences", function () {

        // Accessing the URL
        utilsObject.performVisit(this.UrlData.url)

        //Searched Text is entered in Search Field and search is performed
        searchPageObject.navigateToDates(this.DynamicData.searchText)

        // Respective dates are fetched and printed
        searchPageObject.fetchAndPrintDates().then((datesFetched) => {
            searchPageObject.calculateAndPrintAllDateDiffs(datesFetched);
        })
    })
});
