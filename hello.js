
const form = document.querySelector("form");
const resultBox = document.querySelector(".result-box");
const input = document.getElementById("text");
const audio = document.getElementById("audio");
const dictionaryApi = `https://api.dictionaryapi.dev/api/v2/entries/en/`;

form.addEventListener("submit", (e)=>{
    e.preventDefault();
    fetch(`${dictionaryApi}${input.value}`)
    .then((response)=>response.json())
    .then((data)=>{
        resultBox.innerHTML = `
        <div class="result-1 d-flex justify-content-between mt-4">
            <h2 class="">${input.value}</h2>
            <button class="btn sound-btn" onclick="soundPlay()"><i class="fa-solid fa-volume-high me-3 text-secondary sound-icon"></i></button>
        </div>
        <div class="d-flex result-2">
         <p>${data[0].meanings[0].partOfSpeech}</p>
         <p>${data[0].phonetics[1].text}</p>
       </div>
       <p id="meaning">
           ${data[0].meanings[0].definitions[0].definition}
       </p>
       <p id="example">
       ${data[0].meanings[0].definitions[0].example}
       </p>
        `;
        audio.setAttribute("src",`${data[0].phonetics[0].audio}`);

        
        // let soundBtn = document.querySelector(".sound-btn");
        // soundBtn.addEventListener("click", soundPlay);
    }).catch(()=>{
        resultBox.innerHTML = `
            <h3 class="error"> Couldn't Find The Word </h3>
        `;
    });
});

function soundPlay(){
    audio.play();
};