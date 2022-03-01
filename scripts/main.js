/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.querySelector("#nav-menu");
const navToggle = document.querySelector("#nav-toggle");
const navClose = document.querySelector("#nav-close");

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (navToggle) {
	let myTimeout1;
	// navToggle.addEventListener("click", () => {
	// 	navMenu.classList.add("show-menu");
	// });
	navToggle.addEventListener("mouseenter", () => {
		myTimeout1 = setTimeout(() => {
			navMenu.classList.add("show-menu");
		}, 1000);
	});
	navToggle.addEventListener("mouseleave", () => {
		clearTimeout(myTimeout1);
	});
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if (navClose) {
	let myTimeout2;
	navClose.addEventListener("click", () => {
		navMenu.classList.remove("show-menu");
	});
	navClose.addEventListener("mouseenter", () => {
		myTimeout2 = setTimeout(() => {
			navMenu.classList.remove("show-menu");
		}, 1000);
	});
	navClose.addEventListener("mouseleave", () => {
		clearTimeout(myTimeout2);
	});
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLinks = document.querySelectorAll(".nav__link");

function linkAction() {
	const navMenu = document.querySelector("#nav-menu");
	navMenu.classList.remove("show-menu");
}
navLinks.forEach((navLink) => navLink.addEventListener("click", linkAction));

/*==================== ACCORDION SKILLS ====================*/
const skillsContent = document.getElementsByClassName("skills__content");
const skillsHeaders = document.querySelectorAll(".skills__header");

function toggleSkills() {
	let itemClass = this.parentNode.className;

	for (let i = 0; i < skillsContent.length; i++) {
		skillsContent[i].className = "skills__content skills__close";
	}

	if (itemClass === "skills__content skills__close") {
		this.parentNode.className = "skills__content skills__open";
	}
}

skillsHeaders.forEach((skillsHeader) => skillsHeader.addEventListener("click", toggleSkills));

/*==================== QUALIFICATION TABS ====================*/
const qualificationTabs = document.querySelectorAll("[data-target]");
const qualificationTabContents = document.querySelectorAll("[data-content]");

qualificationTabs.forEach((qualificationTab) => {
	qualificationTab.addEventListener("click", () => {
		const target = document.querySelector(qualificationTab.dataset.target);

		qualificationTabContents.forEach((qualificationTabContent) => {
			qualificationTabContent.classList.remove("qualification__active");
		});

		target.classList.add("qualification__active");

		qualificationTabs.forEach((qualificationTab) => {
			qualificationTab.classList.remove("qualification__active");
		});

		qualificationTab.classList.add("qualification__active");
	});
});

/*==================== SERVICES MODAL ====================*/
const modalViews = document.querySelectorAll(".services__modal");
const modalButtons = document.querySelectorAll(".services__button");
const modalCloses = document.querySelectorAll(".services__modal-close");

let modal = (modalClick) => {
	modalViews[modalClick].classList.add("active-modal");
};

modalButtons.forEach((modalButton, index) => {
	modalButton.addEventListener("click", () => {
		modal(index);
	});
});

modalCloses.forEach((modalClose) => {
	modalClose.addEventListener("click", () => {
		modalViews.forEach((modalView) => {
			modalView.classList.remove("active-modal");
		});
	});
});

/*==================== PORTFOLIO SWIPER  ====================*/
let swiperPortfolio = new Swiper(".portfolio__container", {
	cssMode: true,
	loop: true,
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
	pagination: {
		el: ".swiper-pagination",
		clickable: true,
	},
	mousewheel: true,
	keyboard: true,
});

/*==================== TESTIMONIAL ====================*/
let swiperTestimonial = new Swiper(".testimonial__container", {
	loop: true,
	grabCursor: true,
	spaceBetween: 48,
	pagination: {
		el: ".swiper-pagination",
		clickable: true,
		dynamicBullets: true,
	},
	mousewheel: true,
	keyboard: true,
	breakpoints: {
		568: {
			slidesPerView: 2,
		},
	},
});

/*==================== CONTACT FORM ====================*/
const contactForm = document.querySelector("#contact__form");
contactForm.addEventListener("submit", () => {
	setTimeout(() => {
		contactForm.reset();
	}, 0);
});

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
	const scrollY = window.scrollY;

	sections.forEach((section) => {
		const sectionHeight = section.offsetHeight;
		const sectionTop = section.offsetTop - 50;
		const sectionId = section.getAttribute("id");

		if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
			document
				.querySelector(".nav__menu a[href*=" + sectionId + "]")
				.classList.add("active-link");
		} else {
			document
				.querySelector(".nav__menu a[href*=" + sectionId + "]")
				.classList.remove("active-link");
		}
	});
}

window.addEventListener("scroll", scrollActive);

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader() {
	const nav = document.getElementById("header");
	if (this.scrollY >= 80) {
		nav.classList.add("scroll-header");
	} else {
		nav.classList.remove("scroll-header");
	}
}

window.addEventListener("scroll", scrollHeader);

/*==================== SHOW SCROLL UP ====================*/
function scrollUp() {
	const scrollUp = document.getElementById("scroll-up");
	if (this.scrollY >= 630) {
		scrollUp.classList.add("show-scroll");
	} else {
		scrollUp.classList.remove("show-scroll");
	}
}

window.addEventListener("scroll", scrollUp);

/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "uil-sun";

const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

const getCurrentTheme = () => (document.body.classList.contains(darkTheme) ? "dark" : "light");
const getCurrentIcon = () => (themeButton.classList.contains(iconTheme) ? "uil-moon" : "uil-sun");

if (selectedTheme) {
	document.body.classList[selectedTheme === "dark" ? "add" : "remove"](darkTheme);
	themeButton.classList[selectedIcon === "uil-moon" ? "add" : "remove"](iconTheme);
}

themeButton.addEventListener("click", () => {
	document.body.classList.toggle(darkTheme);
	themeButton.classList.toggle(iconTheme);
	localStorage.setItem("selected-theme", getCurrentTheme());
	localStorage.setItem("selected-icon", getCurrentIcon());
});

/*==================== Home Subtitle Typewriter Effect ====================*/
var TxtType = function (el, toRotate, period) {
	this.toRotate = toRotate;
	this.el = el;
	this.loopNum = 0;
	this.period = parseInt(period, 10) || 2000;
	this.txt = "";
	this.tick();
	this.isDeleting = false;
};

TxtType.prototype.tick = function () {
	var i = this.loopNum % this.toRotate.length;
	var fullTxt = this.toRotate[i];

	if (this.isDeleting) {
		this.txt = fullTxt.substring(0, this.txt.length - 1);
	} else {
		this.txt = fullTxt.substring(0, this.txt.length + 1);
	}

	this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

	var that = this;
	var delta = 100 - Math.random() * 100;

	if (this.isDeleting) {
		delta /= 2;
	}

	if (!this.isDeleting && this.txt === fullTxt) {
		delta = this.period;
		this.isDeleting = true;
	} else if (this.isDeleting && this.txt === "") {
		this.isDeleting = false;
		this.loopNum++;
		delta = 500;
	}

	setTimeout(function () {
		that.tick();
	}, delta);
};

window.onload = function () {
	var elements = document.getElementsByClassName("typewrite");
	for (var i = 0; i < elements.length; i++) {
		var toRotate = elements[i].getAttribute("data-type");
		var period = elements[i].getAttribute("data-period");
		if (toRotate) {
			new TxtType(elements[i], JSON.parse(toRotate), period);
		}
	}
	// INJECT CSS
	var css = document.createElement("style");
	css.type = "text/css";
	css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
	document.body.appendChild(css);
};
