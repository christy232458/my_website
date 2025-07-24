// || LANDING PAGE ||
separator("#quick-intro_tagline", "p", "✦");
// ||   ||


// ** EXPERIENCE SECTION **
const hr = document.createElement('hr'); 

document.getElementById("experience-section").addEventListener("click", function (event) {
    if (event.target.classList.contains("exp_see-duties-button")) {
        const expWrapper = event.target.closest(".exp_wrapper");
        const duties = expWrapper.querySelector(".exp_duties");

        if (duties.style.display === "none" || duties.style.display === "") {
            duties.style.display = "flex"; // or "block", depending on your layout
            event.target.textContent = "Hide duties";
        } else {
            duties.style.display = "none";
            event.target.textContent = "Show duties";
        }
    }
});

separator(".exp_duties", "li", hr);
// **   **


// && ABOUT SECTION &&
   // References
   document.getElementById("about-section").addEventListener("click", function(event) {
    if (event.target.classList.contains("about_see-more")) {
        const aboutWrapper = event.target.closest(".about_ref-wrapper");
        const reference = aboutWrapper.querySelector(".about_reference-wrapper")

        if (reference.style.display === "none" || reference.style.display === "") {
            reference.style.display = "flex";
            event.target.textContent = "-";
        } else {
            reference.style.display = "none";
            event.target.textContent = "+";
        }
    }
   })
// &&   &&

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