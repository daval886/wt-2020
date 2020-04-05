import { render } from "mustache";

function opinion2html(opinion) {
  const opinionView = {
    name: opinion.name,
    email: opinion.email,
    comment: opinion.comment,
    createdDate: new Date(opinion.created).toDateString()
  };

  const template = document.getElementById("mTmplOneOpinion").innerHTML;
  let htmlWOp = render(template, opinionView);
  return htmlWOp;
}

function opinionArray2html(sourceData) {
  return sourceData.reduce(
    (htmlWithOpinions, opn) => htmlWithOpinions + opinion2html(opn),
    ""
  );
}

let opinions = [];
const opinionsElm = document.getElementById("opinionsContainer");

if (localStorage.myTreesComments) {
  opinions = JSON.parse(localStorage.myTreesComments);
}

console.log(opinions);

opinionsElm.innerHTML = opinionArray2html(opinions);

let myForm = document.getElementById("feedback");
myForm.addEventListener("submit", processOpnFrmData);

function processOpnFrmData(event) {
  event.preventDefault();

  const meno = document.getElementById("meno").value.trim();
  const priezvisko = document.getElementById("priezvisko").value.trim();
  const ine_text = document.getElementById("ine_text").value.trim();
  const komentar = document.getElementById("komentar").value.trim();
  const keywords = document.getElementById("keywords").value.trim();
  const email = document.getElementById("email").value.trim();
  const url = document.getElementById("url").value.trim();

  const rally = document.getElementById("rally").checked;
  const autocross = document.getElementById("autocross").checked;
  const F1 = document.getElementById("F1").checked;
  const okruh = document.getElementById("okruh").checked;
  const ine = document.getElementById("ine").checked;

  const ano = document.getElementById("ano").checked;
  const nie = document.getElementById("nie").checked;
  const muz = document.getElementById("muz").checked;
  const zena = document.getElementById("zena").checked;
  const neprajem_si_uviest = document.getElementById("neprajem_si_uviest")
    .checked;

  if (meno === "" || komentar === "" || email === "") {
    window.alert("Please, enter your name, email and opinion");
    return;
  }

  const newOpinion = {
    name: meno,
    surname: priezvisko,
    ine_zaujmy: ine_text,
    comment: komentar,
    keywords: keywords,
    url: url,
    email: email,
    rally: rally,
    autocross: autocross,
    F1: F1,
    okruh: okruh,
    ine: ine,
    ano: ano,
    nie: nie,
    muz: muz,
    zena: zena,
    neprajem_si_uviest: neprajem_si_uviest,
    created: new Date()
  };

  console.log("New opinion:\n " + JSON.stringify(newOpinion));

  opinions.push(newOpinion);

  localStorage.myTreesComments = JSON.stringify(opinions);

  console.log("New opinion added");
  console.log(opinions);

  opinionsElm.innerHTML += opinion2html(newOpinion);

  myForm.reset();
}
