/** Radio francaise  **/
/** mis à jour le 05/05/24 **/
/** @bugsounet **/
/** from streamsConfig.fr.json **/

var recipe = {
  transcriptionHooks: {
    "cheriefm": {
      pattern: "mets chérie fm",
      command: "cheriefm"
    },
    "rtl": {
      pattern: "mets rtl",
      command: "rtl"
    },
    "rireetchansons": {
      pattern: "mets rire et chansons",
      command: "rireetchansons"
    },
    "rtl2": {
      pattern: "mets rtl2",
      command: "rtl2"
    },
    "funradio": {
      pattern: "mets fun radio",
      command: "funradio"
    },
    "europe1": {
      pattern: "mets europe 1",
      command: "europe1"
    },
    "rfm": {
      pattern: "mets rfm",
      command: "rfm"
    },
    "rmc": {
      pattern: "mets rmc",
      command: "rmc"
    },
    "nrj": {
      pattern: "mets nrj",
      command: "nrj"
    },
    "nostalgie": {
      pattern: "mets nostalgie",
      command: "nostalgie"
    },
    "contact": {
      pattern: "mets contact fm",
      command: "contact"
    },
    "voltage": {
      pattern: "mets voltage",
      command: "voltage"
    },
    "skyrock": {
      pattern: "mets skyrock",
      command: "skyrock"
    },
    "fg": {
      pattern: "mets radio fg",
      command: "fg"
    },
    "franceinter": {
      pattern: "mets france inter",
      command: "franceinter" 
    }
  },

  commands: {
    "cheriefm": {
      notificationExec: {
        notification: "EXT_RADIO-PLAY",
        payload: "Chérie FM"
      },
      displayResponse: false,
      soundExec: {
        chime: "open"
      }
    },
   "rtl": {
      notificationExec: {
        notification: "EXT_RADIO-PLAY",
        payload: "RTL"
      },
      displayResponse: false,
      soundExec: {
        chime: "open"
      }
    },
   "rireetchansons": {
      notificationExec: {
        notification: "EXT_RADIO-PLAY",
        payload: "Rire et chansons"
      },
      displayResponse: false,
      soundExec: {
        chime: "open"
      }
    },
    "rtl2": {
      notificationExec: {
        notification: "EXT_RADIO-PLAY",
        payload: "RTL2"
      },
      displayResponse: false,
      soundExec: {
        chime: "open"
      }
    },
    "funradio": {
      notificationExec: {
        notification: "EXT_RADIO-PLAY",
        payload: "FunRadio"
      },
      displayResponse: false,
      soundExec: {
        chime: "open"
      }
    },
    "europe1": {
      notificationExec: {
        notification: "EXT_RADIO-PLAY",
        payload: "Europe1"
      },
      displayResponse: false,
      soundExec: {
        chime: "open"
      }
    },
    "rfm": {
      notificationExec: {
        notification: "EXT_RADIO-PLAY",
        payload: "RFM"
      },
      displayResponse: false,
      soundExec: {
        chime: "open"
      }
    },
    "rmc": {
      notificationExec: {
        notification: "EXT_RADIO-PLAY",
        payload: "RMC"
      },
      displayResponse: false,
      soundExec: {
        chime: "open"
      }
    },
    "nrj": {
      notificationExec: {
        notification: "EXT_RADIO-PLAY",
        payload: "NRJ"
      },
      displayResponse: false,
      soundExec: {
        chime: "open"
      }
    },
    "nostalgie": {
      notificationExec: {
        notification: "EXT_RADIO-PLAY",
        payload: "Nostalgie"
      },
      displayResponse: false,
      soundExec: {
        chime: "open"
      }
    },
    "contact": {
      notificationExec: {
        notification: "EXT_RADIO-PLAY",
        payload: "Contact FM"
      },
      displayResponse: false,
      soundExec: {
        chime: "open"
      }
    },
    "voltage": {
      notificationExec: {
        notification: "EXT_RADIO-PLAY",
        payload: "Voltage"
      },
      displayResponse: false,
      soundExec: {
        chime: "open"
      }
    },
    "skyrock": {
      notificationExec: {
        notification: "EXT_RADIO-PLAY",
        payload: "Skyrock"
      },
      displayResponse: false,
      soundExec: {
        chime: "open"
      }
    },
    "fg": {
      notificationExec: {
        notification: "EXT_RADIO-PLAY",
        payload: "Radio FG"
      },
      displayResponse: false,
      soundExec: {
        chime: "open"
      }
    },
    "franceinter": {
      notificationExec: {
        notification: "EXT_RADIO-PLAY",
        payload: "France Inter"
      },
      displayResponse: false,
      soundExec: { chime: "open" }
    }
  }
}
exports.recipe = recipe 
