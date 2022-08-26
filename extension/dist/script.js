const errMsg = document.querySelector("#error");
const toggleBtn = document.querySelector(".toggleBtn");
const vaildUrls = ["youtube.com/shorts", "youtube.com/hashtag/shorts"];
chrome.storage.onChanged.addListener((result) => {
    changeToggleButton(result.applicationIsOn.newValue);
});
chrome.storage.local.get(["applicationIsOn"], (result) => {
    changeToggleButton(result.applicationIsOn);
});
document.onclick = (e) => {
    if (e.target.classList.contains("toggleBtn"))
        chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
            if (vaildUrls.some((url) => tabs[0]?.url?.includes(url))) {
                chrome.tabs.sendMessage(tabs[0].id, { toggle: true });
            }
            else
                errMsg.innerText = "Only works for Tiktok!";
        });
    if (e.target.id === "shortCutBtn") {
        document.querySelector(".shortCut").classList.toggle("remove");
    }
};
function changeToggleButton(result) {
    if (result) {
        toggleBtn.innerText = "Stop";
        toggleBtn.classList.remove("start");
        toggleBtn.classList.add("stop");
    }
    if (!result) {
        toggleBtn.innerText = "Start";
        toggleBtn.classList.add("start");
        toggleBtn.classList.remove("stop");
    }
}
