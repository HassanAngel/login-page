const body = document.body;
const loginBox = document.getElementById('loginBox');
const themeToggleBtn = document.getElementById('themeToggleBtn');
const colorPanelBtn = document.getElementById('colorPanelBtn');
const themePanel = document.getElementById('themePanel');
const swatches = document.querySelectorAll('.swatch');
const environmentSelect = document.getElementById('environmentSelect');

const applyBorder = document.getElementById('applyBorder');
const applyIcons = document.getElementById('applyIcons');
const applyButton = document.getElementById('applyButton');
const icons = document.querySelectorAll('.ico');
const loginBtn = document.querySelector('.login-btn');

let activeColor = '#00bcd4';

function setEnvironment(environmentClass) {
    body.classList.remove('env-default', 'env-night', 'env-sunset');
    body.classList.add(environmentClass);
}

function applyThemeColor() {
    document.documentElement.style.setProperty('--accent', activeColor);

    loginBox.style.borderColor = applyBorder.checked ? activeColor : 'transparent';

    icons.forEach((icon) => {
        icon.style.color = applyIcons.checked ? activeColor : '';
    });

    loginBtn.style.backgroundColor = applyButton.checked ? activeColor : '';
}

themeToggleBtn.addEventListener('click', () => {
    body.classList.toggle('light');
});

colorPanelBtn.addEventListener('click', () => {
    const isHidden = themePanel.hasAttribute('hidden');
    if (isHidden) {
        themePanel.removeAttribute('hidden');
        colorPanelBtn.setAttribute('aria-expanded', 'true');
        return;
    }

    themePanel.setAttribute('hidden', '');
    colorPanelBtn.setAttribute('aria-expanded', 'false');
});

environmentSelect.addEventListener('change', (event) => {
    setEnvironment(event.target.value);
});

swatches.forEach((swatch) => {
    swatch.addEventListener('click', () => {
        activeColor = swatch.dataset.color;
        swatches.forEach((item) => item.classList.remove('swatch-active'));
        swatch.classList.add('swatch-active');
        applyThemeColor();
    });
});

[applyBorder, applyIcons, applyButton].forEach((toggle) => {
    toggle.addEventListener('change', applyThemeColor);
});

setEnvironment(environmentSelect.value);
applyThemeColor();
