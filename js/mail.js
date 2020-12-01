import { SendMail } from "./modules/mailer.js";
import { notification } from "./modules/notification.js";

(() => {
    // mail submit button
    let mailSubmit = document.querySelector("#submit");

    // Creates notification using vue.js
    // this object is refered to a lot in the lower parts of the code.

    // Mail Sent
    function processMailFailure(error) {
        // Create error notification and show it
        notification.title = 'Email did NOT send';
        notification.info = error;
        notification.$el.classList.add('notification-error');
        notification.showNotification();
        
    }

    // Mail didnt send
    function processMailSuccess(result) {
        // Creates notification based on if it sent or not.  
        // If it reaches here the server worked but there was something wrong with the request from this side.

        // Sent 
        if (result.sentStatus) {
            notification.title = 'Email sent successfully';
            notification.$el.classList.add('notification-success');
        
        // Did not send
        } else if (!result.sendStatus) {
            notification.title = 'Email did NOT send';
            notification.$el.classList.add('notification-error');
        }

        // Puts message in place and showes it with vue
        notification.info = result.message;
        notification.showNotification();

        // Clears all input forms
        const form = document.querySelector("#mail-form");
        const requiredInputs = form.querySelectorAll("[required]")
        requiredInputs.forEach(input => input.value = '');
    }


    // Process mail when send mail request
    function processMail(event) {
        // block the default submit behaviour
        event.preventDefault();

        const form = document.querySelector("#mail-form");
        const requiredInputs = form.querySelectorAll("[required]")
        let missingMessage = 'Error Please fill out the following fields: '
        requiredInputs.forEach((input) => {
            if (!input.value) {missingMessage += input.name + ', '};
        })  

        // if email has all required items filled out.
        if (missingMessage == 'Error Please fill out the following fields: ') {
            // Google reCAPTCHA check
            grecaptcha.ready(function () {
                grecaptcha
                    .execute("6LcFkPEZAAAAADsfQKAOkuCKdPvwBX00ugDp_f3L", {
                        action: "contactus",
                    })
                    .then(function (token) {
                        // Send request to server
                        SendMail(document.querySelector("#mail-form"), token)
                            .then((data) => processMailSuccess(data))
                            .catch((err) => processMailFailure(err));
                    });
            });

        } else {
            // Removes the last comma and space
            missingMessage = missingMessage.slice(0, -2); 

            // Displays error message
            processMailFailure(missingMessage);
        }
        


    }

    // Add event listener for submitting mail request
    mailSubmit.addEventListener("click", processMail);
})();
