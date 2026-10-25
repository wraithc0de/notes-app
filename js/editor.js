textArea.addEventListener("keydown", () => {
    if (textArea.innerText == "" || textArea.innerText == "\n") {
        textArea.innerHTML = "";
    }
});