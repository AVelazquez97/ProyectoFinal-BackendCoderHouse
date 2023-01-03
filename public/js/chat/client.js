const socket = io.connect();

/* ----------------------------- denormalization ---------------------------- */
const schemaAuthor = new normalizr.schema.Entity(
  'author',
  {},
  { idAttribute: 'id' }
);
const schemaMsg = new normalizr.schema.Entity(
  'post',
  { author: schemaAuthor },
  { idAttribute: '_id' }
);
const schemaMessages = new normalizr.schema.Entity(
  'posts',
  { messages: [schemaMsg] },
  { idAttribute: 'id' }
);
/* ----------------------------------------------------------------------------- */

/* ---------------------------- messages section ---------------------------- */
const inputEmail = document.getElementById('input-email');
const messageType = document.getElementById('message-type');
const inputMessage = document.getElementById('input-message');
const btnSend = document.getElementById('btn-send');
const addMessageForm = document.getElementById('add-message-form');

addMessageForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const message = {
    author: {
      email: inputEmail.value,
      msgType: messageType.value,
    },
    msg: inputMessage.value,
  };
  socket.emit('new-message', message);
  addMessageForm.reset();
  inputMessage.focus();
  inputEmail.value = '';
});

socket.on('view-messages', (messages) => {
  if (!messages.error) {
    const denormalizedMessages = normalizr.denormalize(
      messages.result,
      schemaMessages,
      messages.entities
    );
    makeHtmlList(denormalizedMessages.messages).then(
      (html) => (document.getElementById('message-list').innerHTML = html)
    );
  } else {
    makeHtmlList(messages).then(
      (html) => (document.getElementById('message-list').innerHTML = html)
    );
  }
});

const makeHtmlList = async (messages) => {
  const res = await fetch('templates/viewMessages.hbs');
  let template = await res.text();
  
  Handlebars.registerHelper('format-date', function (aString) {
    return aString.replace("T", " ").replace("Z", "")
  })
  template = Handlebars.compile(template);
  const html = template({ messages });
  return html;
};

inputEmail.addEventListener('input', () => {
  const existEmail = inputEmail.value.length;
  const existText = inputMessage.value.length;
  inputMessage.disabled = !existEmail;
  btnSend.disabled = !existEmail || !existText;
});

inputMessage.addEventListener('input', () => {
  const existText = inputMessage.value.length;
  btnSend.disabled = !existText;
});