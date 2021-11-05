const LitElement = Object.getPrototypeOf(
  customElements.get("ha-panel-lovelace")
);
const html = LitElement.prototype.html;

class TVCardServices extends LitElement {
  static get properties() {
    return {
      hass: {},
      _config: {},
      _apps: {}
    };
  }

  //  static async getConfigElement() {
  //    await import("./tv-card-editor.js");
  //    return document.createElement("tv-card-editor");
  //  }

  static getStubConfig() {
    return {};
  }

  getCardSize() {
    return 7;
  }

  setConfig(config) {
    if (!config.entity) {
      console.log("Invalid configuration");
      return;
    }

    this._config = { theme: "default", ...config };
  }

  render() {
    if (!this._config || !this.hass) {
      return html``;
    }

    const stateObj = this.hass.states[this._config.entity];

    const emptyButton = html`
      <ha-icon-button
        .action="${""}"
        @click="${this.handleActionClick}"
        icon=""
        title=""
      ></ha-icon-button>
    `;

    return html`
      ${this.renderStyle()}
      <ha-card .header="${this._config.name}">
          <div class="row">

          </div>
          ${
            this._config.tv && this._config.power
              ? html`
                  <div class="row">
                    <ha-icon-button
                      .action="${"power"}"
                      @click="${this.handleActionClick}"                      
                      title="Power"
                    ><ha-icon icon="mdi:power"></ha-icon>
                    </ha-icon-button>
                  </div>
                `
              : ""
          }

          ${
            this._config.tv && !(this._config.power) && (this._config.power_on || this._config.power_off)
              ? html`
                  <div class="row">
                    <ha-icon-button
                      .action="${"power_on"}"
                      @click="${this.handleActionClick}"                      
                      title="Power on"
                    ><ha-icon icon="mdi:power-on"></ha-icon></ha-icon-button>
                    ${emptyButton}
                    <ha-icon-button
                      .action="${"power_off"}"
                      @click="${this.handleActionClick}"
                      
                      title="Power off"
                    ><ha-icon icon="mdi:power-off"></ha-icon></ha-icon-button>
                  </div>
                `
              : ""
          }

          ${
            this._config.back || this._config.source || this._config.home
              ? html`
                  <div class="row">
                    ${this._config.back
                      ? html`
                          <ha-icon-button
                            .action="${"back"}"
                            @click="${this.handleActionClick}"                            
                            title="Back"
                          ><ha-icon icon="mdi:arrow-left"></ha-icon></ha-icon-button>
                        `
                      : emptyButton}
                    ${this._config.source
                      ? html`
                          <ha-icon-button
                            .action="${"source"}"
                            @click="${this.handleActionClick}"                            
                            title="Source"
                          ><ha-icon icon="mdi:video-input-hdmi"></ha-icon></ha-icon-button>
                        `
                      : emptyButton}
                    ${this._config.home
                      ? html`
                          <ha-icon-button
                            .action="${"home"}"
                            @click="${this.handleActionClick}"                            
                            title="Home"
                          ><ha-icon icon="mdi:home"></ha-icon></ha-icon-button>
                        `
                      : emptyButton}
                  </div>
                `
              : ""
          }

          ${
            this._config.channelup ||
            this._config.info ||
            this._config.channeldown
              ? html`
                  <div class="row">
                    ${this._config.channelup
                      ? html`
                          <ha-icon-button
                            .action="${"channelup"}"
                            @click="${this.handleActionClick}"                            
                            title="Channelup"
                          ><ha-icon icon="mdi:arrow-up"></ha-icon></ha-icon-button>
                        `
                      : emptyButton}
                    ${this._config.info
                      ? html`
                          <ha-icon-button
                            .action="${"info"}"
                            @click="${this.handleActionClick}"                            
                            title="Guide"
                          ><ha-icon icon="mdi:television-guide"></ha-icon></ha-icon-button>
                        `
                      : emptyButton}
                    ${this._config.channeldown
                      ? html`
                          <ha-icon-button
                            .action="${"channeldown"}"
                            @click="${this.handleActionClick}"                            
                            title="Channeldown"
                          ><ha-icon icon="mdi:arrow-down"></ha-icon></ha-icon-button>
                        `
                      : emptyButton}
                  </div>
                `
              : ""
          }

          <div class="row">
            <ha-icon-button
              .action="${"up"}"
              @click="${this.handleActionClick}"              
              title="Up"
            ><ha-icon icon="mdi:chevron-up"></ha-icon></ha-icon-button>
          </div>

          <div class="row">
            <ha-icon-button
              .action="${"left"}"
              @click="${this.handleActionClick}"              
              title="Left"
            ><ha-icon icon="mdi:chevron-left"></ha-icon></ha-icon-button>
            <ha-icon-button
              .action="${"select"}"
              @click="${this.handleActionClick}"              
              title="Select"
            ><ha-icon icon="mdi:checkbox-blank-circle"></ha-icon></ha-icon-button>
            <ha-icon-button
              .action="${"right"}"
              @click="${this.handleActionClick}"              
              title="Right"
            ><ha-icon icon="mdi:chevron-right"></ha-icon></ha-icon-button>
          </div>

          <div class="row">
            <ha-icon-button
              .action="${"down"}"
              @click="${this.handleActionClick}"              
              title="Down"
            ><ha-icon icon="mdi:chevron-down"></ha-icon></ha-icon-button>
          </div>

          ${
            this._config.reverse || this._config.play || this._config.forward
              ? html`
                  <div class="row">
                    ${this._config.reverse
                      ? html`
                          <ha-icon-button
                            .action="${"reverse"}"
                            @click="${this.handleActionClick}"                            
                            title="Rewind"
                          ><ha-icon icon="mdi:rewind"></ha-icon></ha-icon-button>
                        `
                      : emptyButton}
                    ${this._config.play
                      ? html`
                          <ha-icon-button
                            .action="${"play"}"
                            @click="${this.handleActionClick}"                            
                            title="Play/Pause"
                          ><ha-icon icon="mdi:play-pause"></ha-icon></ha-icon-button>
                        `
                      : emptyButton}
                    ${this._config.forward
                      ? html`
                          <ha-icon-button
                            .action="${"forward"}"
                            @click="${this.handleActionClick}"                            
                            title="Fast-Forward"
                          ><ha-icon icon="mdi:fast-forward"></ha-icon></ha-icon-button>
                        `
                      : emptyButton}
                  </div>
                `
              : ""
          }

          ${
            this._config.tv && (
            this._config.volume_up ||
            this._config.volume_down ||
            this._config.volume_mute )
              ? html`
                  <div class="row">
                    <ha-icon-button
                      .action="${"volume_mute"}"
                      @click="${this.handleActionClick}"                      
                      title="Volume Mute"
                    ><ha-icon icon="mdi:volume-mute"></ha-icon></ha-icon-button>
                    <ha-icon-button
                      .action="${"volume_down"}"
                      @click="${this.handleActionClick}"                      
                      title="Volume Down"
                    ><ha-icon icon="mdi:volume-minus"></ha-icon></ha-icon-button>
                    <ha-icon-button
                      .action="${"volume_up"}"
                      @click="${this.handleActionClick}"                      
                      title="Volume Up"
                    ><ha-icon icon="mdi:volume-plus"></ha-icon></ha-icon-button>
                  </div>
                `
              : ""
          }

          ${
            this._config.netflix ||
            this._config.prime_video ||
            this._config.youtube
              ? html`
                  <div class="row">
                    ${this._config.netflix ?
                      html`
                        <ha-icon-button
                          .action="${"netflix"}"
                          @click="${this.handleActionClick}"                          
                          title="Netflix"
                        ><ha-icon icon="mdi:netflix"></ha-icon></ha-icon-button>
                      `
                    : emptyButton}
                    ${this._config.prime_video ?
                      html`
                        <ha-icon-button
                          .action="${"prime_video"}"
                          @click="${this.handleActionClick}"                          
                          title="Prime Video"
                        ><ha-icon icon="mdi:amazon"></ha-icon></ha-icon-button>
                      `
                    : emptyButton}
                    ${this._config.youtube ?
                      html`
                        <ha-icon-button
                          .action="${"youtube"}"
                          @click="${this.handleActionClick}"                          
                          title="Youtube"
                        ><ha-icon icon="mdi:youtube"></ha-icon></ha-icon-button>
                      `
                    : emptyButton}
                  </div>
                `
              : ""
          }
        </div>
      </ha-card>
    `;
  }

