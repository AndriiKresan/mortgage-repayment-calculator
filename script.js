const amount = {
  box: box_amount = document.querySelector(".amount-box"),
  input: input_amount = document.querySelector(".input-amount"),
  span: span_amount = document.querySelector(".amount-box span"),
  error: error_amount = document.querySelector(".error-amount"),
}

const rate = {
  box: document.querySelector(".rate-box"),
  input: document.querySelector(".input-rate"),
  span: document.querySelector(".rate-box span"),
  error: document.querySelector(".error-rate"),
}

const term = {
  box: document.querySelector(".term-box"),
  input: document.querySelector(".input-term"),
  span: document.querySelector(".term-box span"),
  error: document.querySelector(".error-term"),
}

const box_type = document.querySelectorAll(".radio-box");
const input_type = document.querySelectorAll("input[type=radio]");
const error_type = document.querySelector(".error-type");

const button_calculate = document.querySelector(".calculate-button");

amount['input'].addEventListener("focus", () => {
  toggle_focus_style(amount['box']);
  style_error(amount, false);
});
amount['input'].addEventListener("blur", () => {
  toggle_focus_style(amount['box']);
});

term['input'].addEventListener("focus", () => {
  toggle_focus_style(term['box']);
  style_error(term, false);
});
term['input'].addEventListener("blur", () => {
  toggle_focus_style(term['box']);
});

rate['input'].addEventListener("focus", () => {
  toggle_focus_style(rate['box']);
  style_error(rate, false);
});
rate['input'].addEventListener("blur", () => {
  toggle_focus_style(rate['box']);
});

input_type[0].addEventListener("click", () => {
  box_type[0].classList.add("bc-dark-yellow");
  box_type[1].classList.remove("bc-dark-yellow");
  hide_element(error_type);
});

input_type[1].addEventListener("click", () => {
  box_type[1].classList.add("bc-dark-yellow");
  box_type[0].classList.remove("bc-dark-yellow");
  hide_element(error_type);
});

// for (let i = 0; i <= input_type.length; i++) {
//   input_type[i].addEventListener("focus", () => {
//     boxe_type[i].classList.add("bc-dark-yellow");
//   });
// }
// for (let i = 0; i <= input_type.length; i++) {
//   input_type[i].addEventListener("blur", () => {
//     boxe_type[i].classList.remove("bc-dark-yellow");
//   });
// }

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
    error_box(obj['box'], true);
    obj['span'].classList.add("white-text");
    show_element(obj['error']);
  } else {
    error_box(obj['box'], false);
    obj['span'].classList.remove("white-text");
    hide_element(obj['error']);
  }
}

function validate_amount() {
  if (input_empty(amount['input']) || amount['input'].value <= 0) {
    style_error(amount, true);
    return false;
  }
  return true;
}

function validate_term() {
  if (input_empty(term['input']) || term['input'].value <= 0) {
    style_error(term, true);
    return false;
  }
  return false;
}

function validate_rate() {
  if (input_empty(rate['input']) || rate['input'].value <= 0) {
    style_error(rate, true);
    return false;
  }
  return true;
}

function validate_type() {
  if (input_type[0].checked || input_type[1].checked) {
    return true;
  } else show_element(error_type);
  return false;
}

