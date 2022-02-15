"use strict"

var NodeHelper = require("node_helper")
var logRadio = (...args) => { /* do nothing */ }

module.exports = NodeHelper.create({
  start: function () {
    this.config = {}
    this.Radio = null
    this.Lib = []
    this.RNumber = 0
  },

  socketNotificationReceived: function (noti, payload) {
    switch (noti) {
      case "INIT":
        this.config = payload
        this.initialize()
        break
      case "PLAY":
        this.playWithVlc(payload)
        break
      case "STOP":
        this.CloseVlc()
        break
      case "VOLUME":
        this.VolumeVLC(payload)
        break
    }
  },

  initialize: async function() {
    if (this.config.debug) logRadio = (...args) => { console.log("[RADIO]", ...args) }
    console.log("[RADIO] EXT-RadioPlayer Version:", require('./package.json').version, "rev:", require('./package.json').rev)
    let bugsounet = await this.loadBugsounetLibrary()
    if (bugsounet) {
      console.error("[RADIO] Warning:", bugsounet, "library not loaded !")
      console.error("[RADIO] Try to solve it with `npm install` in EXT-RadioPlayer directory")
      return
    }
    console.log("[RADIO] EXT-Radio is Ready.")
    this.sendSocketNotification("READY")
  },

  /** radio with VLC **/
  playWithVlc: function (link) {
    this.RNumber++
    if (this.Radio) this.CloseVlc()
    let cvlcArgs = ["--no-http-forward-cookies", "--play-and-exit", "--video-title=library @bugsounet/cvlc Radio Player"]
    this.Radio = new this.Lib.cvlc(cvlcArgs)
    this.Radio.play(
      link,
      ()=> {
        logRadio("Found link:", link)
        if (this.Radio) {
          this.Radio.cmd("volume "+ this.config.maxVolume)
          this.sendSocketNotification("PLAYING")
        }
      },
      ()=> {
        this.RNumber--
        if (this.RNumber < 0) this.RNumber = 0
        logRadio("Ended #" + this.RNumber)
        if (this.RNumber == 0) {
          logRadio("Finish !")
          this.sendSocketNotification("FINISH")
          this.Radio = null
        }
      }
    )
  },

  CloseVlc: function () {
    if (this.Radio) {
      logRadio("Force Closing VLC...")
      this.Radio.destroy()
      this.Radio = null
      logRadio("Done Closing VLC...")
    }
    else {
      log("Not running!")
    }
  },

  VolumeVLC: function(volume) {
    if (this.Radio) {
      logRadio("Set VLC Volume to:", volume)
      this.Radio.cmd("volume " + volume)
    }
  },

  /** Load require @busgounet library **/
  /** It will not crash MM (black screen) **/
  loadBugsounetLibrary: function() {
    let libraries= [
      // { "library to load" : [ "store library name", "path to check" ] }
      { "@bugsounet/cvlc": [ "cvlc", "maxVolume" ] }
    ]

    let errors = 0
    return new Promise(resolve => {
      libraries.forEach(library => {
        for (const [name, configValues] of Object.entries(library)) {
          let libraryToLoad = name,
              libraryName = configValues[0],
              libraryPath = configValues[1],
              index = (obj,i) => { return obj[i] }

          // libraryActivate: verify if the needed path of config is activated (result of reading config value: true/false) **/
          let libraryActivate = libraryPath.split(".").reduce(index,this.config) 
          if (libraryActivate) {
            try {
              if (!this.Lib[libraryName]) {
                this.Lib[libraryName] = require(libraryToLoad)
                logRadio("Loaded:", libraryToLoad)
              }
            } catch (e) {
              this.sendSocketNotification("LIBRARY_ERROR", libraryToLoad) // -<< to code
              console.error("[RADIO]", libraryToLoad, "Loading error!" , e)
              errors++
            }
          }
        }
      })
      resolve(errors)
    })
  },

})
