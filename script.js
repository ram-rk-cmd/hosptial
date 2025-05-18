const optionMenus = document.querySelectorAll(".select-menu");

// Event listeners for dropdown menus
optionMenus.forEach((optionMenu) => {
    const selectBtn = optionMenu.querySelector(".select-btn"),
        options = optionMenu.querySelectorAll(".option"),
        sBtn_text = optionMenu.querySelector(".sBtn-text");

    selectBtn.addEventListener("click", () => optionMenu.classList.toggle("active"));

    options.forEach((option) => {
        option.addEventListener("click", () => {
            let selectedOption = option.querySelector(".option-text").innerText;
            sBtn_text.innerText = selectedOption;

            optionMenu.classList.remove("active");
            filterHospitals();  // Call the filter function after selecting an option
        });
    });
});

document.getElementById('arrow').addEventListener('click', function () {
    var container = document.getElementById('speccontainer');
    container.classList.toggle('expanded');
});

// Function to handle spec-logo click
const specLogos = document.querySelectorAll(".spec-logo");

specLogos.forEach((specLogo) => {
    specLogo.addEventListener("click", function () {
        const img = specLogo.querySelector("img");
        const text = specLogo.querySelector("p");

        // Get the destination elements
        const idLogoImg = document.querySelector(".id-logo img");
        const idLogoText = document.querySelector(".id-logo p");

        // Update the image src and text
        idLogoImg.src = img.src;
        idLogoText.innerText = text.innerText;

        // Store the selected data in localStorage
        localStorage.setItem('selectedImageSrc', img.src);
        localStorage.setItem('selectedText', text.innerText);

        filterHospitals();  // Call the filter function after selecting a specialty
    });
});

// Load the stored image and text on page load
window.addEventListener('load', () => {
    const storedImageSrc = localStorage.getItem('selectedImageSrc');
    const storedText = localStorage.getItem('selectedText');

    if (storedImageSrc && storedText) {
        const idLogoImg = document.querySelector(".id-logo img");
        const idLogoText = document.querySelector(".id-logo p");

        idLogoImg.src = storedImageSrc;
        idLogoText.innerText = storedText;
    }
});

// Filter function to filter hospitals based on selections
function filterHospitals() {
    const selectedDistrict=document.querySelector(".select-menu:nth-of-type(1) .sBtn-text").innerText;
    const selectedType=document.querySelector(".select-menu:nth-of-type(2) .sBtn-text").innerText;
    const selectedSpecialty=document.querySelector(".id-logo p").innerText;

    const hospitals=document.querySelectorAll('.container');

    hospitals.forEach(hospital=>{
        const hospitalText=hospital.querySelector('.header h1').innerText.toLowerCase();
        const isInDistrict=selectedDistrict === "Select your District" || hospitalText.includes(selectedDistrict.toLowerCase());
        const isInType=selectedType==="Hospital type"||hospitalText.includes(selectedType.toLowerCase());
        const isInSpecialty = selectedSpecialty===""||hospital.querySelector('.spec-det').innerText.toLowerCase().includes(selectedSpecialty.toLowerCase());

        if (isInDistrict && isInType && isInSpecialty) {
            hospital.style.display = "block";
        } else {
            hospital.style.display = "none";
        }
        if(selectedSpecialty){}
    });
}
