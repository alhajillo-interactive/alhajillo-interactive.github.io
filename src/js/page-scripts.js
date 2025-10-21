import { LanguageSelector } from "./LanguageSelector";
import SectionTabs from "./SectionTabs";

const langPicker = document.querySelector(".language-picker");
const langSelector = new LanguageSelector(langPicker);

const sectionTabs = new SectionTabs();
sectionTabs.show(location.hash);
window.addEventListener("hashchange", (e) => {
    sectionTabs.show(location.hash);
});
