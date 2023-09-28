const btnaccountinfo = document.querySelector('.btnaccountinfo');
btnaccountinfo.addEventListener('click', async () => {

    const name = document.getElementById('name').value;
    const identity = document.getElementById('identity').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    let sex = "";
    const sexInputs = document.querySelectorAll('input[name="sex"]');
    sexInputs.forEach((sexInput) => {
        if (sexInput.checked) {
            sex = sexInput.value;
        }
    })
    if (!email || !phone || !name || !identity || !sex) {
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
        name: name,
        identity: identity,
        phone: phone,
        email: email,
        address: address,
        sex: sex
    };

    try {
        const response = await fetch('/accountinfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (response.status === 200) {
            const data = await response.json();
            if (data.success) {
                console.log('User information updated successfully.');
                alert('修改成功!')
            } else {
                alert('Update failed: ' + data.message);
            }
        } else {
            throw new Error('Request failed');
        }
    } catch (error) {
        console.error('Error:', error);
    }
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

