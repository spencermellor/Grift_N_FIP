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
    }


    // Process mail when send mail request
    function processMail(event) {
        // block the default submit behaviour
        event.preventDefault();

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
    }

    // Add event listener for submitting mail request
    mailSubmit.addEventListener("click", processMail);
})();
