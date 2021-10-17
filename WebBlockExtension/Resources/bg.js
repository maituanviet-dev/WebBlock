var deny = [ ], allow = [ ], checking = false, success = 0, un_success = 0;
chrome.tabs.onCreated.addListener(checkTab);
chrome.tabs.onUpdated.addListener(checkTab);
function checkTab(tab, info, s_tab)
{
	if (checking) return false;
	if (localStorage["save"]) deny = localStorage["save"].split(/\n|,/gi);
	if (deny.length < 1) return false;
	var url = (typeof tab != "number" ? tab : info).url || s_tab.url;
	if ((deny.indexOf(url) != -1 || deny.indexOf((url.match(/\/\/(?:www\.)?(.+\..+)\//i) || [ "null" ])[1]) != -1) && allow.indexOf(url) == -1 && allow.indexOf((url.match(/\/\/(?:www\.)?(.+\..+)\//i) || [ "null" ])[1]) == -1)
	{
		checking = true;
		chrome.tabs.executeScript((typeof tab != "number" ? tab.id : tab), { code: "prompt('Enter the password to enter this site:');", runAt: "document_start" }, function(res) {
			chrome.tabs.get(typeof tab == "number" ? tab : tab.id, function(this_tab) {
				if (typeof this_tab == "undefined") return false;
				if ((res || [ "null" ])[0] == localStorage['pass'])
				{
					allow.push((url.match(/\/\/(?:www\.)?(.+\..+)\//i) || [ "null" ])[1]);
					success++;
					checking = false;
				}
				else
				{
					chrome.tabs.remove(this_tab.id, function() {
						checking = false;
					});
					un_success++;
				}
			});
		});
	}
}
function reset()
{
	deny = [];
	allow = [];
	checking = false;
	success = 0;
	un_success = 0;
	//localStorage.removeItem("pass");
}
function getLogins()
{
	return [ success, un_success ];
}
