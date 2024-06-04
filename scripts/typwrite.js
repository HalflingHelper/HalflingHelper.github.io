let handle;

const options = ["Math", "Language", "Music", "Reading", "Running", "Chess", "Programming", "Lisp", "Video Game"];

async function replaceTyper() {

    const typer = document.getElementById("typer");
    const current = typer.innerText;
    const next = options[(options.indexOf(current) + 1) % options.length];

    const CHAR_DELAY = 40;
    const WORD_DELAY = 2300;


    while (typer.innerText.length > 0) {
        typer.innerText = typer.innerText.slice(0, -1);
        // wait
        await new Promise((resolve) => setTimeout(resolve, CHAR_DELAY));
    }

    // type in next
    for (let i = 0; i < next.length; i++) {
        typer.innerText += next[i];
        await new Promise((resolve) => setTimeout(resolve, CHAR_DELAY));
    }

    // wait
    await new Promise((resolve) => setTimeout(resolve, WORD_DELAY));
    replaceTyper();
}

setTimeout(() => {
    replaceTyper();
}, 4000);