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

    extractDateByLabel = (labelText, logLabel, collectedDates) => {
        return cy.document().then((doc) => {
            const el = doc.evaluate(
                `(//b[contains(text(),'${labelText}')]/parent::td/following-sibling::td)[1]`,
                doc,
                null,
                XPathResult.FIRST_ORDERED_NODE_TYPE,
                null
                ).singleNodeValue;

            if (el) {
                const rawText = el.textContent.trim();
                const match = rawText.match(/\d{4}-\d{2}-\d{2}/);
                collectedDates[logLabel] = match ? match[0] : null;
            }
            else{
                collectedDates[logLabel] = null;
            }
        })
    }

    fetchAndStoreDates = (collectedDates) => {
            return cy.contains("Jurisdiction").parents("table").then(() => {
                this.extractDateByLabel("Publication date", "Publication Date", collectedDates)
                .then(() => this.extractDateByLabel("Filing date", "Filing Date", collectedDates))
                .then(() => this.extractDateByLabel("Grant date", "Grant Date", collectedDates))
                .then(() => {
                    Object.entries(collectedDates).forEach(([label, value]) => {
                    const paddedLabel = label.padEnd(18);
                    cy.task("Log:", `${paddedLabel}: ${value}`);
                })

                cy.task("writeToFixture", {
                    fileName: "dateOutput.json",
                    data: collectedDates
                })
            })
        })
    }


    calculateDateDifference = (date1, date2) => {
        const d1 = new Date(date1);
        const d2 = new Date(date2);
        let start = d1 < d2 ? d1 : d2;
        let end = d1 > d2 ? d1 : d2;
        let years = end.getFullYear() - start.getFullYear();
        let months = end.getMonth() - start.getMonth();
        let days = end.getDate() - start.getDate();

        if (days < 0) {
            months--;
            const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
            days += prevMonth.getDate();
        }

        if (months < 0) {
            years--;
            months += 12;
        }

        return `${years} years, ${months} months, ${days} days`;
    };
    
    calculateAndLogDateDiffs = (datesFetched) => {
        const parse = (d) => d ? new Date(d) : null;
        const publicationDate = parse(datesFetched["Publication Date"]);
        const filingDate = parse(datesFetched["Filing Date"]);
        const grantDate = parse(datesFetched["Grant Date"]);
        
        if(publicationDate && grantDate) {
            const diff = this.calculateDateDifference(publicationDate, grantDate);
            cy.task("Log:", `Difference between Publication and Grant: ${diff}`);
        }

        if(publicationDate && filingDate) {
            const diff = this.calculateDateDifference(publicationDate, filingDate);
            cy.task("Log:", `Difference between Publication and Filing: ${diff}`);
        }

        if (grantDate && filingDate) {
            const diff = this.calculateDateDifference(grantDate, filingDate);
            cy.task("Log:", `Difference between Grant and Filing: ${diff}`);
        }
    }

}
export { SearchPage };
