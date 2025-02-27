// Variables
    // Contact page
        // --Email--
        let emailForm = document.getElementById('email-form');
        let emailIcon = document.querySelector('#email a');
        let formClose = document.getElementById('email-close')
        let submitEmail = document.getElementById('email-submit')
        let emailMe = document.querySelector('#email-me h2')
        let hrLine = document.getElementById('separator');
        let contactMe = document.getElementById('all-contact')
        // ----------------

// Functions
    // Contact page
        // --Email--
        let showEmailForm = function() {
            if (window.matchMedia("(max-width: 768px)").matches) {
                hrLine.style.visibility = 'hidden';
                contactMe.style.visibility = 'hidden';
                emailIcon.style.visibility = 'hidden';
                emailMe.style.visibility = 'hidden';
                emailForm.style.visibility = 'visible';
                emailForm.style.zIndex = '1000'; // Bring to the front
            } else {
                emailIcon.style.visibility = 'hidden';
                emailMe.style.visibility = 'hidden';
                emailForm.style.visibility = 'visible';
            }
        }

        let hideEmailForm = function() {
            emailIcon.style.visibility = 'visible';
            emailMe.style.visibility = 'visible';
            emailForm.style.visibility = 'hidden';

            if (window.matchMedia("(max-width: 768px)").matches) {
                hrLine.style.visibility = 'visible';  // Use display instead of visibility
                contactMe.style.visibility = 'visible';  // Use display instead of visibility
                emailIcon.style.visibility = 'visible';
                emailMe.style.visibility = 'visible';
                emailForm.style.visibility = 'hidden';
                emailForm.style.zIndex = '-1'; 
            } else {
                emailIcon.style.visibility = 'visible';
                emailMe.style.visibility = 'visible';
                emailForm.style.visibility = 'hidden';
            }
        }

        let emailSubmission = function(event) {
            event.preventDefault();

            let senderName = document.getElementById("email-name").value;
            let senderSubject = document.getElementById("email-subject").value;
            let senderMessage = document.getElementById("email-message").value;

            if (!senderName || !senderSubject || !senderMessage) {
                alert("Please fill in all fields.");
                return;
            }
            
            let emailSubject = `${senderSubject} [${senderName}]`;

            let mailtoLink = `mailto:asiah@asiahcrutchfield.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(senderMessage)}`;

            window.location.href = mailtoLink;
        }     
        // ----------------

// Events
    // Contact page
        // --Email--
        emailIcon.onclick = showEmailForm;
        formClose.onclick = hideEmailForm;
        submitEmail.onclick = emailSubmission;
        // ----------------