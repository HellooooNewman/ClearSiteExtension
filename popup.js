function clearData(){
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, ([currentTab])=> {
    const originRegex = /(^https?:\/\/)[^\/]+/gi
    const currentUrl = currentTab.url.match(originRegex)[0];

    if(currentTab === undefined) return;
    chrome.browsingData.remove({
      "origins": [
        currentUrl
      ]
    }, {
      "cacheStorage": true,
      "cookies": true,
      "fileSystems": true,
      "indexedDB": true,
      "localStorage": true,
      "pluginData": true,
      "serviceWorkers": true,
      "webSQL": true
    }, ()=> {
      alert(`Cleared site data on ${currentUrl}`);
      chrome.tabs.reload();
    });
  });
}



document.addEventListener('DOMContentLoaded', function() {

  localStorage.setItem('bgcolor', 'red');
  document.cookie = "username=John Doe";


  const link = document.getElementById('clearDataButton');
  link.addEventListener('click', function() {
    clearData();
  });
});
