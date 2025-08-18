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

// **   **


// ~~ EDUCATION SECTION ~~

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
})