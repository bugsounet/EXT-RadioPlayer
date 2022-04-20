 
/**  Radio español   **/
/** Actualizado el 10/04/22 **/
/**  @The Dev3l  **/
/** Built for GA V4  @bugsounet **/

var recipe = {
  transcriptionHooks: {
    "40classic": {
      pattern: "Los 40 classic",
      command: "40classic"
    },
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
    "40classic": {
      notificationExec: {
        notification: "EXT_RADIO-START",
        payload: (params) => {
          return {
            img: "modules/EXT-RadioPlayer/Logos/ES/Los_40_classic.png",
            link: "http://21313.live.streamtheworld.com/LOS40_CLASSIC.mp3"
          }
        }
      },
      displayResponse: false,
      soundExec: {
        chime: "open"
      }
    },
   "Dial": {
      notificationExec: {
        notification: "EXT_RADIO-START",
        payload: (params) => {
          return {
            img: "modules/EXT-RadioPlayer/Logos/ES/Cadena_DIAL.png",
            link: "http://23603.live.streamtheworld.com/CADENADIAL.mp3"
          }
        }
      },
      displayResponse: false,
      soundExec: {
        chime: "open"
      }
    },
   "kissfm": {
      notificationExec: {
        notification: "EXT_RADIO-START",
        payload: (params) => {
          return {
            img: "modules/EXT-RadioPlayer/Logos/ES/Kiss_FM.png",
            link: "http://kissfm.kissfmradio.cires21.com/kissfm.mp3"
          }
        }
      },
      displayResponse: false,
      soundExec: {
        chime: "open"
      }
    },
    "40urban": {
      notificationExec: {
        notification: "EXT_RADIO-START",
        payload: (params) => {
          return {
            img: "modules/EXT-RadioPlayer/Logos/ES/Los_40_urban.png",
            link: "http://23543.live.streamtheworld.com/LOS40_URBAN.mp3"
          }
        }
      },
      displayResponse: false,
      soundExec: {
        chime: "open"
      }
    },
    "hitfm": {
      notificationExec: {
        notification: "EXT_RADIO-START",
        payload: (params) => {
          return {
            img: "modules/EXT-RadioPlayer/Logos/ES/Hit_FM.jpg",
            link: "http://hitfm.kissfmradio.cires21.com/hitfm.mp3"
          }
        }
      },
      displayResponse: false,
      soundExec: {
        chime: "open"
      }
    },
    "generacionradio": {
      notificationExec: {
        notification: "EXT_RADIO-START",
        payload: (params) => {
          return {
            img: "modules/EXT-RadioPlayer/Logos/ES/Generacion_radio.jpg",
            link: "https://antares.dribbcast.com/proxy/generacionradio?mp=/stream"
          }
        }
      },
      displayResponse: false,
      soundExec: {
        chime: "open"
      }
    },
    "los40": {
      notificationExec: {
        notification: "EXT_RADIO-START",
        payload: (params) => {
          return {
            img: "modules/EXT-RadioPlayer/Logos/ES/Los40.jpg",
            link: "http://21253.live.streamtheworld.com/LOS40.mp3"
          }
        }
      },
      displayResponse: false,
      soundExec: {
        chime: "open"
      }
    }
  }
}
exports.recipe = recipe
