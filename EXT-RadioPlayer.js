/**
 ** Module : EXT-RadioPlayer
 ** @bugsounet
 ** ©02-2022
 ** support: https://forum.bugsounet.fr
 **/

logRadio = (...args) => { /* do nothing */ }

/** todo:
 * make received noti for playing
 * onStart !?
 * make installer
*/

Module.register("EXT-RadioPlayer", {
  defaults: {
    debug: true,
    onStart: true,
    Start: {
      img: "modules/EXT-RadioPlayer/radios/LogosRadios/ChérieFM.png",
      link: "https://scdn.nrjaudio.fm/fr/30201/mp3_128.mp3?origine=EXT-RadioPlayer&cdn_path=audio_lbs9"
    },
    minVolume: 30,
    maxVolume: 75,
  },

  start: function () {
    if (this.config.debug) logRadio = (...args) => { console.log("[RADIO]", ...args) }
    this.radio = null
    this.initializeMusicVolumeVLC()
    this.radioPlayer= {
      ready: false,
      play: false,
      img: null,
      link: null
    }
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

  notificationReceived: function(noti, payload, sender) {
    switch(noti) {
      case "DOM_OBJECTS_CREATED":
        this.sendSocketNotification("INIT", this.config)
        break
      case "GAv4_READY":
        if (sender.name == "MMM-GoogleAssistant") this.sendNotification("EXT_HELLO", this.name)
        break
      case "EXT_STOP":
      case "EXT_RADIO-STOP":
        if (this.radioPlayer.play) this.sendSocketNotification("STOP")
        break
      case "EXT_RADIO-VOLUME_MIN":
        if (this.radioPlayer.play) this.sendSocketNotification("VOLUME", this.config.minVolume)
        break
      case "EXT_RADIO-VOLUME_MAX":
        if (this.radioPlayer.play) this.sendSocketNotification("VOLUME", this.config.maxVolume)
        break
    }
  },

  socketNotificationReceived: function(noti, payload) {
    switch(noti) {
      case "PLAYING":
        this.radioPlayer.play = true
        this.showRadio()
        break
      case "FINISH":
        this.radioPlayer.play = false
        this.showRadio()
        break
      case "READY":
        this.radioPlayer.ready = true
        if (this.config.onStart) this.radioCommand(this.config.Start)
        break
    }
  },

  showRadio: function() {
    if (this.radioPlayer.img) {
      if (this.radioPlayer.play) this.showDivWithAnimatedFlip("EXT_RADIO")
      else this.hideDivWithAnimatedFlip("EXT_RADIO")
    }
    if (this.radioPlayer.play) this.sendNotification("EXT_RADIO-CONNECTED")
    else this.sendNotification("EXT_RADIO-DISCONNECTED")
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
    if (!this.radioPlayer.ready) return
    if (payload.link) {
      if (payload.img) {
        var radioImg = document.getElementById("EXT_RADIO_IMG")
        var backGround = document.getElementById("EXT_RADIO_BACKGROUND")
        this.radioPlayer.img = payload.img
        radioImg.src = this.radioPlayer.img
        backGround.style.backgroundImage = `url(${payload.img})`
      }
      this.radioPlayer.link = payload.link
      this.sendSocketNotification("PLAY", payload.link)
    }
  },

  /** initialise volume control for VLC **/
  initializeMusicVolumeVLC: function() {
    /** convert volume **/
    try {
      let valueMin = null
      valueMin = parseInt(this.config.minVolume)
      if (typeof valueMin === "number" && valueMin >= 0 && valueMin <= 100) this.config.minVolume = this.convertPercentToValue(valueMin)
      else {
        console.error("[RADIO] config.minVolume error! Corrected with 30")
        this.config.minVolume = 70
      }
    } catch (e) {
      console.error("[RADIO] config.minVolume error!", e)
      this.config.minVolume = 70
    }
    try {
      let valueMax = null
      valueMax = parseInt(this.config.maxVolume)
      if (typeof valueMax === "number" && valueMax >= 0 && valueMax <= 100) this.config.maxVolume = this.convertPercentToValue(valueMax)
      else {
        console.error("[RADIO] config.maxVolume error! Corrected with 100")
        this.config.maxVolume = 255
      }
    } catch (e) {
      console.error("[RADIO] config.maxVolume error!", e)
      this.config.maxVolume = 255
    }
    console.log("[RADIO] VLC Volume Control initialized!")
  },

  /** Convert percent to cvlc value **/
  convertPercentToValue: function(percent) {
    return parseInt(((percent*256)/100).toFixed(0))
  }
})
