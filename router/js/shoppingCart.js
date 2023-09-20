// 結帳畫面JS
document.addEventListener('DOMContentLoaded', function () {
    const okbtn = document.querySelector('.okbtn');
    const buywindow = document.getElementById('buythree');
    const buywindow1 = document.getElementById('buyfour');
    const closebtn2 = document.querySelector('.closebtn2');
    const closebtn3 = document.querySelector('.closebtn3');
    let selectedIconId = null;

    document.getElementById('icon1').addEventListener('click', function () {
        selectIcon('icon1');
    });

    document.getElementById('icon2').addEventListener('click', function () {
        selectIcon('icon2');
    });

    function selectIcon(iconId) {
        const icon1 = document.getElementById('icon1');
        const icon2 = document.getElementById('icon2');
        icon1.classList.remove('selected');
        icon2.classList.remove('selected');
        const selectedIcon = document.getElementById(iconId);
        selectedIcon.classList.add('selected');
        selectedIconId = iconId;
    }

    okbtn.addEventListener("click", () => {
        if (!selectedIconId) {
            alert('請選擇一個付款方式');
            return;
        }

        if (selectedIconId === 'icon1') {
            buywindow.style.display = 'block';
        } else if (selectedIconId === 'icon2') {
            buywindow1.style.display = 'block';
        }
    });

    closebtn2.addEventListener("click", () => {
        buywindow.style.display = 'none';
    });
    closebtn3.addEventListener("click", () => {
        buywindow.style.display = 'none';
    });

    window.addEventListener("click", (event) => {
        if (event.target === buywindow) {
            buywindow.style.display = 'none';
        }
    });
});
