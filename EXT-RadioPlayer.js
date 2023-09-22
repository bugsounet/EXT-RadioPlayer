/**
 ** Module : EXT-RadioPlayer
 ** ©@bugsounet
 ** v09-2023
 ** support: https://forum.bugsounet.fr
 **/

Module.register("EXT-RadioPlayer", {
  requiresVersion: "2.25.0",

  defaults: {
    debug: false,
    minVolume: 30,
    maxVolume: 75,
  },

  start: function () {
    this.radio = null
    this.initializeMusicVolumeVLC()
    this.radioPlayer= {
      ready: false,
      play: false,
      img: null,
      link: null,
      new: false
    }
  },

  getStyles: function () {
    return [ "EXT-RadioPlayer.css" ]
  },

  getDom: function() {
    var radio = document.createElement("div")
    radio.id = "EXT_RADIO"
    var radioBackground = document.createElement("div")
    radioBackground.id = "EXT_RADIO_BACKGROUND"
    radio.appendChild(radioBackground)
    var radioForeground = document.createElement("div")
    radioForeground.id = "EXT_RADIO_FOREGROUND"
    radio.appendChild(radioForeground)
    var radioImg = document.createElement("img")
    radioImg.id = "EXT_RADIO_IMG"
    radioForeground.appendChild(radioImg)
    radioImg.addEventListener('error', () => { radioImg.src = this.file("Logos/radio.jpg") }, false)
    return radio
  },

  notificationReceived: function(noti, payload, sender) {
    if (noti == "MODULE_DOM_CREATED") this.hide(0, () => {}, {lockString: "EXT-RADIO_LOCK"})
    if (noti == "GW_READY" && sender.name == "Gateway") this.sendSocketNotification("INIT", this.config)
    if (!this.radioPlayer.ready) return

    switch(noti) {
      case "EXT_STOP":
      case "EXT_RADIO-STOP":
        if (this.radioPlayer.play) {
          this.radioPlayer.new = false
          this.sendSocketNotification("STOP")
        }
        break
      case "EXT_RADIO-VOLUME_MIN":
        if (this.radioPlayer.play) this.sendSocketNotification("VOLUME", this.config.minVolume)
        break
      case "EXT_RADIO-VOLUME_MAX":
        if (this.radioPlayer.play) this.sendSocketNotification("VOLUME", this.config.maxVolume)
        break
      case "EXT_RADIO-START":
        this.radioCommand(payload)
        break
    }
  },

  socketNotificationReceived: function(noti, payload) {
    switch(noti) {
      case "WARNING": // EXT-Alert is unlocked for receive all alerts
        this.sendNotification("EXT_ALERT", {
          type: "warning",
          message: "Error When Loading: " + payload.library + ". Try to solve it with `npm install` in EXT-RadioPlayer directory",
          timer: 10000
        })
        break
      case "PLAYING":
        this.radioPlayer.play = true
        this.showRadio()
        break
      case "FINISH":
        this.radioPlayer.play = false
        if (this.radioPlayer.new) this.radioPlayer.new = false
        else this.showRadio()
        break
      case "READY":
        this.radioPlayer.ready = true
        this.sendNotification("EXT_HELLO", this.name)
        break
    }
  },

  showRadio: function() {
    if (this.radioPlayer.img) {
      if (this.radioPlayer.play) this.show(1000, () => {}, {lockString: "EXT-RADIO_LOCK"})
      else this.hide(1000, () => {}, {lockString: "EXT-RADIO_LOCK"})
    }
    if (this.radioPlayer.new) return
    if (this.radioPlayer.play) this.sendNotification("EXT_RADIO-CONNECTED")
    else this.sendNotification("EXT_RADIO-DISCONNECTED")
  },

  /** Radio command (for recipe) **/
  radioCommand: function(payload) {
    if (!this.radioPlayer.ready) return
    if (this.radioPlayer.play) this.radioPlayer.new = true
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
