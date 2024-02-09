let blinds = [
    {label: "25/50"},
    {label: "50/100"},
    {label: "100/200"},
    {label: "Break"},
];

let userSetDuration = 5 * 60;
let currentBlindIndex = 0;
let timer = null;
let timeLeft = 5 * 60 ; // 5 minutes in seconds

function updateDisplay() {
    // Always display the countdown timer, regardless of the blind label
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    document.getElementById('timerDisplay').textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    // Update the blind display to show the current label
    document.getElementById('blindDisplay').textContent = blinds[currentBlindIndex].label;
}





function startTimer() {
    if (timer === null) {
        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateDisplay();
            } else {
                nextBlind();
            }
        }, 1000);
    }
}

function pauseTimer() {
    if (timer !== null) {
        clearInterval(timer);
        timer = null;
    }
}

function resetTimer() {
    timeLeft = userSetDuration; // Reset to user-set duration
    updateDisplay();
}

function nextBlind() {
    if (currentBlindIndex < blinds.length - 1) {
        currentBlindIndex++;
        resetTimer();
    }
}

function previousBlind() {
    if (currentBlindIndex > 0) {
        currentBlindIndex--;
        resetTimer();
    }
}

function showEditMenu() {
    document.getElementById('editMenuModal').style.display = 'block';
}

function hideEditMenu() {
    document.getElementById('editMenuModal').style.display = 'none';
}

function addBlind() {
    // Push a new blank label object into the blinds array
    blinds.push({ label: '' });
    updateBlindsList(); // Update the blinds list to include the new blank entry

    // Scroll to the bottom of the blinds list to show the newly added blind
    const blindsList = document.getElementById('blindsList');
    blindsList.scrollTop = blindsList.scrollHeight;
}


function showAddBlindForm() {
    document.getElementById('addBlindForm').style.display = 'block';
}

function cancelAddBlind() {
    document.getElementById('addBlindForm').style.display = 'none';
}



function updateTimerDuration() {
    let duration = document.getElementById('timerDuration').value;
    if (duration) {
        userSetDuration = parseInt(duration, 10) * 60;
        timeLeft = userSetDuration; // Update timeLeft to reflect the new duration immediately
    }
    hideEditMenu();
    updateDisplay();
}

// Initial display update
updateDisplay();

function updateBlindsList() {
    const blindsList = document.getElementById('blindsList');
    blindsList.innerHTML = ''; // Clear existing list

    blinds.forEach((blind, index) => {
        const blindSet = document.createElement('div');
        blindSet.className = 'blindSet';

        const blindInput = document.createElement('input');
        blindInput.type = 'text';
        blindInput.value = blind.label;
        blindInput.placeholder = 'Blind/Text';
        blindInput.className = 'blindInput';
        blindInput.onchange = (e) => updateBlind(index, e.target.value);

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'removeBlind';
        removeButton.onclick = () => removeBlindAtIndex(index);

        blindSet.appendChild(blindInput);
        blindSet.appendChild(removeButton);

        blindsList.appendChild(blindSet);
    });
}


function removeBlindAtIndex(index) {
    // Remove the blind at the specified index and update the list
    blinds.splice(index, 1);
    updateBlindsList();
}


function updateBlind(index, value) {
    if (value) {
        blinds[index].label = value;
        console.log(`Blind updated: ${value}`);
    }
    updateBlindsList(); // Refresh the list display
}

function editBlind(index) {
    const smallBlind = prompt("Enter new small blind:");
    const bigBlind = prompt("Enter new big blind:");
    if (smallBlind && bigBlind) {
        blinds[index] = { small: parseInt(smallBlind, 10), big: parseInt(bigBlind, 10) };
        updateBlindsList();
    }
}

function showEditMenu() {
    document.getElementById('editMenuModal').style.display = 'block';
    updateBlindsList(); // Make sure blinds list is updated every time the menu is shown
}

function showAddBlindForm() {
    // Add a new blank blind to the list for editing
    const newBlindIndex = blinds.push({ small: '', big: '' }) - 1;
    updateBlindsList(); // Update list to include the new blank blind

    // Focus on the first input of the new blind for immediate editing
    const blindsList = document.getElementById('blindsList');
    const newBlindDiv = blindsList.children[newBlindIndex];
    const input = newBlindDiv.querySelector('input');
    if (input) {
        input.focus();
    }
}

function startTimer() {
    if (timer === null) {
        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateDisplay();
                // Check if timeLeft is equal to 3 seconds
                if (timeLeft === 3) {
                    playTimerSound();
                }
            } else {
                nextBlind();
                playEndBlindSound(); // Play sound at the end of the blind
            }
        }, 1000);
    }
}

// Function to play the sound when timer reaches 3 seconds
function playTimerSound() {
    // Assuming you have another sound for the 3-second alert
    var audio = document.getElementById('endBlindSound');
    audio.play().catch(error => console.error("Error playing the sound:", error));
}

function escapeHTML(str) {
    return str.replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;')
              .replace(/'/g, '&#039;');
}

// When updating HTML
document.getElementById('someElement').innerHTML = escapeHTML(userInput);
