"use strict";

var NodeHelper = require("node_helper");
const VLC = require("vlc-client");

var log = (...args) => { /* do nothing */ };

module.exports = NodeHelper.create({
  start () {
    this.config = {};
    this.Radio = null;
    this.vlc = null;
    this.statusInterval = null;
    this.warn = 0;
    this.radio = {
      is_playing: false,
      link: null,
      filemame: null
    };
  },

  socketNotificationReceived (noti, payload) {
    switch (noti) {
      case "INIT":
        this.config = payload;
        this.initialize();
        break;
      case "START":
        this.startRadio();
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

  initialize () {
    if (this.config.debug) log = (...args) => { console.log("[RADIO]", ...args); };
    console.log("[RADIO] EXT-RadioPlayer Version:", require("./package.json").version, "rev:", require("./package.json").rev);
  },

  startRadio () {
    console.log("[RADIO] Starting Radio module...");
    this.vlc = new VLC.Client({
      ip: "127.0.0.1",
      port: 8082,
      password: "EXT-VLCServer",
      log: this.config.debug
    });
    console.log("[RADIO] EXT-Radio is Ready.");
    this.sendSocketNotification("READY");
  },

  pulse () {
    log("Launch pulse");
    this.statusInterval = setInterval(() => this.status(), 1000);
  },

  async status () {
    const status = await this.vlc.status().catch(
      (err)=> {
        if (err.code === "ECONNREFUSED" || err.message.includes("Unauthorized")) {
          this.warn++;
          console.error("[RADIO] Can't start VLC Client! Reason:", err.message);
          if (this.warn > 5) {
            clearInterval(this.statusInterval);
            this.sendSocketNotification("ERROR", `Can't start VLC Client! Reason: ${err.message}`);
          }
        } else {
          console.error("[RADIO]", err.message);
          this.sendSocketNotification("ERROR", `VLC Client error: ${err.message}`);
        }
      }
    );

    if (!status) return;
    else this.warn = 0;

    if (status.state === "playing") {
      if (status.information.category.meta.filename !== this.radio.filename) {
        if (this.radio.is_playing) this.sendSocketNotification("FINISH");
        this.radio.is_playing = false;
        log("Not played by EXT-RadioPlayer");
        clearTimeout(this.statusInterval);
        return;
      }
      if (!this.radio.is_playing) {
        log("Set volume to", this.config.maxVolume);
        await this.vlc.setVolumeRaw(this.config.maxVolume);
        this.sendSocketNotification("PLAYING");
      }
      this.radio.is_playing = true;
      log("Playing");
    }
    if (status.state === "stopped") {
      if (this.radio.is_playing) this.sendSocketNotification("FINISH");
      this.radio.is_playing = false;
      log("Stopped");
      clearTimeout(this.statusInterval);
    }
  },

  /** radio with VLC **/
  async playWithVlc (link) {
    clearTimeout(this.statusInterval);
    this.sendSocketNotification("WILL_PLAYING");
    this.radio.link = link;
    this.radio.filename = this.radio.link?.split("/").pop();

    await this.vlc.playFile(link, { novideo: true, wait: true, timeout: 300 });
    this.pulse();
  },

  CloseVlc () {
    if (this.radio.is_playing) {
      log("Stop");
      this.vlc.stop();
    }
  },

  VolumeVLC (volume) {
    if (this.radio.is_playing) {
      log(`Set Volume ${volume}`);
      this.vlc.setVolumeRaw(volume);
    }
  }
});
