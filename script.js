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

const button_calculate = document.querySelector(".calculate-button");

[amount, term, rate].forEach((item) => {
  item.input.addEventListener("focus", () => {
    toggle_focus_style(item.box);
    style_error(item, false);
  });
});
[amount, term, rate].forEach((item) => {
  item.input.addEventListener("blur", () => {
    toggle_focus_style(item.box);
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
  hide_element(type[0].error);
});

type[1].input.addEventListener("click", () => {
  type[1].box.classList.add("bc-dark-yellow");
  type[0].box.classList.remove("bc-dark-yellow");
  hide_element(type[0].error);
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

button_calculate.addEventListener("click", () => {
  validate_amount();
  validate_term();
  validate_rate();
  validate_type();
  console.log("clicked");
});

function hide_element(element) {
  element.classList.remove("visible");
}

function show_element(element) {
  element.classList.add("visible");
}

function hoverInputNumber(element, state) {
  if (state) element.classList.add("hover-input-number");
  else element.classList.remove("hover-input-number");
}
function hoverInputRadio(element, state) {
  if (state) element.classList.add("hover-input-radio");
  else element.classList.remove("hover-input-radio");
}

function toggle_focus_style(element) {
  element.classList.toggle("focused-input");
}

function error_box(element, state) {
  if (state) element.classList.add("error-input");
  else element.classList.remove("error-input");
}

function input_empty(input) {
  return !input.value;
}

function style_error(obj, state) {
  if (state) {
    error_box(obj["box"], true);
    obj["span"].classList.add("white-text");
    show_element(obj["error"]);
  } else {
    error_box(obj["box"], false);
    obj["span"].classList.remove("white-text");
    hide_element(obj["error"]);
  }
}

function validate_amount() {
  if (input_empty(amount["input"]) || amount["input"].value <= 0) {
    style_error(amount, true);
    return false;
  }
  return true;
}

function validate_term() {
  if (input_empty(term["input"]) || term["input"].value <= 0) {
    style_error(term, true);
    return false;
  }
  return false;
}

function validate_rate() {
  if (input_empty(rate["input"]) || rate["input"].value <= 0) {
    style_error(rate, true);
    return false;
  }
  return true;
}

function validate_type() {
  if (type[0].input.checked || type[1].input.checked) {
    return true;
  } else show_element(type[0].error);
  return false;
}
