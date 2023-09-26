function opencheck() {
    const buywindow = document.getElementById('buy');
    const overlay = document.getElementById('overlay');
    const closebtn = document.querySelector('.closebtn');
    const closebtn2 = document.querySelector('.closebtn2');
    const closebtn3 = document.querySelector('.closebtn3');
    const enterbtn = document.getElementById('enterbtn');
    if (buywindow && overlay && closebtn) {
        buywindow.style.display = 'block';
        overlay.style.display = 'block';
        closebtn.addEventListener('click', closebtnclick);
        overlay.addEventListener('click', closebtnclick);
    }
    if (closebtn2) {
        closebtn2.addEventListener('click', function () {
            const buythree = document.getElementById('buythree');
            if (buythree) {
                buythree.style.display = 'none';
            }

        });
    }
    if (enterbtn) {
        enterbtn.addEventListener('click', function () {
            window.location.href = "/logging"
        })
    }

    if (closebtn3) {
        closebtn3.addEventListener('click', function () {
            const buyfour = document.getElementById('buyfour');
            if (buyfour) {
                buyfour.style.display = 'none';
            }
        });

    }

}


function closebtnclick() {
    const buywindow = document.getElementById('buy');
    const overlay = document.getElementById('overlay');
    buywindow.style.display = 'none';
    overlay.style.display = 'none';
}

const iconbtn1 = document.getElementById('iconbtn1');
iconbtn1.addEventListener('click', function () {
    const buywindow = document.getElementById('buy');
    const overlay = document.getElementById('overlay');

    if (buywindow && overlay) {
        buywindow.style.display = 'none';
        overlay.style.display = 'none';
        const buythree = document.getElementById('buythree');
        if (buythree) {
            buythree.style.display = 'block';
        }
    }
});

const iconbtn2 = document.getElementById('iconbtn2');
iconbtn2.addEventListener('click', function () {
    const buywindow = document.getElementById('buy');
    const overlay = document.getElementById('overlay');
    if (buywindow && overlay) {
        buywindow.style.display = 'none';
        overlay.style.display = 'none';
        const buyfour = document.getElementById('buyfour');
        if (buyfour) {
            buyfour.style.display = 'block';
        }
    }
})

const no = document.getElementById('no');
no.addEventListener('click', function () {
    const buywindow = document.getElementById('buy');
    const overlay = document.getElementById('overlay');
    buywindow.style.display = 'none';
    overlay.style.display = 'none';
})


