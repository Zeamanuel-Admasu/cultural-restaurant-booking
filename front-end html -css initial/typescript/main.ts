function validateForm(event: Event) {
    event.preventDefault();

    const nameInput = document.getElementById("name") as HTMLInputElement;
    const emailInput = document.getElementById("email") as HTMLInputElement;
    const messageInput = document.getElementById("message") as HTMLInputElement;

    const name = nameInput.value;
    const email = emailInput.value;
    const message = messageInput.value;

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

