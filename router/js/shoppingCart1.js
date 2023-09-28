const creditCardButtons = document.querySelectorAll(".creditCardButton");
const singobuytwos = document.querySelectorAll(".singobuytwo");
const closeButtonIcons = document.querySelectorAll(".singoclosebtn2");

creditCardButtons.forEach((button, index) => {
    button.addEventListener("click", function () {
        singobuytwos.forEach((singobuytwo) => {
            singobuytwo.style.display = "none";
        })
        singobuytwos[index].style.display = "block";
    })
})

closeButtonIcons.forEach((closeButton, index) => {
    closeButton.addEventListener("click", function () {
        singobuytwos[index].style.display = "none";
    })
})


const remitbutton = document.querySelectorAll(".remitbutton");
const singobuythrees = document.querySelectorAll(".singobuythree");
const singoclosebtn3 = document.querySelectorAll(".singoclosebtn3");


remitbutton.forEach((button, index) => {
    button.addEventListener("click", function () {
        singobuythrees.forEach((singobuythree) => {
            singobuythree.style.display = "none";
        })
        singobuythrees[index].style.display = "block";
    })
})

singoclosebtn3.forEach((closebutton, index) => {
    closebutton.addEventListener("click", function () {
        singobuythrees[index].style.display = "none";
    })
})