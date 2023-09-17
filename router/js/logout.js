document.addEventListener('DOMContentLoaded', function () {
    const logoutbtn = document.querySelectorAll('.btnlogout');
    
    logoutbtn.forEach(function (logoutbtns) {
        logoutbtns.addEventListener('click', function (event) {
            event.preventDefault();

            fetch('/logout', {
                method: 'POST',
                credentials: 'same-origin'
            })
                .then(response => {
                    if (response.status === 200) {
                        window.location.href = '/login';
                    } else {
                        console.error('註銷失敗');
                    }
                })

                .catch(error => {
                    console.error('註銷失敗', error)
                })
        })
    })
})