  updated(changedProps) {
    if (!this._config) {
      return;
    }

    const oldHass = changedProps.get("hass");
    if (!oldHass || oldHass.themes !== this.hass.themes) {
      this.applyThemesOnElement(this, this.hass.themes, this._config.theme);
    }
  }

  renderStyle() {
    return html`
      <style>
        .remote {
          padding: 16px 0px 16px 0px;
        }
        img,
        ha-icon-button {
          width: 64px;
          height: 64px;
          cursor: pointer;
          --mdc-icon-size: 100%;
        }
        .row {
          display: flex;
          padding: 8px 36px 8px 36px;
          justify-content: space-evenly;
        }
        .diagonal {
          background-color: var(--light-primary-color);
        }
      </style>
    `;
  }

  launchApp(e) {
    this.hass.callService("media_player", "select_source", {
      entity_id: this._config.entity,
      source: e.currentTarget.value
    });
  }

  handleActionClick(e) {
    const custom_services = [
      "power",
      "power_on",
      "power_off",
      "volume_up",
      "volume_down",
      "volume_mute",
      "back",
      "source",
      "info",
      "home",
      "channelup",
      "channeldown",
      "up",
      "left",
      "select",
      "right",
      "down",
      "reverse",
      "play",
      "forward",
      "netflix",
      "prime_video",
      "youtube"
    ];

    if (
      custom_services.indexOf(e.currentTarget.action) >= 0 &&
      this._config[e.currentTarget.action]
    ) {
      const [domain, service] = this._config[
        e.currentTarget.action
      ].service.split(".", 2);
      this.hass.callService(
        domain,
        service,
        this._config[e.currentTarget.action].service_data
          ? this._config[e.currentTarget.action].service_data
          : null
      );
    } else {
      const [domain, service] = this._config[
        e.currentTarget.action
      ].service.split(".", 2);
      this.hass.callService(
        domain,
        service,
        this._config[e.currentTarget.action].service_data
          ? this._config[e.currentTarget.action].service_data
          : null
      );
    }
  }

  applyThemesOnElement(element, themes, localTheme) {
    if (!element._themes) {
      element._themes = {};
    }
    let themeName = themes.default_theme;
    if (localTheme === "default" || (localTheme && themes.themes[localTheme])) {
      themeName = localTheme;
    }
    const styles = Object.assign({}, element._themes);
    if (themeName !== "default") {
      var theme = themes.themes[themeName];
      Object.keys(theme).forEach(key => {
        var prefixedKey = "--" + key;
        element._themes[prefixedKey] = "";
        styles[prefixedKey] = theme[key];
      });
    }
    if (element.updateStyles) {
      element.updateStyles(styles);
    } else if (window.ShadyCSS) {
      // implement updateStyles() method of Polemer elements
      window.ShadyCSS.styleSubtree(
        /** @type {!HTMLElement} */ (element),
        styles
      );
    }

    const meta = document.querySelector("meta[name=theme-color]");
    if (meta) {
      if (!meta.hasAttribute("default-content")) {
        meta.setAttribute("default-content", meta.getAttribute("content"));
      }
      const themeColor =
        styles["--primary-color"] || meta.getAttribute("default-content");
      meta.setAttribute("content", themeColor);
    }
  }
}

customElements.define("tv-card", TVCardServices);
