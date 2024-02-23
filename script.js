
function updateTime() {
  let currentTime = new Date();

  let hours = currentTime.getHours().toString().padStart(2, '0');
  let minutes = currentTime.getMinutes().toString().padStart(2, '0');
  let seconds = currentTime.getSeconds().toString().padStart(2, '0');

  let timeString = `${hours}:${minutes}:${seconds}`;

  document.getElementById("clock").innerText = timeString;
}

setInterval(updateTime, 1000);
updateTime();

let text = document.getElementById("transText");
let textSub = document.getElementById("textForm");
let chatContainer = document.getElementById("chatContainer");

textSub.addEventListener('submit', async (event) => {

  event.preventDefault();
  console.log('clicked');

  let currentTime = new Date();
  let currentHour = currentTime.getHours();
  let currentMinute = currentTime.getMinutes();
    const transText = text.value;
    if (transText === "") {
      console.log("Please Enter Text To Translate!");
    } else {
      const url = 'https://translator82.p.rapidapi.com/api/translate';
      const options = {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': '275a35f1cbmsh29845010724873bp1a535bjsne4e379c4bd91',
          'X-RapidAPI-Host': 'translator82.p.rapidapi.com'
        },
        body: JSON.stringify({
          "language": "en",
          "text": `${transText}`
      })
      };

      try {
        const response = await fetch(url, options);
        const resultJson = await response.json();
       
          console.log(resultJson.result);
          const translatedText = resultJson.result;
        // outputting the translated text
        const transContainer = document.getElementById("transContainer");
        const botDiv = document.createElement('div');

        botDiv.innerHTML = `
          <p class="chat-user">Translate Bot:</p>
          <p>${translatedText}</p>
          <time>${currentHour}:${currentMinute}</time>
        `;
        transContainer.append(botDiv);

        // returning the text to translate
        const textContainer = document.getElementById("textContainer");
        const userDiv = document.createElement('div');
        userDiv.innerHTML = `
          <p class="chat-user">You:</p>
          <p>${text.value}</p>
          <time>${currentHour}:${currentMinute}</time>
        `;
        textContainer.append(userDiv);
        text.value = "";
       
      } catch (error) {
        console.error(error);
      }
    }
  
});