/*
    Author: devCodeCamp
    Description: Most Wanted Starter Code
*/
//////////////////////////////////////////* Beginning Of Starter Code *//////////////////////////////////////////

"use strict";
//? Utilize the hotkey to hide block level comment documentation
////* Mac: Press "CMD"+"K" and then "CMD"+"/"
////* PC: Press "CTRL"+"K" and then "CTRL"+"/"

/**
 * This is the main logic function being called in index.html.
 * It operates as the entry point for our entire application and allows
 * our user to decide whether to search by name or by traits.
 * @param {Array} people        A collection of person objects.
 */
function app(people) {
  // promptFor() is a custom function defined below that helps us prompt and validate input more easily
  // Note that we are chaining the .toLowerCase() immediately after the promptFor returns its value
  let searchType = promptFor(
    "Do you know the name of the person you are looking for? Enter 'yes' or 'no'",
    yesNo
  ).toLowerCase();
  let searchResults;
  // Routes our application based on the user's input
  switch (searchType) {
    case "yes":
      searchResults = searchByName(people);
      break;
    case "no":
      //! TODO #4: Declare a searchByTraits (multiple traits) function //////////////////////////////////////////
      //! TODO #4a: Provide option to search for single or multiple //////////////////////////////////////////
      searchResults = searchByTraits(people);
      break;
    default:
      // Re-initializes the app() if neither case was hit above. This is an instance of recursion.
      app(people);
      break;
  }
  // Calls the mainMenu() only AFTER we find the SINGLE PERSON
  mainMenu(searchResults, people);
}
// End of app()
let personTemplate = {
  id: 0,
  firstName: "",
  lastName: "",
  gender: "",
  dob: "",
  height: 0,
  weight: 0,
  eyeColor: "",
  occupation: "",
  parents: [0],
  currentSpouse: 0,
};

/**
 * After finding a single person, we pass in the entire person-object that we found,
 * as well as the entire original dataset of people. We need people in order to find
 * descendants and other information that the user may want.
//  * @param {Object[]} person     A singular object inside of an array.
 * @param {Array} people        A collection of person objects.
 * @returns {String}            The valid string input retrieved from the user.
 */
function mainMenu(person = [personTemplate], people) {
  // A check to verify a person was found via searchByName() or searchByTrait()
  if (!person[0]) {
    alert("Could not find that individual.");
    // Restarts app() from the very beginning
    return app(people);
  }
  let displayOption = prompt(
    `Found ${person[0].firstName} ${person[0].lastName}. Do you want to know their 'info', 'family', or 'descendants'?\nType the option you want or type 'restart' or 'quit'.`
  );
  // Routes our application based on the user's input

  switch (displayOption) {
    case "info":
      //! TODO #1: Utilize the displayPerson function //////////////////////////////////////////
      // HINT: Look for a person-object stringifier utility function to help

      let personInfo = displayPerson(person[0]);
      alert(personInfo);
      break;
    case "family": 
    findPersonFamily(person[0], people );
      //! TODO #2: Declare a findPersonFamily function //////////////////////////////////////////
      //   let foundParent = findPersonFamily(person[0], people);
      //     if (person.parents) {
      //         return true;
      //     }
      // ;
      // return foundParent;
      // console.log(foundParent);
      // HINT: Look for a people-collection stringifier utility function to help
      // alert(personFamily);

      //     if (person.firstName === firstName && person.lastName === lastName)
      break;
    case "descendants":
      findPersonDescendants(person[0], people);
      //! TODO #3: Declare a findPersonDescendants function //////////////////////////////////////////
      // HINT: Review recursion lecture + demo for bonus user story
      break;

    case "restart":
      // Restart app() from the very beginning
      app(people);
      break;
    case "quit":
      // Stop application execution
      return;
    default:
      // Prompt user again. Another instance of recursion
      return mainMenu(person, people);
  }
}
// End of mainMenu()

/**
 * This function is used when searching the people collection by
 * a person-object's firstName and lastName properties.
 * @param {Array} people        A collection of person objects.
 * @returns {Array}             An array containing the person-object (or empty array if no match)
 */
function searchByName(people) {
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);

  // The foundPerson value will be of type Array. Recall that .filter() ALWAYS returns an array.
  let foundPerson = people.filter(function (person) {
    if (person.firstName === firstName && person.lastName === lastName) {
      return true;
    }
  });
  return foundPerson;
}
// End of searchByName()

