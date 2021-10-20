window.onload = () => {
  chrome.storage.local.get('pincode', (storage) => {
    if (!storage) return;
    const savedPincode = storage.pincode;
    if (!savedPincode) chrome.tabs.update({ url: '/p/settings/settings.html' });
  });

  $('.acp-pincode-item').on('keydown', (event) => {
    const key = event.keyCode || event.charCode;

    if (key === 8 || key === 46) {
      const target = $(document.activeElement);
      let idx = Number(target.data('idx')) - 1;
      idx = Math.max(idx, 1);
      idx = Math.min(idx, 4);
      target.val('');
      $(`#acp-pincode-item-${idx}`).focus();
    }
  });

  $('.acp-pincode-item').on('input', function () {
    const value = parseInt($(this).val());
    if (!value) return;
    if (value > 9) {
      $(this).val(9);
    } else if (value < 0) {
      $(this).val(0);
    }
    const firstNumber = parseInt($('#acp-pincode-item-1').val());
    const secondNumber = parseInt($('#acp-pincode-item-2').val());
    const thirdNumber = parseInt($('#acp-pincode-item-3').val());
    const fourthNumber = parseInt($('#acp-pincode-item-4').val());

    let idx = Number($(this).data('idx')) + 1;
    idx = Math.max(idx, 1);
    idx = Math.min(idx, 4);
    $(`#acp-pincode-item-${idx}`).focus();

    if (!firstNumber || !secondNumber || !thirdNumber || !fourthNumber) return;
    const pincode = ''.concat(firstNumber, secondNumber, thirdNumber, fourthNumber);
    chrome.storage.local.get('pincode', (storage) => {
      if (!storage) return;
      const savedPincode = storage.pincode;
      if (pincode === savedPincode.toString(10)) {
        chrome.tabs.getCurrent((tab) => {
          chrome.tabs.update(tab.id, { url: '/p/settings/settings.html' });
        });
      }
    });
  });
};
