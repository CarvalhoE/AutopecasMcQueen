/* global bootstrap: false */
'use strict'
(() => {
  const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  tooltipTriggerList.forEach(tooltipTriggerEl => {
    new bootstrap.Tooltip(tooltipTriggerEl)
  })
})()

const currentLocation = location.href;
    const menuItem = document.querySelectorAll('a');
    const menuLength = menuItem.length;
    for(let i = 0; i<menuLength; i++){
        if(menuItem[i].href === currentLocation){
            menuItem[i].className = "nav-link text-white active"
        }
    }