function singo() {
    const buywindow = document.getElementById('singobuy');
    const over = document.getElementById('over')
    const singoclosebtn = document.querySelector('.singoclosebtn');
    const singoclosebtn2 = document.querySelector('.singoclosebtn2');
    const singoclosebtn3 = document.querySelector('.singoclosebtn3');
    const singoenterbtn = document.getElementById('singoenterbtn');
    if (buywindow && over && singoclosebtn) {
        buywindow.style.display = 'block';
        over.style.display = 'block';
        singoclosebtn.addEventListener('click', closebtnclick1);
        over.addEventListener('click', closebtnclick1);
    }
    if (singoclosebtn2) {
        singoclosebtn2.addEventListener('click', function () {
            const singobuytwo = document.getElementById('singobuytwo');
            if (singobuytwo) {
                singobuytwo.style.display = 'none';
            }
        })
    }
    if (singoenterbtn) {
        singoenterbtn.addEventListener('click', function () {
            alert("成功!")
        })
    }
    if (singoclosebtn3) {
        singoclosebtn3.addEventListener('click', function () {
            const singobuythree = document.getElementById('singobuythree');
            if (singobuythree) {
                singobuythree.style.display = 'none';
            }
        });
    }
}

function closebtnclick1() {
    const buywindow = document.getElementById('singobuy');
    const over = document.getElementById('over');
    buywindow.style.display = 'none';
    over.style.display = 'none';
}

const singoiconbtn1 = document.getElementById('singoiconbtn1');
singoiconbtn1.addEventListener('click', function () {
    const buywindow = document.getElementById('singobuy');
    const over = document.getElementById('over');

    if (buywindow && over) {
        buywindow.style.display = 'none';
        over.style.display = 'none';
        const singobuytwo = document.getElementById('singobuytwo');
        if (singobuytwo) {
            singobuytwo.style.display = 'block';
        }
    }
})

const singoiconbtn2 = document.getElementById('singoiconbtn2');
singoiconbtn2.addEventListener('click', function () {
    const buywindow = document.getElementById('singobuy');
    const over = document.getElementById('over');
    if (buywindow && over) {
        buywindow.style.display = 'none';
        over.style.display = 'none';
        const singobuythree = document.getElementById('singobuythree');
        if (singobuythree) {
            singobuythree.style.display = 'block';
        }
    }
})

const singono = document.getElementById('singono');
singono.addEventListener('click', function () {
    const buywindow = document.getElementById('singobuy');
    const over = document.getElementById('over');
    buywindow.style.display = 'none';
    over.style.display = 'none';
})