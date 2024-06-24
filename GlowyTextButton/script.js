const button = document.querySelector('.glowy-button');

button.addEventListener('mousemove', (e) => {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    button.style.setProperty('--x', `${x}px`);
    button.style.setProperty('--y', `${y}px`);
});

button.addEventListener('mouseleave', () => {
    button.style.setProperty('--x', `50%`);
    button.style.setProperty('--y', `50%`);
});
