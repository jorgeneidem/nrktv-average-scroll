require('intersection-observer');

import {$,jQuery} from 'jquery';
// export for others scripts to use
window.$ = $;
window.jQuery = jQuery;

document.body.style.backgroundColor = '#aca322';

function getAverageColor(image) {  
    var averageColor = new FastAverageColor();
    var newColor = averageColor.getColor(image);
    return newColor;
  }
  
  function LightenDarkenColor(col,amt) {
    var usePound = false;
    if ( col[0] == "#" ) {
        col = col.slice(1);
        usePound = true;
    }
    var num = parseInt(col,16);
    var r = (num >> 16) + amt;
    if ( r > 255 ) r = 255;
    else if  (r < 0) r = 0;
    var b = ((num >> 8) & 0x00FF) + amt;
    if ( b > 255 ) b = 255;
    else if  (b < 0) b = 0;
    var g = (num & 0x0000FF) + amt;
    if ( g > 255 ) g = 255;
    else if  ( g < 0 ) g = 0;
    return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
  }

  // If there is a wrappolini, generate content
if(document.getElementById('wrappolini'))
{
  var wrappis = document.getElementById('wrappolini');
  
  var step;
  for (step = 203; step > 100; step--) {
    var newDiv = document.createElement('div');
    wrappis.appendChild(newDiv);
    newDiv.setAttribute('class', 'content content-generated');
    newDiv.innerHTML += '<div class="text-grid-area"><p class="hero-text">Du vil ikke tro hva som skjer her</p></div><div class="image-grid-area"><img class="animate-me" id="image-' + step + '" src="assets/images/scrape/' + step + '.jpg"/></div>';
  }
}

  const myImgs = document.querySelectorAll('.animate-me');

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
          if (entry.intersectionRatio > 0) {
              console.log(entry.target, 'in the view, ratio ', entry.intersectionRatio);
              var avgColor = getAverageColor(entry.target);
              var newBgColor = avgColor.hex;
              document.body.style.backgroundColor = newBgColor;
              var darkAvgColor = LightenDarkenColor(newBgColor, -120);
              var lightAvgColor = LightenDarkenColor(newBgColor, 150);
              document.body.style.color = avgColor.isDark ? lightAvgColor : darkAvgColor;
              console.log('newBgColor is ', newBgColor);
          } else {
              //console.log(entry.target.id, 'out of view');
          }
      });
    });
  
    myImgs.forEach(image => {
      console.log(' now running observer.observe(image);');
      observer.observe(image);
    });


    