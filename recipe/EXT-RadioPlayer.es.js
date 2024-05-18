 
/**  Radio español   **/
/** Actualizado el 10/04/22 **/
/**  @The Dev3l  **/
/** Built for GA V4  @bugsounet **/

/* updated for EXT-RadioPlayer v2.0.0
 * 2024-05-08 - @bugsounet
 */

var recipe = {
  transcriptionHooks: {
    "Dial": {
      pattern: "Cadena Dial",
      command: "Dial"
    },
    "kissfm": {
      pattern: "Kiss Fm",
      command: "kissfm"
    },
    "40urban": {
      pattern: "Los 40 Urban",
      command: "40urban"
    },
    "hitfm": {
      pattern: "Hit fm",
      command: "hitfm"
    },
    "generacionradio": {
      pattern: "Generacion Radio",
      command: "generacionradio"
    },
    "los40": {
      pattern: "Los 40",
      command: "los40"
    },
  },

  commands: {
   "Dial": {
      notificationExec: {
        notification: "EXT_RADIO-PLAY",
        payload: "Cadena Dial"
      },
      displayResponse: false,
      soundExec: {
        chime: "open"
      }
    },
   "kissfm": {
      notificationExec: {
        notification: "EXT_RADIO-PLAY",
        payload: "KISS FM"
      },
      displayResponse: false,
      soundExec: {
        chime: "open"
      }
    },
    "40urban": {
      notificationExec: {
        notification: "EXT_RADIO-PLAY",
        payload: "LOS40 URBAN"
      },
      displayResponse: false,
      soundExec: {
        chime: "open"
      }
    },
    "hitfm": {
      notificationExec: {
        notification: "EXT_RADIO-PLAY",
        payload: "HIT FM"
      },
      displayResponse: false,
      soundExec: {
        chime: "open"
      }
    },
    "generacionradio": {
      notificationExec: {
        notification: "EXT_RADIO-PLAY",
        payload: "Generación Radio"
      },
      displayResponse: false,
      soundExec: {
        chime: "open"
      }
    },
    "los40": {
      notificationExec: {
        notification: "EXT_RADIO-PLAY",
        payload: "LOS40"
      },
      displayResponse: false,
      soundExec: {
        chime: "open"
      }
    }
  }
}
exports.recipe = recipe
