(function(){
'use strict';
var KEY='tu-deo.v1',DAY=864e5;
var $=function(s,r){return (r||document).querySelector(s)};
var esc=function(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})};
var norm=function(s){return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-z0-9]/g,'')};
var slug=function(s){return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')};
function shuffle(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t}return a}
function pick(a){return a[Math.floor(Math.random()*a.length)]}

/* ---------- dates ---------- */
function todayNum(){var d=new Date();return Math.floor((d.getTime()-d.getTimezoneOffset()*6e4)/DAY)}
function dstr(n){return new Date(n*DAY).toISOString().slice(0,10)}
function dowOf(n){return (new Date(n*DAY).getUTCDay()+6)%7}

/* ---------- state ---------- */
function defaults(){return{v:1,u:0,lv:'A1',set:{newPerDay:10,accent:'en-US',auto:true,slow:0.55},cards:{},custom:[],hist:{},active:['a1-basics','a1-family'],star:{}}}
function migrate(o){var d=defaults();o=o||{};var s=Object.assign({},d,o);s.set=Object.assign({},d.set,o.set||{});s.cards=o.cards||{};s.custom=o.custom||[];s.hist=o.hist||{};s.active=Array.isArray(o.active)?o.active:d.active.slice();s.star=o.star||{};if(!o.lv){s.lv='A1';if(s.active.join()==='daily,food')s.active=d.active.slice()}return s}
function load(){try{var r=localStorage.getItem(KEY);if(r)return migrate(JSON.parse(r))}catch(e){}return defaults()}
var S=load();
var SYNC='local',DOC=null,dbBusy=false,dbDirty=false,dbTimer=null;
function persist(){S.u=Date.now();try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}clearTimeout(dbTimer);if(DOC)dbTimer=setTimeout(pushDb,1500)}
function setSync(s){SYNC=s;var el=$('#sync');if(!el)return;el.className='sync'+(s==='cloud'?' cloud':s==='err'?' err':'');var m=s==='cloud'?'Đã đồng bộ':s==='err'?'Lỗi đồng bộ':'Lưu trên máy này';el.textContent=m;el.title=m}
function pushDb(){
  if(!DOC)return;if(dbBusy){dbDirty=true;return}
  dbBusy=true;
  DOC.set({u:S.u,json:JSON.stringify(S)}).then(function(){setSync('cloud')},function(){setSync('err')}).then(function(){dbBusy=false;if(dbDirty){dbDirty=false;pushDb()}});
}
function initDb(){
  try{
    if(!window.claude||!window.claude.use){setSync('local');return}
    Promise.all([window.claude.use('db'),window.claude.use('user')]).then(function(r){
      var db=r[0],user=r[1];if(!db||!user){setSync('local');return}
      return user.id().then(function(id){
        if(!id){setSync('local');return}
        DOC=db.doc('data/users/'+id+'/profile');
        return DOC.get().then(function(snap){
          if(snap.exists){
            var d=snap.data();
            if(d&&d.json){
              var remote=migrate(JSON.parse(d.json));
              if((remote.u||0)>(S.u||0)&&!SESS){S=remote;try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}buildWords();render()}
              else if((S.u||0)>(remote.u||0))pushDb();
            }
          }else if(S.u){pushDb()}
          setSync('cloud');
        });
      });
    }).catch(function(){setSync('local')});
  }catch(e){setSync('local')}
}

/* ---------- words ---------- */
var WORDS=[],BYID={};
function allTopics(){return TOPICS.concat([{id:'mine',name:'My Words',vi:'Từ của tôi',words:[]}])}
function topicById(id){return allTopics().filter(function(t){return t.id===id})[0]}
function buildWords(){
  WORDS=[];BYID={};
  TOPICS.forEach(function(t){t.words.forEach(function(w){var o={id:t.id+'.'+slug(w[0]),t:t.id,w:w[0],ipa:w[1],pos:w[2],vi:w[3],ex:w[4],exv:w[5]||'',ic:w[6]||''};WORDS.push(o);BYID[o.id]=o})});
  S.custom.forEach(function(c){var o={id:c.id,t:c.t||'mine',w:c.w,ipa:c.ipa||'',pos:c.pos||'',vi:c.vi,ex:c.ex||'',exv:'',ic:'',custom:true};WORDS.push(o);BYID[o.id]=o});
}
buildWords();
var TLV={};TOPICS.forEach(function(t){TLV[t.id]=t.lv});
function topicsOfLevel(l){return TOPICS.filter(function(t){return t.lv===l})}
function planTopicIds(){
  var has=function(id){return WORDS.some(function(w){return w.t===id&&!S.cards[w.id]})};
  var a=S.active.filter(has);if(a.length)return a;
  var ids=LEVELS.map(function(l){return l.id}),i=Math.max(0,ids.indexOf(S.lv));
  var order=TOPICS.filter(function(t){return ids.indexOf(t.lv)>=i}).concat(TOPICS.filter(function(t){return ids.indexOf(t.lv)<i}));
  for(var k=0;k<order.length;k++)if(has(order[k].id))return [order[k].id];
  return [];
}
function wordRe(w){return new RegExp('(^|[^A-Za-z])('+w.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+')(?![A-Za-z])','i')}
function hl(ex,word){if(!ex)return '';var m=wordRe(word).exec(ex);if(!m)return esc(ex);var s=m.index+m[1].length,e=s+m[2].length;return esc(ex.slice(0,s))+'<mark>'+esc(ex.slice(s,e))+'</mark>'+esc(ex.slice(e))}
function clozeOf(w){if(!w.ex)return null;var re=wordRe(w.w);if(!re.test(w.ex))return null;return w.ex.replace(re,function(m,a){return a+'_____'})}

/* ---------- scheduling (SM-2) ---------- */
function newCard(){return{ef:2.5,iv:0,rp:0,lp:0,due:0,n:0}}
function sm2(c,q){
  var ef=c.ef,iv=c.iv,rp=c.rp,lp=c.lp;
  if(q<3){rp=0;iv=1;lp+=1;ef=Math.max(1.3,ef-0.2)}
  else{
    rp+=1;
    if(rp===1)iv=1;else if(rp===2)iv=3;else iv=Math.max(c.iv+1,Math.round(c.iv*ef*(q===3?0.85:q===5?1.15:1)));
    ef=Math.max(1.3,ef+0.1-(5-q)*(0.08+(5-q)*0.02));
  }
  return Object.assign({},c,{ef:Math.round(ef*1000)/1000,iv:iv,rp:rp,lp:lp});
}
function stageOf(id){var c=S.cards[id];if(!c)return 'new';return c.iv<7?'learning':c.iv<21?'young':'mastered'}
var STAGE_VI={'new':'Chưa học',learning:'Đang học',young:'Khá nhớ',mastered:'Đã thuộc'};
function fmtIv(d){return d<30?d+' ngày':d<365?Math.round(d/30)+' tháng':(Math.round(d/36.5)/10)+' năm'}
function histGet(n){return S.hist[dstr(n)]}
function histMake(n){var k=dstr(n);return S.hist[k]||(S.hist[k]={n:0,r:0,c:0})}
function dueIds(topic){var t=todayNum();return Object.keys(S.cards).filter(function(id){return BYID[id]&&S.cards[id].due<=t&&(!topic||BYID[id].t===topic)})}
function leechIds(){return Object.keys(S.cards).filter(function(id){var c=S.cards[id];return BYID[id]&&(c.lp>=2||c.ef<1.9)})}
function unseen(topics){var out=[];topics.forEach(function(t){WORDS.forEach(function(w){if(w.t===t&&!S.cards[w.id])out.push(w)})});return out}
function newQuota(){var h=histGet(todayNum());return Math.max(0,S.set.newPerDay-(h?h.n:0))}
function streakNow(){var d=todayNum();function has(n){var h=histGet(n);return h&&(h.r>0||h.n>0)}if(!has(d))d--;var s=0;while(has(d)){s++;d--}return s}
function streakBest(){var ks=Object.keys(S.hist).filter(function(k){var h=S.hist[k];return h.r>0||h.n>0}).sort();var best=0,cur=0,prev=null;ks.forEach(function(k){var n=Math.round(Date.parse(k+'T00:00:00Z')/DAY);cur=(prev!==null&&n===prev+1)?cur+1:1;prev=n;if(cur>best)best=cur});return best}

