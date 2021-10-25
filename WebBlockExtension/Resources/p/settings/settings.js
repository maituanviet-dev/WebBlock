function setScheduleCss() {
  const scheduleContent = $('.schedule-content');
  if ($('#alwaysBlock').is(':checked')) {
    if (!scheduleContent.hasClass('block-always')) {
      scheduleContent.addClass('block-always');
    }
    $('.time').attr('disabled', true);
    $('.time').val('');

    $('.days').attr('disabled', true);
    $('.days').prop('checked', false);
  } else {
    scheduleContent.removeClass('block-always');
    $('.time').removeAttr('disabled');
    $('.days').removeAttr('disabled');
  }
}

function setUserSettings() {
  chrome.storage.local.get('settings', (storage) => {
    if (!storage) return;
    const settings = storage.settings;
    if (settings.block === 1) {
      $('#alwaysBlock').prop('checked', true);
      setScheduleCss();
    } else if (settings.block === 2) {
      $('#schedule').prop('checked', true);
      setScheduleCss();
      $('#start-time').val(settings.blockPeriod.startTime);
      $('#end-time').val(settings.blockPeriod.endTime);
      const blockDays = settings.blockDays;

      for (const [key, value] of Object.entries(blockDays)) {
        $(`#${key}`).prop('checked', Boolean(blockDays[key]));
      }
    }
  });
}

function saveUserSettings() {
  chrome.storage.local.get('settings', (storage) => {
    if (!storage) return;
    const settings = storage.settings;
    const newStartTime = $('#start-time').val();
    const newEndTime = $('#end-time').val();
    if (!newStartTime || !newEndTime) return;
    settings.blockPeriod.startTime = newStartTime;
    settings.blockPeriod.endTime = newEndTime;
    const days = settings.blockDays;

    for (const [key, value] of Object.entries(days)) {
      settings.blockDays[key] = Boolean($(`#${key}`).is(':checked'));
    }

    settings.block = $('#alwaysBlock').is(':checked') ? 1 : 2;
    chrome.storage.local.set({ settings });
  });
}

function createBlockedUrlsList() {
  chrome.storage.local.get('blockedUrls', (storage) => {
    if (!storage) return;
    const blockedUrls = storage.blockedUrls;

    for (const [key, value] of Object.entries(blockedUrls)) {
      appendSite(key);
    }
    $('.basket').click(function () {
      const parent = $(this).parent();
      const url = $(this).siblings('p').text();
      if (!url) return;
      chrome.storage.local.get('blockedUrls', (storage) => {
        if (!storage) return;
        const blockedUrls = storage.blockedUrls;
        delete blockedUrls[url];
        chrome.storage.local.set({ blockedUrls }, () => {
          $(parent).remove();
        });
      });
    });
  });
}

function appendSite(site) {
  const item = `<div class='blocked-list-item'><p>${site}</p><div class='basket'></div></div>`;
  $('.blocked-sites-list').append(item);
}

function saveScheduleSettings(callback) {
  chrome.storage.local.get('settings', (storage) => {
    if (!storage) return;
    const defaultSettings = storage.settings;

    defaultSettings.block = $('#alwaysBlock').is(':checked') ? 1 : 2;
    chrome.storage.local.set({ settings: defaultSettings }, () => {
      if (callback) callback();
    });
  });
}

window.onload = () => {
  setUserSettings();
  createBlockedUrlsList();

  $('.pincode-item').on('keydown', (event) => {
    const key = event.keyCode || event.charCode;

    if (key === 8 || key === 46) {
      const target = $(document.activeElement);
      let idx = Number(target.data('idx')) - 1;
      idx = Math.max(idx, 1);
      idx = Math.min(idx, 4);
      target.val('');
      $(`#pincode-item-${idx}`).focus();
    }
  });

  $('.pincode-item').on('input', function () {
    const value = parseInt($(this).val());
    if (!value) return;
    if (value > 9) {
      $(this).val(9);
    } else if (value < 0) {
      $(this).val(0);
    }

    let idx = Number($(this).data('idx')) + 1;
    idx = Math.max(idx, 1);
    idx = Math.min(idx, 4);
    $(`#pincode-item-${idx}`).focus();
  });

  $('#save-pincode-button').click(() => {
    $('.pincode-conteiner').one('submit', () => {
      const firstNumber = parseInt($('#pincode-item-1').val());
      const secondNumber = parseInt($('#pincode-item-2').val());
      const thirdNumber = parseInt($('#pincode-item-3').val());
      const fourthNumber = parseInt($('#pincode-item-4').val());

      if (!firstNumber || !secondNumber || !thirdNumber || !fourthNumber) return;
      const newPincode = ''.concat(firstNumber, secondNumber, thirdNumber, fourthNumber);
      chrome.storage.local.set({ pincode: newPincode });
    });
  });

  $('#alwaysBlock, #schedule').click(() => {
    saveScheduleSettings(() => {
      setUserSettings();
    });
  });

  $('#block-site').click(() => {
    $('.blocked-sites-url').one('submit', () => {
      const url = $('#blocked-sites-input').val();
      if (!url) return;
      chrome.storage.local.get('blockedUrls', (storage) => {
        if (!storage) return;
        const blockedUrls = storage.blockedUrls;
        blockedUrls[url] = { blockAllPages: false };
        chrome.storage.local.set({ blockedUrls });
      });
    });
  });

  $('.time, .days').change(() => { saveUserSettings(); });
};
