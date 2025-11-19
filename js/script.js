const FACTS = {
  origins: "Many motifs trace to local flora, royal commissions and trader exchanges; families pass motifs as heirlooms.",
  tools: "Carved wooden blocks (tehri) are passed down and often carved by specialist carvers who live in the same towns.",
  dye: "Natural dyes — indigo, madder — still feature in small workshops; dipping and fixing are labour-intensive and eco-sensitive."
}

const BADGES = {
  origins: {id:'origins', label:'Origins'},
  tools: {id:'tools', label:'Block Maker'},
  dye: {id:'dye', label:'Dyestainer'},
  pattern: {id:'pattern', label:'Pattern Finder'},
  gallery: {id:'gallery', label:'Photo Witness'}
}

const STATE_KEY = 'hiddenprints_state_v1'
let state = {badges:[], completed:[]}

function loadState(){
  try{const raw=localStorage.getItem(STATE_KEY); if(raw) state=JSON.parse(raw)}catch(e){}
}
function saveState(){localStorage.setItem(STATE_KEY,JSON.stringify(state))}

function updateProgressUI(){
  const total = 5
  const done = new Set([...state.completed, ...state.badges]).size
  const pct = Math.round((done/total)*100)
  document.getElementById('progressFill').style.width = pct+"%"
}

function renderBadges(){
  const el = document.getElementById('badges')
  el.innerHTML = ''
  Object.values(BADGES).forEach(b=>{
    const div = document.createElement('div')
    div.className = 'badge'+(state.badges.includes(b.id)?' unlocked':'')
    div.title = b.label
    div.textContent = state.badges.includes(b.id)?b.label:'Locked'
    el.appendChild(div)
  })
}

function awardBadge(id){
  if(!state.badges.includes(id)){
    state.badges.push(id); saveState(); renderBadges(); updateProgressUI()
  }
}

function markCompleted(id){
  if(!state.completed.includes(id)){
    state.completed.push(id); saveState(); updateProgressUI()
  }
}

function setupExplore(){
  document.querySelectorAll('.explore-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const id = btn.getAttribute('data-id')
      const el = document.getElementById('fact-'+id)
      el.textContent = FACTS[id] || 'Short note not available.'
      markCompleted(id)
      awardBadge(id)
    })
  })
}

// Game logic: simple match-the-pattern
const PATTERNS = [
  {id:'peshwa', class:'pattern-a', name:'Paisley-like motif'},
  {id:'flower', class:'pattern-b', name:'Floral repeat'},
  {id:'geometric', class:'pattern-c', name:'Geometric repeat'}
]

function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}

function newRound(){
  const optionsEl = document.getElementById('options')
  const swatch = document.getElementById('swatch')
  const result = document.getElementById('gameResult')
  result.textContent = ''
  const options = shuffle(PATTERNS.slice())
  const correct = options[0]
  // render swatch
  swatch.className = 'swatch ' + correct.class
  optionsEl.innerHTML = ''
  // present 3 options in random order
  const choices = shuffle(options.slice(0,3))
  choices.forEach(opt=>{
    const d = document.createElement('div')
    d.className = 'option '+opt.class
    d.dataset.id = opt.id
    d.title = opt.name
    d.addEventListener('click', ()=>{
      if(opt.id === correct.id){
        result.textContent = 'Right — you found the block! Badge awarded.'
        awardBadge('pattern')
      } else {
        result.textContent = 'Not quite — try another round.'
      }
    })
    optionsEl.appendChild(d)
  })
}

function init(){
  loadState(); renderBadges(); updateProgressUI(); setupExplore(); newRound();
  setupGallery();
  document.getElementById('newRound').addEventListener('click', newRound)
}

document.addEventListener('DOMContentLoaded', init)

// Gallery/lightbox
function setupGallery(){
  document.querySelectorAll('.gallery-thumb').forEach(img=>{
    img.addEventListener('click', ()=>{
      const src = img.getAttribute('src')
      const credit = img.dataset.credit || ''
      const lb = document.getElementById('lightbox')
      const lbImg = document.getElementById('lbImage')
      const lbCap = document.getElementById('lbCaption')
      lbImg.style.backgroundImage = `url('${src}')`
      lbCap.textContent = credit
      lb.setAttribute('aria-hidden','false')
      // award badge for viewing gallery
      awardBadge('gallery')
    })
  })
  document.getElementById('lbClose').addEventListener('click', ()=>{
    document.getElementById('lightbox').setAttribute('aria-hidden','true')
  })
}