/* ---------- speech ---------- */
var hasTTS=('speechSynthesis' in window)&&('SpeechSynthesisUtterance' in window),voices=[];
if(hasTTS){try{voices=speechSynthesis.getVoices();speechSynthesis.addEventListener('voiceschanged',function(){voices=speechSynthesis.getVoices()})}catch(e){}}
function speak(text,rate){
  if(!hasTTS)return;
  try{
    speechSynthesis.cancel();
    var u=new SpeechSynthesisUtterance(text);u.lang=S.set.accent;u.rate=rate||0.95;
    var v=voices.filter(function(v){return v.lang.replace('_','-')===S.set.accent})[0]||voices.filter(function(v){return v.lang.indexOf('en')===0})[0];
    if(v)u.voice=v;speechSynthesis.speak(u);
  }catch(e){}
}
var ICON_SPK='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 5.5a9 9 0 0 1 0 13"/></svg>';
function spk(id,lg,x){
  var dis=hasTTS?'':' disabled',c=lg?' lg':'',xa=x?' data-x="1"':'';
  return '<span class="spk"><button class="speak'+c+'" data-a="speak"'+xa+' data-id="'+esc(id)+'" aria-label="Nghe bình thường"'+dis+'>'+ICON_SPK+'</button><button class="speak slow'+c+'" data-a="speak"'+xa+' data-r="slow" data-id="'+esc(id)+'" aria-label="Nghe chậm"'+dis+'>'+ICON_SPK+'<span>Chậm</span></button></span>';
}
function spkEx(id){
  var dis=hasTTS?'':' disabled';
  return '<span class="spk"><button class="btn small" data-a="speak" data-x="1" data-id="'+esc(id)+'"'+dis+'>Nghe câu</button><button class="btn small" data-a="speak" data-x="1" data-r="slow" data-id="'+esc(id)+'"'+dis+'>Nghe câu chậm</button></span>';
}
function exBlock(w){return w.ex?'<p class="ex">'+hl(w.ex,w.w)+'</p>'+(w.exv?'<p class="exv">'+esc(w.exv)+'</p>':''):''}

/* ---------- view state ---------- */
var V={tab:'today',topic:null,sheet:null,confirm:null,msg:'',lvf:null};
var W={q:'',t:'all',s:'all',open:null};
var SESS=null;
var toastT=null;
function toast(m){var el=$('#toast');el.innerHTML='<div class="toast">'+esc(m)+'</div>';clearTimeout(toastT);toastT=setTimeout(function(){el.innerHTML=''},2600)}

/* ---------- shared pieces ---------- */
function stageCounts(ids){var r={'new':0,learning:0,young:0,mastered:0};ids.forEach(function(id){r[stageOf(id)]++});return r}
function segBar(cnt,total){
  var p=function(n){return total?(n/total*100):0};
  return '<div class="seg" role="img" aria-label="'+cnt.learning+' đang học, '+cnt.young+' khá nhớ, '+cnt.mastered+' đã thuộc, '+cnt['new']+' chưa học"><i class="a" style="width:'+p(cnt.learning)+'%"></i><i class="b" style="width:'+p(cnt.young)+'%"></i><i class="c" style="width:'+p(cnt.mastered)+'%"></i></div>';
}
function wordRow(w){
  var st=stageOf(w.id),open=W.open===w.id;
  var h='<li><button class="wmain" data-a="expand" data-id="'+esc(w.id)+'" aria-expanded="'+open+'"><span class="w">'+(w.ic?'<span class="ic sm" aria-hidden="true">'+w.ic+'</span>':'')+esc(w.w)+(w.ipa?'<small>'+esc(w.ipa)+'</small>':'')+'</span><span class="vi">'+esc(w.vi)+'</span><span class="chip s-'+st+'">'+STAGE_VI[st]+'</span></button>';
  if(open){
    h+='<div class="wdet">'+exBlock(w)+'<div class="tools">'+spk(w.id)+(w.ex?spkEx(w.id):'')+'<button class="btn small" data-a="star" data-id="'+esc(w.id)+'">'+(S.star[w.id]?'Bỏ đánh dấu sao':'Đánh dấu sao')+'</button>'+(w.pos?'<span class="chip">'+esc(w.pos)+'</span>':'')+(S.cards[w.id]?'<span class="chip">Ôn lại sau '+fmtIv(Math.max(0,S.cards[w.id].due-todayNum()))+'</span>':'');
    if(w.custom)h+='<button class="btn small" data-a="sheet" data-s="edit" data-id="'+esc(w.id)+'">Sửa</button><button class="btn small" data-a="delWord" data-id="'+esc(w.id)+'">'+(V.confirm==='del:'+w.id?'Bấm lần nữa để xóa':'Xóa')+'</button>';
    h+='</div></div>';
  }
  return h+'</li>';
}

/* ---------- views ---------- */
function todayHTML(){
  var t=todayNum(),due=dueIds().length,avail=unseen(planTopicIds()).length,nNew=Math.min(newQuota(),avail),total=due+nNew;
  var hs=histGet(t),studied=hs&&(hs.r>0||hs.n>0);
  var label=new Date().toLocaleDateString('vi-VN',{weekday:'long',day:'numeric',month:'long'});
  var h='<div class="sec" style="gap:24px"><section class="hero"><p class="eyebrow">'+esc(label)+' · Trình độ '+esc(S.lv)+'</p>';
  if(total>0){
    h+='<h1><span class="big">'+total+'</span> từ cho hôm nay</h1><p class="muted">'+due+' từ cần ôn · '+nNew+' từ mới</p><div class="row"><button class="btn primary lg" data-a="startDaily">'+(studied?'Học tiếp':'Bắt đầu học')+'</button></div>';
  }else if(studied){
    h+='<h1>Xong việc hôm nay</h1><p class="muted">Các từ đã học sẽ quay lại đúng lúc bạn sắp quên chúng.</p><div class="row">'+(avail>0?'<button class="btn primary lg" data-a="startExtra">Học thêm 5 từ mới</button>':'')+'</div>';
  }else{
    h+='<h1>Chưa có gì để học</h1><p class="muted">Thêm một chủ đề vào kế hoạch hàng ngày để bắt đầu.</p><div class="row"><button class="btn primary lg" data-a="tab" data-t="topics">Chọn chủ đề</button></div>';
  }
  h+='</section>';
  var m0=t-dowOf(t),names=['T2','T3','T4','T5','T6','T7','CN'];
  h+='<div class="week" aria-label="Tuần này">';
  for(var i=0;i<7;i++){var n=m0+i,hh=histGet(n),on=hh&&(hh.r>0||hh.n>0);h+='<span class="'+(on?'on ':'')+(n===t?'now':'')+'"><i></i>'+names[i]+'</span>'}
  h+='</div>';
  var started=Object.keys(S.cards).filter(function(id){return BYID[id]}).length,acc=accuracy(30);
  h+='<div class="trio"><div><b>'+streakNow()+'</b><span>ngày liên tiếp</span></div><div><b>'+started+'<small class="muted" style="font-size:15px;font-weight:600">/'+WORDS.length+'</small></b><span>từ đã học</span></div><div><b>'+(acc==null?'–':acc+'%')+'</b><span>đúng trong 30 ngày</span></div></div>';
  h+='<section class="sec"><header><h2>Luyện nghe</h2></header><p class="muted">Nghe một câu ngắn rồi gõ lại. Có nút nghe chậm khi bạn cần.</p><div class="row"><button class="btn" data-a="startDict"'+(hasTTS?'':' disabled')+'>Nghe chép 8 câu</button></div></section>';
  h+='<section class="sec"><header><h2>Kế hoạch học</h2><button class="btn small quiet" data-a="tab" data-t="topics">Chỉnh sửa</button></header><div class="grid">';
  S.active.forEach(function(id){var tp=topicById(id);if(!tp)return;var ids=WORDS.filter(function(w){return w.t===id}).map(function(w){return w.id});var c=stageCounts(ids);h+='<button class="topic" data-a="openTopic" data-id="'+id+'"><h3>'+esc(tp.name)+'</h3>'+segBar(c,ids.length)+'<div class="meta"><span>'+esc(tp.vi)+'</span><span>'+(ids.length-c['new'])+'/'+ids.length+'</span></div></button>'});
  if(!S.active.length)h+='<p class="muted">Chưa có chủ đề nào trong kế hoạch.</p>';
  h+='</div></section>';
  var pt=planTopicIds();
  if(pt.length&&!S.active.some(function(id){return pt.indexOf(id)>=0}))h+='<p class="muted">Các chủ đề trong kế hoạch đã học hết từ mới. Từ mới hôm nay lấy từ chủ đề '+esc(topicById(pt[0]).name)+'.</p>';
  var lc=leechIds().length;
  if(lc>=3)h+='<section class="sec"><header><h2>Từ hay quên</h2></header><p class="muted">'+lc+' từ bạn hay nhầm. Ôn riêng một lượt sẽ giúp nhớ chắc hơn.</p><div class="row"><button class="btn" data-a="startHard">Ôn các từ hay quên</button></div></section>';
  return h+'</div>';
}
function accuracy(days){var t=todayNum(),r=0,c=0;for(var i=0;i<days;i++){var h=histGet(t-i);if(h){r+=h.r;c+=h.c}}return r?Math.round(c/r*100):null}

