document.addEventListener('DOMContentLoaded', function () {
    const toggleBtn = document.getElementById('theme-toggle-btn');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;

    // Check for saved user preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'light') {
        body.classList.add('light-theme');
        if (themeIcon) {
            themeIcon.classList.remove('ion-ios-sunny');
            themeIcon.classList.add('ion-ios-moon');
        }
    }

    if (toggleBtn) {
        toggleBtn.addEventListener('click', function () {
            body.classList.toggle('light-theme');

            if (body.classList.contains('light-theme')) {
                if (themeIcon) {
                    themeIcon.classList.remove('ion-ios-sunny');
                    themeIcon.classList.add('ion-ios-moon');
                }
                localStorage.setItem('theme', 'light');
            } else {
                if (themeIcon) {
                    themeIcon.classList.remove('ion-ios-moon');
                    themeIcon.classList.add('ion-ios-sunny');
                }
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    // Restore Backspace Navigation Shortcut
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Backspace') {
            const inputs = ['INPUT', 'TEXTAREA'];
            if (!inputs.includes(document.activeElement.tagName)) {
                window.history.back();
            }
        }
    });

});
