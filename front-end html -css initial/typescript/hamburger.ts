const navLinks = document.querySelector('.nav-links') as HTMLElement;

function showMenu(): void {
    navLinks.style.right = "0";
}

function hideMenu(): void {
    navLinks.style.right = "-200px";
}