function topicCard(tp){
  var ids=WORDS.filter(function(w){return w.t===tp.id}).map(function(w){return w.id}),c=stageCounts(ids),on=S.active.indexOf(tp.id)>=0;
  return '<button class="topic" data-a="openTopic" data-id="'+tp.id+'"><div class="row" style="justify-content:space-between;flex-wrap:nowrap;align-items:flex-start"><h3>'+esc(tp.name)+'</h3>'+(on?'<span class="chip acc">Trong kế hoạch</span>':'')+'</div><span class="muted" style="font-size:13px">'+esc(tp.vi)+'</span>'+segBar(c,ids.length)+'<div class="meta"><span>'+(ids.length-c['new'])+' / '+ids.length+' từ đã học</span><span>'+c.mastered+' đã thuộc</span></div></button>';
}
function topicsHTML(){
  var f=V.lvf||S.lv;
  var h='<div class="sec" style="gap:20px"><header><h2>Chủ đề</h2><button class="btn small" data-a="sheet" data-s="add">Thêm từ của bạn</button></header><div class="chips" role="group" aria-label="Lọc theo trình độ">';
  [{id:'all'}].concat(LEVELS).forEach(function(l){h+='<button class="fchip" data-a="lvf" data-l="'+l.id+'" aria-pressed="'+(f===l.id)+'">'+(l.id==='all'?'Tất cả':l.id)+'</button>'});
  h+='</div>';
  LEVELS.filter(function(l){return f==='all'||f===l.id}).forEach(function(l){
    var ts=topicsOfLevel(l.id),ids=[];
    ts.forEach(function(t){WORDS.forEach(function(w){if(w.t===t.id)ids.push(w.id)})});
    var c=stageCounts(ids);
    h+='<section class="sec"><header><div><h3 style="font-size:20px">'+l.id+' · '+esc(l.vi)+(l.id===S.lv?' <span class="chip acc">Trình độ của bạn</span>':'')+'</h3><p class="muted" style="font-size:13px">'+esc(l.desc)+'</p></div><span class="muted" style="font-size:13px">'+(ids.length-c['new'])+' / '+ids.length+' từ đã học</span></header><div class="grid">'+ts.map(topicCard).join('')+'</div></section>';
  });
  if(WORDS.some(function(w){return w.t==='mine'}))h+='<section class="sec"><header><h3 style="font-size:20px">Từ của tôi</h3></header><div class="grid">'+topicCard(topicById('mine'))+'</div></section>';
  return h+'</div>';
}
function topicHTML(){
  var tp=topicById(V.topic);if(!tp){V.topic=null;return topicsHTML()}
  var ws=WORDS.filter(function(w){return w.t===tp.id}),ids=ws.map(function(w){return w.id}),c=stageCounts(ids),nNew=Math.min(S.set.newPerDay,c['new']),nDue=dueIds(tp.id).length,on=S.active.indexOf(tp.id)>=0;
  var h='<div class="sec" style="gap:18px"><div class="row"><button class="btn small quiet" data-a="back">← Chủ đề</button></div><header class="sec" style="gap:6px"><h1 style="font-size:34px;font-weight:800">'+esc(tp.name)+'</h1><p class="muted">'+(tp.lv?tp.lv+' · ':'')+esc(tp.vi)+' · '+ws.length+' từ</p></header>';
  h+=segBar(c,ids.length)+'<div class="legend"><span class="a"><i></i>Đang học <b>'+c.learning+'</b></span><span class="b"><i></i>Khá nhớ <b>'+c.young+'</b></span><span class="c"><i></i>Đã thuộc <b>'+c.mastered+'</b></span><span><i></i>Chưa học <b>'+c['new']+'</b></span></div>';
  h+='<div class="row"><button class="btn primary" data-a="startTopic" data-id="'+tp.id+'"'+((nNew+nDue)?'':' disabled')+'>'+(nNew?'Học '+nNew+' từ mới':'Ôn tập')+(nDue&&nNew?' + ôn '+nDue:nDue?' ('+nDue+' từ)':'')+'</button><button class="btn" data-a="toggleActive" data-id="'+tp.id+'">'+(on?'Bỏ khỏi kế hoạch':'Thêm vào kế hoạch hàng ngày')+'</button><button class="btn" data-a="startDict" data-id="'+tp.id+'"'+(hasTTS?'':' disabled')+'>Nghe chép câu</button>'+(tp.id==='mine'?'<button class="btn" data-a="sheet" data-s="add">Thêm từ</button>':'')+'</div>';
  h+='<ul class="list">'+ws.map(wordRow).join('')+'</ul></div>';
  return h;
}
function wordsHTML(){
  var h='<div class="sec"><header><h2>Từ vựng</h2><div class="row"><button class="btn small" data-a="sheet" data-s="add">Thêm từ</button><button class="btn small" data-a="sheet" data-s="import">Nhập hàng loạt</button></div></header><div class="tools"><input id="wq" type="search" placeholder="Tìm từ hoặc nghĩa" value="'+esc(W.q)+'" aria-label="Tìm từ"><select id="wt" aria-label="Chủ đề"><option value="all">Mọi chủ đề</option>';
  LEVELS.forEach(function(l){h+='<option value="lv:'+l.id+'"'+(W.t==='lv:'+l.id?' selected':'')+'>Trình độ '+l.id+'</option>'});
  allTopics().forEach(function(t){h+='<option value="'+t.id+'"'+(W.t===t.id?' selected':'')+'>'+(t.lv?t.lv+' · ':'')+esc(t.name)+'</option>'});
  h+='</select><select id="ws" aria-label="Trạng thái">';
  [['all','Mọi trạng thái'],['new','Chưa học'],['learning','Đang học'],['young','Khá nhớ'],['mastered','Đã thuộc'],['star','Đã gắn sao']].forEach(function(o){h+='<option value="'+o[0]+'"'+(W.s===o[0]?' selected':'')+'>'+o[1]+'</option>'});
  return h+'</select></div><p class="muted" id="wcount"></p><ul class="list" id="wl"></ul></div>';
}
function filteredWords(){
  var q=W.q.trim().toLowerCase();
  return WORDS.filter(function(w){
    if(W.t!=='all'){if(W.t.indexOf('lv:')===0){if(TLV[w.t]!==W.t.slice(3))return false}else if(w.t!==W.t)return false}
    if(W.s==='star'){if(!S.star[w.id])return false}else if(W.s!=='all'&&stageOf(w.id)!==W.s)return false;
    if(q&&w.w.toLowerCase().indexOf(q)<0&&w.vi.toLowerCase().indexOf(q)<0)return false;
    return true;
  });
}
function renderWordList(){
  var l=$('#wl');if(!l)return;var ws=filteredWords();
  $('#wcount').textContent=ws.length+' từ';
  l.innerHTML=ws.length?ws.map(wordRow).join(''):'<li class="empty">Không có từ nào khớp.</li>';
}
function statsHTML(){
  var t=todayNum(),ids=WORDS.map(function(w){return w.id}),c=stageCounts(ids),started=ids.length-c['new'];
  var h='<div class="sec" style="gap:28px"><header><h2>Tiến độ</h2></header>';
  h+='<section class="sec"><h3 style="font-size:18px">Mức độ nhớ</h3>'+segBar(c,ids.length)+'<div class="legend"><span class="a"><i></i>Đang học <b>'+c.learning+'</b></span><span class="b"><i></i>Khá nhớ <b>'+c.young+'</b></span><span class="c"><i></i>Đã thuộc <b>'+c.mastered+'</b></span><span><i></i>Chưa học <b>'+c['new']+'</b></span></div><p class="muted" style="font-size:13px">Đang học: ôn lại sau dưới 7 ngày. Khá nhớ: 7 đến 20 ngày. Đã thuộc: từ 21 ngày trở lên.</p></section>';
  h+='<section class="sec"><h3 style="font-size:18px">Theo trình độ</h3>'+LEVELS.map(function(l){var ids=[];TOPICS.forEach(function(t){if(t.lv===l.id)WORDS.forEach(function(w){if(w.t===t.id)ids.push(w.id)})});var c=stageCounts(ids);return '<div class="lvrow"><span class="lvn">'+l.id+'</span><div style="flex:1;min-width:0">'+segBar(c,ids.length)+'</div><span class="muted lvc">'+(ids.length-c['new'])+'/'+ids.length+'</span></div>'}).join('')+'</section>';
  var acc=accuracy(30),b=streakBest();
  h+='<div class="trio"><div><b>'+streakNow()+'</b><span>chuỗi hiện tại</span></div><div><b>'+b+'</b><span>chuỗi dài nhất</span></div><div><b>'+(acc==null?'–':acc+'%')+'</b><span>đúng trong 30 ngày</span></div></div>';
  /* forecast */
  var fc=[];for(var i=0;i<7;i++)fc.push(0);
  Object.keys(S.cards).forEach(function(id){if(!BYID[id])return;var d=S.cards[id].due-t;if(d<=0)fc[0]++;else if(d<7)fc[d]++});
  var mx=Math.max.apply(null,fc.concat([1])),dn=['T2','T3','T4','T5','T6','T7','CN'];
  h+='<section class="sec"><h3 style="font-size:18px">Từ cần ôn 7 ngày tới</h3><div class="fc" role="img" aria-label="Số từ cần ôn mỗi ngày: '+fc.join(', ')+'">';
  fc.forEach(function(n,i){h+='<div class="'+(i===0?'today':'')+'"><span class="n">'+n+'</span><span class="b" style="height:'+Math.round(n/mx*100*0.78)+'%"></span><span class="d">'+(i===0?'Nay':dn[dowOf(t+i)])+'</span></div>'});
  h+='</div></section>';
  /* heatmap */
  var weeks=16,start=t-dowOf(t)-(weeks-1)*7,cells='';
  for(var k=0;k<weeks*7;k++){var n=start+k,hh=histGet(n),cnt=hh?hh.r+hh.n:0,lv=cnt===0?0:cnt<10?1:cnt<25?2:cnt<50?3:4;cells+='<i class="'+(lv?'l'+lv:'')+(n>t?' f':'')+'" title="'+dstr(n).split('-').reverse().slice(0,2).join('/')+': '+cnt+' lượt"></i>'}
  h+='<section class="sec"><h3 style="font-size:18px">16 tuần gần đây</h3><div class="heat" role="img" aria-label="Lịch sử học 16 tuần">'+cells+'</div><p class="muted" style="font-size:13px;display:flex;gap:8px;align-items:center">Ít <span class="ramp"><i style="background:var(--h0)"></i><i style="background:var(--h1)"></i><i style="background:var(--h2)"></i><i style="background:var(--h3)"></i><i style="background:var(--h4)"></i></span> Nhiều</p></section>';
  /* hard words */
  var hard=leechIds().map(function(id){return BYID[id]}).sort(function(a,b){return S.cards[b.id].lp-S.cards[a.id].lp}).slice(0,8);
  h+='<section class="sec"><header><h3 style="font-size:18px">Từ hay quên</h3>'+(hard.length>=1?'<button class="btn small" data-a="startHard">Ôn riêng</button>':'')+'</header>';
  h+=hard.length?'<ul class="list">'+hard.map(function(w){return '<li><div class="wmain" style="cursor:default"><span class="w">'+esc(w.w)+'</span><span class="vi">'+esc(w.vi)+'</span><span class="chip">quên '+S.cards[w.id].lp+' lần</span></div></li>'}).join('')+'</ul>':'<p class="muted">Chưa có từ nào bị quên nhiều lần.</p>';
  return h+'</section></div>';
}

