/* =========================================
   REHAB ADEL PORTFOLIO — INTERACTIONS
========================================= */

/* =========================
   MOBILE MENU
========================= */

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");

function closeMenu() {
    if (!navMenu || !menuBtn) return;

    navMenu.classList.remove("show");

    const icon = menuBtn.querySelector("i");

    if (icon) {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    }

    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.setAttribute("aria-label", "Open navigation menu");
}

if (menuBtn && navMenu) {
    menuBtn.addEventListener("click", () => {
        const isOpen = navMenu.classList.toggle("show");
        const icon = menuBtn.querySelector("i");

        if (icon) {
            icon.classList.toggle("fa-bars", !isOpen);
            icon.classList.toggle("fa-xmark", isOpen);
        }

        menuBtn.setAttribute("aria-expanded", String(isOpen));
        menuBtn.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );
    });

    navLinks.forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 850) {
            closeMenu();
        }
    });
}


/* =========================
   TYPING EFFECT
========================= */

const typingText = document.getElementById("typingText");

const roles = [
    "Frontend Developer",
    "AI Developer",
    "Python Developer",
    "UI/UX Designer"
];

let roleIndex = 0;
let characterIndex = 0;
let deleting = false;

function typeEffect() {
    if (!typingText) return;

    const currentRole = roles[roleIndex];

    if (!deleting) {
        typingText.textContent =
            currentRole.substring(0, characterIndex + 1);

        characterIndex++;

        if (characterIndex === currentRole.length) {
            deleting = true;
            setTimeout(typeEffect, 1800);
            return;
        }
    } else {
        typingText.textContent =
            currentRole.substring(0, characterIndex - 1);

        characterIndex--;

        if (characterIndex === 0) {
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }
    }

    setTimeout(typeEffect, deleting ? 50 : 90);
}

if (typingText) {
    typeEffect();
}


/* =========================
   SCROLL REVEAL
========================= */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    entry.target.classList.add("show");
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12 }
    );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
} else {
    revealElements.forEach(element => {
        element.classList.add("visible", "show");
    });
}


/* =========================
   ACTIVE NAVIGATION
========================= */

const sections = document.querySelectorAll("section[id]");

function updateActiveNav() {
    let currentSection = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 160;

        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${currentSection}`
        );
    });
}

window.addEventListener("scroll", updateActiveNav, { passive: true });
updateActiveNav();


/* =========================
   BACK TO TOP
========================= */

const backToTop = document.getElementById("backToTop");

if (backToTop) {
    window.addEventListener(
        "scroll",
        () => {
            backToTop.classList.toggle("show", window.scrollY > 500);
        },
        { passive: true }
    );

    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}


/* =========================
   PROJECT MODAL
========================= */

const projectModal = document.getElementById("projectModal");
const modalClose = document.getElementById("modalClose");
const modalTitle = document.getElementById("modalTitle");
const modalCategory = document.getElementById("modalCategory");
const modalDescription = document.getElementById("modalDescription");
const modalTech = document.getElementById("modalTech");
const modalGithub = document.getElementById("modalGithub");
const modalLive = document.getElementById("modalLive");

const projects = {
    classroom: {
        title: "Smart Classroom Management System",
        category: "IOT / ARDUINO",
        description:
            "An IoT-based smart classroom management system developed using Arduino and sensors. The system monitors classroom occupancy, automates lighting, displays the number of people, and triggers an alert when maximum capacity is exceeded.",
        tech: ["Arduino", "C++", "Sensors", "LCD", "IoT"],
        github: "",
        live: ""
    },

    restaurant: {
        title: "Responsive Restaurant Website",
        category: "WEB DEVELOPMENT",
        description:
            "A modern responsive restaurant website focused on clean UI, intuitive navigation, and a consistent experience across desktop and mobile devices.",
        tech: ["HTML", "CSS", "JavaScript", "Responsive Design"],
        github: "",
        live: ""
    },

    sakany: {
        title: "Sakany — Student Housing Platform",
        category: "UI/UX + WEB",
        description:
            "A student housing platform concept designed to help university students find safer and more affordable accommodation through smart search, roommate matching, identity verification, trusted reviews, electronic contracts, and AI-powered recommendations.",
        tech: ["Figma", "UI/UX", "Web Design", "AI"],
        github: "",
        live: ""
    }
};

function setModalLink(element, url) {
    if (!element) return;

    if (url) {
        element.href = url;
        element.style.display = "inline-flex";
    } else {
        element.removeAttribute("href");
        element.style.display = "none";
    }
}

function openProject(projectId) {
    if (!projectModal) return;

    const project = projects[projectId];

    if (!project) return;

    modalTitle.textContent = project.title;
    modalCategory.textContent = project.category;
    modalDescription.textContent = project.description;

    modalTech.innerHTML = project.tech
        .map(tech => `<span>${tech}</span>`)
        .join("");

    setModalLink(modalGithub, project.github);
    setModalLink(modalLive, project.live);

    projectModal.classList.add("show");
    document.body.style.overflow = "hidden";
}

function closeProject() {
    if (!projectModal) return;

    projectModal.classList.remove("show");
    document.body.style.overflow = "";
}

document.querySelectorAll(".project-btn").forEach(button => {
    button.addEventListener("click", () => {
        openProject(button.dataset.project);
    });
});

if (modalClose) {
    modalClose.addEventListener("click", closeProject);
}

if (projectModal) {
    projectModal.addEventListener("click", event => {
        if (event.target === projectModal) {
            closeProject();
        }
    });
}

document.addEventListener("keydown", event => {
    if (
        event.key === "Escape" &&
        projectModal &&
        projectModal.classList.contains("show")
    ) {
        closeProject();
    }
});


/* =========================
   CURRENT YEAR
========================= */

const currentYear = document.getElementById("currentYear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}
