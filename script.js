/* =========================================================
   MAMA ABIGAIL SMART CLINIC
   Main JavaScript
   Designed by McOwino
   ========================================================= */

"use strict";


/* =========================================================
   1. MOBILE NAVIGATION
   ========================================================= */

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", () => {

        navLinks.classList.toggle("active");

        const icon = menuBtn.querySelector("i");

        if (navLinks.classList.contains("active")) {

            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });


    /* Close menu when a link is clicked */

    navLinks.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");

            const icon = menuBtn.querySelector("i");

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        });

    });


    /* Close menu when clicking outside */

    document.addEventListener("click", event => {

        if (
            !navLinks.contains(event.target) &&
            !menuBtn.contains(event.target)
        ) {

            navLinks.classList.remove("active");

            const icon = menuBtn.querySelector("i");

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });

}


/* =========================================================
   2. HEADER SCROLL EFFECT
   ========================================================= */

const header = document.querySelector("header");

function updateHeader() {

    if (!header) return;

    if (window.scrollY > 30) {

        header.style.boxShadow =
            "0 8px 30px rgba(16, 42, 67, 0.10)";

    } else {

        header.style.boxShadow =
            "0 3px 20px rgba(0, 0, 0, 0.04)";

    }

}

window.addEventListener("scroll", updateHeader);

updateHeader();


/* =========================================================
   3. SCROLL REVEAL ANIMATION
   ========================================================= */

const animatedElements = document.querySelectorAll(
    ".service, .feature, .facility, .departments .grid > div, .testimonial, .about-image, .about-content"
);

if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );


    animatedElements.forEach(element => {

        element.classList.add("scroll-reveal");

        observer.observe(element);

    });

}


/* =========================================================
   4. SMOOTH INTERNAL LINKS
   ========================================================= */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (event) {

        const targetId = this.getAttribute("href");

        if (
            !targetId ||
            targetId === "#"
        ) {
            return;
        }

        const target = document.querySelector(targetId);

        if (target) {

            event.preventDefault();

            const headerHeight =
                header ? header.offsetHeight : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        }

    });

});


/* =========================================================
   5. APPOINTMENT FORM
   ========================================================= */

const appointmentForm =
    document.querySelector(".appointment form");

if (appointmentForm) {

    appointmentForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name =
            appointmentForm.querySelector(
                'input[type="text"]'
            )?.value.trim();

        const phone =
            appointmentForm.querySelector(
                'input[type="tel"]'
            )?.value.trim();

        const department =
            appointmentForm.querySelector(
                "select"
            )?.value;

        const date =
            appointmentForm.querySelector(
                'input[type="date"]'
            )?.value;


        /* Basic validation */

        if (!name || !phone || !department || !date) {

            showNotification(
                "Please complete all required fields.",
                "error"
            );

            return;
        }


        /* Phone validation */

        const phonePattern =
            /^[0-9+\-\s()]{9,20}$/;

        if (!phonePattern.test(phone)) {

            showNotification(
                "Please enter a valid phone number.",
                "error"
            );

            return;
        }


        /* Success */

        showNotification(
            "Your appointment request has been received.",
            "success"
        );

        appointmentForm.reset();

    });

}


/* =========================================================
   6. NOTIFICATION SYSTEM
   ========================================================= */

function showNotification(message, type = "success") {

    /* Remove existing notification */

    const existing =
        document.querySelector(".site-notification");

    if (existing) {
        existing.remove();
    }


    const notification =
        document.createElement("div");

    notification.className =
        `site-notification ${type}`;


    const icon =
        type === "success"
            ? "fa-circle-check"
            : "fa-circle-exclamation";


    notification.innerHTML = `
        <i class="fa-solid ${icon}"></i>
        <span>${escapeHTML(message)}</span>
        <button type="button" aria-label="Close notification">
            <i class="fa-solid fa-xmark"></i>
        </button>
    `;


    document.body.appendChild(notification);


    /* Close button */

    const closeButton =
        notification.querySelector("button");

    closeButton.addEventListener("click", () => {

        notification.classList.add("hide");

        setTimeout(() => {
            notification.remove();
        }, 300);

    });


    /* Animate in */

    requestAnimationFrame(() => {

        notification.classList.add("visible");

    });


    /* Auto remove */

    setTimeout(() => {

        if (notification.parentElement) {

            notification.classList.add("hide");

            setTimeout(() => {

                if (notification.parentElement) {
                    notification.remove();
                }

            }, 300);

        }

    }, 5000);

}


/* =========================================================
   7. ESCAPE HTML
   ========================================================= */

function escapeHTML(value) {

    const div = document.createElement("div");

    div.textContent = value;

    return div.innerHTML;

}


/* =========================================================
   8. SET MINIMUM APPOINTMENT DATE
   ========================================================= */

