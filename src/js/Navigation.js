export class Navigation {
    constructor(element) {
        this.links = element.querySelectorAll("a");
    }
    update(hash) {
        let foundActive = false;
        this.links.forEach((link) => {
            console.log("update", hash, link.hash);
            if (link.hash == hash) {
                foundActive = true;
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
        if (!foundActive) {
            this.links[0].classList.add("active");
        }
    }
}
