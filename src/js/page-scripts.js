import SectionTabs from "./SectionTabs";
import { LanguageSelector } from "./LanguageSelector";
import { Navigation } from "./Navigation";

import { initCarousels } from "./carousels";

// section tabs
const sectionTabs = new SectionTabs();
sectionTabs.show(location.hash, true);

// language selector
const langPicker = document.querySelector(".language-picker");
const langSelector = new LanguageSelector(langPicker);

// navigation
const navbar = document.querySelector(".navbar");
const navigation = new Navigation(navbar);
navigation.update(location.hash);

window.addEventListener("hashchange", (e) => {
    sectionTabs.show(location.hash);
    navigation.update(location.hash);
});

initCarousels();
