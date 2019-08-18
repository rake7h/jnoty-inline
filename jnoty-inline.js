/**
 * jnoty-inline
 * throw a inline message in bottom of the page
 */
'use strict';
const NAME    = 'jnoty-inline'
const VERSION = '0.0.1'

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
    let theme = null
    switch (this.kind) {
      case KIND.PENDING:
        theme = CLASSNAME.THEME_PENDING
        break;
      case KIND.FULLFILLED:
        theme = CLASSNAME.THEME_FULLFILLED
        break;
      case KIND.REJECTED:
        theme = CLASSNAME.THEME_REJECTED
        break;
      case KIND.ERROR:
        theme = CLASSNAME.THEME_ERROR
        break;
      default:
        theme = CLASSNAME.THEME_FULLFILLED //@// TODO:  default need to change with some secondary style.
    }
    jnotyItem.classList.add(theme)
    jnotyContainer.appendChild(jnotyItem);

    // add flag element
    let jnotyFlag = document.createElement('div')
    jnotyFlag.className = CLASSNAME.FLAG
    jnotyFlag.innerHTML = this.kind
    jnotyItem.appendChild(jnotyFlag);

    // add message element
    let jnotyMessage = document.createElement('div')
    jnotyMessage.className = CLASSNAME.MESSAGE
    jnotyMessage.innerHTML = this.message
    jnotyItem.appendChild(jnotyMessage);

    //add close button
    if (this.kind !== KIND.PENDING) {
      let jnotyClose = document.createElement('div')
      jnotyClose.className = CLASSNAME.CONTROLE
      jnotyClose.innerHTML = 'X'
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
        try{
          if(timmer) {
            clearTimeout(timmer);
          }
        }
        catch(e){}

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

export default JnotyInline
