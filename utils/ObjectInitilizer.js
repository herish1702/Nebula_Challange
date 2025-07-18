import { Utils } from "../utils/Utils";
import { SearchPage } from "../page/searchPage.js";

const utilsObject = new Utils()
const searchPageObject = new SearchPage()


const objectInitializer = {
    utilsObject,
    searchPageObject
}

export { objectInitializer }