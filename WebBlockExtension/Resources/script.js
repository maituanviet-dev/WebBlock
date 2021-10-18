var pressed = false, normal_page = "";
window.onload = function() {
	if (localStorage['pass'])
	{
		normal_page = document.body.innerHTML;
		document.body.innerHTML = ` <div id="passView">
        <div>
            <input type="password" id="pass_to_pass" placeholder="Type password here">
            <input type="submit" id="button_to_pass" value="GO">
        </div>
        <input type="submit" id="turn" value="RELOAD SESSION" title="Resets current session" style="margin-top: 20px;">
    </div>`;
		document.body.style.textAlign = "center";
		document.getElementById("turn").onclick = function() {
			chrome.extension.getBackgroundPage().reset();
			this.value = "DONE!";
			setTimeout(window.close, 750);
		};
		document.getElementById("button_to_pass").onclick = function() {
			if (document.getElementById("pass_to_pass").value != localStorage['pass'])
			{
				document.getElementById("pass_to_pass").style.background = "red";
				window.close();
				return false;
			}
			passToPage();
			return false;
		};
	} else passToPage()
};
function checkPress()
{
	if (!pressed) return false;
	var ps = document.getElementById("pass");
	ps.disabled = false;
	ps.value = localStorage['pass'];
}
function passToPage()
{
	document.body.style.textAlign = "left";
	if (!document.getElementById("pass"))
		document.body.innerHTML = normal_page;
	// var logins = chrome.extension.getBackgroundPage().getLogins();
	// document.getElementById("success").innerHTML = logins[0];
	// document.getElementById("un_success").innerHTML = logins[1];
	if (localStorage['save'])
		document.getElementById("text").value = localStorage['save'];
	document.getElementById("pass").value = localStorage['pass'] || "";
	document.getElementById("pass").value = localStorage['pass'] || "";
	document.getElementById("turn").onclick = function() {
		chrome.extension.getBackgroundPage().reset();
		this.value = "DONE!";
		setTimeout(window.close, 750);
	};
	document.getElementById("save").onclick = function() {
		localStorage['save'] = document.getElementById("text").value;
		if (document.getElementById("pass").value != "HIDDEN") localStorage['pass'] = document.getElementById("pass").value;
		this.value = "SAVED!";
	};
	return true;
}
