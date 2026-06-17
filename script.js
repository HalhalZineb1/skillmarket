const PAGES=['home','catalogue','profil','comment','tarifs','auth'];
function safePush(state,url){try{history.pushState(state,'',url);}catch(e){}}
function safeReplace(state,url){try{history.replaceState(state,'',url);}catch(e){}}
function go(page,addHistory){
  if(addHistory===undefined)addHistory=true;
  if(!PAGES.includes(page))page='home';
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById('page-'+page).classList.add('active');
  document.querySelectorAll('.navlinks a').forEach(a=>a.classList.remove('active'));
  const nl=document.getElementById('nl-'+page);
  if(nl)nl.classList.add('active');
  window.scrollTo({top:0,behavior:'smooth'});
  if(addHistory)safePush({page:page},'#'+page);
}
window.addEventListener('popstate',function(e){
  const page=(e.state&&e.state.page)?e.state.page:'home';
  go(page,false);
});
function filterSvc(btn,cat){
  document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('on'));
  btn.classList.add('on');
  document.querySelectorAll('.svc-card').forEach(c=>{
    c.style.display=(cat==='all'||c.dataset.cat===cat)?'block':'none';
  });
}
function toggleFaq(el){
  el.classList.toggle('open');
}
function switchTab(tab,form){
  document.querySelectorAll('.auth-tab').forEach(t=>t.classList.remove('on'));
  tab.classList.add('on');
  document.getElementById('signup-form').style.display=form==='signup'?'block':'none';
  document.getElementById('login-form').style.display=form==='login'?'block':'none';
  document.getElementById('success-msg').style.display='none';
}
function showSuccess(){
  document.getElementById('signup-form').style.display='none';
  document.getElementById('login-form').style.display='none';
  document.getElementById('success-msg').style.display='block';
}
const startPage=(location.hash?location.hash.slice(1):'home');
go(startPage,false);
safeReplace({page:startPage},'#'+startPage);