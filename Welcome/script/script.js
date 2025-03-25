var iframe_cv = document.querySelector("iframe");
var div_cv_btn = document.querySelector("#div_cv_btn");


// Detect CV button clicked
div_cv_btn.addEventListener("click", (event) => {
    event.stopPropagation();
    iframe_cv.style.display = "block";
} );



// Detect a click outside the CV iframe (when displayed) to close it
window.addEventListener("click", () => {
    if (iframe_cv.style.display === "block") {
        iframe_cv.style.display = "none";
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