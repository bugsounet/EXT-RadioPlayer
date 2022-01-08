/**
 ** Module : EXT-RadioPlayer
 ** @bugsounet
 ** ©01-2022
 ** support: http://forum.bugsounet.fr
 **/

logRadio = (...args) => { /* do nothing */ }

// @todo:
// * volume control
// * send noti for Gateway

Module.register("EXT-RadioPlayer", {
  defaults: {
    debug: true,
    onStart: true,
    Start: {
      img: "modules/EXT-RadioPlayer/radios/LogosRadios/ChérieFM.png",
      link: "https://scdn.nrjaudio.fm/fr/30201/mp3_128.mp3?origine=EXT-RadioPlayer&cdn_path=audio_lbs9"
    },
    volumeMax: 0.6,
    volumeMin: 0.1
  },

  start: function () {
    if (this.config.debug) logRadio = (...args) => { console.log("[RADIO]", ...args) }
    this.radio = null
    this.radioPlayer= {
      play: false,
      img: null,
      link: null,
    },
    this.createRadio()
  },

  getScripts: function() {
    return [ ]
  },

  getStyles: function () {
    return [
      "EXT-RadioPlayer.css",
      "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
    ]
  },

  getDom: function() {
    var radio = document.createElement("div")
    radio.id = "EXT_RADIO"
    radio.className = "hidden animate__animated"
    radio.style.setProperty('--animate-duration', '1s')
    var radioBackground = document.createElement("div")
    radioBackground.id = "EXT_RADIO_BACKGROUND"
    radio.appendChild(radioBackground)
    var radioForeground = document.createElement("div")
    radioForeground.id = "EXT_RADIO_FOREGROUND"
    radio.appendChild(radioForeground)
    var radioImg = document.createElement("img")
    radioImg.id = "EXT_RADIO_IMG"
    radioForeground.appendChild(radioImg)
    return radio
  },

  notificationReceived: function(noti, payload) {
    switch(noti) {
      case "DOM_OBJECTS_CREATED":
        this.sendSocketNotification("INIT", this.config)
        if (this.config.onStart) this.radioCommand(this.config.Start)
        this.sendNotification("EXT_HELLO", this.name)
        break
      case "EXT-RADIO-STOP":
        console.log(this.radioPlayer)
        if (this.radioPlayer.play) this.radio.pause()
        break
    }
  },

  /** Create Radio function and cb **/
  createRadio: function () {
    this.radio = new Audio()

    this.radio.addEventListener("ended", ()=> {
      logRadio("Radio ended")
      this.radioPlayer.play = false
      this.showRadio()
    })
    this.radio.addEventListener("pause", ()=> {
      logRadio("Radio paused")
      this.radioPlayer.play = false
      this.showRadio()
    })
    this.radio.addEventListener("abort", ()=> {
      logRadio("Radio aborted")
      this.radioPlayer.play = false
      this.showRadio()
    })
    this.radio.addEventListener("error", (err)=> {
      logRadio("Radio error: " + err)
      this.radioPlayer.play = false
      this.showRadio()
    })
    this.radio.addEventListener("loadstart", ()=> {
      logRadio("Radio started")
      this.radioPlayer.play = true
      this.radio.volume = this.config.volumeMax
      this.showRadio()
    })
  },

  showRadio: function() {
    if (this.radioPlayer.img) {
      if (this.radioPlayer.play) {
        this.showDivWithAnimatedFlip("EXT_RADIO")
      } else {
        this.hideDivWithAnimatedFlip("EXT_RADIO")
      }
    }
    if (this.radioPlayer.play) {
      /*
      this.sendSocketNotification("SCREEN_WAKEUP")
      this.hideDivWithAnimatedFlip("EXT_SCREEN_CONTENER")
      this.sendSocketNotification("SCREEN_LOCK", true)
      */
    } else {
      /*
      this.sendSocketNotification("SCREEN_LOCK", false)
      this.showDivWithAnimatedFlip("EXT_SCREEN_CONTENER")
      */
    }
  },

  hideDivWithAnimatedFlip: function(div) {
    var module = document.getElementById(div)
    module.classList.remove("animate__flipInX")
    module.classList.add("animate__flipOutX")
    module.addEventListener('animationend', (e) => {
      if (e.animationName == "flipOutX" && e.path[0].id == div) {
        module.classList.add("hidden")
      }
      e.stopPropagation()
    }, {once: true})
  },

  showDivWithAnimatedFlip: function(div) {
    var module = document.getElementById(div)
    module.classList.remove("hidden")
    module.classList.remove("animate__flipOutX")
    module.classList.add("animate__flipInX")
  },

  /** Radio command (for recipe) **/
  radioCommand: function(payload) {
    if (payload.link) {
      if (payload.img) {
        var radioImg = document.getElementById("EXT_RADIO_IMG")
        var backGround = document.getElementById("EXT_RADIO_BACKGROUND")
        this.radioPlayer.img = payload.img
        radioImg.src = this.radioPlayer.img
        backGround.style.backgroundImage = `url(${payload.img})`
      }
      this.radioPlayer.link = payload.link
      this.radio.src = payload.link
      this.radio.autoplay = true
    }
  },
})
