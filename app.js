import {sen} from '/senators.js'

const section = document.querySelector('section')
const birthdayBtn = document.querySelector('.birth-btn')
const seniorityBtn = document.querySelector('.sen-btn')
const rep = document.querySelector('.rep-btn')
const dem = document.querySelector('.dem-btn')
const all = document.querySelector('.all-btn')
const win = document.querySelector('.img-window')
const color = document.querySelectorAll("button")
const searchBar = document.querySelector('.search')


color.forEach(co => {

co.addEventListener('click', () => {
if(!co.classList.contains("click")) {
    co.classList.add("click");
} else {
    co.classList.remove("click");
}
})
})

let con = document.createElement('div')
con.setAttribute('class', 'con-div')
win.appendChild(con)

searchBar.addEventListener('keyup', (e) => {
    console.log(e.target.value);
    const searchString = capitalize(e.target.value)
     const filtered  = getSimplified(sen).filter((senator) => {
        return  senator.first.includes(searchString) || senator.last.includes(searchString)
         })
         console.log(filtered)
         populateSen(filtered)
  })
    
  function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

const repulican = getSimplified(sen).filter(sen => sen.party === "R")
const demicart = getSimplified(sen).filter(sen => sen.party === "D")
const allr = getSimplified(sen).filter(sen => sen.party === "D" || sen.party === "R" || sen.party === "ID")

const con1 = document.querySelector('.con-div')

birthdayBtn.addEventListener('click', () => {
    
    getBirthdaySort()
})

seniorityBtn.addEventListener('click', () => {

    getSeniortiySort()
})

rep.addEventListener('click', () => {

    populateSen(repulican)
})

dem.addEventListener('click', () => {

    populateSen(demicart)
})

all.addEventListener('click', () => {

    populateSen(allr)
})

function populateSen(senators) {
 removeChildren(con1)
 senators.forEach(sen => {
      
      let divCard = document.createElement('div')
      divCard.setAttribute('class', "con")

      let img = document.createElement('img')
      img.setAttribute('class', 'image')
      img.src = sen.imgURL

      let party = document.createElement('h1')
      party.setAttribute('class', 'party')
      party.textContent = sen.Senparty
     
     
     
    
     

     let par = document.createElement('h2')
     par.setAttribute('class', 'par')
     if(sen.party === "R") par.textContent = "republican"
     if(sen.party === "D") par.textContent = "democrat"
     if(sen.party === "ID") par.textContent = "independent"

      let senoirtiy = document.createElement('h1')
      senoirtiy.setAttribute('class', 'senoirtiy')
      senoirtiy.textContent = sen.senoirtiy

      let missedVotes = document.createElement('h1')
      missedVotes.setAttribute('class', 'senoirtiy')
      missedVotes.textContent = sen.missedVotes

      let first = document.createElement('h1')
      let last = document.createElement('h1')

      let id = document.createElement('h1')
      id.setAttribute('class', 'id')
      id.textContent = sen.id

      let birth = document.createElement('h1')
      birth.setAttribute('class', 'birth')
      birth.textContent = sen.birth

      let name = document.createElement('h1')
      name.setAttribute('class', 'name')
      name.textContent = sen.name
    
      divCard.appendChild(name)
      divCard.appendChild(img)
      divCard.append(par)
      con1.appendChild(divCard)
 })
}

function getSimplified(senArray) {
    return senArray.map(sen => {
        let senMidName = sen.middle_name ? `${sen.middle_name}` : ``
        return{
           id: sen.govtrack_id,
           name: `${sen.first_name} ${senMidName} ${sen.last_name}`,
           party: sen.party,
           senoirtiy: parseInt(sen.senoirtiy, 10),
           birth: parseInt(sen.date_of_birth, 10),
           missedVotes: sen.missed_votes_pct,
           first: sen.first_name,
           last: sen.last_name,
           imgURL: `https://www.govtrack.us/static/legislator-photos/${sen.govtrack_id}-200px.jpeg`
        }
    })
} 


const mostSeniortiy = getSimplified(sen).reduce((acc, sen) => acc.senoirtiy >  sen.senoirtiy ?  acc : sen)

const missedVotes = getSimplified(sen).reduce((acc, sen) => acc.missedVotes >  sen.missedVotes ?  acc : sen)

function getBirthdaySort() {
    populateSen(getSimplified(sen).sort((a,b) => {
        return a.birth - b.birth
    }))
     
}
function getSeniortiySort() {
    populateSen(getSimplified(sen).sort((a,b) => {
        return a.seniority - b.seniority
    }))
     
}


function removeChildren(container) {
    while(container.firstChild) {
        container.removeChild(container.firstChild)
    }
} 
populateSen(getSimplified(sen))

//console.log(mostSeniortiy)