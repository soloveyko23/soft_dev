//libraries like jquery etc
'use strict';

const removeAlertBlocks = () => {
  const items = document.querySelectorAll('.alert-block .alert-block__row');
  items.forEach(item => {
    const btnClose = item.querySelector('[data-close]');
    btnClose.addEventListener('click', () => {
      item.style.opacity = '0';
      item.style.transform = 'translateX(-100%)';
      setTimeout(() => {
        item.remove();
      }, 300);
    });
  });
}
document.addEventListener("DOMContentLoaded", function() {
  const links = document.querySelectorAll(".menu-navbar ul.list > li");
  const divider = document.querySelector(".menu-navbar .divider");
  const navbarRect = document.querySelector(".menu-navbar-wrapper").getBoundingClientRect();
  const navbarPaddingLeft = parseFloat(window.getComputedStyle(document.querySelector(".menu-navbar-wrapper")).paddingLeft);

  links.forEach(function(link) {
    link.addEventListener("click", function() {
      // Убираем класс "active" у всех ссылок
      links.forEach(function(otherLink) {
        otherLink.classList.remove("active");
      });

      // Добавляем класс "active" к текущей ссылке
      link.classList.add("active");

      // Обновляем позицию дивайдера
      updateDividerPosition(link);
    });

    link.addEventListener("mouseenter", function() {
      // Обновляем позицию дивайдера при ховере на ссылку
      updateDividerPosition(link);
    });
  });

  function updateDividerPosition(link) {
    const linkRect = link.getBoundingClientRect();
    const linkCenter = linkRect.left - navbarRect.left - navbarPaddingLeft + linkRect.width / 2; // Учесть позицию относительно .menu-navbar без учета паддинга
    const dividerWidth = divider.offsetWidth / 2;
    const translateXValue = linkCenter - dividerWidth;
    divider.style.transform = `translateX(${translateXValue}px)`;
    divider.style.width = `${linkRect.width}px`;
  }

  // Обработчик события клика на документ для удаления класса "active" у всех ссылок при клике вне блока меню
  document.addEventListener("click", function(event) {
    const menuNavbar = document.querySelector(".menu-navbar-wrapper");
    if (!menuNavbar.contains(event.target)) {
      // Убираем класс "active" у всех ссылок
      links.forEach(function(link) {
        link.classList.remove("active");
      });
    }
  });
});




const compassInput = document.getElementById('compassInput');
const compassLimb = document.querySelector('.compass-limb');
const directionLabel = document.getElementById('directionLabel');

compassInput.addEventListener('input', function() {
  const rotation = this.value;
  document.querySelector('.compass p').textContent = `${rotation}°`;
  compassLimb.style.transform = `rotate(${rotation}deg)`;

  let direction;
  if (rotation >= 0 && rotation < 45) {
    direction = 'N';
  } else if (rotation >= 45 && rotation < 90) {
    direction = 'NE';
  } else if (rotation >= 90 && rotation < 135) {
    direction = 'E';
  } else if (rotation >= 135 && rotation < 180) {
    direction = 'SE';
  } else if (rotation >= 180 && rotation < 225) {
    direction = 'S';
  } else if (rotation >= 225 && rotation < 270) {
    direction = 'SW';
  } else if (rotation >= 270 && rotation < 315) {
    direction = 'W';
  } else if (rotation >= 315 && rotation < 360) {
    direction = 'NW';
  } else {
    direction = 'N';
  }

  directionLabel.textContent = direction;
});






removeAlertBlocks();