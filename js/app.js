/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

/**
 * Define Global Variables
 *
 */
// counter to specify attributes and number of section
let counter = 0;
const addSection = () => {
  counter++;
  const content = `<section id="section${counter}" data-nav="Section ${counter}">
    <div class="landing__container">
    <h2>Section ${counter}</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.</p>
    
    <p>Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.</p>
    </div>
    </section>`;
  document.querySelector("main").insertAdjacentHTML("beforeend", content);
};

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
// get nav ul elemnt
const navList = document.getElementById("navbar__list");
const addNavLi = () => {
  navList.innerHTML = "";
  document.querySelectorAll("section").forEach((section) => {
    const lists = `<li><a href="#${section.id}" data-nav="${section.id}" class="menu__link">${section.dataset.nav}</a></li>`;
    navList.insertAdjacentHTML("beforeend", lists);
  });
};

// Add class 'active' to section when near top of viewport

const observeSections = () => {
  const observer = new IntersectionObserver(
    function (pages) {
      pages.forEach((page) => {
        console.log(page);
        let activeLink = navList.querySelector(`[data-nav=${page.target.id}]`);
        if (page.isIntersecting) {
          page.target.classList.add("your-active-class");
          activeLink.classList.add("active-link");
          location.hash = `${page.target.id}`;
        } else {
          entry.target.classList.remove("your-active-class");
          activeLink.classList.remove("active-link");
        }
      });
    },
    // options //
    {
      threshold: 0.5,
    }
  );
  return document.querySelectorAll("section").forEach((section) => {
    observer.observe(section);
  });
};
// Scroll to anchor ID using scrollTO event
window.onscroll = function () {
  document.querySelectorAll("section").forEach(function (active) {
    let activeLink = navList.querySelector(`[data-nav=${active.id}]`);
    if (
      active.getBoundingClientRect().top >= -300 &&
      active.getBoundingClientRect().top <= 150
    ) {
      active.classList.add("your-active-class");
      activeLink.classList.add("active-link");
    } else {
      active.classList.remove("your-active-class");
      activeLink.classList.remove("active-link");
    }
  });
};
/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu

// create four-section dynamically
// create them links
// ability to observe sections

for (let i = 1; i < 5; i++) {
  addSection();
}
addNavLi();

// Scroll to section on link click
let btn = document.getElementById("btn");
btn.addEventListener("click", function () {
  addSection();
  addNavLi();
  observeSections();
});
// Set sections as active

// buttum used to go to the top

let toTop = document.getElementById("to-top");
toTop.addEventListener("click", () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});

// hide the top buttum when we at the top

// hide navbar while we are no scroll
const header = document.querySelector(".page__header");
let isScrolling;
document.onscroll = () => {
  header.style.display = "block";
  clearTimeout(isScrolling);
  isScrolling = setTimeout(() => {
    header.style.display = "none";
  }, 5000);
  if (window.scrollY > 800) {
    toTop.style.display = "block";
  } else {
    toTop.style.display = "none";
  }
};
