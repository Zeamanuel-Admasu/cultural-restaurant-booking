function validateForm(event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Email validation
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return false;
    }

    // Send email
    const emailBody = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;
    const emailUrl = `mailto:samueltenagne1995@gmail.com?subject=Form Submission&body=${encodeURIComponent(
        emailBody
    )}`;
    window.location.href = emailUrl;
}