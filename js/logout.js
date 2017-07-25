function logout(){
    chrome.storage.sync.remove("private_token", function(){});
    chrome.storage.sync.remove("public_token", function(){});
}

