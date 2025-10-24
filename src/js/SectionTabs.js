export default class SectionTabs {
    constructor() {
        this.sections = document.querySelector(".sections");
        this.tabs = this.sections.querySelectorAll(".section-tab");
    }
    show(tabHash, isFirstLoad = false) {
        let foundHash = false;
        tabHash = tabHash.replace("#", "");
        this.tabs.forEach((tab) => {
            if (tab.dataset.hash == tabHash) {
                tab.classList.add("active");
                foundHash = true;
            } else {
                tab.classList.remove("active");
            }
        });
        if (!foundHash) {
            this.tabs[0].classList.add("active");
        }
        if (!isFirstLoad) {
            window.scroll({ top: 0, behavior: "smooth" });
        }
    }
}
