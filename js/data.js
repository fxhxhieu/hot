// Đọc WORDS_TEXT (trong words.js) thành danh sách chủ đề cho trang.
const LEVELS = [
  {id:"A1",vi:"Mới bắt đầu",desc:"Những từ đầu tiên: chào hỏi, gia đình, đồ ăn, đồ vật quanh bạn."},
  {id:"A2",vi:"Sơ cấp",desc:"Từ thông dụng cho đời sống hằng ngày, mua sắm, đi chơi, công việc."},
  {id:"B1",vi:"Trung cấp",desc:"Nói về nhiều chủ đề quen thuộc một cách tự tin hơn."},
  {id:"B2",vi:"Trung cấp cao",desc:"Từ vựng trừu tượng, học thuật và cụm động từ."}
];
function parseWords(text){
  var topics=[],cur=null,seen={};
  String(text).split('\n').forEach(function(raw,n){
    var line=raw.trim();
    if(!line)return;
    if(line.slice(0,2)==='##'){
      var p=line.slice(2).split('|').map(function(s){return s.trim()});
      var known=LEVELS.some(function(l){return l.id===p[0]});
      if(!known||!p[1]||!p[2]){console.warn('words.js dòng '+(n+1)+': chủ đề không hợp lệ',line);cur=null;return}
      if(seen[p[1]]){console.warn('words.js dòng '+(n+1)+': mã chủ đề bị trùng',p[1]);cur=null;return}
      seen[p[1]]=1;
      cur={id:p[1],lv:p[0],name:p[2],vi:p[3]||'',words:[]};topics.push(cur);return;
    }
    if(line.charAt(0)==='#'||!cur)return;
    var f=line.split('|').map(function(s){return s.trim()});
    if(f.length<4||!f[0]||!f[3]){console.warn('words.js dòng '+(n+1)+': thiếu từ hoặc nghĩa',line);return}
    cur.words.push([f[0],f[1]||'',f[2]||'',f[3],f[4]||'',f[5]||'',f[6]||'']);
  });
  return LEVELS.reduce(function(a,l){return a.concat(topics.filter(function(t){return t.lv===l.id}))},[]);
}
const TOPICS = parseWords(WORDS_TEXT);
