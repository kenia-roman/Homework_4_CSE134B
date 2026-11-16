
console.log("JavaScript is connected!");

const form = document.querySelector("#contact-form");

const email = document.querySelector("#email");
const name = document.querySelector("#name");
const msg = document.querySelector("#msg");

const errorMessage = document.querySelector("#error-message");
const infoMessage = document.querySelector("#info-message");

const nameError = document.querySelector("#name-error");
const emailError = document.querySelector("#email-error");
const commentError = document.querySelector("#comment-error");

const formErrorsInput = document.querySelector("#form-errors");

const form_errors = [];

const edited = {
    name: false,
    email: false,
    msg: false
};

const showError = {
    name: false,
    email: false,
    msg: false
};

let submitted = false;



function validateEmail() {
    email.setCustomValidity("");

    if (email.validity.valueMissing) {
        email.setCustomValidity(
            "Please enter an email address."
        );
    }
    else if (email.validity.typeMismatch) {
        email.setCustomValidity(
            "Please enter a valid email address."
        );
    }
}

function validateName() {
    name.setCustomValidity("");

    if (name.validity.valueMissing) {
        name.setCustomValidity(
            "Please enter your name."
        );
    }
    else if (name.validity.tooShort) {
        name.setCustomValidity(
            "Your name is too short."
        );
    }
}

function validateComment() {
    msg.setCustomValidity("");

    if (msg.validity.valueMissing) {
        msg.setCustomValidity(
            "Please enter a comment."
        );
    }
    else if (msg.validity.tooShort) {
        msg.setCustomValidity(
            "Comment must be a minimum of 10 characters."
        );
    }
}

function validateAll() {
    validateName();
    validateEmail();
    validateComment();
}


function displayErrors() {
    const errors = [];

    if (showError.name && !name.validity.valid) {
        nameError.textContent = name.validationMessage;
        errors.push("Name: " + name.validationMessage);
    } else {
        nameError.textContent = "";
    }

    if (showError.email && !email.validity.valid) {
        emailError.textContent = email.validationMessage;
        errors.push("Email: " + email.validationMessage);
    } else {
        emailError.textContent = "";
    }

    if (showError.msg && !msg.validity.valid) {
        commentError.textContent = msg.validationMessage;
        errors.push("Comments: " + msg.validationMessage);
    } else {
        commentError.textContent = "";
    }
    if (submitted && errors.length > 0) {
    errorMessage.textContent =
        "Please correct the errors above before submitting.";
    } 
    else {
    errorMessage.textContent = "";
}

    errorMessage.textContent = errors.join(" | ");
}



name.addEventListener("input", function() {
    edited.name = true;
    validateName();

    if (showError.name || submitted) {
        displayErrors();
    }
});

name.addEventListener("blur", function() {
    if (edited.name) {
        showError.name = true;
        validateName();
        displayErrors();
    }
});

email.addEventListener("input", function() {
    edited.email = true;
    validateEmail();

    if (showError.email || submitted) {
        displayErrors();
    }
});

email.addEventListener("blur", function() {
    if (edited.email) {
        showError.email = true;
        validateEmail();
        displayErrors();
    }
});

msg.addEventListener("input", function() {
    edited.msg = true;
    validateComment();
    updateCharacterCount();

    if (showError.msg || submitted) {
        displayErrors();
    }
});

msg.addEventListener("blur", function() {
    if (edited.msg) {
        showError.msg = true;
        validateComment();
        displayErrors();
    }
});



function updateCharacterCount() {
    const maxLength = msg.maxLength;
    const remaining = maxLength - msg.value.length;

    infoMessage.classList.remove(
        "warning",
        "limit-reached"
    );

    if (remaining === 0) {
        infoMessage.textContent =
            "Character limit reached.";

        infoMessage.classList.add("limit-reached");
    }
    else if (remaining <= 100) {
        infoMessage.textContent =
            "Warning: Only " + remaining +
            " characters remaining.";

        infoMessage.classList.add("warning");
    }
    else {
        infoMessage.textContent =
            remaining + " characters remaining.";
    }
}

infoMessage.hidden = false;
updateCharacterCount();


function recordErrors() {
    const fields = [
        { element: name, field: "name" },
        { element: email, field: "email" },
        { element: msg, field: "comments" }
    ];

    fields.forEach(function(item) {
        if (!item.element.validity.valid) {
            form_errors.push({
                field: item.field,
                message: item.element.validationMessage
            });
        }
    });
}


form.noValidate = true;

form.addEventListener("submit", function(event) {
    submitted = true;

    showError.name = true;
    showError.email = true;
    showError.msg = true;

    validateAll();
    displayErrors();

    if (!name.validity.valid ||
        !email.validity.valid ||
        !msg.validity.valid) {

        event.preventDefault();

        recordErrors();
        return;
    }

    formErrorsInput.value = JSON.stringify(form_errors);

});
