// || LANDING PAGE ||
separator("#quick-intro_tagline", "p", "✦");
// ||   ||


// ** EXPERIENCE SECTION **
document.getElementById("experience-section").addEventListener("click", function (event) {
    if (event.target.classList.contains("exp_see-duties-button")) {
        const expWrapper = event.target.closest(".exp_wrapper");
        const duties = expWrapper.querySelector(".exp_duties");

        if (duties.style.display === "none" || duties.style.display === "") {
            duties.style.display = "flex"; // or "block"
            event.target.textContent = "Hide duties";
        } else {
            duties.style.display = "none";
            event.target.textContent = "Show duties";
        }
    }
});

async function loadExperienceData(lang) {
  const response = await fetch('experiences.json');
  const experiences = await response.json();

  const container = document.querySelector('.exp-container');
  const template = document.querySelector('template.exp-template');

  container.innerHTML = ''; // Clear container

  experiences.forEach(exp => {
    const clone = template.content.cloneNode(true);

    clone.querySelector('.exp_title').textContent = exp.jobTitle;
    clone.querySelector('.exp_position').textContent = exp.position;

    clone.querySelector('.exp_start-date').textContent = exp.startDate[lang];
    clone.querySelector('.exp_end-date').textContent = exp.endDate[lang];

    clone.querySelector('.exp_city').textContent = exp.city[lang];
    clone.querySelector('.exp_country').textContent = exp.country[lang];

    clone.querySelector('.exp_summary').textContent = exp.summary[lang];

    const dutiesList = clone.querySelector('.exp_duties');
    dutiesList.innerHTML = '';

    exp.duties[lang].forEach(duty => {
      const li = document.createElement('li');
      li.classList.add('exp_duty');
      li.textContent = duty;
      dutiesList.appendChild(li);
    });

    // Append the filled clone to container
    container.appendChild(clone);

    // Add separators inside this job’s duties list only
    separatorForSingleContainer(dutiesList, "li", () => {
      const hr = document.createElement('hr');
      hr.classList.add('separator-hr');
      return hr;
    });
  });
}

// Helper function to add separators inside a specific container only
function separatorForSingleContainer(container, childSelector, separatorFactory) {
  const children = container.querySelectorAll(childSelector);
  for (let i = 0; i < children.length - 1; i++) {
    const sep = separatorFactory();
    children[i].after(sep);
  }
}

loadExperienceData('en');
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


// ~~ EDUCATION SECTION ~~
async function loadEducationData(lang) {
  const response = await fetch('education.json');
  const data = await response.json();

  const container = document.querySelector('.education_container');
  const template = document.querySelector('template.education-template');

  container.innerHTML = ''; // Clear current entries

  data.schools.forEach(school => {
    const clone = template.content.cloneNode(true);

    // Set school name
    clone.querySelector('.education_school').textContent = school.name[lang];
    // Set location
    clone.querySelector('.education_location').textContent = school.location[lang];
    // Set start and end dates
    clone.querySelector('.education_start-date').textContent = school.start;
    clone.querySelector('.education_end-date').textContent = school.end;
    // Set degree
    clone.querySelector('.education_degree').textContent = school.degree[lang];

    container.appendChild(clone);
  });
}

// Call with language code
loadEducationData('en');
// ~~   ~~


// ++ SKILLS AND CERTIFICATIONS SECTION ++
const lang = document.documentElement.lang || 'en'; // defaults to 'en' if not set

fetch('skills.json')
  .then(response => response.json())
  .then(data => {
    // === LANGUAGES ===
    const languageContainer = document.querySelector('.language-container');
    const languageTemplate = document.querySelector('.skills-template_language');
    
    data.languages.forEach(langData => {
      const clone = languageTemplate.content.cloneNode(true);
      const wrapper = clone.querySelector('.languages_wrapper');
      const languageElem = wrapper.querySelector('.language');
      
      const name = languageElem.querySelector('.language_name');
      name.textContent = langData.name[lang];

      const fluency = languageElem.querySelector('.language_fluency');
      fluency.textContent = langData.fluency[lang];

      const progress = languageElem.querySelector('.language_progress');
      const symbol = progress.querySelector('.language_symbol');
      const langKey = langData.name.en.toLowerCase().replace(/[^a-z0-9]/g, '_'); // For file name matching

      symbol.src = `images/logos_icons/${langKey}.png`;
      symbol.alt = langData.name[lang];

      // Set progress percentage (number only, no % sign)
      const percent = langData.percent;

      // Determine fluency color based on percent
      let fluencyColor = 'red'; // 0-25
      if (percent > 75) fluencyColor = 'green';
      else if (percent > 50) fluencyColor = 'blue';
      else if (percent > 25) fluencyColor = 'yellow';

      progress.style.setProperty('--progress', percent);
      progress.style.setProperty('--fluency', fluencyColor);

      languageContainer.appendChild(clone);
    });

    // === CERTIFICATIONS ===
    const certContainer = document.querySelector('.certifications-container');
    const certTemplate = document.querySelector('.skills-template_certs');

    data.certifications.forEach(cert => {
      const clone = certTemplate.content.cloneNode(true);
      const certWrapper = clone.querySelector('.cert_wrapper');
      const certAnchor = certWrapper.querySelector('a.certs');
      const certName = certWrapper.querySelector('.cert_name');

      certName.textContent = cert.name[lang];

      if (cert.file) {
        certAnchor.href = cert.file;
        certAnchor.target = "_blank";
      } else {
        certAnchor.removeAttribute('href');
        certAnchor.style.cursor = "default";
      }

      certContainer.appendChild(clone);
    });
  })
  .catch(error => console.error("Error loading skills.json:", error));
