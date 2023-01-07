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
const selectMessageType = document.getElementById('select-message-type');
const inputMessage = document.getElementById('input-message');
const btnSend = document.getElementById('btn-send');
const addMessageForm = document.getElementById('add-message-form');

socket.emit('set-email', inputEmail.value); // Se envía el mail del usuario que está autenticado en el sistema

addMessageForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const message = {
    author: {
      email: inputEmail.value,
      msgType: selectMessageType.value,
    },
    msg: inputMessage.value,
  };
  socket.emit('new-private-message', message, inputEmail.value);
  addMessageForm.reset();
  inputMessage.focus();
});

socket.on('view-private-messages', (messages) => {
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
  const res = await fetch('/templates/viewMessages.hbs');
  let template = await res.text();

  Handlebars.registerHelper('format-date', function (aString) {
    return aString.replace('T', ' ').replace('Z', '');
  });
  template = Handlebars.compile(template);
  const html = template({ messages });
  return html;
};

selectMessageType.addEventListener('change', () => {
  inputMessage.disabled = selectMessageType.value === '';
});

inputMessage.addEventListener('input', () => {
  const existText = inputMessage.value.length;
  btnSend.disabled = !existText;
});
