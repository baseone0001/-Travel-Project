
const btnRegister = document.querySelector(".btnregister");
let sex = "";

const sexInputs = document.querySelectorAll('input[name="sex"]');
sexInputs.forEach((sexInput) => {
    sexInput.addEventListener("change", function () {
        if (sexInput.checked) {
            sex = sexInput.value;
        }
    })
})
btnRegister.addEventListener("click", function (event) {
    event.preventDefault();


    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const name = document.getElementById("name").value;
    const identity = document.getElementById("identity").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;

    if (!email || !username || !password || !phone || !name || !identity) {
        console.log("必須填寫所有")
        alert("請填寫所有表格")
        return;
    }
    const regex = /^[A-Z][1-2]\d{8}$/;
    if (!regex.test(identity)) {
        alert("身分證字號格式不正確");
        return;
    }

    const regexphone = /^09\d{8}$/;
    if (!regexphone.test()) {
        alert("手機號碼格式不正確");
        return;
    }
    
    
    const userData = {
        email: email,
        username: username,
        password: password,
        name: name,
        identity: identity,
        phone: phone,
        address: address,
        sex: sex,
    };


    fetch("/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                console.log("OKKK");
                window.location.href = "http://localhost:2407/login";
            } else {
                alert("註冊成功");
            }
        })

        .catch((error) => {
            console.error("出錯", error);
            console.log("出錯拉")
        })


})
document.querySelector(".btnlogin").addEventListener("click", function (event) {
    event.preventDefault();
    window.location.href = "http://localhost:2407/login";
});



document.addEventListener("DOMContentLoaded", function () {
    var identity = document.getElementById('identity');
    var results = document.getElementById('results');

    identity.addEventListener("input", function () {
        var identityid = identity.value;
        var regex = /^[A-Z][1-2]\d{8}$/;
        if (identityid === "") {
            results.innerHTML = "";
        } else if (regex.test(identityid)) {
            results.innerHTML = "";
        } else {
            results.innerHTML = "身份證字號格式不正確"
        }
    })
})

document.addEventListener("DOMContentLoaded", function () {
    var phone = document.getElementById('phone');
    var resultsphone = document.getElementById('resultsphone');
    phone.addEventListener("input", function () {
        var phoneid = phone.value;
        var regexphone = /^09\d{8}$/;
        if (phoneid === "") {
            resultsphone.innerHTML = "";
        } else if (regexphone.test(phoneid)) {
            resultsphone.innerHTML = "";
        } else {
            resultsphone.innerHTML = "手機號碼格式不正確";
        }
    })
})