const button = document.querySelector('.glowy-button');

button.addEventListener('mousemove', (e) => {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    button.style.setProperty('--x', `${x}px`);
    button.style.setProperty('--y', `${y}px`);
    button.style.setProperty('background', `radial-gradient(circle at ${x}px ${y}px, rgba(255, 0, 90, 0.75), transparent)`);
});

button.addEventListener('mouseleave', () => {
    button.style.setProperty('background', `#222`);
});
