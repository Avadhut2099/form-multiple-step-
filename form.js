const prevBtns = document.querySelectorAll(".btn-prev");
const nextBtns = document.querySelectorAll(".btn-next");
const progress = document.getElementById("progress");
const formSteps = document.querySelectorAll(".form-step");
const progressSteps = document.querySelectorAll(".progress-step");
const btnComplete = document.querySelector(".btn-complete");
const inputs = document.querySelectorAll("input");

const experiencesGroup = document.querySelector(".experiences-group");
const addExperienceBtn = document.querySelector(".add-exp-btn");

const addSocialLinkBtn = document.querySelector(".add-sl-btn");
const socialLinksContainer = document.querySelector(".add-solical-links");

let formStepIndex = 0;
let experienceCount = 1;
let isSocialLinksAdded = false;

// Update Form Steps
const updateFormSteps = () => {
  formSteps.forEach((step) => step.classList.remove("active"));
  formSteps[formStepIndex].classList.add("active");
};

// Update Progress Bar
const updateProgressBar = () => {
  progressSteps.forEach((step, idx) => {
    step.classList.toggle("active", idx <= formStepIndex);
  });

  const progressActive =
    document.querySelectorAll(".progress-step.active").length - 1;
  progress.style.width = `${
    (progressActive / (progressSteps.length - 1)) * 100
  }%`;
};

// Next and Previous Buttons
nextBtns.forEach((btn) =>
  btn.addEventListener("click", () => {
    if (formStepIndex < formSteps.length - 1) {
      formStepIndex++;
      updateFormSteps();
      updateProgressBar();
    }
  })
);

prevBtns.forEach((btn) =>
  btn.addEventListener("click", () => {
    if (formStepIndex > 0) {
      formStepIndex--;
      updateFormSteps();
      updateProgressBar();
    }
  })
);

// Add Experience Section
addExperienceBtn.addEventListener("click", () => {
  experienceCount++;
  const experienceHTML = `
    <h3>Experience</h3>
    <div class="experience-item">
        ${generateInputField("Company Name", "company-name[]")}
        ${generateInputField("Position", "position[]")}
        ${generateInputField("Start Date", "start-date[]", "date")}
        ${generateInputField("End Date", "end-date[]", "date")}
        ${generateInputField("Salary", "salary[]")}
        ${generateTextareaField("Job Description", "job-description[]")}
    </div>`;
  experiencesGroup.insertAdjacentHTML("beforeend", experienceHTML);
});

// Add or Remove Social Links
addSocialLinkBtn.addEventListener("click", () => {
  if (!isSocialLinksAdded) {
    socialLinksContainer.innerHTML = generateSocialLinksHTML();
    addSocialLinkBtn.textContent = " - Remove Social Links";
  } else {
    socialLinksContainer.innerHTML = generateContactFieldsHTML();
    addSocialLinkBtn.textContent = " + Add Social Links";
  }
  isSocialLinksAdded = !isSocialLinksAdded;
});

// File Preview
function previewFile() {
  const fileInput = document.getElementById("fileInput");
  const previewImage = document.getElementById("previewImage");

  if (fileInput.files.length > 0) {
    previewImage.classList.add("Uplode-img");
    previewImage.src = URL.createObjectURL(fileInput.files[0]);
  }
}

// Form Submission Handling
btnComplete.addEventListener("click", () => {
  document.querySelector("form").innerHTML = `
    <center>
        <h2>Thank You for Submitting</h2>
        <img src="./submit.gif" class="submitchecked">
    </center>`;

  setTimeout(() => {
    window.location.href = "form.html";
  }, 3000);
});

// Functions
function generateInputField(label, name, type = "text") {
  return `
    <div class="input-group">
        <label for="${name}">${label}</label>
        <input type="${type}" name="${name}" id="${name}">
    </div>`;
}

function generateTextareaField(label, name) {
  return `
    <div class="input-group">
        <label for="${name}">${label}</label>
        <textarea name="${name}" id="${name}" cols="42" rows="6"></textarea>
    </div>`;
}

function generateSocialLinksHTML() {
  return `
    <h3>Social Links</h3>
    <div class="solical-item">
        ${generateSocialInputField("LinkedIn", "linkedin", "linkedin.com/in/")}
        ${generateSocialInputField("Twitter", "twitter", "twitter.com/")}
        ${generateSocialInputField("Github", "github", "github.com/")}
    </div>`;
}

function generateSocialInputField(label, name, prefix) {
  return `
    <div class="input-group">
        <label for="${name}">${label}</label>
        <div class="input-box">
            <span class="prefix">${prefix}</span>
            <input id="${name}" name="${name}" type="text" placeholder="USER123">
        </div>
    </div>`;
}

function generateContactFieldsHTML() {
  return `
    <div class="add-solical-links">
        <div class="experience-item">
            ${generateInputField("Email", "email", "email")}
            ${generateInputField("Phone Number", "phone", "tel")}
            ${generateInputField("Address", "address")}
        </div>
    </div>`;
}
