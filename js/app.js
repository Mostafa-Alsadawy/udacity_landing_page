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
const nav = document.getElementById("navbar__list"); // store nav.
const upBtn = document.getElementById("up"); // store up button.
const sections = Array.from(document.getElementsByTagName("section"))// store all the section in array.
let navLinks = []; // make empty array for links to store later after bulding the menu.
let activeSectionIndex = -1; // this is index for visible section of sections array. 
let checked = 0; // this gloable variavble to recursive function (detectSection).
let hideNavId ;

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// this function detect the visible section of the page and store the index of the section on the globle variable activeSectionIndex.
const detectSection = ()=>{
    // make sure not to store wrong index for activeSectionIndex.
    if(activeSectionIndex >=sections.length || activeSectionIndex < 0){
        activeSectionIndex = 0;
    // make sure not enter infinte loop
        if(checked >=sections.length){return;}
    }
    const activePosition = sections[activeSectionIndex].getBoundingClientRect();

    if(activePosition.top < 200 && activePosition.bottom>200){
         return; 
    }
    else {
        checked++;
        activeSectionIndex++;
        // using recursion to find the visible section.
        detectSection();
    }
};

// this function responsible for adding and removing classes.
const toggelActiveClasses=(oldIndex,newIndex)=>{
    // this classes for the up button. add class make css display = block (visible on screen) 
    //, remove class make CSS display = none (remove it from screen).
    if (newIndex === 0){upBtn.classList.add("remove");}
    else{upBtn.classList.replace("remove","add");}

    // adding active classes for the first load of the page
    if(oldIndex < 0){
        sections[newIndex].classList.add("your-active-class");
        navLinks[newIndex].classList.add("active");
    }

    // remove active class form none visible section and add it for the visible one (for navigation link too).
    else{
    sections[oldIndex].classList.remove("your-active-class");
    navLinks[oldIndex].classList.remove("active");
    sections[newIndex].classList.add("your-active-class");
    navLinks[newIndex].classList.add("active");}
};

// this function just remove spaces and make sure the string is lowercase.
const nameToId = (name)=>{
    return name.toLowerCase().split(" ").join("");
};

// these functions are to hide and show nav bar .


    const hideNav = ()=>{
        hideNavId = setTimeout(()=>{
        nav.parentElement.classList.add("remove");
          },500);};

    const showNav = ()=>{
        nav.parentElement.classList.remove("remove");
    };


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
for (const section of sections){
    const listItem = document.createElement("li");
    listItem.innerHTML = `<a  href="#${nameToId(section.dataset.nav)}" class="menu__link">${section.dataset.nav}</a>`;
    nav.appendChild(listItem);
    
    // fill the navLinks array as we will used links alot
    navLinks.push(listItem.children.item(0));
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Add class 'active' to section when near top of viewport 
document.addEventListener("scroll",(e)=>{
    if(hideNavId){clearTimeout(hideNavId);}
    showNav();
    const oldActiveSectionIndex = activeSectionIndex;
    detectSection();
    hideNav();
    if(oldActiveSectionIndex === activeSectionIndex){
    checked = 0;   
     return;}
     else {
         toggelActiveClasses(oldActiveSectionIndex,activeSectionIndex);
     }
});

// Scroll to section on link click
nav.addEventListener("click",(e)=>{
 e.preventDefault();
 sections[e.target.textContent.split(" ")[1] - 1].scrollIntoView({
     behavior:"smooth",
     block:"start"
 });
});

// setup functionality for up button 
upBtn.addEventListener("click",()=>{
    sections[0].scrollIntoView({
        behavior:"smooth",
    });
});