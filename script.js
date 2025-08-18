let defaultLang = 'en';
const languageToggle = document.getElementById('language-toggle');
const toggleOGText = languageToggle.textContent;

// Page name
const titleText = document.title;

function changePageTitle(lang) {
  if (lang == 'en') {
    document.title = titleText; // set back to original
  } else {
    document.title = '陳時慧'
  }
}
// ---

// || HERO PAGE ||
// html text content
const heroWrapper = document.getElementById('hero-section')
  const taglines = heroWrapper.querySelectorAll('.tagline_item')
  const chalkboard = heroWrapper.querySelector('.chalkboard')
    const chalkboardText = document.getElementById('chalkboard-text');
  const resume = heroWrapper.querySelector('#quick-resume')
  // original html text
  const ogTagline = Array.from(taglines).map(tagline => tagline.textContent);
  const ogChalkboard = chalkboard.textContent;
  const ogResume = resume.textContent;

async function translateHero(lang) {
  const response = await fetch('translations/hero.json');
  const hero = await response.json();

  chalkboardText.textContent = lang === 'zh' ? hero.intro : ogChalkboard;
  resume.textContent = lang === 'zh' ? hero.resume : ogResume;
  taglines.forEach((tagline, i) => {
    tagline.textContent = lang === 'zh' ? hero.tagline[i] : ogTagline[i];
  });
}
// ||   ||

// && ABOUT SECTION &&
const bio = document.querySelectorAll('.about_bio p')
const bioTitle = document.querySelector('#about_title')
const ogBioTitle = bioTitle.textContent;
const ogBio = Array.from(bio).map(p => p.innerHTML); // use innerHTML to preserve links)

async function translateBio(lang) {
  const response = await fetch('translations/about/about.json')
  const biography = await response.json()
    const biographyTitle = biography.aboutSectionTitle

  bio.forEach((pEl, index) => {
    if (lang === 'zh') {
      pEl.innerHTML = biography.about.bio[index]?.zh || ogBio[index];
    } else {
      pEl.innerHTML = ogBio[index];
    }
  });
  
  bioTitle.textContent = lang == 'zh'? biographyTitle : ogBioTitle
}

const hobbyTitle = document.querySelector('#hobby-title')
const ogHobbyTitle = hobbyTitle.textContent

async function translateHobbies(lang) {
  const response = await fetch('translations/about/hobbies.json')
  const hobbies = await response.json()
    const hobbyJSON = hobbies.hobbies
  const hobbyList = document.getElementById('about_hobby-list')

  hobbyList.innerHTML = ''

  hobbyJSON.forEach(hobby => {
    const li = document.createElement('li')
    li.textContent = hobby[lang];
    li.classList.add('about_hobby')

    hobbyList.appendChild(li)
  })
  
  hobbyTitle.textContent = lang == 'zh'? hobbies.hobbySectionTitle : ogHobbyTitle
}
translateHobbies(defaultLang)

const refTitle = document.querySelector('#ref-title')
const ogRefTitle = refTitle.textContent

async function translateReferences(lang) {
  const response = await fetch('translations/about/references.json')
  const references = await response.json()
    const refs = references.references
  const template = document.querySelector('#about-template_references')

  const wrapper = document.querySelector('#about_ref-wrapper')
  wrapper.innerHTML = ''

  refs.forEach(ref => {
    const clone = template.content.cloneNode(true)

    // image, name, statement
    clone.querySelector('.about_ref-pic').src = ref.image
    clone.querySelector('.about_ref-name').textContent = ref.name[lang]
    clone.querySelector('.about_reference p').textContent = ref.statement[lang]

    // contacts
    const contactWrapper = clone.querySelector('.about_ref-contact')
    contactWrapper.innerHTML = ''

    ref.contact.forEach(contact => {
      const li = document.createElement('li')
      li.classList.add('about_ref-icon-wrapper')

      const a = document.createElement('a')
      const i = document.createElement('i')

      if (contact.type === 'email') {
        a.href = `mailto:${contact.value}`
        i.className = 'fas fa-envelope'
      } else if (contact.type === 'website') {
        a.href = contact.value
        a.target = '_blank'
        i.className = 'fa-solid fa-globe'
      }

      a.appendChild(i)
      li.appendChild(a)
      contactWrapper.appendChild(li)
    })

    const button = clone.querySelector('.about_see-more')
    const refWrapper = clone.querySelector('.about_reference-wrapper')
    button.addEventListener('click', function() {
      if (refWrapper.style.display === 'none' || refWrapper.style.display === '') {
        refWrapper.style.display = 'flex'
        button.textContent = '-'
      } else {
        refWrapper.style.display = 'none'
        button.textContent = '+'
      }
    })

    wrapper.appendChild(clone)
  })

  refTitle.textContent = lang == 'zh'? references.refSectionTitle : ogRefTitle
}
translateReferences(defaultLang)
// &&   &&

