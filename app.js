let Base_Url =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/inr.json";

let dropDowns = document.querySelectorAll(".dropdown select");
let btn = document.querySelector("button");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let msgPara = document.querySelector(".msg");

const changeFlag = (element) => {
  let currCode = element.value;
  let counCode = countryList[element.value];
  let newSrc = `https://flagsapi.com/${counCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

for (let select of dropDowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    }
    if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    changeFlag(evt.target);
  });
}
window.addEventListener("load", () => {
  updateExcRate();
});

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExcRate();
});

const updateExcRate = async () => {
  let amount = document.querySelector(".amount input");

  if (amount.value < 1 || amount.value === "") {
    amount.value = 1;
  }

  let customezeUrl = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
  let response = await fetch(customezeUrl);
  let data = await response.json();
  let rate = data[toCurr.value.toLowerCase()];
  let finalAmount = amount.value * rate;
  msgPara.innerText = `${amount.value} ${
    fromCurr.value
  } = ${finalAmount.toFixed(2)} ${toCurr.value}`;
};