// ++   ++


// && ABOUT SECTION &&
async function loadHobbiesAndReferences() {
  try {
    const response = await fetch('about.json'); // Adjust path if needed
    const data = await response.json();

    // --- Hobbies ---
    const hobbiesList = document.querySelector('.about_hobby-list');
    // Clear existing hobby <li> items
    hobbiesList.innerHTML = '';

    data.hobbies.forEach(hobby => {
      const li = document.createElement('li');
      li.className = 'about_hobby';
      li.textContent = hobby[currentLang] || hobby['en'];
      hobbiesList.appendChild(li);
    });

    // --- References ---
    const referencesContainer = document.querySelector('.about_ref-wrapper');
    const referenceTemplate = document.querySelector('.about-template_references');

    // Clear previous reference entries
    referencesContainer.querySelectorAll('.about_ref-intro, .about_reference-wrapper').forEach(el => el.remove());

    data.references.forEach(ref => {
      const clone = referenceTemplate.content.cloneNode(true);

      clone.querySelector('.about_ref-name').textContent = ref.name;
      clone.querySelector('.about_reference p').textContent = ref.statement[currentLang] || ref.statement['en'];

      const contactList = clone.querySelector('.about_ref-contact');
      contactList.innerHTML = '';

      if (ref.contact?.email) {
        const liEmail = document.createElement('li');
        liEmail.className = 'about_ref-icon-wrapper';
        liEmail.innerHTML = `<a href="mailto:${ref.contact.email}" title="Email"><i class="fas fa-envelope"></i></a>`;
        contactList.appendChild(liEmail);
      }
      if (ref.contact?.website) {
        const liWeb = document.createElement('li');
        liWeb.className = 'about_ref-icon-wrapper';
        liWeb.innerHTML = `<a href="${ref.contact.website}" target="_blank" rel="noopener" title="Website"><i class="fas fa-globe"></i></a>`;
        contactList.appendChild(liWeb);
      }

      referencesContainer.appendChild(clone);
    });

  } catch (error) {
    console.error("Error loading about.json:", error);
  }
}

loadHobbiesAndReferences();
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

function separator(selector, childElements, separator) {
    const container = document.querySelector(selector);
    if (!container) return;

    const children = container.querySelectorAll(childElements);
    const safeSelector = selector.replace(/[^a-zA-Z0-9_-]/g, '');

    for (let i = 0; i < children.length - 1; i++) {
        let separation;

        if (typeof separator === 'string') {
            separation = document.createElement('span');
            separation.textContent = separator;
        } else if (typeof separator === 'function') {
            separation = separator();
        } else if (separator instanceof HTMLElement) {
            separation = separator.cloneNode(true);
        } else {
            console.warn('Invalid separator: must be string, function or HTMLElement');
            return;
        }

        separation.classList.add(`${safeSelector}_separator`);
        children[i].after(separation);
    }
}

function separatorForSingleContainer(container, childSelector, separatorFactory) {
  const children = container.querySelectorAll(childSelector);
  for (let i = 0; i < children.length - 1; i++) {
    const sep = separatorFactory();
    children[i].after(sep);
  }
}

const translationsURL = 'translations.json';

let currentLang = localStorage.getItem('lang') || 'en';

async function fetchTranslations() {
  try {
    const res = await fetch(translationsURL);
    if (!res.ok) throw new Error('Failed to fetch translations');
    const data = await res.json();
    applyTranslations(data, currentLang);
  } catch (err) {
    console.error(err);
  }
}