// ** EXPERIENCE SECTION **
const experienceWrapper = document.getElementById('experience-section');
const expSectionTitle = experienceWrapper.querySelector('#experience-title');
const ogExpSectionTitle = expSectionTitle.textContent;

async function translateExperience(lang) {
  const response = await fetch('translations/experience.json');
  const jobs = await response.json();
  const jobsArray = jobs.jobs; // just use the jobs array

  const experienceTemplate = document.querySelector('#exp-template');
  const wrapper = document.querySelector('.exp-container');
  wrapper.innerHTML = ''; // clear previous content

  jobsArray.forEach(job => {
    const clone = experienceTemplate.content.cloneNode(true);

    // elements in the clone
    const dutyButton = clone.querySelector('.exp_see-duties-button');
    const dutyList = clone.querySelector('.exp_duties');
      dutyList.innerHTML = ''

    clone.querySelector('.exp_title').textContent = job.jobTitle;
    clone.querySelector('.exp_position').textContent = job.position;
    clone.querySelector('.exp_start-date').textContent = job.startDate[lang];
    clone.querySelector('.exp_end-date').textContent = job.endDate[lang];
    clone.querySelector('.exp_city').textContent = job.city[lang];
    clone.querySelector('.exp_country').textContent = job.country[lang];
    clone.querySelector('.exp_summary').textContent = job.summary[lang];

    job.duties[lang].forEach(dutyText => {
      const li = document.createElement('li');
      li.classList.add('exp_duty');
      li.textContent = dutyText;
      dutyList.appendChild(li);
    });

    // button toggle for this clone only
    dutyButton.textContent = jobs.experience.show_duties[lang];
    dutyButton.addEventListener('click', function() {
      if (dutyList.style.display === 'none') {
        dutyList.style.display = 'flex';
        dutyButton.textContent = jobs.experience.hide_duties[lang];
      } else {
        dutyList.style.display = 'none';
        dutyButton.textContent = jobs.experience.show_duties[lang];
      }
    });

    wrapper.appendChild(clone);
  });

  // update section title
  expSectionTitle.textContent = lang === 'zh' ? jobs.experience.title : ogExpSectionTitle;
}
// call translation
translateExperience(defaultLang);
// **   **


// ~~ EDUCATION SECTION ~~
const educationWrapper = document.getElementById('education-section');
const eduSectionTitle = educationWrapper.querySelector('#education-title');
const ogEduSectionTitle = eduSectionTitle.textContent;

async function translateEducation(lang) {
  const response = await fetch('translations/education.json');
  const schools = await response.json();
    const eduSchool = schools.schools

  const educationTemplate = document.querySelector('#education-template');
  const wrapper = document.querySelector('.education_container');
  wrapper.innerHTML = ''; // clear previous content

  eduSchool.forEach(school => {
    const clone = educationTemplate.content.cloneNode(true);

    clone.querySelector('.education_school').textContent = school.name[lang];
    clone.querySelector('.education_location').textContent = school.location[lang];
    clone.querySelector('.education_start-date').textContent = school.start;
    clone.querySelector('.education_end-date').textContent = school.end;
    clone.querySelector('.education_degree').textContent = school.degree[lang];

    wrapper.appendChild(clone);
  });

  // update section title
  eduSectionTitle.textContent = lang === 'zh' ? schools.sectionTitle : ogEduSectionTitle;
}
// call translation
translateEducation(defaultLang);
// ~~   ~~


// ++ SKILLS SECTION ++
const skillsSectionTitle = document.querySelector('#skills-title')
const ogSkillsTitle = skillsSectionTitle.textContent;

