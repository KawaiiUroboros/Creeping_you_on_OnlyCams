const input = document.getElementById('video')
const chat = document.getElementById('chat')
var intro = 0;
alert('please, take off your glasses and make sure you can see yourself in cam well. make sure that you are not close to cam too. AN ARM BETWEEN CAM AND YOU, tnx')
Promise.all([
    faceapi.nets.ssdMobilenetv1.loadFromUri('/Creeping_you_on_OnlyCams/public/models'),
  faceapi.nets.ageGenderNet.loadFromUri('/Creeping_you_on_OnlyCams/public/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('/Creeping_you_on_OnlyCams/public/models')
]).then(startVideo)

function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    stream => input.srcObject = stream,
    err => console.error(err)
  )
}

video.addEventListener('play',() => {
    setTimeout(async()=>{
        function intro(obj){
            chat.innerHTML +=`<div class="notification is-danger is-light ">I can see you).<br>
            Your face looks like about ${Math.round(obj['age'])} years old and i think<br>
             its pretty, your body to. It doesn't metter that you <br>
            ${obj['gender']}. I still want to find your home.<br>
             Your windows are much more cosy than mine.<br>
              I want to stare at them for a while)</div>`;
            console.log(obj)
            
            
        }
        const d = await faceapi.detectSingleFace(input).withAgeAndGender(); await intro(d)},1000)
    setTimeout(5000)
    setInterval(async()=>{
        function intro(obj){
            chat.innerHTML +=`<div class="notification is-danger is-light ">I still can see you).<br>
            You look sad on ${obj['expressions']['sad']}<br> 
            You look happy on ${obj['expressions']['happy']}<br> 
            You look neutral on ${obj['expressions']['neutral']}<br>
            I know), just know <br>
            think about, even your happy face looks sad <br>
            every body know it<br>
            DONT GO</div>`;
            console.log(obj)}
    const detectionWithAgeAndGender = await faceapi.detectSingleFace(input).withFaceExpressions()
    console.log('detectionWithAgeAndGender :>> ', detectionWithAgeAndGender);await intro(detectionWithAgeAndGender)},5000);
})




