var modal,content,okbtn,cancelbtn,input,value,func1;function alertmodal(t,e,n,o){return new Promise((function(l,r){document.getElementsByClassName("modal-content").length>0&&modal.remove(),modal=document.createElement("div"),document.body.appendChild(modal),modal.innerHTML=`\n\t    <div class = 'modal-content'>\n\t    <div class = 'container'>\n\t      <h1>${t}</h1>\n\t      <p style="font-size:16px">${e}</p>\n\t      <div class = 'clearfix'>\n\t      <button class = 'okbtn'>Affirmative👍</button>\n\t      </div>\n\t    </div>\n\t    </div>\n\t  `,modal.setAttribute("style","position:fixed; z-index:100; left:0; top:0; width:100vw; height:100vh; padding-top:50px; background-color:rgba(0, 0, 0, 0.3);"),(content=document.querySelector(".modal-content")).setAttribute("style","background-color:#c7c7c7; margin:5% auto 15% auto; border:2px solid blue; border-radius:5px; width:30%"),document.querySelector(".container").style.padding="16px",document.querySelector(".clearfix").style.textAlign="right",okbtn=document.querySelector(".okbtn"),void 0!==n&&(okbtn.innerHTML=n),okbtn.addEventListener("click",(function(){modal.remove(),l()})),okbtn.setAttribute("style","border:2px solid #9b7653; height:50px; outline:none; background-color:#9b7653; color:#FFF; border-radius:5px; width:125px; font-size:16px; user-select:none font-family: Odibee Sans;"),window.innerWidth<=700?content.style.width="60%":window.innerWidth>700&&window.innerWidth<=950&&(content.style.width="50%"),okbtn.addEventListener("mouseover",(function(){okbtn.style.cursor="pointer",okbtn.style.transition="all 0.3s ease-in-out",okbtn.style.border="2px solid #806144",okbtn.style.backgroundColor="#806144"})),okbtn.addEventListener("mouseleave",(function(){okbtn.style.backgroundColor="#9b7653",okbtn.style.border="2px solid #9b7653"})),void 0!==o&&(window.onclick=function(t){if(t.target==modal)return modal.remove()})}))}function confirmmodal(t,e,n,o){return new Promise((function(l,r){document.getElementsByClassName("modal-content").length>0&&modal.remove(),modal=document.createElement("div"),document.body.appendChild(modal),modal.innerHTML=`\n\t    <div class = 'modal-content'>\n\t    <div class = 'container'>\n\t      <h1>${t}</h1>\n\t      <p style="font-size:16px">${e}</p>\n\t      <div class = 'clearfix'>\n\t      <button class = 'cancelbtn'>Cancel</button>\n\t      <button class = 'okbtn'>OK</button>\n\t      </div>\n\t    </div>\n\t    </div>\n\t  `,modal.setAttribute("style","position:fixed; z-index:100; left:0; top:0; width:100vw; height:100vh; padding-top:50px; background-color:rgba(0, 0, 0, 0.3)"),(content=document.querySelector(".modal-content")).setAttribute("style","background-color:#FFF; margin:5% auto 15% auto; border:2px solid blue; border-radius:5px; width:30%"),document.querySelector(".container").style.padding="16px",document.querySelector(".clearfix").style.textAlign="right",cancelbtn=document.querySelector(".cancelbtn"),okbtn=document.querySelector(".okbtn"),void 0!==n&&(okbtn.innerHTML=n),cancelbtn.addEventListener("click",(function(){modal.remove(),r()})),okbtn.addEventListener("click",(function(){modal.remove(),l()})),cancelbtn.setAttribute("style","border:2px solid #9b7653; height:50px; outline:none; background-color:#FFF; color:#9b7653; border-radius:5px; width:125px; font-size:16px; user-select:none"),okbtn.setAttribute("style","border:2px solid #9b7653; height:50px; outline:none; background-color:#9b7653; color:#FFF; border-radius:5px; width:125px; font-size:16px; user-select:none"),window.innerWidth<=700?content.style.width="60%":window.innerWidth>700&&window.innerWidth<=950&&(content.style.width="50%"),cancelbtn.addEventListener("mouseover",(function(){cancelbtn.style.cursor="pointer",cancelbtn.style.transition="all 0.3s ease-in-out",cancelbtn.style.color="#c7c7c7",cancelbtn.style.border="2px solid #00008B",cancelbtn.style.backgroundColor="#9b7653"})),cancelbtn.addEventListener("mouseleave",(function(){cancelbtn.style.backgroundColor="#c7c7c7",cancelbtn.style.border="2px solid #0000FF",cancelbtn.style.color="#9b7653"})),okbtn.addEventListener("mouseover",(function(){okbtn.style.cursor="pointer",okbtn.style.transition="all 0.3s ease-in-out",okbtn.style.border="2px solid #00008B",okbtn.style.backgroundColor="#00008B"})),okbtn.addEventListener("mouseleave",(function(){okbtn.style.backgroundColor="#0000FF",okbtn.style.border="2px solid #0000FF"})),void 0!==o&&(window.onclick=function(t){if(t.target==modal)return cancelbtn.click()})}))}function promptmodal(t,e,n,o,l,r){return new Promise((function(i,c){document.getElementsByClassName("modal-content").length>0&&modal.remove(),modal=document.createElement("div"),document.body.appendChild(modal),modal.innerHTML=`\n\t    <div class = 'modal-content'>\n\t    <div class = 'container'>\n\t      <h1>${t}</h1>\n\t      <p style="font-size:16px; margin:auto" id="p">${e}</p>\n\t      <br>\n\t      <input type = "text" class = "text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"/>\n\t      <div class = 'clearfix'>\n\t      <button class = 'cancelbtn'>Cancel</button>\n\t      <button class = 'okbtn'>OK</button>\n\t      </div>\n\t    </div>\n\t    </div>\n\t  `,modal.setAttribute("style","position:fixed; z-index:100; left:0; top:0; width:100vw; height:100vh; padding-top:50px; background-color:rgba(0, 0, 0, 0.3);"),(content=document.querySelector(".modal-content")).setAttribute("style","background-color:#c7c7c7; margin:5% auto 15% auto; border:2px #9b7653; border-radius:5px; width:30%"),document.querySelector(".container").style.padding="16px",document.querySelector(".clearfix").style.textAlign="right",cancelbtn=document.querySelector(".cancelbtn"),okbtn=document.querySelector(".okbtn"),void 0!==n&&(okbtn.innerHTML=n),(input=document.querySelector(".text")).focus(),void 0!==l&&!1!==l&&(input.value=l,input.select()),void 0!==r&&input.setAttribute("readonly",!0),input.setAttribute("style","width: 90%; height: 30px; margin-bottom: 10px;font-size: 16px; outline: none; border: 1px solid #9b7653; border-radius: 2px; margin-left: 5%; margin-right:5%"),func=function(){modal.remove(),c()},cancelbtn.addEventListener("click",func),okbtn.addEventListener("click",(function(){if(!(value=input.value).replace(/\s/g,""))return input.focus();modal.remove(),i(value)})),cancelbtn.setAttribute("style","border:2px solid #9b7653; height:50px; outline:none; background-color:#c7c7c7; color:#9b7653; border-radius:5px; width:125px; font-size:16px; user-select:none"),okbtn.setAttribute("style","border:2px solid #9b7653; height:50px; outline:none; background-color:#9b7653; color:#c7c7c7; border-radius:5px; width:125px; font-size:16px; user-select:none"),window.innerWidth<=700?content.style.width="60%":window.innerWidth>700&&window.innerWidth<=950&&(content.style.width="50%"),cancelbtn.addEventListener("mouseover",(function(){cancelbtn.style.cursor="pointer",cancelbtn.style.transition="all 0.3s ease-in-out",cancelbtn.style.color="#c7c7c7",cancelbtn.style.border="2px solid #9b7653",cancelbtn.style.backgroundColor="#9b7653"})),cancelbtn.addEventListener("mouseleave",(function(){cancelbtn.style.backgroundColor="#c7c7c7",cancelbtn.style.border="2px solid #9b7653",cancelbtn.style.color="#9b7653"})),okbtn.addEventListener("mouseover",(function(){okbtn.style.cursor="pointer",okbtn.style.transition="all 0.3s ease-in-out",okbtn.style.border="2px solid #9b7653",okbtn.style.backgroundColor="#9b7653"})),okbtn.addEventListener("mouseleave",(function(){okbtn.style.backgroundColor="#9b7653",okbtn.style.border="2px solid #9b7653"})),void 0!==o&&!1!==o&&(window.onclick=function(t){if(t.target==modal)return cancelbtn.click()})}))}function selectmodal(t,e,n,o,l,r){return new Promise((function(i,c){document.getElementsByClassName("modal-content").length>0&&modal.remove(),modal=document.createElement("div"),document.body.appendChild(modal);let d="";for(let t of Object.keys(n))d+=`<option value="${t}">${n[t]}</option>`;modal.innerHTML=`\n\t    <div class = 'modal-content'>\n\t    <div class = 'container'>\n\t      <h1>${t}</h1>\n\t      <p style="font-size:16px; margin:auto" id="p">${e}<select id="modal-select">${d}</select></p><br>\n\t      <div class = 'clearfix'>\n\t      <button class = 'cancelbtn'>Cancel</button>\n\t      <button class = 'okbtn'>OK</button>\n\t      </div>\n\t    </div>\n\t    </div>\n\t  `,modal.setAttribute("style","position:fixed; z-index:100; left:0; top:0; width:100vw; height:100vh; padding-top:50px; background-color:rgba(0, 0, 0, 0.3);"),(content=document.querySelector(".modal-content")).setAttribute("style","background-color:#c7c7c7; margin:5% auto 15% auto; border:2px #9b7653; border-radius:5px; width:30%"),document.querySelector(".container").style.padding="16px",document.querySelector(".clearfix").style.textAlign="right",cancelbtn=document.querySelector(".cancelbtn"),okbtn=document.querySelector(".okbtn"),void 0!==l&&(okbtn.innerHTML=l),input=document.querySelector("#modal-select"),o&&(input.value=o),func=function(){modal.remove(),c()},cancelbtn.addEventListener("click",func),okbtn.addEventListener("click",(function(){value=input.value,modal.remove(),i(value)})),cancelbtn.setAttribute("style","border:2px solid #9b7653; height:50px; outline:none; background-color:#c7c7c7; color:#9b7653; border-radius:5px; width:125px; font-size:16px; user-select:none"),okbtn.setAttribute("style","border:2px solid #9b7653; height:50px; outline:none; background-color:#9b7653; color:#c7c7c7; border-radius:5px; width:125px; font-size:16px; user-select:none"),window.innerWidth<=700?content.style.width="60%":window.innerWidth>700&&window.innerWidth<=950&&(content.style.width="50%"),cancelbtn.addEventListener("mouseover",(function(){cancelbtn.style.cursor="pointer",cancelbtn.style.transition="all 0.3s ease-in-out",cancelbtn.style.color="#c7c7c7",cancelbtn.style.border="2px solid #9b7653",cancelbtn.style.backgroundColor="#9b7653"})),cancelbtn.addEventListener("mouseleave",(function(){cancelbtn.style.backgroundColor="#c7c7c7",cancelbtn.style.border="2px solid #9b7653",cancelbtn.style.color="#9b7653"})),okbtn.addEventListener("mouseover",(function(){okbtn.style.cursor="pointer",okbtn.style.transition="all 0.3s ease-in-out",okbtn.style.border="2px solid #9b7653",okbtn.style.backgroundColor="#9b7653"})),okbtn.addEventListener("mouseleave",(function(){okbtn.style.backgroundColor="#9b7653",okbtn.style.border="2px solid #9b7653"})),void 0!==r&&!1!==r&&(window.onclick=function(t){if(t.target==modal)return cancelbtn.click()})}))}
