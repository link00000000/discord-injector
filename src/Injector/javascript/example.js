var box = document.createElement('DIV');
var text = document.createTextNode('Example JS');
box.appendChild(text);

box.style.backgroundColor = 'indianred';
box.style.color = 'white';
box.style.width = '100px';
box.style.height = '100px';
box.style.textAlign = 'center';
box.style.lineHeight = '100px';
box.style.verticalAlign = 'center';
box.style.position = 'fixed';
box.style.bottom = '20px';
box.style.right = '140px';

var parentHook = document.querySelector('.titlebar');
parentHook.appendChild(box);
