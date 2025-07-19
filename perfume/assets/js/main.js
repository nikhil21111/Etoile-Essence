// 🚀 Initialize Lenis Smooth Scroll on DOM Ready
window.addEventListener("DOMContentLoaded", (event) => {
  const lenis = new Lenis({ resize: true });

  // 🎯 Smooth scrolling loop using requestAnimationFrame
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  // 🧭 Scroll to Target Element on Click (using data-target attribute)
  const scrollButtons = document.querySelectorAll('[data-target]');

  scrollButtons.forEach(button => {
    button.addEventListener('click', e => {
      e.preventDefault();
      const target = button.dataset.target;
      const $el = document.getElementById(target.replace('#', ''));

      // 🔁 Trigger smooth scroll to the target element
      lenis.scrollTo($el, {
        offset: 0,
        immediate: false,
        duration: 1,
        easing: (x) =>
          x < 0.5
            ? 4 * x * x * x
            : 1 - Math.pow(-2 * x + 2, 3) / 2, // Cubic ease
      });
    });
  });

  requestAnimationFrame(raf);
});


// 🟢 GSAP Scroll Animations Start Here
gsap.registerPlugin(ScrollTrigger);
let master = gsap.timeline();

// 📱 Responsive ScrollTrigger Animations
ScrollTrigger.matchMedia({
  // ===============================
  // 🌐 Desktop View Animations (min-width: 1025px)
  // ===============================
  "(min-width: 1025px)": function () {
    
    // ✨ Section 1: Hero Section Animations
    let section1 = () => {
      // 🔄 Fade out hero content and scale
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.hero-section',
          start: "-10% -10%",
          end: "10% 10%",
          scrub: true,
          duration: 5,
          ease: "power1.out",
        }
      });
      tl.to(".content-wrapper .hero-content", {
        scale: 0,
        opacity: 0
      }, 1);

      // 📦 Animate perfume image and reveal about section
      const t2 = gsap.timeline({
        scrollTrigger: {
          trigger: '.hero-section',
          start: "5% 5%",
          end: "25% 15%",
          scrub: true,
          duration: 5,
          ease: "power1.out",
        }
      });
      t2.to(".perfume-mockup img", {
        y: '-20%',
        width: '18vw'
      });
      t2.to(".about-wrapper", {
        opacity: 1,
        delay: 0.4
      });
    }

    // ✨ Section 2: Feature Section Animations
    let section2 = () => {
      // 🪄 Move perfume mockup out of view
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.feature-section',
          start: "-50% 50%",
          end: "50% bottom",
          scrub: true,
          duration: 5,
          ease: "power1.out",
        }
      });
      tl.to(".perfume-mockup img", {
        y: '117%',
        x: '-150%'
      });

      // 🧩 Animate each feature box from right with stagger
      const t2 = gsap.timeline({
        scrollTrigger: {
          trigger: '.feature-section',
          start: "-60% 50%",
          end: "62% bottom",
          scrub: true,
          duration: 5,
          ease: "power1.out",
        }
      });
      t2.from(".feature-box", {
        x: "100%",
        opacity: 0,
        stagger: 0.2,
      });
    }

    // ✨ Section 4: Conclusion Background Animation
    let section4 = () => {
      const tl1 = gsap.timeline({
        scrollTrigger: {
          trigger: '.conclusion',
          start: "10% 95%",
          end: "90% 100%",
          scrub: 1,
        }
      });
      tl1.to(".conclusion .content-wrapper", {
        backgroundSize: '100%'
      });
    }

    // 🧠 Add all sections to master timeline
    master.add(section1).add(section2).add(section4);
  },

  // ===============================
  // 📱 Mobile & Tablet View Animations (max-width: 991px)
  // ===============================
  "(max-width: 991px)": function () {

    // 📍 Section 1: Mobile Hero Animations
    let section1 = () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.hero-section',
          start: "0% 10%",
          end: "30% 25%",
          scrub: true,
          duration: 5,
          ease: "power1.out",
        }
      });
      tl.to(".content-wrapper .hero-content", {
        scale: 0,
        opacity: 0
      }, 1);
      tl.to(".content-wrapper .element", {
        opacity: 0
      }, 1);

      const t2 = gsap.timeline({
        scrollTrigger: {
          trigger: '.hero-section',
          start: "5% 5%",
          end: "25% 15%",
          scrub: true,
          duration: 5,
          ease: "power1.out",
        }
      });
      t2.to(".perfume-mockup img", {
        width: '250px'
      }, 1);
      t2.to(".about-wrapper", {
        opacity: 1,
        delay: 0.5
      }, 1);
    }

    // 📍 Section 2: Mobile Feature Boxes Animation
    let section2 = () => {
      const t2 = gsap.timeline({
        scrollTrigger: {
          trigger: '.feature-section',
          start: "20% 80%",
          end: "130% 100%",
          scrub: true,
          duration: 5,
          ease: "power1.out",
        }
      });
      t2.from(".feature-box", {
        x: "100%",
        opacity: 0,
        stagger: 0.2,
      });
    }

    // 📍 Section 4: Mobile Conclusion Animation
    let section4 = () => {
      const tl1 = gsap.timeline({
        scrollTrigger: {
          trigger: '.conclusion',
          start: "0% 90%",
          end: "90% 100%",
          scrub: 1,
        }
      });
      tl1.to(".conclusion .content-wrapper", {
        backgroundSize: '100%'
      });
    }

    // 🔗 Add all mobile sections to master timeline
    master.add(section1).add(section2).add(section4);
  }
});
