const modal = document.querySelector('.modal')
const buttons = document.querySelectorAll('.button')
const overlay = document.querySelector('.overlay')

const openModal = function () {
    modal.classList.remove('hidden')
    overlay.classList.remove('hidden')
}

const closeModal = function () {
    modal.classList.add('hidden')
    overlay.classList.add('hidden')
}



buttons.forEach(button => {
    console.log('button clicked ')
    button.addEventListener('click', () => openModal())
});
   

   


// close modal

modal.addEventListener('click', () => closeModal())

const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});

document.addEventListener('mousemove', (e) => {
  const dot = document.createElement('div');
  dot.classList.add('trail-dot');
  dot.style.left = `${e.clientX}px`;
  dot.style.top = `${e.clientY}px`;

  document.body.appendChild(dot);

  // Dot will remove itself after animation ends
  setTimeout(() => {
    dot.remove();
  }, 500);
});