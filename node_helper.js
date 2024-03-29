"use strict";

var NodeHelper = require("node_helper");

var log = (...args) => { /* do nothing */ };

module.exports = NodeHelper.create({
  start () {
    this.config = {};
    this.Radio = null;
    this.lib = [];
    this.RNumber = 0;
  },

  socketNotificationReceived (noti, payload) {
    switch (noti) {
      case "INIT":
        this.config = payload;
        this.initialize();
        break;
      case "PLAY":
        this.playWithVlc(payload);
        break;
      case "STOP":
        this.CloseVlc();
        break;
      case "VOLUME":
        this.VolumeVLC(payload);
        break;
    }
  },

  async initialize () {
    if (this.config.debug) log = (...args) => { console.log("[RADIO]", ...args); };
    console.log("[RADIO] EXT-RadioPlayer Version:", require("./package.json").version, "rev:", require("./package.json").rev);
    let bugsounet = await this.loadBugsounetLibrary();
    if (bugsounet) {
      console.error("[RADIO] Warning:", bugsounet, "library not loaded !");
      console.error("[RADIO] Try to solve it with `npm install` in EXT-RadioPlayer directory");
      return;
    }
    console.log("[RADIO] EXT-Radio is Ready.");
    this.sendSocketNotification("READY");
  },

  /** radio with VLC **/
  playWithVlc (link) {
    this.RNumber++;
    if (this.Radio) this.CloseVlc();
    let cvlcArgs = ["--no-http-forward-cookies", "--video-title=library @bugsounet/cvlc Radio Player"];
    this.Radio = new this.lib.cvlc(cvlcArgs);
    this.Radio.play(
      link,
      ()=> {
        log("Found link:", link);
        if (this.Radio) {
          this.Radio.cmd(`volume ${ this.config.maxVolume}`);
          this.sendSocketNotification("PLAYING");
        }
      },
      ()=> {
        this.RNumber--;
        if (this.RNumber < 0) this.RNumber = 0;
        log(`Ended #${  this.RNumber}`);
        if (this.RNumber === 0) {
          log("Finish !");
          this.sendSocketNotification("FINISH");
          this.Radio = null;
        }
      }
    );
  },

  CloseVlc () {
    if (this.Radio) {
      log("Force Closing VLC...");
      this.Radio.destroy();
      this.Radio = null;
      log("Done Closing VLC...");
    }
    else log("Not running!");
  },

  VolumeVLC (volume) {
    if (this.Radio) {
      log("Set VLC Volume to:", volume);
      this.Radio.cmd(`volume ${  volume}`);
    }
  },

  /** Load require @busgounet library **/
  /** It will not crash MM (black screen) **/
  loadBugsounetLibrary () {
    let libraries= [
      // { "library to load" : "store library name" ] }
      { "@magicmirror2/cvlc": "cvlc" }
    ];

    let errors = 0;
    return new Promise((resolve) => {
      libraries.forEach((library) => {
        for (const [name, configValues] of Object.entries(library)) {
          let libraryToLoad = name;
          let libraryName = configValues;

          try {
            if (!this.lib[libraryName]) {
              this.lib[libraryName] = require(libraryToLoad);
              log("Loaded:", libraryToLoad, "->", `this.lib.${libraryName}`);
            }
          } catch (e) {
            console.error("[RADIO]", libraryToLoad, "Loading error!" , e.toString());
            this.sendSocketNotification("WARNING" , { library: libraryToLoad });
            errors++;
          }
        }
      });
      resolve(errors);
      if (!errors) console.log("[RADIO] All libraries loaded!");
    });
  }
});
