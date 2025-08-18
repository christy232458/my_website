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
  const resume = heroWrapper.querySelector('#quick-resume')
  // original html text
  const ogTagline = Array.from(taglines).map(tagline => tagline.textContent);
  const ogChalkboard = chalkboard.textContent;
  const ogResume = resume.textContent;

async function translateHero(lang) {
  const response = await fetch('translations/hero.json');
  const hero = await response.json();

  if (lang == 'zh') {
    chalkboard.textContent = hero.intro;
    resume.textContent = hero.resume
      taglines.forEach((tagline, i) => {
        tagline.textContent = hero.tagline[i];
      })
  } else {
    chalkboard.textContent = ogChalkboard;
    resume.textContent = ogResume;
      taglines.forEach((tagline, i) => {
        tagline.textContent = ogTagline[i];
      })
  }
}
// ||   ||


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


// ++ SKILLS AND CERTIFICATIONS SECTION ++

// ++   ++


// && ABOUT SECTION &&

// &&   &&

// ## CONTACT SECTION ##

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
})