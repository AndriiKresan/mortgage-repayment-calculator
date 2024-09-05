const amount = {
  box: (box_amount = document.querySelector(".amount-box")),
  input: (input_amount = document.querySelector(".input-amount")),
  span: (span_amount = document.querySelector(".amount-box span")),
  error: (error_amount = document.querySelector(".error-amount")),
};

const rate = {
  box: document.querySelector(".rate-box"),
  input: document.querySelector(".input-rate"),
  span: document.querySelector(".rate-box span"),
  error: document.querySelector(".error-rate"),
};

const term = {
  box: document.querySelector(".term-box"),
  input: document.querySelector(".input-term"),
  span: document.querySelector(".term-box span"),
  error: document.querySelector(".error-term"),
};

const type = [
  {
    box: document.querySelector(".radio-box.repayment"),
    input: document.querySelector(".radio-box.repayment input"),
    error: document.querySelector(".error-type"),
  },
  {
    box: document.querySelector(".radio-box.interest"),
    input: document.querySelector(".radio-box.interest input"),
  },
];

const infoScreen = document.querySelector(".info-screen");
const resultScreen = document.querySelector(".result-screen");

const buttonClear = document.querySelector(".button-clear");
const button_calculate = document.querySelector(".calculate-button");

const monthlyLabel = document.querySelector(".monthly-label");
const monthlyRepayment = document.querySelector(".monthly-repayment");
const totalRepayment = document.querySelector(".total-repayment");
const totalLabel = document.querySelector(".total-label");

[amount, term, rate].forEach((item) => {
  item.input.addEventListener("focus", () => {
    toggleFocusInput(item.box);
    styleError(item, false);
  });
});
[amount, term, rate].forEach((item) => {
  item.input.addEventListener("blur", () => {
    toggleFocusInput(item.box);
  });
});

[amount, term, rate].forEach((item) => {
  item.input.addEventListener("mouseover", () => {
    hoverInputNumber(item.box, true);
  });
});

[amount, term, rate].forEach((item) => {
  item.input.addEventListener("mouseout", () => {
    hoverInputNumber(item.box, false);
  });
});

[amount, term, rate].forEach((item) => {
  item.input.addEventListener("mouseout", () => {
    hoverInputNumber(item.box, false);
  });
});

type[0].input.addEventListener("click", () => {
  type[0].box.classList.add("bc-dark-yellow");
  type[1].box.classList.remove("bc-dark-yellow");
  showElement(type[0].error, false);
});

type[1].input.addEventListener("click", () => {
  type[1].box.classList.add("bc-dark-yellow");
  type[0].box.classList.remove("bc-dark-yellow");
  showElement(type[0].error, false);
});

[type[0], type[1]].forEach((item) => {
  item.box.addEventListener("mouseover", () => {
    hoverInputRadio(item.box, true);
  });
});

[type[0], type[1]].forEach((item) => {
  item.box.addEventListener("mouseout", () => {
    hoverInputRadio(item.box, false);
  });
});

buttonClear.addEventListener("click", () => {
  clearForm();
})

button_calculate.addEventListener("click", () => {
  const valid = [validAmount(), validTerm(), validRate(), validType()].every(item => item);

  if (valid) {
    const r = rate.input.value / 100 / 12;
    const N = term.input.value * 12;
    const P = amount.input.value;
    const monthlyAmount = (P * r * (1 + r) ** N) / ((1 + r) ** N - 1);
    const totalAmount = monthlyAmount * N;
    displayElement(infoScreen, false);
    displayElement(resultScreen, true);
    if (type[0].input.checked) {
      monthlyLabel.textContent = "Your monthly repayments";
      monthlyRepayment.textContent = "$" + monthlyAmount.toFixed(2);
      totalLabel.textContent = "Total you'll repay over the term";
      totalRepayment.textContent = "$" + totalAmount.toFixed(2);
    } else if (type[1].input.checked) {
      const monthlyInterest = (totalAmount - P) / N;
      const totalInterest = totalAmount - P;
      monthlyLabel.textContent = "Your monthly interest amount";
      monthlyRepayment.textContent = "$" + monthlyInterest.toFixed(2);
      totalLabel.textContent = "Total interest amount you'll pay over the term";
      totalRepayment.textContent = "$" + totalInterest.toFixed(2);
    }
  }
});

function showElement(element, state) {
  if (state) element.classList.remove("hidden");
  else element.classList.add("hidden");
}

function hoverInputNumber(element, state) {
  if (state) element.classList.add("hover-input-number");
  else element.classList.remove("hover-input-number");
}
function hoverInputRadio(element, state) {
  if (state) element.classList.add("hover-input-radio");
  else element.classList.remove("hover-input-radio");
}

function toggleFocusInput(element) {
  element.classList.toggle("focused-input");
}

function styleErrorBox(element, state) {
  if (state) element.classList.add("error-input");
  else element.classList.remove("error-input");
}

function inputEmpty(input) {
  return !input.value;
}

function styleError(obj, state) {
  if (state) {
    styleErrorBox(obj["box"], true);
    obj["span"].classList.add("white-text");
    showElement(obj["error"], true);
  } else {
    styleErrorBox(obj["box"], false);
    obj["span"].classList.remove("white-text");
    showElement(obj["error"], false);
  }
}

function validAmount() {
  if (inputEmpty(amount["input"]) || amount["input"].value <= 0) {
    styleError(amount, true);
    return false;
  }
  return true;
}

function validTerm() {
  if (inputEmpty(term["input"]) || term["input"].value <= 0) {
    styleError(term, true);
    return false;
  }
  return true;
}

function validRate() {
  if (inputEmpty(rate["input"]) || rate["input"].value <= 0) {
    styleError(rate, true);
    return false;
  }
  return true;
}

function validType() {
  if (type[0].input.checked || type[1].input.checked) {
    return true;
  } else showElement(type[0].error, true);
  return false;
}

function displayElement(element, state) {
  if (state) element.classList.remove("display-none");
  else element.classList.add("display-none");
}

function clearForm() {
  amount.input.value = "";
  term.input.value = "";
  rate.input.value = "";
  type[0].input.checked = false;
  type[0].box.classList.remove("bc-dark-yellow");
  type[1].input.checked = false;
  type[1].box.classList.remove("bc-dark-yellow");
  displayElement(infoScreen, true);
  displayElement(resultScreen, false);
  [amount, term, rate].forEach((item) => {
    styleError(item, false);
  })
  showElement(type[0].error, false);
}
