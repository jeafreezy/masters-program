function doIt() {
    // write your code here
    alert('Hello World');

    //get the page title
    let pageTitle = document.getElementsByTagName('title')[0];

    alert('My page title is: ' + pageTitle.innerText);

    let headingCollection = document.getElementsByTagName('h1');

    //get the first heading
    alert('My first heading is: ' + headingCollection[0].innerText);

    //get the second heading
    alert('My second heading is: ' + headingCollection[1].innerText);


    //get the important collections
    let importantCollection = document.getElementsByClassName('important');

    for (let i = 0; i < importantCollection.length; i++) {
        alert('The content of the important section is: ' + importantCollection[i].innerHTML);
    }

    //the last item in the list

    //get the important collections
    let listCollection = document.getElementsByTagName('ul');

    for (let i = 0; i < listCollection.length; i++) {
        let listNumber = i + 1;
        alert('The last item in the list ' + listNumber + ' is: ' + listCollection[i].lastElementChild.innerText);
    }


    ///Updating 

    pageTitle.innerText = 'Updated Emmanuel Jolaiya Portfolio';
    alert('My new page title is: ' + pageTitle.innerText);

    //updating by id 

    let career = document.getElementById('career');

    let newCareer = 'A Javascript Developer.';
    career.innerText = newCareer;

    alert('I have changed my professional career to: ', newCareer)

    //updating heading style

    for (let i = 0; i < headingCollection.length; i++) {
        headingCollection[i].style.color = '#44a832';
    }

    alert('All heading color will be updated to green!');


    //updating a new section.

    //get the sections

    let sectionCollection = document.getElementsByTagName('section');

    //create a new section

    let newSection = document.createElement('section');

    //insert Heading
    let sectionHeading = document.createElement('h1')
    sectionHeading.innerText = 'Career Goal'


    //insert paragraph
    let sectionParagraph = document.createElement('p');
    sectionParagraph.innerText = 'I want to be a great geospatial software engineer!'


    //append it to the section.

    newSection.appendChild(sectionHeading);
    newSection.appendChild(sectionParagraph);

    //append the new section
    sectionCollection[1].parentNode.insertBefore(newSection, sectionCollection[1].nextSibling)
    alert('I have just inserted a new section!');

}