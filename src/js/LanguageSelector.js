const DEFAULT_LOCALE = "en";

export class LanguageSelector {
    constructor(element) {
        this.select = element.querySelector("select");
        this.select.addEventListener("input", (e) => {
            this._onSelectionChanged(this.select.value);
        });
        this.select.value = this._getLocaleFromPath(document.location.pathname);
    }
    _onSelectionChanged(lang) {
        const currentLocale = this._getLocaleFromPath(document.location.pathname);
        if (lang == currentLocale) return;

        if (lang == DEFAULT_LOCALE) {
            document.location.pathname = "/";
        } else {
            document.location.pathname = "/" + lang + "/";
        }
    }

    _getLocaleFromPath(path) {
        const pathParts = path.split("/").filter((s) => s !== "");
        if (pathParts.length > 0 && pathParts[0].length == 2) {
            return pathParts[0];
        } else {
            return DEFAULT_LOCALE;
        }
    }
}
