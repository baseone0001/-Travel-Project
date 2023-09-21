const btnLogin = document.querySelector(".btnlogin");
btnLogin.addEventListener("click", async () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.status === 200) {
            const data = await response.json();
            if (data.success) {
                // 登入成功，可能在這裡處理重定向或其他操作
                console.log("登入成功");
                window.history.back();

            } else {
                // 登入失敗，處理錯誤訊息
                console.error("登入失敗", data.message);
            }
        } else {
            // 請求失敗，處理錯誤
            alert("帳號或密碼錯誤")
            console.error("請求失敗");
        }
    } catch (error) {
        // 網路錯誤或其他錯誤處理
        console.error("發生錯誤", error);
    }
});
