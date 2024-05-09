/**  Radio italiane
 * aggiornate al giorno 09/05/20
 *  @di-ma
 * update for GA v4 22/03/26 @bugsounet
 * 2024/05 - @bugsounet: Updated for EXT-RadioPlayer v2.0.0
**/

var recipe = {
  transcriptionHooks: {
    "kisskiss": {
      pattern: "metti radio kiss kiss",
      command: "kisskiss"
    },
    "radio101": {
      pattern: "metti radio 101",
      command: "radio101"
    },
    "radioitalia": {
      pattern: "metti radio italia",
      command: "radioitalia"
    },
    "radio105": {
      pattern: "metti radio 105",
      command: "radio105"
    },
    "rtl1025": {
      pattern: "metti rtl",
      command: "rtl1025"
    },
    "radiodj": {
      pattern: "metti radio dj",
      command: "radiodj"
    },
  },

  commands: {
    "kisskiss": {
      notificationExec: {
        notification: "EXT_RADIO-PLAY",
        payload: "Radio Kiss Kiss"
      },
      displayResponse: false,
      soundExec: {
        chime: "open"
      }
    },
   "radio101": {
      notificationExec: {
        notification: "EXT_RADIO-PLAY",
        payload: "Radio 101"
      },
      displayResponse: false,
      soundExec: {
        chime: "open"
      }
    },
   "radioitalia": {
      notificationExec: {
        notification: "EXT_RADIO-PLAY",
        payload: "Radio Italia"
      },
      displayResponse: false,
      soundExec: {
        chime: "open"
      }
    },
    "radio105": {
      notificationExec: {
        notification: "EXT_RADIO-PLAY",
        payload: "Radio 105"
      },
      displayResponse: false,
      soundExec: {
        chime: "open"
      }
    },
    "rtl1025": {
      notificationExec: {
        notification: "EXT_RADIO-PLAY",
        payload: "RTL 102.5"
      },
      displayResponse: false,
      soundExec: {
        chime: "open"
      }
    },
    "radiodj": {
      notificationExec: {
        notification: "EXT_RADIO-PLAY",
        payload: "Radio Deejay"
      },
      displayResponse: false,
      soundExec: {
        chime: "open"
      }
    }
  }
}
exports.recipe = recipe
