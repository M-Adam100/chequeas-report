document.querySelector("button[id='SAVE_API_KEY']").addEventListener('click', (e) => {
    const apiKey = document.querySelector('#API_KEY').value;
    chrome.storage.local.set({ token: apiKey });
})

const setListUI = async () => {
    const listData = document.querySelector('[name="selectedList"]');
    const token = document.querySelector('#API_KEY');
    chrome.storage.local.get(['records', 'token'], (data) => {
        if (data.records) {
            data.records.forEach(item => {
                let option = document.createElement("option");
                option.value = item;
                option.text = item + "\n";
                listData.add(option);
            })
        } 
        if (data.token) {
            token.value = data.token;
        }
        
    });
};

setListUI();


document.querySelector("button[id='RESET_HISTORY']").addEventListener('click', () => {
    chrome.storage.local.set({ records: [] })
    updateData();
})

const updateData = () => {
    document.querySelector('[name="selectedList"]').innerHTML = '';
}








