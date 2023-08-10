let myLeads = []

const inputEl = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")
const saveInp = document.getElementById("input-btn")
const deleteBtn = document.getElementById("del-btn")
const tabBtn = document.getElementById("tab-btn")

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
console.log(leadsFromLocalStorage)

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

tabBtn.addEventListener("click", function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url)
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
    
    console.log(tabs[0].url)
    })
})

function render(leads) {
    let listItems = []
    for (i = 0; i < leads.length; i++) {
        // listItems += "<li> <a target='_blank' href = '"+myLeads[i]+"' >"+ myLeads[i] + "</a></li>"
        listItems += `
                    <li> 
                        <a target='_blank' href = '${leads[i]}' >
                        ${leads[i]}
                        </a>
                    </li>
                    `
        // const li = document.createElement("li")
        // li.textContent = myLeads[i]
        // ulEl.append(li)
        //  
    }
    ulEl.innerHTML = listItems 
}

saveInp.addEventListener("click", function(){
    if (inputEl.value !== "") {
        myLeads.push(inputEl.value)
        inputEl.value = ""
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    }

    // console.log(localStorage.getItem("myLeads"))
})

deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear()
    myLeads = []
    render(myLeads)
    // myLeads.length = 0
    // ulEl.innerHTML = ""
})