/**
 * This function will be useful for STRINGIFYING a collection of person-objects
 * first and last name properties in order to easily send the information
 * to the user in the form of an alert().
 * @param {Array} people        A collection of person objects.
 */
function displayPeople(people) {
  alert(
    people
      .map(function (person) {
        return `${person.firstName} ${person.lastName}`;
      })
      .join("\n")
  );
}
// End of displayPeople()

/**
 * This function will be useful for STRINGIFYING a person-object's properties
 * in order to easily send the information to the user in the form of an alert().
 * @param {Object} person       A singular object.
 */
function displayPerson(person) {
  let personInfo = `First Name: ${person.firstName}\n`;
  personInfo += `Last Name: ${person.lastName}\n`;
  personInfo += `eyeColor: ${person.eyeColor}\n`;
  personInfo += `gender: ${person.gender}\n`;
  personInfo += `occupation: ${person.occupation}\n`;
  personInfo += `weight: ${person.weight}\n`;
  personInfo += `id: ${person.id}\n`;
  //! TODO #1a: finish getting the rest of the information to display //////////////////////////////////////////
  alert(personInfo);
}
// End of displayPerson()

/**
 * This function's purpose is twofold:
 * First, to generate a prompt with the value passed in to the question parameter.
 * Second, to ensure the user input response has been validated.
 * @param {String} question     A string that will be passed into prompt().
 * @param {Function} valid      A callback function used to validate basic user input.
 * @returns {String}            The valid string input retrieved from the user.
 */
function promptFor(question, valid) {
  do {
    var response = prompt(question).trim();
  } while (!response || !valid(response));
  return response;
}
// End of promptFor()
function findPersonFamily(foundPerson = [0], people = [personTemplate]) {
  let foundParents = people.filter(function (person) {
    if (foundPerson.parents.includes(person.id))
    {
      return true;
    }
  });
  displayPeople(foundParents);

  findCurrentSpouse(foundPerson, people)
}

function findCurrentSpouse(foundPerson = [0], people = [personTemplate]) {
  let foundCurrentSpouse = people.filter(function (person) {
    if (foundPerson.currentSpouse === person.id) {
      return true;
    }
  });
  displayPeople(foundCurrentSpouse);
}

function findPersonDescendants(foundPerson = [0], people = [personTemplate]) {
  let foundDescendants = people.filter(function(person) {
    if (foundPerson.foundDescendants === person.id) {
      return true;
    }
  });
  displayPeople(foundDescendants);
  // findPersonDescendants(foundDescendants, people)
}
        


// we create seperate fuumctions for each piece and call it within findpersonfamily) for testing keep as returnfoundparent.
// display people function to provide a alert window, to use that we replace returnfound parent with displayPeople(foundparent)and
// then copy it down and fill it with findsiblings/findspouse. Use if statements and return true. Recommends findspouse first because it deals
// a lot less with arrays by checking does this spouse id equal id. bcs it looks at 2 arrays to determine if
// it has a common value. with sibling we will get a little more granular and dial in to a specific person's parent id. with spouse it's
// going to be like searchbyname function. It's similar bcs we're filtering through = main difference is we won't use user input but found person property on one side and \
// person's property on the other.
// displayPeople (foundParents)
// let findSiblings = if condition xyz return true

// displayPeople (foundParent)
// let findSpouse =
/**
 * This helper function checks to see if the value passed into input is a "yes" or "no."
 * @param {String} input        A string that will be normalized via .toLowerCase().
 * @returns {Boolean}           The result of our condition evaluation.
 */
function yesNo(input) {
  return input.toLowerCase() === "yes" || input.toLowerCase() === "no";
}
// End of yesNo()

/**
 * This helper function operates as a default callback for promptFor's validation.
 * Feel free to modify this to suit your needs.
 * @param {String} input        A string.
 * @returns {Boolean}           Default validation -- no logic yet.
 */
function chars(input) {
  return true; // Default validation only
}
// End of chars()

//////////////////////////////////////////* End Of Starter Code *//////////////////////////////////////////
// Any additional functions can be written below this line 👇. Happy Coding! 😁

function searchByTraits(people = [personTemplate]){
  let response = "yes"
  while (response === "yes") {

    let trait = prompt("Choose a trait: \n(gender, dob, height, weight, eyeColor, occupation");

    let searchValue = prompt(`Please choose a value for ${trait}`);
    people=people.filter((person) => {
      if (person[trait] === searchValue) return true;
    });

    response = promptFor("Do you want to search by another trait?", yesNo);
  }
  displayPeople(people);
}