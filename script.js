// || LANDING PAGE ||
function separator(selector, childElements, separator) { // "selector", "childElements" and "separator" must be strings
    const container = document.querySelector(selector);
    if (!container) return;

    const children = container.querySelectorAll(childElements);
    const safeSelector = selector.replace(/[^a-zA-Z0-9_-]/g, '');

    for (let i = 0; i < children.length - 1; i++) {
        let separation;

        if (typeof separator === 'string') {
            separation = document.createElement('span');
            separation.textContent = separator;
        } else if (separator instanceof HTMLElement) {
            separation = separator.cloneNode(true);
        } else {
            console.warn('Invalid separator: must be a string or HTMLElement');
            return;
        }

        separation.classList.add(`${safeSelector}_separator`);
        children[i].after(separation);
    }
}

separator("#quick-intro_tagline", "p", "✦");
// ||   ||


// ** EXPERIENCE SECTION **
const hr = document.createElement('hr');

separator(".exp_duties", "li", hr);
// **   **


// **UNIVERSAL**
// Helper function for larger multilingual translation function
function nameSwitch(nameContainer, nameClass) {
    const container = document.getElementsByClassName(nameContainer);
    const names = container.querySelectorAll(`.${nameClass}`);

    for (let i = 0; i < names.length-1; i++) {
        let temp;
        let currentName = names[i];
        let nextName = names[i+1];

        temp = currentName.textContent;
        currentName.textContent = nextName.textContent;
        nextName.textContent = temp;
    }
}