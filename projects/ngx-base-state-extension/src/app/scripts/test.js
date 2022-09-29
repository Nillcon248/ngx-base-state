const data = window['__NGX_BASE_STATE_DATA'];
const input = document.createElement('input');
input.id = 'ngxBaseStateMetadataInput';
input.type = 'hidden';
input.value = JSON.stringify(data);

document.body.appendChild(input);
