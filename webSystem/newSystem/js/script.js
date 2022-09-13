/* global bootstrap: false */
'use strict'
(() => {
  const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  tooltipTriggerList.forEach(tooltipTriggerEl => {
    new bootstrap.Tooltip(tooltipTriggerEl)
  })
})()

// --------------- //
function loadSelect(endpoint) {
  fetch(`/${endpoint}`).then(res=>res.json()).then(data=>{
    // loop over the data and create markup
    const markup = data.forEach(datum=>`<option>.....`)
    document.querySelector("#departamento").appendChild(markup);
    })
}