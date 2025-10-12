(function () {
      const v = document.getElementById('vLine');
      const h = document.getElementById('hLine');
      const dot = document.getElementById('dot');
      const tracer = document.getElementById('tracer');

      // Toggle to show/hide the small dot at cursor center
      dot.style.display = 'block';

      // If you want smoothing/lag, enable this and adjust 'ease' and 'fpsLimit'
      const useSmoothing = false;
      let targetX = 0, targetY = 0;
      let curX = 0, curY = 0;
      const ease = 0.22; // smaller = smoother/laggier
      let rafId = null;

      function moveInstant(x, y) {
        // position vertical line at x, horizontal line at y, dot at (x,y)
        v.style.left = x + 'px';
        h.style.top  = y + 'px';
        dot.style.left = x + 'px';
        dot.style.top  = y + 'px';
      }

      function animate() {
        // smooth toward target
        curX += (targetX - curX) * ease;
        curY += (targetY - curY) * ease;
        moveInstant(Math.round(curX), Math.round(curY));
        rafId = requestAnimationFrame(animate);
      }

      // mouse move handler
      function onMove(e) {
        const x = e.clientX;
        const y = e.clientY;
        targetX = x;
        targetY = y;
        if (!useSmoothing) {
          moveInstant(x, y);
        } else if (!rafId) {
          rafId = requestAnimationFrame(animate);
        }
      }

      // when mouse leaves the window, you might want to hide tracer or leave it where it last was
      function onLeave() {
        // optional: hide lines when leaving viewport/mouse out
        // v.style.opacity = 0.15;
        // h.style.opacity = 0.15;
        // dot.style.opacity = 0.15;
      }
      function onEnter() {
        // v.style.opacity = 1;
        // h.style.opacity = 1;
        // dot.style.opacity = 1;
      }

      // Attach listeners to body (or window) as requested
      document.body.addEventListener('mousemove', onMove, { passive: true });
      document.body.addEventListener('mouseleave', onLeave);
      document.body.addEventListener('mouseenter', onEnter);

      // For touch devices, map the first touch to cursor (optional)
      document.body.addEventListener('touchmove', function (ev) {
        if (ev.touches && ev.touches.length) {
          const t = ev.touches[0];
          onMove({ clientX: t.clientX, clientY: t.clientY });
        }
      }, { passive: true });

      // Initialize center position
      const centerX = Math.round(window.innerWidth / 2);
      const centerY = Math.round(window.innerHeight / 2);
      moveInstant(centerX, centerY);
      targetX = curX = centerX;
      targetY = curY = centerY;

      // Clean up on unload (not strictly necessary in single page)
      window.addEventListener('beforeunload', function () {
        cancelAnimationFrame(rafId);
      });
    })();




// Smooth scroll navigation for top and footer links
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll('.top-link, .top-li');

  navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      const text = link.textContent.toUpperCase();

      // Prevent page reload
      event.preventDefault();

      let targetSection;

      if (text.includes("HOME")) {
        targetSection = document.querySelector(".hero-wrap");
      } else if (text.includes("ABOUT")) {
        targetSection = document.querySelector(".about-container");
      } else if (text.includes("WORKS")) {
        targetSection = document.querySelector(".playbook-section");
      }

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });

// Scroll back to Home section when clicking nav-btn2
document.addEventListener("DOMContentLoaded", () => {
  const homeButton = document.querySelector(".nav-btn2");
  const homeSection = document.querySelector(".hero-wrap");

  if (homeButton && homeSection) {
    homeButton.addEventListener("click", () => {
      homeSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  }
});

  // Scroll back to top button
  const scrollTopBtn = document.querySelector(".nav-btn2");
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }
});