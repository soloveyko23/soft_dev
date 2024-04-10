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


let slideUp = (target, duration=500) => {
  target.style.transitionProperty = 'height, margin, padding';
  target.style.transitionDuration = duration + 'ms';
  target.style.boxSizing = 'border-box';
  target.style.height = target.offsetHeight + 'px';
  target.offsetHeight;
  target.style.overflow = 'hidden';
  target.style.height = 0;
  target.style.paddingTop = 0;
  target.style.paddingBottom = 0;
  target.style.marginTop = 0;
  target.style.marginBottom = 0;
  window.setTimeout( () => {
    target.style.display = 'none';
    target.style.removeProperty('height');
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    target.style.removeProperty('overflow');
    target.style.removeProperty('transition-duration');
    target.style.removeProperty('transition-property');
    //alert("!");
  }, duration);
}

let slideDown = (target, duration=500) => {
  target.style.removeProperty('display');
  let display = window.getComputedStyle(target).display;

  if (display === 'none')
    display = 'block';

  target.style.display = display;
  let height = target.offsetHeight;
  target.style.overflow = 'hidden';
  target.style.height = 0;
  target.style.paddingTop = 0;
  target.style.paddingBottom = 0;
  target.style.marginTop = 0;
  target.style.marginBottom = 0;
  target.offsetHeight;
  target.style.boxSizing = 'border-box';
  target.style.transitionProperty = "height, margin, padding";
  target.style.transitionDuration = duration + 'ms';
  target.style.height = height + 'px';
  target.style.removeProperty('padding-top');
  target.style.removeProperty('padding-bottom');
  target.style.removeProperty('margin-top');
  target.style.removeProperty('margin-bottom');
  window.setTimeout( () => {
    target.style.removeProperty('height');
    target.style.removeProperty('overflow');
    target.style.removeProperty('transition-duration');
    target.style.removeProperty('transition-property');
  }, duration);
}
 let slideToggle = (target, duration = 500) => {
  if (window.getComputedStyle(target).display === 'none') {
    return slideDown(target, duration);
  } else {
    return slideUp(target, duration);
  }
}
 
// ====  

let speedAnimation = 400;
let targetId = document.getElementById("target");
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

document.addEventListener("DOMContentLoaded", function() {
  var imageView = document.getElementById('view-image');
  var currentSrc = imageView.getAttribute('src');
  var map = document.getElementById('map');
  var backgroundImage = document.getElementById('background-image');
  if (currentSrc === 'img/widget-pic-real.jpg') {
    map.classList.remove('background-image');
    map.classList.add('hidden');
    backgroundImage.classList.remove('hidden');
  } else {
    map.classList.add('background-image');
    map.classList.remove('hidden');
    backgroundImage.classList.add('hidden');
  }
});

document.querySelector('.switch-view').addEventListener('click', function(event) {
  event.preventDefault(); // Prevent default action of anchor tag
  var imageView = document.getElementById('view-image');
  var currentSrc = imageView.getAttribute('src');
  var newSrc = currentSrc === 'img/widget-pic-real.jpg' ? 'img/widget-pic-other.jpg' : 'img/widget-pic-real.jpg';
  imageView.setAttribute('src', newSrc);

  var map = document.getElementById('map');
  var backgroundImage = document.getElementById('background-image');
  if (newSrc === 'img/widget-pic-real.jpg') {
    map.classList.remove('background-image');
    map.classList.add('hidden');
    backgroundImage.classList.remove('hidden');
  } else {
    map.classList.add('background-image');
    map.classList.remove('hidden');
    backgroundImage.classList.add('hidden');
  }
});

// =========== old

//   document.getElementById("triggerUp").addEventListener('click', function() {
//   slideUp(document.getElementById("target"), 400);
// });
//   document.getElementById("triggerDown").addEventListener('click', function() {
//   slideDown(document.getElementById("target"), 400);
// });
//   document.getElementById("triggerToggle").addEventListener('click', function() {
//   slideToggle(document.getElementById("target"), 400);
// });

document.addEventListener("DOMContentLoaded", () => {
  const hideButton = document.querySelector('.hide-widgets');
  const footer = document.querySelector('.view-screen__footer');
  
  hideButton.addEventListener('click', () => {
    hideButton.classList.toggle('active');
    footer.classList.toggle('hidden');
  });
});

let timerDisplay = document.getElementById('timer');
let startBtn = document.querySelector('.start-btn');
let pauseBtn = document.querySelector('.pause-btn');
let stopBtn = document.querySelector('.stop-btn');
let timerInterval;
let timeInSeconds = 0;

function startTimer() {
    timerInterval = setInterval(function() {
        timeInSeconds++;
        updateTimerDisplay();
    }, 1000);

    startBtn.classList.add('hidden');
    pauseBtn.classList.remove('hidden');
}

function pauseTimer() {
    clearInterval(timerInterval);
    startBtn.classList.remove('hidden');
    pauseBtn.classList.add('hidden');
}

function stopTimer() {
    clearInterval(timerInterval);
    timeInSeconds = 0;
    updateTimerDisplay();
    startBtn.classList.remove('hidden');
    pauseBtn.classList.add('hidden');
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
stopBtn.addEventListener('click', stopTimer);

initializeSlider();
removeAlertBlocks();
moveDividerForMenu();
testCompass();