/**
 * jnoty-inline
 * throw a inline message in bottom of the page
 */
'use strict';
const NAME    = 'jnoty-inline'
const VERSION = '1.0.0'

const FLAG_ICONS = {
  pending   : `<div class="jnoty-inline-flag_spinner"></div>`,
  fulfilled : `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>`,
  rejected  : `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-frown"><circle cx="12" cy="12" r="10"/><path d="M16 16s-1.5-2-4-2-4 2-4 2M9 9h.01M15 9h.01"/></svg>`,
  close     : `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>`
}
const EVENTS = {
  CLOSE : 'closed',
  FADE  : 'fading',
  OPEN  : 'showing',
}

const CLASSNAME = {
  CONTAINER         : 'jnoty-inline',
  ITEM              : 'jnoty-inline-item',
  FLAG              : 'jnoty-inline-flag',
  MESSAGE           : 'jnoty-inline-message',
  CONTROLE          : 'jnoty-inline-controls',
  CONTROL_CLOSE     : 'jnoty-inline-controls_close',
  THEME_PENDING     : 'jnoty-inline-pending',
  THEME_FULLFILLED  : 'jnoty-inline-fulfilled',
  THEME_REJECTED    : 'jnoty-inline-rejected',
  THEME_ERROR       : 'jnoty-inline-rejected'
}

const KIND = {
  PENDING     : 'pending',
  FULLFILLED  : 'fulfilled',
  REJECTED    : 'rejected',
  ERROR       : 'error'
}

const Default = {
animation : true,
sticky    : false,
delay     : 10000,
position  : 'bottom-right'
}

/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */
// global jnoty-inline container div
// keep it outside the class
let jnotyContainer = null

class JnotyInline {
  constructor({
    kind      = '',
    message   = '',
    timeout   = Default.delay,
    sticky    = Default.sticky,
    position  = Default.position
  } = {}) {
    this.id         = _getUniqElementId()
    this.kind       = kind
    this.message    = message
    this.sticky     = sticky
    this.timeout    = timeout
    this.position   = position
    this.jnotyTheme = _getThemeForThisJnoty(this.kind)
    this.init()
  }

  init() {
    let didContainerPresent = document.getElementsByClassName(CLASSNAME.CONTAINER);
    if (didContainerPresent.length) {
      return;
    }

    //create a jnoty-inline container
    let container = document.createElement('div');
    container.className = CLASSNAME.CONTAINER;
    document.body.appendChild(container);
    jnotyContainer = container
  }

  show() {
    this.state = EVENTS.OPEN;
    // add jnoty-inline item
    let jnotyItem = document.createElement('div')
    jnotyItem.id = this.id;
    jnotyItem.className = CLASSNAME.ITEM

    //add item theme
    let theme = this.jnotyTheme.theme
    jnotyItem.classList.add(theme)
    jnotyContainer.appendChild(jnotyItem);

    // add flag element
    let jnotyFlag = document.createElement('div')
    jnotyFlag.className = CLASSNAME.FLAG
    jnotyFlag.innerHTML = this.jnotyTheme.flagIcon
    jnotyItem.appendChild(jnotyFlag);

    // add message element
    let jnotyMessage = document.createElement('div')
    jnotyMessage.className = CLASSNAME.MESSAGE
    jnotyMessage.innerHTML = this.message
    jnotyItem.appendChild(jnotyMessage);

    //add close button
    if (this.kind !== KIND.PENDING) {
      let jnotyClose = document.createElement('div')
      let jnotyCloseButton = document.createElement('button')
      jnotyClose.className = CLASSNAME.CONTROLE
      jnotyCloseButton.className = CLASSNAME.CONTROL_CLOSE
      jnotyCloseButton.innerHTML = FLAG_ICONS.close
      jnotyClose.appendChild(jnotyCloseButton);
      jnotyItem.appendChild(jnotyClose);
// Sets the automatic dismiss timeout in milliseconds. Value must be between 4000 and 10000 or an error will be thrown.
if (this.sticky !== true) {
  let timmer = _fade(this.id, this.timeout)
  if (timmer) {
    this.state = EVENTS.FADE;
  }
}

// add click event for close
jnotyClose.addEventListener('click', () => {
  try {
    if (timmer) {
      clearTimeout(timmer);
    }
  } catch (e) {}

  let removed = _removeJnotyElement(this.id)
  if (removed) {
    this.state = EVENTS.CLOSE
  }
})
}
}

hide() {
  let removed = _removeJnotyElement(this.id)
  if (removed) {
    this.state = EVENTS.CLOSE
  }
}

// Getter
get currentJnoty() {
  return this.id;
}
get getCurrentState() {
  return this.state
}

// Setter
set setCurrentState(state) {
  this.state = state
}
}

// @private
function _getUniqElementId() {
  return 'jnoty-inline_' + Math.random().toString(36).substr(2, 9);
}

function _removeJnotyElement(id) {
  try {
    let element = document.querySelector(`#${id}`);
    element.remove();
    return true;
  } catch (e) {
    return false;
    console.log('catch_jnoty-inline', e)
  }
}

function _fade(id, timeout) {
  return setTimeout(() => {
    _removeJnotyElement(id)
  }, timeout);
}

function _getThemeForThisJnoty(kind) {
  let theme = null
  let flagIcon = null
  switch (kind) {
    case KIND.PENDING:
      theme = CLASSNAME.THEME_PENDING
      flagIcon = FLAG_ICONS.pending
      break;
    case KIND.FULLFILLED:
      theme = CLASSNAME.THEME_FULLFILLED
      flagIcon = FLAG_ICONS.fulfilled
      break;
    case KIND.REJECTED:
      theme = CLASSNAME.THEME_REJECTED
      flagIcon = FLAG_ICONS.rejected
      break;
    case KIND.ERROR:
      theme = CLASSNAME.THEME_ERROR
      flagIcon = FLAG_ICONS.rejected
      break;
    default:
      theme = CLASSNAME.THEME_FULLFILLED //@// TODO:  default need to change with some secondary style.
      flagIcon = FLAG_ICONS.pending
  }
  let settedTheme = {
    theme: theme,
    flagIcon: flagIcon
  }
  return settedTheme
}

export const jnotyInline = (options) => {
  let newNotification = new JnotyInline(options)
  newNotification.show()
  return newNotification;
}

for (const kind of ['fulfilled', 'pending', 'rejected', 'error']) {
  jnotyInline[kind] = options => jnotyInline(assign({
    kind
  }, options))
}

// utils
// nono-assign
function assign(obj) {
  for (let i = 1; i < arguments.length; i++) {
    // eslint-disable-next-line guard-for-in, prefer-rest-params
    for (const p in arguments[i]) obj[p] = arguments[i][p]
  }
  return obj
}
export default jnotyInline
