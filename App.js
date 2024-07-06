const baseUrl = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

let dropdowns = document.querySelectorAll(".dropdwon select");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let msg = document.querySelector(".Mesg");

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal <=0) {
        amtVal = 1;
        amount.value = "1";
    }

    const url = `${baseUrl}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(url);
    // console.log(response);

    let data = await response.json();
    // console.log(data);

    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    console.log(rate);

    let finalAmount = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};

window.addEventListener ("load", () => {
    updateExchangeRate();
})

for (let select of dropdowns){
    for (currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "From" && currCode === "USD"){
            newOption.selected = "selected";
        }
        else if(select.name === "To" && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt)=>{
        updateFlag(evt.target);
    })
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
    // let newSrcLink= `https://flagsapi.com/${countryCode}/flat/64.png`;
    let flagImg = element.parentElement.querySelector(".select_contaner img");
    flagImg.src = newSrc;
}

let btn = document.querySelector("form button");

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
    
})
