// Just a very simple example on how to read and react to user input via forms.
// We'll be able to do a lot better later!

function handleForm() {
    // You don't know the following two lines of code yet (but you will soon!) - don't worry about them for now.
    // radios is an array with all elements with name 'appreciation'
    let radios = document.getElementsByName('appreciation');
    // myElement is an object representing an HTML element
    let myElement = document.getElementById('mytextID');
    // But look at all the rest of the code... that looks familiar!!!
    handleTextArea(myElement);
    handleAppreciationRadios(radios);
}


function handleTextArea(element) {
    if (element.value == "") {
        alert("Hey, leave me your opinion?!");
    }
    else {
        alert("Thanks for your opinion!");
    }
}


function handleAppreciationRadios(radios) {
    let length = radios.length;

    for (let i = 0; i < length; i++) {
        if (radios[i].checked) {
            console.log(radios[i].value);
            switch (radios[i].value) {
                case "It's great!":
                    alert("Really? Great?! You flatter me!");
                    break;
                case "So and so.":
                    alert("So and so? Oh well, perhaps it can improve...");
                    break;
                case "Quite poor!":
                    alert("Poor? Are you kidding me?!");
                    break;
                default:
                    alert("Values not correctly set.");

            }
        }
    }
}

console.log("loaded!");