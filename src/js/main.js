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

const moveDividerForMenu = () => {
  document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll(".menu-navbar ul.list > li");
    const divider = document.querySelector(".menu-navbar .divider");
    const navbarRect = document.querySelector(".menu-navbar-wrapper").getBoundingClientRect();
    const navbarPaddingLeft = parseFloat(window.getComputedStyle(document.querySelector(".menu-navbar-wrapper")).paddingLeft);
  
    links.forEach(function(link) {
      link.addEventListener("click", function() {
        links.forEach(function(otherLink) {
          otherLink.classList.remove("active");
        });
  
        link.classList.add("active");
  
        updateDividerPosition(link);
      });
  
      link.addEventListener("mouseenter", function() {
        updateDividerPosition(link);
      });
    });
  
    function updateDividerPosition(link) {
      const linkRect = link.getBoundingClientRect();
      const linkCenter = linkRect.left - navbarRect.left - navbarPaddingLeft + linkRect.width / 2;
      const dividerWidth = divider.offsetWidth / 2;
      const translateXValue = linkCenter - dividerWidth;
      divider.style.transform = `translateX(${translateXValue}px)`;
      divider.style.width = `${linkRect.width}px`;
    }
  

    document.addEventListener("click", function(event) {
      const menuNavbar = document.querySelector(".menu-navbar-wrapper");
      if (!menuNavbar.contains(event.target)) {
        links.forEach(function(link) {
          link.classList.remove("active");
        });
      }
    });
  });
}

const testCompass = () => {
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
};



const initializeSlider = () => {
  const slider = document.getElementById('speed-range');
  const arrow = document.querySelector('.arrow-speed');
  const speedValue = document.getElementById('speed');

  const incrementButton = document.querySelector('.speedmeter-range-icon');
  let isClickPending = false;

  noUiSlider.create(slider, {
    start: [0],
    direction: 'rtl',
    orientation: "vertical",
    connect: true,
    step: 10,
    pips: {
      mode: 'steps',
      values: [0, 150],
      density: 1,
    },
    range: {
      'min': 0,
      'max': 150,
    }
  });

  slider.noUiSlider.on('update', function (values, handle) {
    const activeValue = parseInt(values[handle]); 
    const pips = document.querySelectorAll('.noUi-value'); 
    pips.forEach(function (pip) {
      const pipValue = parseInt(pip.getAttribute('data-value')); 
      if (pipValue <= activeValue) { 
        pip.classList.add('active'); 
      } else {
        pip.classList.remove('active'); 
      }
    });

    const angle = (activeValue / 150) * (495 - 225) + 225; 
    arrow.style.transform = 'rotate(' + angle + 'deg)';

    const handleElement = document.querySelector('.noUi-handle');
    const ariaValueNow = handleElement.getAttribute('aria-valuenow');
    
    speedValue.textContent = `${parseInt(ariaValueNow)} m/s`;
  });

  incrementButton.addEventListener('click', function() {
    if (!isClickPending) {
      isClickPending = true;
      
      const handleElement = document.querySelector('.noUi-handle');
      const currentValue = parseInt(handleElement.getAttribute('aria-valuenow'));
      const newValue = currentValue + 10;
      slider.noUiSlider.set(newValue);
      isClickPending = false;
    }
  });
};


document.addEventListener("DOMContentLoaded", function() {
  const widgets = document.querySelectorAll('.widget');
  
  widgets.forEach(function(widget) {
    const closeButton = widget.querySelector('.widget-close');
    if (closeButton) {
      closeButton.addEventListener('click', function(event) {
        widget.classList.toggle('hide')
        const widgetBody = widget.querySelector('.widget-body');
        if (widgetBody) {
          slideToggle(widgetBody);
        }
      });
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const hideButton = document.querySelector('.hide-widgets');
  const footer = document.querySelector('.view-screen__footer');
  
  hideButton.addEventListener('click', () => {
    hideButton.classList.toggle('active');
    footer.classList.toggle('hidden');
  });
});

initializeSlider();
removeAlertBlocks();
moveDividerForMenu();
testCompass();