import { Utils } from "../utils/Utils";
import { SearchPageLocators } from "../locators/searchPageLocator.js";

class SearchPage {
    
    constructor() {
        this.utils = new Utils();
        this.searchPageLocatorsObject = new SearchPageLocators();
    }
    
   enterSearchText = (searchText) => {
    const input = this.searchPageLocatorsObject.searchField;
    searchText === ""
        ? this.utils.performGetElement(input).should('be.visible').clear().type(" ", { parseSpecialCharSequences: false })
        : this.utils.performType(input, searchText);
    };

    clickAcceptPopUp = () => {
        this.utils.performClick(this.searchPageLocatorsObject.popUpAcceptCta);
    }

    clickSearchResult = () => {
        this.utils.performClick(this.searchPageLocatorsObject.searchResult);
    }

    navigateToDates = (searchText) => {
        this.enterSearchText(searchText)
        this.clickAcceptPopUp();
        this.clickSearchResult();
    }

    getPublicationDate = () => {
        return this.utils.performGetDate(this.searchPageLocatorsObject.publicationDate);
    }

    getFilingDate = () => {
        return this.utils.performGetDate(this.searchPageLocatorsObject.filingDate);
    }

    getGrantDate = () => {
        return this.utils.performGetDate(this.searchPageLocatorsObject.grantDate);
    }

    fetchAndPrintDates = () => {
        const datesFetched = {};
        return this.getPublicationDate().then((pubDate) => {
            datesFetched.publicationDate = pubDate;
            cy.task("Log:", `Publication date: ${pubDate}`);
            return this.getFilingDate();
        }).then((filingDate) => {
            datesFetched.filingDate = filingDate;
            cy.task("Log:", `Filing date: ${filingDate}`);
            return this.getGrantDate();
        }).then((grantDate) => {
            datesFetched.grantDate = grantDate;
            cy.task("Log:", `Grant date: ${grantDate}`);
            return cy.wrap(datesFetched)
        });
    }

    calculateDateDifference = (date1, date2) => {
        const d1 = new Date(date1);
        const d2 = new Date(date2);
        const diff = Math.abs(d1 - d2);
        return Math.floor(diff / (1000 * 60 * 60 * 24));
    }

    calculateAndPrintAllDateDiffs = (datesFetched) => {
        const { publicationDate, filingDate, grantDate } = datesFetched;

        const publicationGrantDifference = this.calculateDateDifference(publicationDate, grantDate);
        const publicationFilingDifference = this.calculateDateDifference(publicationDate, filingDate);
        const grantFilingDifference = this.calculateDateDifference(grantDate, filingDate);

        cy.task("Log:", `Difference between Publication date and Grant date is ${publicationGrantDifference} days`);
        cy.task("Log:", `Difference between Publication date and Filing date is ${publicationFilingDifference} days`)
        cy.task("Log:", `Difference between Grant date and Filing date is ${grantFilingDifference} days`);
    }
}

export { SearchPage };
