const str = "stormitel_yrzk3";
window.onload = () => {
  if(localStorage.getItem(str)){
    location.href = "/dashboard/";
  }
}
firebase.initializeApp({
  apiKey: "AIzaSyDxaJ1s1Z503zmPS_rjQYN-W6JCSM78yLM",
  authDomain: "stormsitel.firebaseapp.com",
  databaseURL: "https://stormsitel-default-rtdb.firebaseio.com",
  projectId: "stormsitel",
  storageBucket: "stormsitel.appspot.com",
  messagingSenderId: "154566252848",
  appId: "1:154566252848:web:e23dc68953dc00e77790f5"
});
const db = firebase.database();
const email = document.querySelector(".email");
const password = document.querySelector(".password");
const btn = document.querySelector(".btn");

fetch("/assets/img/a.jpg").then(res => res.blob()).then(blob => {
  document.querySelector(".hero").src = URL.createObjectURL(blob);
  document.querySelector(".dehero").src = URL.createObjectURL(blob);
})
document.querySelector(".cos").addEventListener("click", () => {
  location.href = "/signup/";
});
btn.addEventListener("click", () => {
  let nemail = email.value.replace(/\./g, '');
  if(email.value && password.value){
    btn.innerHTML = "Logging in...";
    db.ref("Users/").on("value", (s) => {
      let data = s.val();
      if(data){
        data = Object.values(data);
        data.forEach(info => {
          db.ref(`Users/${nemail}`).on("value", (d) => {
            let sync = d.val();
            //const hashed = encryptPassword(dec);
            if(sync){
              const dec = decryptPassword(sync.password);
              if(sync.email == email.value && dec == password.value){
                const encryptedEmail = encryptPassword(sync.email);
                const encryptedPassword = encryptPassword(dec);
                const res = `${encryptedEmail}=>~<=${encryptedPassword}`;
                localStorage.setItem(str, res);
                location.href = "/dashboard/";
              } else {
                btn.style.backgroundColor = "red";
                btn.style.borderColor = "red";
                btn.innerHTML = "Incorrect info!";
                btn.setAttribute("disabled", true);
                btnBtn();
              }
            } else {
              btn.style.backgroundColor = "red";
              btn.style.borderColor = "red";
              btn.innerHTML = "Incorrect info!";
              btn.setAttribute("disabled", true);
              btnBtn();
            }
          })
        })
      }
    })
  }
});
function btnBtn()
{
  setTimeout(() => {
    btn.style.backgroundColor = "orange";
    btn.style.borderColor = "orange";
    btn.innerHTML = "Log in <i class='bi bi-arrow-right-circle'></i>";
    btn.removeAttribute("disabled", true);
  }, 1500);
}
function encryptPassword(text, key=str) {
   const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,?!'_-&@#$%*()/:<>|+= ";
   let encryptedText = "";

   for (let i = 0; i < text.length; i++) {
      const textChar = text[i];
      const keyChar = key[i % key.length];

      const textIndex = alphabet.indexOf(textChar);
      const keyIndex = alphabet.indexOf(keyChar);

      if (textIndex === -1) {
         encryptText += textChar;
      } else {
         const newIndex = (textIndex + keyIndex) % alphabet.length;
         encryptedText += alphabet[newIndex];
      }
   }

   return encryptedText;
}
function decryptPassword(encryptedText, key=str) {
   const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,?!'_-&@#$%*()/:<>|+= ";
   let decryptedText = "";

   for (let i = 0; i < encryptedText.length; i++) {
      const encryptedChar = encryptedText[i];
      const keyChar = key[i % key.length];

      const encryptedIndex = alphabet.indexOf(encryptedChar);
      const keyIndex = alphabet.indexOf(keyChar);

      if (encryptedText === -1) {
         decryptedText += encryptedChar;
      } else {
         let newIndex = encryptedIndex - keyIndex;
         if (newIndex < 0) newIndex += alphabet.length;
         decryptedText += alphabet[newIndex];
      }
   }

   return decryptedText;
}