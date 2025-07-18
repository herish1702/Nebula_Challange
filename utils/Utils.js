import 'cypress-xpath';
import '@4tw/cypress-drag-drop';

class Utils {

    performVisit = (url) => {
        cy.visit(url)
    }

    performGetElement = (selector) => {
        if (selector.startsWith("//")) {
            return cy.xpath(selector);
        }
        else if (selector.includes("[") || selector.includes("=") || selector.includes(".") || selector.includes("#")) {
            return cy.get(selector);
        }
        else {
            return cy.contains(selector)
        }
    }

    performClick = (locator) => {
        this.performGetElement(locator).first().should('be.visible').click()
    }

    performType = (locator, text) => {
        this.performGetElement(locator).should('be.visible').type(text)
    }

    performDragAndDrop = (source, target) => {
        this.performGetElement(source).drag(this.performGetElement(target), { force: true })
    }
};

export {Utils}