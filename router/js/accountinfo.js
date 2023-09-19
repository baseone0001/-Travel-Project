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

