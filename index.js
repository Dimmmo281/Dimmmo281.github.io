const bg = document.querySelector('#bg');

addEventListener('touchstart', () => bg.style.setProperty('--multiplier', '0'));
addEventListener('mousemove', ({ clientX, clientY }) => {
    bg.style.setProperty('--tx', `${20 * (clientX - innerWidth / 2) / innerWidth}px`);
    bg.style.setProperty('--ty', `${20 * (clientY - innerHeight / 2) / innerHeight}px`);
});

['mouseenter', 'mouseleave'].forEach(e => document.addEventListener(e, () => {
    if (e === 'mouseleave') {
        bg.style.removeProperty('--tx');
        bg.style.removeProperty('--ty');
        bg.style.transition = 'transform .1s linear';
    }
    setTimeout(() => bg.style.transition = '', 100);
}));

var images = ['/bg1.jpg'];
var randomImage = Math.floor(Math.random() * images.length);
document.querySelector(':root').style.setProperty("--background", "url('/backgrounds/" + images[randomImage] + "')");

//tictic
function showCard(cardName) {
    const akaiyaCard = document.getElementById('akaiyaCard');
    const xikassCard = document.getElementById('xikassCard');
    const rzxCard = document.getElementById('rzxCard');
    const mdCard = document.getElementById('mdCard');

    if (cardName === 'akaiya') {
        akaiyaCard.style.display = 'block';
        xikassCard.style.display = 'none';
    } else if (cardName === 'xikass') {
        xikassCard.style.display = 'block';
        akaiyaCard.style.display = 'none';
    } else if (cardName === 'rzx') {
        rzxCard.style.display = 'block';
        mdCard.style.display = 'none';
    } else if (cardName === 'md') {
        mdCard.style.display = 'block';
        rzxCard.style.display = 'none';
    }
}

// time
function updateTime() {
    const timeElement = document.getElementById('time');

    const now = new Date();

    const options = { timeZone: 'Europe/Moscow', hour12: false };
    const formatter = new Intl.DateTimeFormat('en-US', {
        ...options,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });

    timeElement.textContent = formatter.format(now).replace(/:/g, '.');
}

setInterval(updateTime, 1000);

updateTime();



//link
function redirectToSite(url) {
    window.location.href = url;
}