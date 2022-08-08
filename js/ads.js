$(document).ready(function () {
    console.log("document loaded");
    function areAdsBlocked(callback) {
        var URL = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
        fetch(URL, {
            method: "HEAD",
            mode: "no-cors",
        })
            .then((response) => callback(false)) //Response was received --> ads are NOT blocked
            .catch((error) => callback(true)); //No response           --> ads are blocked
    }
    function checkAdBlocker() {
        areAdsBlocked(function (isBlocked) {
            if (isBlocked) {
                fetch("http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js").catch(() => {
                    let adp_underlay = document.createElement("div");
                    adp_underlay.className = "adp-underlay";
                    document.body.appendChild(adp_underlay);
                    let adp = document.createElement("div");
                    adp.className = "adp";
                    adp.innerHTML = `
      <h3><i class="fa-solid fa-rectangle-ad"></i><span class="tittle">AdBlocker Detected!</span></h3>
      <p>We use advertisements to keep our website online, could you please whitelist our website, thanks!</p>
      <a href="" class="submitBtn">Okay</a>
  `;
                    document.body.appendChild(adp);     
                    adp.querySelector("a").onclick = (e) => {
                        e.preventDefault();
                        if (isBlocked) {
                            console.log("adbloacker=true");
                            alert("Turn off the adblockers!");
                        } else {
                            console.log("adbloacker=false");
                            document.body.removeChild(adp_underlay);
                            document.body.removeChild(adp);
                        }
                    };
                });
            }
        });
    }
    checkAdBlocker();
});
