/**  Radio francaise   **/
/** mis à jour le 26/03/22 **/
/**  @bugsounet  and @2hdlockness  **/

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
    "info": {
      pattern: "mets les infos",
      command: "info"
    }
  },

  commands: {
    "cheriefm": {
      notificationExec: {
        notification: "EXT_RADIO-START",
        payload: (params) => {
          return {
            img: "modules/EXT-RadioPlayer/Logos/FR/ChérieFM.png",
            link: "https://scdn.nrjaudio.fm/fr/30201/mp3_128.mp3?origine=EXT-RadioPlayer&cdn_path=audio_lbs9"
          }
        }
      },
      displayResponse: false,
      soundExec: {
        chime: "open"
      }
    },
   "rtl": {
      notificationExec: {
        notification: "EXT_RADIO-START",
        payload: (params) => {
          return {
            img: "modules/EXT-RadioPlayer/Logos/FR/RTL.png",
            link: "http://streaming.radio.rtl.fr/rtl-1-44-128"
          }
        }
      },
      displayResponse: false,
      soundExec: {
        chime: "open"
      }
    },
   "rireetchansons": {
      notificationExec: {
        notification: "EXT_RADIO-START",
        payload: (params) => {
          return {
            img: "modules/EXT-RadioPlayer/Logos/FR/Rire&Chansons.png",
            link: "http://185.52.127.160/fr/30401/aac_64.mp3?origine=EXT-RadioPlayer"
          }
        }
      },
      displayResponse: false,
      soundExec: {
        chime: "open"
      }
    },
    "rtl2": {
      notificationExec: {
        notification: "EXT_RADIO-START",
        payload: (params) => {
          return {
            img: "modules/EXT-RadioPlayer/Logos/FR/RTL2.png",
            link: "http://streaming.radio.rtl2.fr/rtl2-1-44-128"
          }
        }
      },
      displayResponse: false,
      soundExec: {
        chime: "open"
      }
    },
    "funradio": {
      notificationExec: {
        notification: "EXT_RADIO-START",
        payload: (params) => {
          return {
            img: "modules/EXT-RadioPlayer/Logos/FR/FunRadio.png",
            link: "http://streaming.radio.funradio.fr:80/fun-1-44-128"
          }
        }
      },
      displayResponse: false,
      soundExec: {
        chime: "open"
      }
    },
    "europe1": {
      notificationExec: {
        notification: "EXT_RADIO-START",
        payload: (params) => {
          return {
            img: "modules/EXT-RadioPlayer/Logos/FR/Europe1.png",
            link: "http://ais-live.cloud-services.paris:8000/europe1.mp3"
          }
        }
      },
      displayResponse: false,
      soundExec: {
        chime: "open"
      }
    },
    "rfm": {
      notificationExec: {
        notification: "EXT_RADIO-START",
        payload: (params) => {
          return {
            img: "modules/EXT-RadioPlayer/Logos/FR/RFM.png",
            link: "https://ais-live.cloud-services.paris:8443/rfm.mp3"
          }
        }
      },
      displayResponse: false,
      soundExec: {
        chime: "open"
      }
    },
    "rmc": {
      notificationExec: {
        notification: "EXT_RADIO-START",
        payload: (params) => {
          return {
            img: "modules/EXT-RadioPlayer/Logos/FR/RMC.svg",
            link: "http://chai5she.cdn.dvmr.fr/rmcinfo"
          }
        }
      },
      displayResponse: false,
      soundExec: {
        chime: "open"
      }
    },
    "nrj": {
      notificationExec: {
        notification: "EXT_RADIO-START",
        payload: (params) => {
          return {
            img: "modules/EXT-RadioPlayer/Logos/FR/NRJ.png",
            link: "http://185.52.127.173/fr/40008/aac_64.mp3?origine=EXT_RadioPlayer"
          }
        }
      },
      displayResponse: false,
      soundExec: {
        chime: "open"
      }
    },
    "nostalgie": {
      notificationExec: {
        notification: "EXT_RADIO-START",
        payload: (params) => {
          return {
            img: "modules/EXT-RadioPlayer/Logos/FR/Nostalgie.png",
            link: "http://185.52.127.155/fr/40045/aac_64.mp3?origine=EXT-RadioPlayer"
          }
        }
      },
      displayResponse: false,
      soundExec: {
        chime: "open"
      }
    },
    "contact": {
      notificationExec: {
        notification: "EXT_RADIO-START",
        payload: (params) => {
          return {
            img: "modules/EXT-RadioPlayer/Logos/FR/contact.png",
            link: "http://radio-contact.ice.infomaniak.ch/radio-contact-high.mp3"
          }
        }
      },
      displayResponse: false,
      soundExec: {
        chime: "open"
      }
    },
    "voltage": {
      notificationExec: {
        notification: "EXT_RADIO-START",
        payload: (params) => {
          return {
            img: "modules/EXT-RadioPlayer/Logos/FR/voltage.png",
            link: "http://start-voltage.ice.infomaniak.ch/start-voltage-high.mp3"
          }
        }
      },
      displayResponse: false,
      soundExec: {
        chime: "open"
      }
    },
    "skyrock": {
      notificationExec: {
        notification: "EXT_RADIO-START",
        payload: (params) => {
          return {
            img: "modules/EXT-RadioPlayer/Logos/FR/Skyrock.png",
            link: "http://icecast.skyrock.net/s/natio_mp3_128k"
          }
        }
      },
      displayResponse: false,
      soundExec: {
        chime: "open"
      }
    },
    "fg": {
      notificationExec: {
        notification: "EXT_RADIO-START",
        payload: (params) => {
          return {
            img: "modules/EXT-RadioPlayer/Logos/FR/fg.png",
            link: "http://radiofg.impek.com/fg"
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
