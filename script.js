let DOC_ID = "";
const BACKEND_URL = "https://pdf-backend.onrender.com";

async function upload() {
  const file = document.getElementById("pdf").files[0];
  const form = new FormData();
  form.append("file", file);

  const res = await fetch(`${BACKEND_URL}/upload`, {
    method: "POST",
    body: form
  });

  const data = await res.json();
  DOC_ID = data.doc_id;
  document.getElementById("output").textContent = "PDF uploaded";
}

async function ask() {
  const question = document.getElementById("question").value;

  const res = await fetch(`${BACKEND_URL}/ask?doc_id=${DOC_ID}&question=${question}`, {
    method: "POST"
  });

  const data = await res.json();
  document.getElementById("output").textContent =
    Array.isArray(data.answer)
      ? data.answer.join("\n")
      : data.answer;
}
