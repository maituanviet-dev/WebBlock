function extractDomain(url) {
  if (!url) return false;
  const urlObject = new URL(url);
  const domain = urlObject.host;
  return domain;
}

window.onload = () => {
  $('.set-current-url').click(() => {
    chrome.tabs.query({ active: true, windowId: chrome.windows.WINDOW_ID_CURRENT }, (tabs) => {
      const url = tabs[0].url;
      if (!url || url.startsWith('chrome')) return;
      $('#input-selected-url').val(tabs[0].url);
      const domain = extractDomain(url);
      $('#domain').text(domain);
    });
  });

  $('#save-button').click(() => {
    $('#selected-url').one('submit', () => {
      const selectedUrl = $('#input-selected-url').val();
      if (!selectedUrl) return;
      let blockAllPages = false;
      if ($('#indicator').is(':checked')) blockAllPages = true;
      chrome.storage.local.get(['blockedUrls', 'pincode'], (storage) => {
        if (!storage) return;
        const blockedUrls = storage.blockedUrls;
        blockedUrls[selectedUrl] = { blockAllPages };
        chrome.storage.local.set({ blockedUrls });
        if (!storage.pincode) chrome.runtime.openOptionsPage();
      });
    });
  });

  $('#settings').click(() => {
    chrome.storage.local.get('pincode', (storage) => {
      if (!storage.pincode) {
        chrome.tabs.create({ url: '/p/settings/settings.html' });
      } else {
        chrome.tabs.create({ url: '/p/access/access.html' });
      }
    });
  });
};
console.log('Hoang Tuan')