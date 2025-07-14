'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const header = document.querySelector('.header')

const footer = document.querySelector('.footer')

const cookie_message = document.createElement('div')

cookie_message.classList.add('cookie-message')

cookie_message.innerHTML = "we will user cookies for better user experince <btn class='btn btn--close-cookie'> Got it </btn>"

footer.append(cookie_message)

document.querySelector('.btn--close-cookie').addEventListener('click', () => cookie_message.remove())

const nav = header.querySelector('.nav')

const nav_links = nav.querySelectorAll('a')
const nav_links_array = Array.from(nav_links).slice(0,3)
 
// nav_links_array.forEach((ele,index) => {
//     ele.addEventListener('click', (e) => {
//         e.preventDefault()
//         document.getElementById(`section--${index+1}`).scrollIntoView({behavior:"smooth"})
//     })
// })

// document.addEventListener("DOMContentLoaded", () => {
//   const navLinks = document.querySelectorAll('.nav__link');

//   navLinks.forEach(link => {
//     link.addEventListener('click', function (e) {
//       e.preventDefault();

//       const href = this.getAttribute('href');
//       if (href.startsWith("#") && href.length > 1) {
//         const targetSection = document.querySelector(href);
//         if (targetSection) {
//           targetSection.scrollIntoView({ behavior: 'smooth' });
//         }
//       }
//     });
//   });
// });

const scrollToButton = document.querySelector('.btn--scroll-to')
scrollToButton.addEventListener('click',function(e){
      const section1 = document.querySelector('#section--1')
      const s1coord = section1.getBoundingClientRect()

      window.scrollTo({
        left: s1coord.left + window.pageXOffset,
        top: s1coord.top + window.pageYOffset,
        behavior: 'smooth'
      })
})

const navLinks = document.querySelector('.nav__links')
navLinks.addEventListener('click', (e) => {
  if (e.target.classList.contains('nav__link')){
    e.preventDefault()
    const href = e.target.getAttribute('href');
    const targetSection = document.querySelector(href);
    targetSection.scrollIntoView({ behavior: 'smooth' });
  }
})

// tabbed switching functionality

const tab_buttons = document.querySelectorAll('.operations__tab')
// console.log(tab_buttons)

const button_container = document.querySelector('.operations__tab-container')
// console.log(button_container)

const operations_tab = document.querySelectorAll('.operations__content')
// console.log(operations_tab)

button_container.addEventListener('click', function(e) {
  const clicked = e.target.closest('.operations__tab')
  if (!clicked) return 

  tab_buttons.forEach(button => button.classList.remove('operations__tab--active'))
  clicked.classList.add('operations__tab--active')

  operations_tab.forEach(tab => tab.classList.remove('operations__content--active'))
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')
})

// const section1 = this.document.querySelector('#section--1')

// // make nav sticky
// window.addEventListener('scroll', function() {
  
//   const initialCoordinate = section1.getBoundingClientRect()

//   if (this.window.scrollY > initialCoordinate.top) {
//     nav.classList.add('sticky')
//   }
//   else {
//     nav.classList.remove('sticky')
//   }
// })

// const observerCallback = (entries, observer) => {
//   entries.forEach(entry => {
//     if (entry.isIntersecting) {
//       console.log("Element is visible");
//     } else {
//       console.log("Element is not visible");
//     }
//   });
// }

// const observerOption = {root: null, threshold: 0.2}

// const observer = new IntersectionObserver(observerCallback, observerOption)
// observer.observe(section1)

// Sticky navigation using intersecting observer

const observerCallback = function(entries) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      nav.classList.add('sticky')
    }
    else {
      nav.classList.remove('sticky')
    }
  })
}
const observer = new IntersectionObserver(observerCallback, {
  root: null,
  threshold: 0
})
observer.observe(header)


//section observer

const allSection = document.querySelectorAll('.section')
const revealSection = function(entries, obserer) {
  entries.forEach(entry => {
    if(!entry.isIntersecting) return 
  entry.target.classList.remove('section--hidden')
  obserer.unobserve(entry.target)
  })

  
}
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15
})

allSection.forEach(function(section) {
  sectionObserver.observe(section)
  section.classList.add('section--hidden')
})

//lazy loading the images

const lazyImages = document.querySelectorAll('img[data-src]')
console.log(lazyImages)

const imageObserverCallback = function(entries, observer) {
  const [entry] = entries
  entry.target.src = entry.target.dataset.src
  entry.target.addEventListener('load', function(){
    entry.target.classList.remove('lazy-img') 
  })
}

const imageObserver = new IntersectionObserver(imageObserverCallback, {
root: null,
threshold: 0,
rootMargin: '-200px'
})

lazyImages.forEach(image => imageObserver.observe(image))

///////////////////////////////////////
// Slider
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      // BUG in v2: This way, we're not keeping track of the current slide when clicking on a slide
      // const { slide } = e.target.dataset;

      curSlide = Number(e.target.dataset.slide);
      goToSlide(curSlide);
      activateDot(curSlide);
    }
  });
};
slider();
