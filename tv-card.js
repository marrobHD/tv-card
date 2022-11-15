const LitElement = Object.getPrototypeOf(
  customElements.get("ha-panel-lovelace")
);
const html = LitElement.prototype.html;
import {
mdiPower,
mdiPowerOn,
mdiPowerOff,
mdiArrowLeft,
mdiVideoInputHdmi,
mdiHome,
mdiArrowUp,
mdiTelevisionGuide,
mdiArrowDown,
mdiChevronUp,
mdiChevronLeft,
mdiCheckboxBlankCircle,
mdiChevronRight,
mdiChevronDown,
mdiRewind,
mdiPlayPause,
mdiFastForward,
mdiVolumeMute,
mdiVolumeMinus,
mdiVolumePlus,
} from "https://unpkg.com/@mdi/js@6.4.95/mdi.js?module"

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

  renderApplicationsRow(applicationIds) {
    return html`
      <div class="row">
        ${applicationIds.map(applicationId => {
          const application = this._config.applications[applicationId];

          return html`
            <ha-icon-button
              .action="${applicationId}"
              @click="${this.handleActionClick}"
              title=${application.title}
            >
              <ha-icon .icon="${application.icon}"></ha-icon>
            </ha-icon-button>
          `;
        })}
      </div>
    `;
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

    const chunkedApplicationIds = this._config.applications === undefined ? [] : this.sliceIntoChunks(Object.keys(this._config.applications), 3);

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
                      icon="mdi:power"
                      .path=${mdiPower}
                      title="Power"
                    ></ha-icon-button>
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
                      icon="mdi:power-on"
                      .path=${mdiPowerOn}
                      title="Power on"
                    ></ha-icon-button>
                    ${emptyButton}
                    <ha-icon-button
                      .action="${"power_off"}"
                      @click="${this.handleActionClick}"
                      icon="mdi:power-off"
                      .path=${mdiPowerOff}
                      title="Power off"
                    ></ha-icon-button>
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
                            icon="mdi:arrow-left"
                            .path=${mdiArrowLeft}
                            title="Back"
                          ></ha-icon-button>
                        `
                      : emptyButton}
                    ${this._config.source
                      ? html`
                          <ha-icon-button
                            .action="${"source"}"
                            @click="${this.handleActionClick}"
                            icon="mdi:video-input-hdmi"
                            .path=${mdiVideoInputHdmi}
                            title="Source"
                          ></ha-icon-button>
                        `
                      : emptyButton}
                    ${this._config.home
                      ? html`
                          <ha-icon-button
                            .action="${"home"}"
                            @click="${this.handleActionClick}"
                            icon="mdi:home"
                            .path=${mdiHome}
                            title="Home"
                          ></ha-icon-button>
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
                            icon="mdi:arrow-up"
                            .path=${mdiArrowUp}
                            title="Channelup"
                          ></ha-icon-button>
                        `
                      : emptyButton}
                    ${this._config.info
                      ? html`
                          <ha-icon-button
                            .action="${"info"}"
                            @click="${this.handleActionClick}"
                            icon="mdi:television-guide"
                            .path=${mdiTelevisionGuide}
                            title="Guide"
                          ></ha-icon-button>
                        `
                      : emptyButton}
                    ${this._config.channeldown
                      ? html`
                          <ha-icon-button
                            .action="${"channeldown"}"
                            @click="${this.handleActionClick}"
                            icon="mdi:arrow-down"
                            .path=${mdiArrowDown}
                            title="Channeldown"
                          ></ha-icon-button>
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
              icon="mdi:chevron-up"
              .path=${mdiChevronUp}
              title="Up"
            ></ha-icon-button>
          </div>

          <div class="row">
            <ha-icon-button
              .action="${"left"}"
              @click="${this.handleActionClick}"
              icon="mdi:chevron-left"
              .path=${mdiChevronLeft}
              title="Left"
            ></ha-icon-button>
            <ha-icon-button
              .action="${"select"}"
              @click="${this.handleActionClick}"
              icon="mdi:checkbox-blank-circle"
              .path=${mdiCheckboxBlankCircle}
              title="Select"
            ></ha-icon-button>
            <ha-icon-button
              .action="${"right"}"
              @click="${this.handleActionClick}"
              icon="mdi:chevron-right"
              .path=${mdiChevronRight}
              title="Right"
            ></ha-icon-button>
          </div>

          <div class="row">
            <ha-icon-button
              .action="${"down"}"
              @click="${this.handleActionClick}"
              icon="mdi:chevron-down"
              .path=${mdiChevronDown}
              title="Down"
            ></ha-icon-button>
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
                            icon="mdi:rewind"
                            .path=${mdiRewind}
                            title="Rewind"
                          ></ha-icon-button>
                        `
                      : emptyButton}
                    ${this._config.play
                      ? html`
                          <ha-icon-button
                            .action="${"play"}"
                            @click="${this.handleActionClick}"
                            icon="mdi:play-pause"
                            .path=${mdiPlayPause}
                            title="Play/Pause"
                          ></ha-icon-button>
                        `
                      : emptyButton}
                    ${this._config.forward
                      ? html`
                          <ha-icon-button
                            .action="${"forward"}"
                            @click="${this.handleActionClick}"
                            icon="mdi:fast-forward"
                            .path=${mdiFastForward}
                            title="Fast-Forward"
                          ></ha-icon-button>
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
                      icon="mdi:volume-mute"
                      .path=${mdiVolumeMute}
                      title="Volume Mute"
                    ></ha-icon-button>
                    <ha-icon-button
                      .action="${"volume_down"}"
                      @click="${this.handleActionClick}"
                      icon="mdi:volume-minus"
                      .path=${mdiVolumeMinus}
                      title="Volume Down"
                    ></ha-icon-button>
                    <ha-icon-button
                      .action="${"volume_up"}"
                      @click="${this.handleActionClick}"
                      icon="mdi:volume-plus"
                      .path=${mdiVolumePlus}
                      title="Volume Up"
                    ></ha-icon-button>
                  </div>
                `
              : ""
          }

          ${chunkedApplicationIds.map(applicationIds => this.renderApplicationsRow(applicationIds))}
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
    const action = e.currentTarget.action;
    const actionData = this._config[action] !== undefined ? this._config[action] : this._config.applications[action];
    if (actionData === undefined) {
      console.error(`The action ${action} is not defined in the configuration and is not a defined application.`);
      return;
    }

    const [domain, service] = actionData.service.split(".", 2);
    this.hass.callService(
      domain,
      service,
      actionData.service_data !== undefined
        ? actionData.service_data
        : null
    );
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

  sliceIntoChunks(arr, chunkSize) {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        res.push(chunk);
    }
    return res;
  }

}

customElements.define("tv-card", TVCardServices);
