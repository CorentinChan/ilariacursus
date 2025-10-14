document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('nav a');
  const currentPath = window.location.pathname;
  console.log("url actuel : " + currentPath);
  links.forEach(link => {
    const linkPath = new URL(link.href).pathname;
    if (linkPath === currentPath) {
      link.classList.add('urlActive');
      console.log("url active : " + linkPath);
    } else {
      link.classList.remove('urlActive');
    }
  });
});

signinButton = document.getElementById('signinButton');
signWindow = document.getElementById('signWindow');
overlay = document.getElementById('overlay');

signinButton.addEventListener('click', () => {
  signWindow.style.display = 'block';
  overlay.style.display = 'block';
});

function signinClose() {
  document.getElementById('signWindow').style.display = 'none';
  document.getElementById('overlay').style.display = 'none';
}
