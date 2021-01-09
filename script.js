
const generateBtn = document.querySelector("#generate");

// This function randomizes a string
function randomizeString(str) {
  // Split the string into an array
  const characterList = str.split("");

  // Loop through all the character positions in the list
  for (let charPosition = characterList.length - 1; charPosition > 0; charPosition--) {
      const randomPos = Math.floor(Math.random() * (charPosition + 1));
      const tmp = characterList[charPosition];
      characterList[charPosition] = characterList[randomPos];
      characterList[randomPos] = tmp;
  }

  return characterList.join("");
}

function generatePassword() {
  // Collect the number of characters desired.
  const pswdLength = prompt("Enter desired number of characters");

  // Validate that the length of the password is between 8 and 128, inclusive. Exit early if validation does not pass and issue an alert.
  if (pswdLength < 8 || pswdLength > 128) {
    alert("Your password needs to be between 8 and 128 characters");
    return "";
  }

  // Issue promots to confirm which character sets to use
  const useUpperCaseLetters = confirm("Do you want your password to include uppercase letters?");
  const useLowerCaseLetters = confirm("Do you want your password to include lowercase letters?");
  const useDigits = confirm("Do you want your password to include numbers?");
  const useSpecialChars = confirm("Do you want your password to include special characters?");
  
  // Validate that at least one character set was selected. If none are selected, issue an alert and exit early.
  if (useUpperCaseLetters === false && useLowerCaseLetters === false && useDigits === false && useSpecialChars === false) {
    alert("You must pick at least one criteria");
    return "";
  }

  // Define the character sets we will use
  const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const lowercaseLetters = uppercaseLetters.toLowerCase()
  const digits = "0123456789"
  const specialChars = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'

  // Calculate the number of characters we will use for each character set, minus the first one which will use the remainder.
  // This ensures that we have characters from each character set and that the number of desired characters is guaranteed.
  const evenValueForFour = Math.floor(pswdLength/4);
  const evenValueForThree = Math.floor(pswdLength/3);
  const evenValueForTwo = Math.floor(pswdLength/2);
  const evenValueForOne = pswdLength;

  // Declare an array to store the list of character sets we will use to construct the password.
  const charSets = [];

  // Initialize the password as en empty string to which we will add iteratively from the character sets desired.
  let password = "";

  // If user chooses upper case letters, add the upper case charset to the array storing the list of character sets
  if (useUpperCaseLetters) {
    charSets.push(uppercaseLetters);
  }

  // If user chooses lower case letters, add the lower case charset to the array storing the list of character sets
  if (useLowerCaseLetters) {
    charSets.push(lowercaseLetters);
  }

  // If user chooses numbers, add number charset to the array storing the list of character sets
  if (useDigits) {
    charSets.push(digits);
  }

  // If user chooses special characters, add the special character charset to the array storing the list of character sets
  if (useSpecialChars) {
    charSets.push(specialChars);
  }

  // Select the actual number of characters to include from each char set depending on the number of selected char sets
  const actualValue = charSets.length === 4 ? evenValueForFour : (charSets.length === 3 ? evenValueForThree : (charSets.length === 2 ? evenValueForTwo : evenValueForOne));
  
  // Select a multiplier to be used to compute the remainder. The remainder is the desired password length minus the product of the max whole number that can be used to be less than the desired password length and the charset list length - 1.
  const multiplier = charSets.length === 4 ? 3 : (charSets.length === 3 ? 2 : (charSets.length === 2 ? 1 : 0));

  // Compute the remainder
  const remainder = pswdLength - (actualValue * multiplier);

  // Loop through each chosen character set to collect random characters from it to append to the password. This is where the password is constructed.
  charSets.forEach((charSet, i) => {
    // The limit is used to control the number of characters to add from this char set.
    // It's the remainder if it's the first charset (this is a choice).
    // It's the selected actual number of characters to include otherwise.
    const limit = i === 0 ? remainder : actualValue;

    // Loop through an iteration from 0 to the limit to select a random character from the charset and append to password
    for (let i = 0; i < limit; i++) {
      // Append to password a randomly selected character from the charset
      password += charSet.charAt(Math.floor(Math.random() * charSet.length));
    }


  });

  // At this point, the string is not randomized. We pass the password to a function that will randomize the string. This is what we return.
  return randomizeString(password);
}//generate password end

// Write password to the #password input
function writePassword() {
  // Generate a password based on user-selected criteria
  const password = generatePassword();

  // Select the password input element where we will put the password
  const passwordText = document.querySelector("#password");

  // Set the input element value to the password
  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);