/* ---------- session ---------- */
function pickType(id,phase){
  var w=BYID[id],c=S.cards[id],cl=!!clozeOf(w),pic=!!w.ic;
  if(phase==='new1'||phase==='relearn'){var p0=['choice','choiceRev'];if(pic)p0.push('picWord','picWord');return pick(p0)}
  if(phase==='new2'){var o=['type'];if(cl)o.push('cloze');if(hasTTS)o.push('listen');return pick(o)}
  var iv=c?c.iv:0,p;
  if(iv<4){p=['choice','choiceRev'];if(hasTTS)p.push('listen');if(pic){p.push('picWord');if(hasTTS)p.push('picListen')}}
  else if(iv<14){p=['type','choiceRev','flip'];if(cl)p.push('cloze');if(pic&&hasTTS)p.push('picListen')}
  else{p=['type','flip'];if(cl)p.push('cloze')}
  return pick(p);
}
function startDict(topic){
  if(!hasTTS){toast('Trình duyệt này không hỗ trợ giọng đọc nên chưa luyện nghe chép được');return}
  var ids=LEVELS.map(function(l){return l.id}),maxLv=Math.max(0,ids.indexOf(S.lv));
  var learned=Object.keys(S.cards).map(function(id){return BYID[id]}).filter(function(w){return w&&w.ex&&(!topic||w.t===topic)});
  var easy=learned.filter(function(w){return ids.indexOf(TLV[w.t])<=maxLv});
  var pool=easy.length>=5?easy:learned;
  if(pool.length<6){var pt=topic?[topic]:planTopicIds();pool=pool.concat(WORDS.filter(function(w){return w.ex&&!S.cards[w.id]&&pt.indexOf(w.t)>=0}))}
  pool=shuffle(pool).slice(0,8);
  if(!pool.length){toast('Chưa có câu nào để luyện');return}
  SESS={mode:'dict',queue:pool.map(function(w){return{id:w.id,type:'dictate',phase:'dict'}}),cur:null,ui:null,done:{},doneN:0,wrong:{},stats:{ans:0,ok:0,fresh:0,rev:0},total:pool.length,finished:false,speak:false};
  nextTask();render();
}
function startSession(mode,topic){
  if(mode==='dict'){startDict(topic);return}
  var q=[],today=todayNum(),dueL=[],newL=[];
  if(mode==='hard'){dueL=leechIds()}
  else if(mode==='extra'){newL=unseen(planTopicIds()).slice(0,5)}
  else if(mode==='topic'){dueL=dueIds(topic);newL=unseen([topic]).slice(0,S.set.newPerDay)}
  else{dueL=dueIds();newL=unseen(planTopicIds()).slice(0,newQuota())}
  dueL=shuffle(dueL).slice(0,30);
  if(!dueL.length&&!newL.length){toast('Chưa có từ nào để học lúc này');return}
  SESS={mode:mode,queue:[],cur:null,ui:null,done:{},doneN:0,wrong:{},stats:{ans:0,ok:0,fresh:0,rev:0},total:dueL.length+newL.length,finished:false,speak:false};
  dueL.forEach(function(id){SESS.queue.push({id:id,type:pickType(id,'rev'),phase:'rev'})});
  newL.forEach(function(w){SESS.queue.push({id:w.id,type:'intro',phase:'intro'})});
  nextTask();render();
}
function insertTask(t,off){SESS.queue.splice(Math.min(off,SESS.queue.length),0,t)}
function makeOpts(id,kind){
  if(kind==='ic'){
    var tw=BYID[id],others=shuffle(WORDS.filter(function(x){return x.ic&&x.id!==id&&x.ic!==tw.ic}));
    var diff=others.filter(function(x){return x.t!==tw.t}),same=others.filter(function(x){return x.t===tw.t}),seenI={},outI=[];
    seenI[tw.ic]=1;
    diff.concat(same).some(function(x){if(seenI[x.ic])return false;seenI[x.ic]=1;outI.push(x);return outI.length===3});
    return shuffle([tw].concat(outI)).map(function(x){return{id:x.id,text:x.ic,ok:x.id===id}});
  }
  var w=BYID[id],seen={},out=[];seen[kind==='vi'?w.vi:norm(w.w)]=1;
  var same=shuffle(WORDS.filter(function(x){return x.id!==id&&x.pos===w.pos})).slice(0,8),rest=shuffle(WORDS.filter(function(x){return x.id!==id}));
  same.concat(rest).some(function(x){var k=kind==='vi'?x.vi:norm(x.w);if(seen[k])return false;seen[k]=1;out.push(x);return out.length===3});
  return shuffle([w].concat(out)).map(function(x){return{id:x.id,text:kind==='vi'?x.vi:x.w,ok:x.id===id}});
}
function nextTask(){
  var t=SESS.queue.shift();SESS.cur=t||null;
  if(!t){SESS.finished=true;return}
  var u={fb:null,hint:false,shown:false,chosen:-1,opts:null};
  if(t.type==='choice')u.opts=makeOpts(t.id,'vi');
  if(t.type==='choiceRev'||t.type==='listen')u.opts=makeOpts(t.id,'en');
  if(t.type==='picWord'||t.type==='picListen')u.opts=makeOpts(t.id,'ic');
  SESS.ui=u;
  SESS.speak=(t.type==='listen'||t.type==='picListen'||t.type==='dictate')||(S.set.auto&&(t.type==='intro'||t.type==='choice'));
}
function markDone(id){if(!SESS.done[id]){SESS.done[id]=1;SESS.doneN++}}
function answer(ok,o){
  o=o||{};
  var t=SESS.cur,id=t.id,today=todayNum(),h=histMake(today);
  h.r++;if(ok)h.c++;SESS.stats.ans++;if(ok)SESS.stats.ok++;
  if(t.phase==='new1'){
    if(ok)insertTask({id:id,type:pickType(id,'new2'),phase:'new2'},5);
    else{SESS.wrong[id]=1;insertTask({id:id,type:pickType(id,'new1'),phase:'new1'},2)}
  }else if(t.phase==='new2'){
    if(ok){
      var c0=sm2(newCard(),(SESS.wrong[id]||o.hint)?3:4);c0.due=today+c0.iv;c0.n=1;S.cards[id]=c0;h.n++;SESS.stats.fresh++;markDone(id);
    }else{SESS.wrong[id]=1;insertTask({id:id,type:pickType(id,'new1'),phase:'new1'},2)}
  }else if(t.phase==='rev'){
    var c=S.cards[id];SESS.stats.rev++;
    if(ok){
      var q=o.q||(o.hint?3:((t.type==='type'||t.type==='cloze')?5:4));
      var n=sm2(c,q);n.due=today+n.iv;n.n=(c.n||0)+1;S.cards[id]=n;markDone(id);
    }else{
      var m=sm2(c,1);m.due=today+1;m.n=(c.n||0)+1;S.cards[id]=m;SESS.wrong[id]=1;
      insertTask({id:id,type:pickType(id,'relearn'),phase:'relearn'},3);
    }
  }else if(t.phase==='relearn'){
    if(ok)markDone(id);else insertTask({id:id,type:pickType(id,'relearn'),phase:'relearn'},2);
  }else if(t.phase==='dict'){
    if(ok||t.retry||(o.score||0)>=0.7)markDone(id);else insertTask({id:id,type:'dictate',phase:'dict',retry:1},3);
  }
  persist();
}
function icHTML(w,size){return w.ic?'<span class="ic'+(size==='md'?' md':'')+'" aria-hidden="true">'+w.ic+'</span>':''}
function audioOf(t){var w=BYID[t.id];return t.type==='dictate'?w.ex:w.w}
function toks(s){return (String(s).toLowerCase().replace(/[‘’]/g,"'").match(/[a-z0-9']+/g)||[])}
function tkey(t){return t.replace(/'/g,'')}
function wordCount(s){return toks(s).length}
function dictCompare(ex,typed){
  var tt=toks(ex).map(tkey),uu=toks(typed).map(tkey),n=tt.length,m=uu.length,dp=[],i,j;
  for(i=0;i<=n;i++)dp.push(new Array(m+1).fill(0));
  for(i=1;i<=n;i++)for(j=1;j<=m;j++)dp[i][j]=tt[i-1]===uu[j-1]?dp[i-1][j-1]+1:Math.max(dp[i-1][j],dp[i][j-1]);
  var marks=new Array(n).fill(false);i=n;j=m;
  while(i>0&&j>0){if(tt[i-1]===uu[j-1]){marks[i-1]=true;i--;j--}else if(dp[i-1][j]>=dp[i][j-1])i--;else j--}
  var hit=marks.filter(Boolean).length;
  return{marks:marks,hit:hit,total:n,score:n?hit/n:0,ok:n>0&&hit===n};
}
function dictLine(ex,marks){var i=0;return String(ex).split(/([A-Za-z0-9’']+)/).map(function(p,k){if(k%2===0)return esc(p);var m=marks[i++];return '<span class="dw '+(m?'ok':'miss')+'">'+esc(p)+'</span>'}).join('')}
function dictFb(w,fb){
  if(!fb)return '';
  var head=fb.ok?'Chính xác!':(fb.score>=0.7?'Gần đúng ('+fb.hit+'/'+fb.total+' từ)':'Chưa đúng ('+fb.hit+'/'+fb.total+' từ)');
  return '<div class="fb '+(fb.ok?'ok':'bad')+'"><strong>'+head+'</strong><div class="dline">'+dictLine(w.ex,fb.marks)+'</div>'+(w.exv?'<div class="exv">'+esc(w.exv)+'</div>':'')+'<div class="muted" style="font-size:13px">Bạn gõ: '+esc(fb.typed)+'</div><div>'+spkEx(w.id)+'</div><button class="btn primary" data-a="sNext">Tiếp tục</button></div>';
}
function revealHTML(w){
  return '<div class="wd">'+icHTML(w,'md')+'<b>'+esc(w.w)+'</b>'+(w.ipa?'<span class="ipa">'+esc(w.ipa)+'</span>':'')+spk(w.id)+'</div><div>'+esc(w.vi)+'</div>'+(w.ex?'<div class="ex">'+hl(w.ex,w.w)+'</div>'+(w.exv?'<div class="exv">'+esc(w.exv)+'</div>':'')+'<div>'+spkEx(w.id)+'</div>':'');
}
function patternOf(w,hint){
  return w.split(' ').map(function(p){return p.split('').map(function(ch,i){if(!/[A-Za-zÀ-ÿ]/.test(ch))return ch;return(hint&&i===0)?ch:'_'}).join(' ')}).join('   ');
}
function sessionHTML(){
  var t=SESS.cur,w=BYID[t.id],u=SESS.ui,fb=u.fb;
  var pct=SESS.total?Math.round(SESS.doneN/SESS.total*100):0,body='';
  var opts=function(){return '<div class="opts">'+u.opts.map(function(o,i){var cls='opt'+(fb?(o.ok?' ok':(u.chosen===i?' bad':'')):'');return '<button class="'+cls+'" data-a="sOpt" data-i="'+i+'"'+(fb?' disabled':'')+'><span class="k">'+(i+1)+'</span><span>'+esc(o.text)+'</span></button>'}).join('')+'</div>'};
  var fbBox=function(){return fb?'<div class="fb '+(fb.ok?'ok':'bad')+'"><strong>'+(fb.ok?pick(['Chính xác!','Đúng rồi!','Tốt lắm!']):'Chưa đúng')+'</strong>'+revealHTML(w)+'<button class="btn primary" data-a="sNext">Tiếp tục</button></div>':''};
  if(t.type==='intro'){
    body='<div class="card"><span class="chip acc">Từ mới</span>'+icHTML(w)+'<div class="big">'+esc(w.w)+'</div><div class="row" style="justify-content:center">'+(w.ipa?'<span class="ipa" style="font-size:18px">'+esc(w.ipa)+'</span>':'')+spk(w.id)+(w.pos?'<span class="chip">'+esc(w.pos)+'</span>':'')+'</div><div class="vi-big">'+esc(w.vi)+'</div>'+exBlock(w)+(w.ex?'<div class="row" style="justify-content:center">'+spkEx(w.id)+'</div>':'')+'</div><button class="btn primary lg" data-a="sGot">Đã hiểu, tiếp tục</button>';
  }else if(t.type==='choice'){
    body='<div class="card"><span class="prompt">Từ này nghĩa là gì?</span>'+icHTML(w)+'<div class="big">'+esc(w.w)+'</div><div class="row" style="justify-content:center">'+(w.ipa?'<span class="ipa">'+esc(w.ipa)+'</span>':'')+spk(w.id)+'</div></div>'+opts()+fbBox();
  }else if(t.type==='choiceRev'){
    body='<div class="card"><span class="prompt">Từ tiếng Anh nào có nghĩa này?</span><div class="vi-big">'+esc(w.vi)+'</div>'+(w.pos?'<span class="chip">'+esc(w.pos)+'</span>':'')+'</div>'+opts()+fbBox();
  }else if(t.type==='listen'){
    body='<div class="card"><span class="prompt">Nghe và chọn từ bạn nghe được</span>'+spk(w.id,true)+'</div>'+opts()+fbBox();
  }else if(t.type==='type'){
    body='<div class="card"><span class="prompt">Gõ từ tiếng Anh</span><div class="vi-big">'+esc(w.vi)+'</div>'+(w.pos?'<span class="chip">'+esc(w.pos)+'</span>':'')+'<div class="pat">'+esc(patternOf(w.w,u.hint))+'</div></div>'+inputHTML(fb)+fbBox();
  }else if(t.type==='cloze'){
    body='<div class="card"><span class="prompt">Điền từ còn thiếu</span><p class="ex blank">'+esc(clozeOf(w))+'</p>'+(w.exv?'<p class="exv">'+esc(w.exv)+'</p>':'')+'<p class="muted" style="font-size:14px">'+esc(w.vi)+'</p><div class="pat">'+esc(patternOf(w.w,u.hint))+'</div></div>'+inputHTML(fb)+fbBox();
  }else if(t.type==='picWord'||t.type==='picListen'){
    var picOpts='<div class="picopts">'+u.opts.map(function(o,i){var cls='pic'+(fb?(o.ok?' ok':(u.chosen===i?' bad':'')):'');return '<button class="'+cls+'" data-a="sOpt" data-i="'+i+'" aria-label="Hình '+(i+1)+'"'+(fb?' disabled':'')+'><span class="k">'+(i+1)+'</span><span class="emo" aria-hidden="true">'+o.text+'</span></button>'}).join('')+'</div>';
    body=(t.type==='picWord'?'<div class="card"><span class="prompt">Chọn hình đúng với từ này</span><div class="big">'+esc(w.w)+'</div><div class="row" style="justify-content:center">'+(w.ipa?'<span class="ipa">'+esc(w.ipa)+'</span>':'')+spk(w.id)+'</div></div>':'<div class="card"><span class="prompt">Nghe và chọn hình đúng</span>'+spk(w.id,true)+'</div>')+picOpts+fbBox();
  }else if(t.type==='dictate'){
    body='<div class="card"><span class="prompt">Nghe và gõ lại câu bạn nghe được</span>'+spk(w.id,true,true)+'<div class="pat">'+esc(u.hint?patternOf(w.ex,true):wordCount(w.ex)+' từ')+'</div></div>'+inputHTML(fb)+dictFb(w,fb);
  }else if(t.type==='flip'){
    if(!u.shown)body='<div class="card"><span class="prompt">Bạn còn nhớ nghĩa không?</span><div class="big">'+esc(w.w)+'</div><div class="row" style="justify-content:center">'+(w.ipa?'<span class="ipa">'+esc(w.ipa)+'</span>':'')+spk(w.id)+'</div></div><button class="btn primary lg" data-a="sShow">Xem đáp án</button>';
    else{
      var c=S.cards[t.id],iv=function(q){return fmtIv(sm2(c,q).iv)};
      body='<div class="card">'+icHTML(w)+'<div class="big" style="font-size:40px">'+esc(w.w)+'</div><div class="vi-big">'+esc(w.vi)+'</div>'+exBlock(w)+'</div><div class="grades"><button data-a="sGrade" data-q="1">Quên<small>học lại</small></button><button data-a="sGrade" data-q="3">Khó<small>'+iv(3)+'</small></button><button data-a="sGrade" data-q="4">Nhớ<small>'+iv(4)+'</small></button><button data-a="sGrade" data-q="5">Dễ<small>'+iv(5)+'</small></button></div>';
    }
  }
  return '<div class="sess"><div class="sbar"><button class="x" data-a="sExit" aria-label="Thoát buổi học">×</button><div class="prog" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="'+pct+'"><i style="width:'+pct+'%"></i></div><span class="cnt">'+SESS.doneN+'/'+SESS.total+'</span></div>'+body+'</div>';
}
function inputHTML(fb){
  if(fb)return '';
  return '<input class="ans" id="ans" type="text" autocomplete="off" autocapitalize="none" autocorrect="off" spellcheck="false" aria-label="Câu trả lời"><div class="row" style="justify-content:center"><button class="btn primary" data-a="sCheck">Kiểm tra</button><button class="btn" data-a="sHint">Gợi ý</button><button class="btn quiet" data-a="sSkip">Không biết</button></div>';
}
function summaryHTML(){
  var s=SESS.stats,acc=s.ans?Math.round(s.ok/s.ans*100):0,t=todayNum(),tm=Object.keys(S.cards).filter(function(id){return BYID[id]&&S.cards[id].due<=t+1}).length;
  return '<div class="sess"><div class="summary"><span class="mark" style="width:48px;height:40px" aria-hidden="true"></span><h1 style="font-size:32px;font-weight:800">Hoàn thành buổi học</h1><div class="big">'+acc+'%</div><p class="muted">'+(SESS.mode==='dict'?SESS.total+' câu đã chép · '+s.ans+' lượt gõ':s.ans+' câu trả lời · '+s.fresh+' từ mới · '+s.rev+' từ đã ôn')+'</p><p>Chuỗi hiện tại: <b>'+streakNow()+' ngày</b>. Sẽ có '+tm+' từ cần ôn vào ngày mai.</p><div class="row" style="justify-content:center"><button class="btn primary lg" data-a="sDone">Về trang chủ</button>'+(unseen(planTopicIds()).length&&SESS.mode!=='hard'&&SESS.mode!=='dict'?'<button class="btn" data-a="startExtra">Học thêm 5 từ mới</button>':'')+'</div></div></div>';
}

/* ---------- sheets ---------- */
function sheetHTML(){
  var s=V.sheet;if(!s)return '';
  var close='<button class="x" data-a="sheetClose" aria-label="Đóng">×</button>',body='';
  if(s==='settings'){
    body='<header><h2>Cài đặt</h2>'+close+'</header>'+
    '<div class="field"><label for="set-l">Trình độ hiện tại của bạn</label><select id="set-l">'+LEVELS.map(function(l){return '<option value="'+l.id+'"'+(S.lv===l.id?' selected':'')+'>'+l.id+' · '+esc(l.vi)+'</option>'}).join('')+'</select></div>'+
    '<div class="field"><label for="set-n">Số từ mới mỗi ngày</label><select id="set-n">'+[5,10,15,20,30].map(function(n){return '<option'+(S.set.newPerDay===n?' selected':'')+'>'+n+'</option>'}).join('')+'</select></div>'+
    '<div class="field"><label for="set-a">Giọng đọc</label><select id="set-a"><option value="en-US"'+(S.set.accent==='en-US'?' selected':'')+'>Anh - Mỹ</option><option value="en-GB"'+(S.set.accent==='en-GB'?' selected':'')+'>Anh - Anh</option></select></div>'+
    '<div class="field"><label for="set-s">Tốc độ khi nghe chậm</label><select id="set-s"><option value="0.4"'+(S.set.slow===0.4?' selected':'')+'>Rất chậm</option><option value="0.55"'+(S.set.slow===0.55?' selected':'')+'>Chậm</option><option value="0.7"'+(S.set.slow===0.7?' selected':'')+'>Hơi chậm</option></select></div>'+
    '<label class="row" style="gap:10px"><input type="checkbox" id="set-u"'+(S.set.auto?' checked':'')+'> Tự động đọc từ khi học</label>'+
    (hasTTS?'':'<p class="muted">Trình duyệt này không hỗ trợ giọng đọc nên nút phát âm bị tắt.</p>')+
    '<div class="sec"><h3 style="font-size:17px">Sao lưu</h3><p class="muted" style="font-size:13px">'+(SYNC==='cloud'?'Tiến độ được đồng bộ với tài khoản của bạn. Bản sao lưu dưới đây dùng khi muốn chuyển sang nơi khác.':'Tiến độ đang lưu trên trình duyệt này. Hãy sao chép bản sao lưu để giữ an toàn hoặc chuyển máy.')+'</p><textarea id="bk" readonly aria-label="Bản sao lưu">'+esc(JSON.stringify(S))+'</textarea><div class="row"><button class="btn" data-a="copyBk">Sao chép</button>'+(window.claude?'':'<button class="btn" data-a="dlBk">Tải về tệp</button>')+'</div>'+
    '<div class="field"><label for="bk-in">Khôi phục từ bản sao lưu</label><textarea id="bk-in" placeholder="Dán nội dung sao lưu vào đây"></textarea><input type="file" id="bk-file" accept=".json,application/json" aria-label="Hoặc chọn tệp sao lưu"></div><div class="row"><button class="btn" data-a="restore">'+(V.confirm==='restore'?'Bấm lần nữa để thay thế dữ liệu hiện tại':'Khôi phục')+'</button><button class="btn quiet" data-a="resetAll">'+(V.confirm==='reset'?'Bấm lần nữa để xóa toàn bộ tiến độ':'Xóa toàn bộ tiến độ')+'</button></div></div>';
  }else if(s==='add'||s==='edit'){
    var w=s==='edit'?BYID[V.editId]:null;w=w||{w:'',ipa:'',pos:'',vi:'',ex:'',t:'mine'};
    body='<header><h2>'+(s==='edit'?'Sửa từ':'Thêm từ của bạn')+'</h2>'+close+'</header>'+
    '<div class="field"><label for="f-w">Từ tiếng Anh</label><input id="f-w" value="'+esc(w.w)+'" autocomplete="off"></div>'+
    '<div class="field"><label for="f-vi">Nghĩa tiếng Việt</label><input id="f-vi" value="'+esc(w.vi)+'" autocomplete="off"></div>'+
    '<div class="field"><label for="f-ex">Câu ví dụ (nên chứa đúng từ trên)</label><input id="f-ex" value="'+esc(w.ex)+'" autocomplete="off"></div>'+
    '<div class="row"><div class="field" style="flex:1"><label for="f-ipa">Phiên âm</label><input id="f-ipa" value="'+esc(w.ipa)+'" placeholder="/…/" autocomplete="off"></div><div class="field" style="flex:1"><label for="f-pos">Loại từ</label><input id="f-pos" value="'+esc(w.pos)+'" placeholder="n, v, adj" autocomplete="off"></div></div>'+
    '<div class="field"><label for="f-t">Chủ đề</label><select id="f-t">'+allTopics().map(function(t){return '<option value="'+t.id+'"'+(w.t===t.id?' selected':'')+'>'+esc(t.name)+'</option>'}).join('')+'</select></div>'+
    '<div class="row"><button class="btn primary" data-a="saveWord">Lưu từ</button></div>';
  }else if(s==='import'){
    body='<header><h2>Nhập hàng loạt</h2>'+close+'</header><p class="muted" style="font-size:14px">Mỗi dòng một từ, theo dạng <b>từ | nghĩa | câu ví dụ</b>. Câu ví dụ có thể bỏ trống. Từ sẽ vào chủ đề Từ của tôi.</p><textarea id="imp" placeholder="serendipity | sự tình cờ may mắn | Meeting her was pure serendipity."></textarea><div class="row"><button class="btn primary" data-a="doImport">Nhập từ</button></div>';
  }
  return '<div class="veil" data-a="veil"><div class="sheet" role="dialog" aria-modal="true">'+body+'</div></div>';
}
function renderSheet(){$('#sheet').innerHTML=sheetHTML()}
function readSettings(){
  var n=$('#set-n'),a=$('#set-a'),u=$('#set-u'),l=$('#set-l'),sl=$('#set-s');if(!n)return;
  S.set.newPerDay=+n.value;S.set.accent=a.value;S.set.auto=u.checked;if(sl&&sl.value)S.set.slow=+sl.value;
  if(l&&l.value&&l.value!==S.lv){S.lv=l.value;S.active=topicsOfLevel(S.lv).slice(0,2).map(function(t){return t.id});V.lvf=S.lv;toast('Đã chuyển kế hoạch học sang '+S.lv)}
  persist();
}

/* ---------- render ---------- */
function render(){
  document.body.classList.toggle('in-session',!!SESS);
  var app=$('#app');
  if(SESS){
    app.innerHTML=SESS.finished?summaryHTML():sessionHTML();
    if(!SESS.finished){
      var a=$('#ans');if(a&&!SESS.ui.fb)a.focus({preventScroll:true});
      if(SESS.speak){SESS.speak=false;speak(audioOf(SESS.cur))}
    }
    return;
  }
  var fn=V.tab==='today'?todayHTML:V.tab==='topics'?(V.topic?topicHTML:topicsHTML):V.tab==='words'?wordsHTML:statsHTML;
  app.innerHTML=fn();
  if(V.tab==='words')renderWordList();
  Array.prototype.forEach.call(document.querySelectorAll('#tabs button'),function(b){if(b.dataset.t===V.tab)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current')});
}

/* ---------- actions ---------- */
function act(a,b){
  var d=(b&&b.dataset)||{};
  switch(a){
    case 'tab':V.tab=d.t;V.topic=null;V.confirm=null;window.scrollTo(0,0);render();break;
    case 'openTopic':V.tab='topics';V.topic=d.id;W.open=null;window.scrollTo(0,0);render();break;
    case 'back':V.topic=null;render();break;
    case 'lvf':V.lvf=d.l;render();break;
    case 'toggleActive':var i=S.active.indexOf(d.id);if(i>=0)S.active.splice(i,1);else S.active.push(d.id);persist();render();break;
    case 'expand':W.open=(W.open===d.id)?null:d.id;if(V.tab==='words')renderWordList();else render();break;
    case 'speak':{var sw=BYID[d.id];if(sw)speak(d.x?(sw.ex||sw.w):sw.w,d.r==='slow'?S.set.slow:0.95);break}
    case 'star':if(S.star[d.id])delete S.star[d.id];else S.star[d.id]=1;persist();if(V.tab==='words')renderWordList();else render();break;
    case 'startDaily':startSession('daily');break;
    case 'startExtra':SESS=null;startSession('extra');break;
    case 'startHard':startSession('hard');break;
    case 'startDict':startSession('dict',d.id||null);break;
    case 'startTopic':startSession('topic',d.id);break;
    case 'sheet':V.sheet=d.s;V.editId=d.id||null;V.confirm=null;renderSheet();break;
    case 'sheetClose':readSettings();V.sheet=null;V.confirm=null;renderSheet();if(V.tab==='words'||V.tab==='topics')render();break;
    case 'veil':break;
    case 'dlBk':{try{var blob=new Blob([JSON.stringify(S)],{type:'application/json'}),url=URL.createObjectURL(blob),an=document.createElement('a');an.href=url;an.download='tu-deo-backup-'+dstr(todayNum())+'.json';document.body.appendChild(an);an.click();document.body.removeChild(an);setTimeout(function(){URL.revokeObjectURL(url)},1000);toast('Đã tải bản sao lưu')}catch(e){toast('Không tải được, hãy dùng nút Sao chép')}break}
    case 'copyBk':var ta=$('#bk');ta.select();try{navigator.clipboard.writeText(ta.value).then(function(){toast('Đã sao chép')},function(){toast('Hãy nhấn giữ để sao chép phần đã chọn')})}catch(e){toast('Hãy nhấn giữ để sao chép phần đã chọn')}break;
    case 'restore':
      if(V.confirm!=='restore'){V.confirm='restore';var rv=$('#bk-in').value;V.pending=rv;renderSheet();$('#bk-in').value=rv;break}
      try{var o=JSON.parse($('#bk-in').value);if(!o||typeof o!=='object'||!o.cards)throw 0;S=migrate(o);persist();buildWords();V.sheet=null;V.confirm=null;renderSheet();render();toast('Đã khôi phục tiến độ')}catch(e){V.confirm=null;renderSheet();toast('Bản sao lưu không hợp lệ')}
      break;
    case 'resetAll':
      if(V.confirm!=='reset'){V.confirm='reset';renderSheet();break}
      S=defaults();persist();buildWords();V.sheet=null;V.confirm=null;renderSheet();render();toast('Đã xóa toàn bộ tiến độ');break;
    case 'saveWord':{
      var w=$('#f-w').value.trim(),vi=$('#f-vi').value.trim();
      if(!w||!vi){toast('Cần nhập từ và nghĩa');break}
      var rec={w:w,vi:vi,ex:$('#f-ex').value.trim(),ipa:$('#f-ipa').value.trim(),pos:$('#f-pos').value.trim(),t:$('#f-t').value};
      if(V.sheet==='edit'&&V.editId){var c=S.custom.filter(function(x){return x.id===V.editId})[0];if(c)Object.assign(c,rec)}
      else{rec.id='c'+Date.now().toString(36)+Math.floor(Math.random()*1e3).toString(36);S.custom.push(rec)}
      persist();buildWords();V.sheet=null;renderSheet();render();toast('Đã lưu từ');break}
    case 'doImport':{
      var lines=$('#imp').value.split('\n'),add=0;
      lines.forEach(function(l){var p=l.split(/\s*\|\s*|\t/);if(p.length<2||!p[0].trim()||!p[1].trim())return;S.custom.push({id:'c'+Date.now().toString(36)+Math.floor(Math.random()*1e6).toString(36),w:p[0].trim(),vi:p[1].trim(),ex:(p[2]||'').trim(),ipa:'',pos:'',t:'mine'});add++});
      if(!add){toast('Chưa có dòng nào đúng định dạng');break}
      persist();buildWords();V.sheet=null;renderSheet();render();toast('Đã nhập '+add+' từ');break}
    case 'delWord':
      if(V.confirm!=='del:'+d.id){V.confirm='del:'+d.id;if(V.tab==='words')renderWordList();else render();break}
      S.custom=S.custom.filter(function(x){return x.id!==d.id});delete S.cards[d.id];delete S.star[d.id];V.confirm=null;persist();buildWords();render();break;
    /* session */
    case 'sExit':SESS=null;render();break;
    case 'sDone':SESS=null;V.tab='today';render();break;
    case 'sGot':{var t=SESS.cur;insertTask({id:t.id,type:pickType(t.id,'new1'),phase:'new1'},3);nextTask();render();break}
    case 'sNext':nextTask();render();break;
    case 'sShow':SESS.ui.shown=true;render();break;
    case 'sGrade':{var q=+d.q;answer(q>1,{q:q});nextTask();render();break}
    case 'sOpt':{
      var u=SESS.ui;if(u.fb)break;var o=u.opts[+d.i];if(!o)break;
      u.chosen=+d.i;u.fb={ok:o.ok};answer(o.ok);render();break}
    case 'sCheck':{
      var u2=SESS.ui;if(u2.fb)break;var inp=$('#ans');if(!inp||!inp.value.trim()){if(inp)inp.focus();break}
      if(SESS.cur.type==='dictate'){var dc=dictCompare(BYID[SESS.cur.id].ex,inp.value);u2.fb={ok:dc.ok,score:dc.score,hit:dc.hit,total:dc.total,marks:dc.marks,typed:inp.value.trim()};answer(dc.ok,{score:dc.score,hint:u2.hint});render();break}
      var ok=norm(inp.value)===norm(BYID[SESS.cur.id].w);u2.fb={ok:ok};answer(ok,{hint:u2.hint});render();break}
    case 'sHint':{var inp2=$('#ans'),keep=inp2?inp2.value:'';SESS.ui.hint=true;render();var i2=$('#ans');if(i2){i2.value=keep;i2.focus()}break}
    case 'sSkip':{var u3=SESS.ui;if(u3.fb)break;u3.fb={ok:false};answer(false);render();break}
  }
}
document.addEventListener('click',function(e){
  var v=e.target.closest('.veil');
  if(v&&!e.target.closest('.sheet')){act('sheetClose');return}
  var b=e.target.closest('[data-a]');if(!b||b.disabled)return;act(b.dataset.a,b);
});
document.addEventListener('input',function(e){
  if(e.target.id==='wq'){W.q=e.target.value;renderWordList()}
});
document.addEventListener('change',function(e){
  if(e.target.id==='bk-file'){
    var f=e.target.files&&e.target.files[0];
    if(f){var fr=new FileReader();fr.onload=function(){var ta=$('#bk-in');if(ta){ta.value=String(fr.result);toast('Đã đọc tệp. Bấm Khôi phục để áp dụng')}};fr.readAsText(f)}
    return;
  }
  if(e.target.id==='wt'){W.t=e.target.value;renderWordList()}
  else if(e.target.id==='ws'){W.s=e.target.value;renderWordList()}
  else if(e.target.id&&e.target.id.indexOf('set-')===0)readSettings();
});
document.addEventListener('keydown',function(e){
  if(e.key==='Escape'&&V.sheet){act('sheetClose');return}
  if(!SESS||SESS.finished||V.sheet)return;
  var tag=(document.activeElement&&document.activeElement.tagName)||'',t=SESS.cur,u=SESS.ui;
  if(e.key==='Enter'){
    if(tag==='BUTTON')return;
    e.preventDefault();
    if(u.fb)act('sNext');else if(t.type==='intro')act('sGot');else if(t.type==='flip'&&!u.shown)act('sShow');else if(t.type==='type'||t.type==='cloze'||t.type==='dictate')act('sCheck');
    return;
  }
  if(tag==='INPUT'||tag==='TEXTAREA')return;
  if(/^[1-4]$/.test(e.key)){
    var i=+e.key-1;
    if(u.opts&&!u.fb&&u.opts[i])act('sOpt',{dataset:{i:i}});
    else if(t.type==='flip'&&u.shown)act('sGrade',{dataset:{q:[1,3,4,5][i]}});
  }else if(e.key===' '&&t.type==='flip'&&!u.shown){e.preventDefault();act('sShow')}
  else if(e.key==='s'||e.key==='S')speak(audioOf(t));
  else if(e.key==='d'||e.key==='D')speak(audioOf(t),S.set.slow);
});

setSync('local');render();initDb();
})();
