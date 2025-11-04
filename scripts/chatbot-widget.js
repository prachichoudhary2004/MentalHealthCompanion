(function(){
  var container = document.createElement('div');
  container.id = 'sz-chatbot';
  container.innerHTML = "\n    <style>\n      #sz-chatbot{position:fixed;right:16px;bottom:16px;z-index:9999;font-family:inherit;}\n      #sz-chat-toggle{background:#343148;color:#fff;border:none;border-radius:24px;padding:10px 14px;box-shadow:0 2px 8px rgba(0,0,0,.2);}\n      #sz-chat-panel{display:none;position:fixed;right:16px;bottom:70px;width:320px;max-height:420px;background:#fff;border-radius:8px;box-shadow:0 8px 24px rgba(0,0,0,.2);overflow:hidden;border:1px solid #eee;}\n      #sz-chat-header{background:#343148;color:#fff;padding:10px 12px;font-weight:600;}\n      #sz-chat-body{padding:10px;height:280px;overflow-y:auto;background:#fafafa;}\n      #sz-chat-input{display:flex;gap:6px;padding:8px;border-top:1px solid #eee;background:#fff;}\n      #sz-chat-input input{flex:1;border:1px solid #ddd;border-radius:6px;padding:8px;}\n      #sz-chat-input button{background:#f7cac9;border:1px solid #f3b5b3;border-radius:6px;padding:8px 12px;}\n      .sz-msg{margin:6px 0;display:flex;}\n      .sz-msg-user{justify-content:flex-end;}\n      .sz-bubble{padding:8px 10px;border-radius:12px;max-width:80%;line-height:1.3;}\n      .sz-bot .sz-bubble{background:#fff;border:1px solid #eee;}\n      .sz-user .sz-bubble{background:#343148;color:#fff;}\n      .sz-error{color:#b00020;font-size:12px;margin:6px;}\n      .sz-loader{width:18px;height:18px;border:2px solid #f7cac9;border-top-color:transparent;border-radius:50%;animation:spin 1s linear infinite;margin:6px auto;}\n      @keyframes spin{to{transform:rotate(360deg)}}\n    </style>\n    <button id='sz-chat-toggle'>Chat</button>\n    <div id='sz-chat-panel'>\n      <div id='sz-chat-header'>Chat Support</div>\n      <div id='sz-chat-body'></div>\n      <div id='sz-chat-input'>\n        <input type='text' placeholder='Type a message...'/><button type='button'>Send</button>\n      </div>\n    </div>\n  ";
  document.body.appendChild(container);

  var toggle = container.querySelector('#sz-chat-toggle');
  var panel = container.querySelector('#sz-chat-panel');
  var body = container.querySelector('#sz-chat-body');
  var input = container.querySelector('#sz-chat-input input');
  var sendBtn = container.querySelector('#sz-chat-input button');

  var open = false;
  toggle.addEventListener('click', function(){
    open = !open; panel.style.display = open ? 'block' : 'none';
    if(open && body.childElementCount===0){
      addBot('Hi! How are you feeling today?');
    }
  });

  function addUser(text){
    var row = document.createElement('div'); row.className='sz-msg sz-msg-user sz-user';
    var b = document.createElement('div'); b.className='sz-bubble'; b.textContent=text;
    row.appendChild(b); body.appendChild(row); body.scrollTop = body.scrollHeight;
  }
  function addBot(text){
    var row = document.createElement('div'); row.className='sz-msg sz-bot';
    var b = document.createElement('div'); b.className='sz-bubble'; b.textContent=text;
    row.appendChild(b); body.appendChild(row); body.scrollTop = body.scrollHeight;
  }
  function addLoader(){
    var l = document.createElement('div'); l.className='sz-loader'; body.appendChild(l); body.scrollTop=body.scrollHeight; return l;
  }
  function addError(text){
    var e = document.createElement('div'); e.className='sz-error'; e.textContent=text; body.appendChild(e);
  }

  async function send(){
    var text = input.value.trim(); if(!text) return; input.value=''; addUser(text);
    var loader = addLoader();
    try{
      var res = await window.api.request('/api/chatbot', { method:'POST', body:{ message:text } });
      loader.remove();
      addBot(res.reply || '');
    }catch(err){
      loader.remove(); addError(err.message || 'Failed to get reply');
    }
  }

  sendBtn.addEventListener('click', send);
  input.addEventListener('keydown', function(e){ if(e.key==='Enter'){ send(); }});
})();
