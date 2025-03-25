let body = document.querySelector("body");
let div_cv_btn = document.querySelector("#div_cv_btn");
let section_cv = document.querySelector("#section_cv");
let iframe_cv = document.querySelector("iframe");


// Detect CV button clicked
div_cv_btn.addEventListener("click", (event) => {
    event.stopPropagation();
    section_cv.style.display = "block";
    iframe_cv.style.display = "block";
    body.style.overflowY = "hidden";
} );



// Detect a click outside the CV iframe (when displayed) to close it
window.addEventListener("click", () => {
    if (iframe_cv.style.display === "block") {
        section_cv.style.display = "none";
        iframe_cv.style.display = "none";
        body.style.overflowY = "scroll";
    }
} );
// Prevent the event from bubbling when the CV itself is clicked
// (so the previous eventListener is not triggered)
iframe_cv.addEventListener("click", (event) => {
    event.stopPropagation();
})



// let X = "AAA";

// if (true) {
//     let X = "123";
//     console.log(X);
// }

// console.log(X);