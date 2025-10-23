export function customCursor(inputClass, cursorClass) {
    const inputs = document.querySelectorAll(inputClass);

    inputs.forEach(input => {
        const wrapper = input.closest('.input-wrapper');
        const caret = wrapper.querySelector(cursorClass);

        if (!caret) return;

        function updateCaret() {
            // text before caret
            const text = input.value.substring(0, input.selectionStart);

            // measure width of that text
            const span = document.createElement("span");
            span.style.visibility = "hidden";
            span.style.position = "absolute";
            span.style.whiteSpace = "pre";
            span.style.font = window.getComputedStyle(input).font;
            span.textContent = text;
            document.body.appendChild(span);

            const textWidth = span.offsetWidth;
            document.body.removeChild(span);

            // input padding
            const inputStyle = window.getComputedStyle(input);
            const paddingLeft = parseInt(inputStyle.paddingLeft, 20);

            // account for scroll inside input
            const scrollOffset = input.scrollLeft;

            // final caret position
            caret.style.left = (paddingLeft + textWidth - scrollOffset) + "px";
        }

        input.addEventListener("focus", () => {
            caret.style.display = "inline-block";
            updateCaret();
        });

        input.addEventListener("blur", () => {
            caret.style.display = "none";
        });

        ["input", "click", "keyup", "keydown", "scroll"].forEach(evt => {
            input.addEventListener(evt, updateCaret);
        });
    });
}

// hoverWeave.js
export function hoverWeaveEffect(selector, intensity = 20, speed = 0.2) {
  const elements = document.querySelectorAll(selector);

  elements.forEach(el => {
    el.style.transition = `transform ${speed}s ease-out, box-shadow ${speed}s ease-out`;
    el.style.willChange = 'transform, box-shadow';
    el.style.transformOrigin = 'center center';

    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const moveX = ((x - centerX) / centerX) * intensity;
      const moveY = ((y - centerY) / centerY) * intensity;

      el.style.transform = `
        translate(${moveX / 2}px, ${moveY / 2}px)
        rotateX(${moveY / 3}deg)
        rotateY(${-moveX / 3}deg)
        scale(1.1)
      `;
      el.style.boxShadow = `${-moveX / 2}px ${moveY / 2}px 30px rgba(0,0,0,0.25)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translate(0,0) rotateX(0) rotateY(0) scale(1)';
      el.style.boxShadow = '0 0 20px rgba(0,0,0,0.1)';
    });
  });
}