async function translateSkills(lang) {
  const response = await fetch('translations/skills/skills.json');
  const title = await response.json();

  skillsSectionTitle.textContent = lang == 'zh'? title.skillsSectionTitle : ogSkillsTitle
}

const languageSectionTitle = document.querySelector('.language_title')
const ogLangTitle = languageSectionTitle.textContent;

async function translateLanguage(lang) {
  const response = await fetch('translations/skills/languages.json');
  const languages = await response.json();
    const langs = languages.languages
  const template = document.querySelector('#skills-template_language')

  const langWrapper = document.querySelector('.language-container')
  langWrapper.innerHTML = ''

  langs.forEach(language => {
    const clone = template.content.cloneNode(true)

    clone.querySelector('.language_name').textContent = language.name[lang]
    clone.querySelector('.language_fluency').textContent = language.fluency[lang]
    clone.querySelector('.language_symbol').src = language.image
    const progress = clone.querySelector('.language_progress');

    // Set CSS variables
    progress.style.setProperty('--progress', language.percent); // e.g., 80
    let fluencyColor = 'red';
    if (language.percent >= 90) fluencyColor = 'green';
    else if (language.percent >= 80) fluencyColor = 'yellow';
    else if (language.percent >= 70) fluencyColor = 'orange';
    else if (language.percent >= 60) fluencyColor = 'purple';
    else if (language.percent >= 50) fluencyColor = 'blue';

    // Set CSS variable for color
    progress.style.setProperty('--fluency', fluencyColor);

    langWrapper.appendChild(clone)
  })

  languageSectionTitle.textContent = lang == 'zh'? languages.langSectionTitle : ogLangTitle
}
translateLanguage(defaultLang);

const certSectionTitle = document.querySelector('.cert_title')
const ogCertTitle = certSectionTitle.textContent;

async function translateCerts(lang) {
  const response = await fetch('translations/skills/certifications.json');
  const certifications = await response.json();
    const certs = certifications.certifications
  const template = document.querySelector('#skills-template_certs')

  const certsWrapper = document.querySelector('.certifications-container')
  certsWrapper.innerHTML = ''

  certs.forEach(cert => {
    const clone = template.content.cloneNode(true)

    clone.querySelector('.cert_name').textContent = cert.name[lang]
    // handle file link
    const link = clone.querySelector('a'); // make sure your template has <a> inside
      if (cert.file && link) {
        link.href = cert.file;
        link.style.pointerEvents = 'auto'; // enable click
        link.style.opacity = '1';
      } else if (link) {
        link.removeAttribute('href'); // disable if no file
        link.style.pointerEvents = 'none';
      }

    certsWrapper.appendChild(clone)
  })

  certSectionTitle.textContent = lang == 'zh'? certs.certSectionTitle : ogCertTitle
}
translateCerts(defaultLang)
// ++   ++

const contactTitle = document.querySelector('#contact_email-title')
const socialsTitle = document.querySelector('#socials-title')
const resumeTitle = document.querySelector('#contact_resume-title')
  const ogContactTitle = contactTitle.textContent
  const ogSocialsTitle = socialsTitle.textContent
  const ogResumeTitle = resumeTitle.textContent
// ## CONTACT SECTION ##
async function translateContact(lang) {
  const response = await fetch('translations/contact.json')
  const contact = await response.json()
    const titles = contact.titles

  contactTitle.textContent = lang == 'zh'? titles.email : ogContactTitle
  socialsTitle.textContent = lang == 'zh'? titles.socials : ogSocialsTitle
  resumeTitle.textContent = lang == 'zh'? titles.resume : ogResumeTitle
}
// ##   ##


// Translation function
languageToggle.addEventListener("click", function() {
  if (defaultLang == 'en') {
    defaultLang = 'zh';
    languageToggle.textContent = 'Hi!';
  } else {
    defaultLang = 'en';
    languageToggle.textContent = toggleOGText;
  }

  changePageTitle(defaultLang);
  translateHero(defaultLang)
  translateExperience(defaultLang)
  translateEducation(defaultLang)
  // Skills
  translateSkills(defaultLang)
  translateLanguage(defaultLang)
  translateCerts(defaultLang)
  //---
  // About
  translateBio(defaultLang)
  translateHobbies(defaultLang)
  translateReferences(defaultLang)
  //---
  translateContact(defaultLang)
})