let selectELe = document.getElementById("breedList");

const breedurl = "https://dog.ceo/api/breeds/list/all";

document.addEventListener("DOMContentLoaded", function () {
  // alert("hello")
    getRandomPhoto();
    loadBreed(breedurl);
   
});


selectELe.addEventListener("change", function () {
    let breedname = selectELe.options[selectELe.selectedIndex].value
    getSpecificDog(breedname)
});

async function getSpecificDog(breedname) {
    let url = `https://dog.ceo/api/breed/${breedname}/images/random`
    console.log(url);
    let res = fetch(url).then(res => res.json()).then(data => { return data })
    let dogSrc = await res;
    loadPhoto(dogSrc.message)
}


async function getRandomPhoto() {
    let url = "https://dog.ceo/api/breeds/image/random"
    let response = fetch(url).then(response => response.json()).then(data => { return data })
    let src = await response;
    loadPhoto(src.message)
}

function loadPhoto(data) {
    document.getElementById("imgDiv").innerHTML =""
    let dogImg = document.createElement("img")
    dogImg.src = data
    dogImg.height = 250
    dogImg.width = 300
    document.getElementById("imgDiv").appendChild(dogImg)

}

function createOptionElement(data) {
  let myOpt = document.createElement("option");
  myOpt.value = data;
  myOpt.innerText = data;

  selectELe.appendChild(myOpt);
}

async function loadBreed(url) {
  let data = await dogApiCall(url);
  Object.keys(data.message).forEach(createOptionElement);
}

async function dogApiCall(url) {
  return await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
}