function applyTranslations(data, lang) {
  // HERO TAGLINE
  const taglineItems = document.querySelectorAll('#quick-intro_tagline .tagline_item');
  if (taglineItems.length >= 3) {
    taglineItems[0].textContent = data.hero.tagline_teacher[lang];
    taglineItems[1].textContent = data.hero.tagline_musician[lang];
    taglineItems[2].textContent = data.hero.tagline_nature_lover[lang];
  }

  // HERO RESUME TEXT
  const resumeText = document.querySelector('#quick-resume p');
  if (resumeText) resumeText.textContent = data.hero.resume[lang];

  // EXPERIENCE SECTION TITLE
  const expTitle = document.querySelector('#experience-section h2[data-i18n="experience_title"]');
  if (expTitle) expTitle.textContent = data.experience.title[lang];

  // EXPERIENCE SHOW/HIDE DUTIES BUTTONS
  document.querySelectorAll('.exp_see-duties-button').forEach(button => {
    // The button toggles between show/hide duties, so set initial text to "Show duties"
    // You could extend this for toggle functionality if you want
    button.textContent = data.experience.show_duties[lang];
  });

  // EDUCATION SECTION TITLE
  const eduTitle = document.querySelector('#education-section h2');
  if (eduTitle) eduTitle.textContent = data.education.title[lang];

  // SKILLS SECTION TITLES
  const skillsTitle = document.querySelector('#skills-section h2');
  if (skillsTitle) skillsTitle.textContent = data.skills.title[lang];

  const languageTitle = document.querySelector('#skills-section .language_title');
  if (languageTitle) languageTitle.textContent = data.skills.languages[lang];

  const certTitle = document.querySelector('#skills-section .cert_title');
  if (certTitle) certTitle.textContent = data.skills.certifications[lang];

  // ABOUT SECTION TITLE (there are multiple with class 'about_title')
  document.querySelectorAll('#about-section .about_title').forEach((el, idx) => {
    // We know the first is "ABOUT", second "Hobbies and Interests", third "References"
    if (idx === 0) el.textContent = data.about.title[lang];
    else if (idx === 1) el.textContent = lang === 'en' ? "Hobbies and Interests" : "興趣與嗜好"; // Add to JSON if you want
    else if (idx === 2) el.textContent = lang === 'en' ? "References" : "推薦信"; // Add to JSON if you want
  });

  // ABOUT BIO PARAGRAPHS (6 paragraphs)
  const aboutBioParagraphs = document.querySelectorAll('#about-section .about_bio p');
  if (aboutBioParagraphs.length === data.about.bio.length) {
    aboutBioParagraphs.forEach((p, i) => {
      p.innerHTML = data.about.bio[i][lang]; // use innerHTML to preserve links like <a>
    });
  }

  // ABOUT HOBBIES LIST
  const aboutHobbies = document.querySelectorAll('#about-section .about_hobby-list li.about_hobby');
  if (aboutHobbies.length === data.about.hobbies_interests.length) {
    aboutHobbies.forEach((li, i) => {
      li.textContent = data.about.hobbies_interests[i][lang];
    });
  }

  // REFERENCES
  document.querySelectorAll('#about-section .about_ref-name').forEach((el, i) => {
    if (data.about.references[i]) {
      el.textContent = data.about.references[i].name;
    }
  });

  document.querySelectorAll('#about-section .about_reference p').forEach((el, i) => {
    if (data.about.references[i]) {
      el.textContent = data.about.references[i].statement[lang];
    }
  });

  // CONTACT SECTION TITLES
  document.querySelectorAll('#contact-section .contact_title').forEach((el, i) => {
    if (i === 0) el.textContent = data.contact.title[lang];      // CONTACT ME
    else if (i === 1) el.textContent = data.contact.follow[lang]; // FOLLOW ME
  });

  const contactResumeTitle = document.querySelector('#contact_resume .contact_resume-title');
  if (contactResumeTitle) contactResumeTitle.textContent = data.contact.resume[lang];

  // Change the text of language toggle button
  const langToggleBtn = document.getElementById('language-toggle');
  if (langToggleBtn) {
    langToggleBtn.textContent = lang === 'en' ? '你好!' : 'Hi!';
  }
}

// Language toggle event
document.getElementById('language-toggle').addEventListener('click', () => {
  currentLang = currentLang === 'en' ? 'zh' : 'en';
  localStorage.setItem('lang', currentLang);
  fetchTranslations();
});

// On page load
document.addEventListener('DOMContentLoaded', () => {
  fetchTranslations();
});