const dateInput =
    document.querySelector(
        '.appointment input[type="date"]'
    );

if (dateInput) {

    const today = new Date();

    const year =
        today.getFullYear();

    const month =
        String(today.getMonth() + 1)
            .padStart(2, "0");

    const day =
        String(today.getDate())
            .padStart(2, "0");

    const formattedDate =
        `${year}-${month}-${day}`;

    dateInput.min = formattedDate;

}


/* =========================================================
   9. ANIMATED COUNTERS
   ========================================================= */

const counters =
    document.querySelectorAll(
        ".stats h3"
    );

if ("IntersectionObserver" in window && counters.length) {

    const counterObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    const counter =
                        entry.target;

                    animateCounter(counter);

                    counterObserver.unobserve(counter);

                });

            },
            {
                threshold: 0.8
            }
        );


    counters.forEach(counter => {

        counterObserver.observe(counter);

    });

}


function animateCounter(element) {

    const original =
        element.textContent.trim();


    /* Handle values such as 24/7 */

    if (original.includes("/")) {
        return;
    }


    /* Handle values such as 100% */

    const suffix =
        original.includes("%")
            ? "%"
            : original.includes("+")
                ? "+"
                : "";


    const numeric =
        parseInt(
            original.replace(/\D/g, ""),
            10
        );


    if (Number.isNaN(numeric)) {
        return;
    }


    let current = 0;

    const duration = 1200;

    const startTime = performance.now();


    function updateCounter(currentTime) {

        const elapsed =
            currentTime - startTime;

        const progress =
            Math.min(elapsed / duration, 1);


        /* Smooth easing */

        const eased =
            1 - Math.pow(1 - progress, 3);


        current =
            Math.floor(numeric * eased);


        element.textContent =
            current + suffix;


        if (progress < 1) {

            requestAnimationFrame(updateCounter);

        } else {

            element.textContent =
                numeric + suffix;

        }

    }


    requestAnimationFrame(updateCounter);

}


/* =========================================================
   10. CURRENT YEAR
   ========================================================= */

const copyright =
    document.querySelector(".copyright");

if (copyright) {

    const year =
        new Date().getFullYear();

    copyright.innerHTML =
        copyright.innerHTML.replace(
            /©\s*\d{4}/,
            `© ${year}`
        );

}


/* =========================================================
   11. ACTIVE NAVIGATION
   ========================================================= */

const sections =
    document.querySelectorAll("section[id]");

const navigationLinks =
    document.querySelectorAll(
        ".nav-links a"
    );


if (
    "IntersectionObserver" in window &&
    sections.length &&
    navigationLinks.length
) {

    const sectionObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    const id =
                        entry.target.getAttribute("id");


                    navigationLinks.forEach(link => {

                        link.classList.remove("active");

                    });


                    const activeLink =
                        document.querySelector(
                            `.nav-links a[href="#${id}"]`
                        );


                    if (activeLink) {

                        activeLink.classList.add("active");

                    }

                });

            },
            {
                rootMargin:
                    "-35% 0px -55% 0px"
            }
        );


    sections.forEach(section => {

        sectionObserver.observe(section);

    });

}


/* =========================================================
   12. BACK TO TOP BUTTON
   ========================================================= */

const backToTop =
    document.createElement("button");

backToTop.className =
    "back-to-top";

backToTop.type = "button";

backToTop.setAttribute(
    "aria-label",
    "Back to top"
);

backToTop.innerHTML =
    '<i class="fa-solid fa-arrow-up"></i>';

document.body.appendChild(backToTop);


window.addEventListener(
    "scroll",
    () => {

        if (window.scrollY > 500) {

            backToTop.classList.add("visible");

        } else {

            backToTop.classList.remove("visible");

        }

    },
    { passive: true }
);


backToTop.addEventListener(
    "click",
    () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);


/* =========================================================
   13. SERVICE CARD HOVER ACCESSIBILITY
   ========================================================= */

document.querySelectorAll(
    ".service, .feature, .facility"
).forEach(card => {

    card.setAttribute(
        "tabindex",
        "0"
    );

});


/* =========================================================
   14. PREVENT INVALID FORM SUBMISSION
   ========================================================= */

document.querySelectorAll("form").forEach(form => {

    form.addEventListener(
        "invalid",
        event => {

            event.target.classList.add(
                "input-error"
            );

        },
        true
    );


    form.querySelectorAll(
        "input, select, textarea"
    ).forEach(input => {

        input.addEventListener(
            "input",
            () => {

                input.classList.remove(
                    "input-error"
                );

            }
        );

    });

});


/* =========================================================
   15. PAGE LOADING
   ========================================================= */

window.addEventListener(
    "load",
    () => {

        document.body.classList.add(
            "page-loaded"
        );

    }
);


/* =========================================================
   16. EXTRA DYNAMIC CSS
   ========================================================= */

const dynamicStyles =
    document.createElement("style");

dynamicStyles.textContent = `

/* Scroll reveal */

.scroll-reveal {

    opacity: 0;

    transform: translateY(30px);

    transition:
        opacity .7s ease,
        transform .7s ease;

}

.scroll-reveal.show {

    opacity: 1;

    transform: translateY(0);

}


/* Navigation active state */

.nav-links a.active {

    color: var(--primary);

}

.nav-links a.active::after {

    width: 100%;

}


/* Notification */

.site-notification {

    position: fixed;

    top: 95px;

    right: 25px;

    z-index: 2000;

    min-width: 300px;

    max-width: 420px;

    padding: 15px 17px;

    display: flex;

    align-items: center;

    gap: 12px;

    background: white;

    border: 1px solid var(--border);

    border-radius: 14px;

    box-shadow:
        0 20px 50px rgba(16,42,67,.16);

    opacity: 0;

    transform: translateX(30px);

    transition: all .3s ease;

}

.site-notification.visible {

    opacity: 1;

    transform: translateX(0);

}

.site-notification.hide {

    opacity: 0;

    transform: translateX(30px);

}

.site-notification.success {

    border-left: 4px solid var(--primary);

}

.site-notification.error {

    border-left: 4px solid #d94b4b;

}

.site-notification > i {

    font-size: 20px;

    color: var(--primary);

}

.site-notification.error > i {

    color: #d94b4b;

}

.site-notification span {

    flex: 1;

    color: var(--dark);

    font-size: 13px;

}

.site-notification button {

    border: none;

    background: transparent;

    color: var(--muted);

    font-size: 15px;

}


/* Back to top */

.back-to-top {

    position: fixed;

    right: 22px;

    bottom: 150px;

    z-index: 990;

    width: 43px;

    height: 43px;

    border: none;

    border-radius: 50%;

    background: var(--dark);

    color: white;

    display: grid;

    place-items: center;

    box-shadow: var(--shadow);

    opacity: 0;

    visibility: hidden;

    transform: translateY(15px);

    transition: all .3s ease;

}

.back-to-top.visible {

    opacity: 1;

    visibility: visible;

    transform: translateY(0);

}

.back-to-top:hover {

    background: var(--primary);

    transform: translateY(-3px);

}


/* Invalid fields */

.input-error {

    border-color: #d94b4b !important;

}


/* Mobile notification */

@media (max-width: 560px) {

    .site-notification {

        left: 15px;

        right: 15px;

        top: 80px;

        min-width: 0;

        max-width: none;

    }

    .back-to-top {

        right: 15px;

        bottom: 130px;

        width: 40px;

        height: 40px;

    }

}

`;

document.head.appendChild(dynamicStyles);


/* =========================================================
   END
   ========================================================= */





/* =================================
   1. Disable Right Click
================================= */
document.addEventListener("contextmenu", e => e.preventDefault());

/* =================================
   2. Disable Copy / Cut / Paste
================================= */
["copy", "cut", "paste", "dragstart"].forEach(evt => {
  document.addEventListener(evt, e => e.preventDefault());
});

/* =================================
   3. Block DevTools Shortcuts
================================= */
document.addEventListener("keydown", function (e) {
  if (
    e.key === "F12" ||
    (e.ctrlKey && e.shiftKey && ["I","J","C"].includes(e.key)) ||
    (e.ctrlKey && e.key === "U")
  ) {
    e.preventDefault();
    return false;
  }
});

/* =================================
   4. DevTools Size Detection
================================= */
setInterval(() => {
  const widthDiff  = window.outerWidth - window.innerWidth;
  const heightDiff = window.outerHeight - window.innerHeight;

  if (widthDiff > 160 || heightDiff > 160) {
    document.body.innerHTML =
      "<h2 style='color:red;margin-top:20%'>Access Denied</h2>";
  }
}, 1000);

/* =================================
   5. Console Open Detection
================================= */
(function () {
  const element = new Image();
  Object.defineProperty(element, "id", {
    get: function () {
      document.body.innerHTML =
        "<h2 style='color:red;margin-top:20%'>Inspection Blocked</h2>";
    }
  });
  console.log(element);
})();

/* =================================
   6. Anti-Debugger Trap
================================= */
setInterval(function () {
  debugger;
}, 2000);

/* =================================
   7. Hide Source via Visibility Change
================================= */
document.addEventListener("visibilitychange", function () {
  if (document.hidden) {
    document.body.style.display = "none";
  } else {
    document.body.style.display = "block";
  }
});

/* =================================
   8. Disable View Source via Mouse
================================= */
document.onmousedown = function (e) {
  if (e.button === 2) return false;
};
