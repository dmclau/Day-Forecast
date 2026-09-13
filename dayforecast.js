
import { LitElement, html, css } from "https://cdn.jsdelivr.net/npm/lit@3.3.0/+esm";

class DayForecastCard extends LitElement {
  static properties = {
    hass: {},
    config: {},
    forecast: {},
    loading: { type: Boolean },
    error: {},
  };

  static styles = css`
    ha-card {
      padding: 16px;
      overflow: hidden;
      cursor: default;
      transition: transform 0.15s ease, box-shadow 0.15s ease;
    }

    ha-card.tap-enabled {
      cursor: pointer;
    }

    ha-card.tap-enabled:active {
      transform: scale(0.995);
    }

    ha-card.tap-enabled:focus {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }

    .day-mode {
      background: var(--card-background-color);
    }

    .night-mode {
      background: linear-gradient(
        180deg,
        rgba(20, 30, 60, 0.95),
        rgba(10, 15, 35, 0.95)
      );
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 14px;
    }

    .header-left {
      min-width: 0;
    }

    .title {
      font-size: 18px;
      font-weight: 600;
    }

    .day-mode .title,
    .night-mode .title {
      color: var(--primary-text-color);
    }

    .condition {
      margin-top: 2px;
      font-size: 12px;
      color: var(--secondary-text-color);
    }

    .ocean-info {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 12px;
      margin-top: 5px;
    }

    .ocean-item {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 12px;
      color: var(--secondary-text-color);
      white-space: nowrap;
    }

    .ocean-item ha-icon {
      --mdc-icon-size: 16px;
      color: #2196f3;
      display: none;
    }

    .uv-item ha-icon {
      color: #ff9800;
    }

    .uv-category {
      font-weight: 500;
    }

    .current-temp {
      font-size: 28px;
      font-weight: 500;
    }

    .forecast-container {
      border-radius: 10px;
      background: rgba(0, 0, 0, 0.04);
    }

    .horizontal-layout {
      display: flex;
      flex-direction: row;
      overflow-x: auto;
      gap: 6px;
      padding: 8px 4px 10px;
      scrollbar-width: thin;
    }

    .horizontal-layout .forecast-item {
      flex: 0 0 auto;
      width: 120px;
    }

    .vertical-layout {
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding: 4px;
    }

    .vertical-layout .forecast-item {
      display: grid;
      grid-template-columns: 50px 45px minmax(130px, 1fr) auto auto;
      align-items: center;
      width: auto;
      min-width: 0;
      padding: 8px 10px;
      border-radius: 8px;
    }

    .vertical-layout .day-name {
      text-align: left;
    }

    .vertical-layout .icon {
      margin: 0;
    }

    .vertical-layout .apple-temp-row {
      width: 100%;
      min-width: 130px;
    }

    .vertical-layout .rain-probability,
    .vertical-layout .rain {
      margin: 0 0 0 10px;
    }

    .forecast-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 8px 6px;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.03);
    }

    .day-name {
      font-weight: 600;
      color: var(--secondary-text-color);
      white-space: nowrap;
    }

    .icon {
      margin: 8px 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .google-weather-icon {
      display: block;
      width: var(--weather-icon-size);
      height: var(--weather-icon-size);
      flex: 0 0 auto;
    }

    .apple-temp-row {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      gap: 6px;
      font-weight: 600;
      white-space: nowrap;
    }

    .low {
      color: var(--secondary-text-color);
      min-width: 26px;
      text-align: right;
    }

    .high {
      color: var(--primary-text-color);
      min-width: 26px;
      text-align: left;
    }

    .temp-track {
      position: relative;
      flex: 1;
      height: 5px;
      min-width: 25px;
      border-radius: 999px;
      background: rgba(128, 128, 128, 0.35);
      overflow: hidden;
    }

    .temp-range {
      position: absolute;
      top: 0;
      bottom: 0;
      border-radius: 999px;
      background: linear-gradient(
        90deg,
        #42a5f5,
        #66bb6a,
        #fdd835,
        #fb8c00,
        #ef5350
      );
      min-width: 4px;
    }

    .rain-probability {
      margin-top: 4px;
      font-size: 10px;
      color: #42a5f5;
    }

    .rain {
      margin-top: 2px;
      font-size: 9px;
      color: #2196f3;
    }

    .loading {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
      min-height: 90px;
    }

    .forecast-error {
      padding: 10px;
      text-align: center;
      color: var(--error-color);
    }

    .error-card {
      padding: 16px;
      color: var(--error-color);
    }

    .hourly-layout .forecast-item {
      width: 60px;
    }

    .hourly-layout .day-name {
      font-size: 12px;
    }

    .hourly-layout .icon {
      margin: 6px 0;
    }

    .hourly-layout .apple-temp-row {
      gap: 4px;
    }

    .hourly-layout .low,
    .hourly-layout .high {
      min-width: auto;
    }

    .hourly-layout .temp-track {
      min-width: 25px;
      display: none
    }

    @media (max-width: 500px) {
      .vertical-layout .forecast-item {
        grid-template-columns: 70px 40px minmax(100px, 1fr) auto auto;
        padding: 7px 6px;
      }

      .vertical-layout .apple-temp-row {
        min-width: 100px;
        gap: 4px;
      }

      .low,
      .high {
        min-width: 22px;
      }

      .vertical-layout .rain-probability,
      .vertical-layout .rain {
        margin-left: 5px;
      }
    }
  `;

  constructor() {
    super();

    this.forecast = [];
    this.loading = false;
    this.error = null;

    this._lastRefresh = 0;
    this._holdTimer = null;
    this._lastTapTime = 0;
    this._doubleTapDelay = 350;
    this._holdDelay = 500;
    this._ignoreNextClick = false;
  }

  static getConfigForm() {
    return {
      schema: [
        {
          name: "entity",
          required: true,
          selector: {
            entity: {
              domain: "weather",
            },
          },
        },

        {
          name: "name",
          selector: {
            text: {},
          },
        },

        {
          name: "hide_header",
          selector: {
            boolean: {},
          },
        },

        {
          name: "hide_title",
          selector: {
            boolean: {},
          },
        },

        {
          name: "forecast_type",
          selector: {
            select: {
              options: [
                {
                  value: "daily",
                  label: "Daily",
                },
                {
                  value: "hourly",
                  label: "Hourly",
                },
              ],
              mode: "dropdown",
            },
          },
        },

        {
          name: "weather_icon_style",
          selector: {
            select: {
              options: [
                {
                  value: "mdi",
                  label: "Home Assistant / MDI",
                },
                {
                  value: "google",
                  label: "Google Weather",
                },
              ],
              mode: "dropdown",
            },
          },
        },

        {
          name: "wave_height_entity",
          selector: {
            entity: {
              domain: "sensor",
            },
          },
        },

        {
          name: "ocean_temperature_entity",
          selector: {
            entity: {
              domain: "sensor",
            },
          },
        },

        {
          name: "uv_index_entity",
          selector: {
            entity: {
              domain: "sensor",
            },
          },
        },

        {
          name: "layout",
          selector: {
            select: {
              options: [
                {
                  value: "horizontal",
                  label: "Horizontal",
                },
                {
                  value: "vertical",
                  label: "Vertical",
                },
              ],
              mode: "dropdown",
            },
          },
        },

        {
          name: "days",
          selector: {
            number: {
              min: 1,
              max: 14,
              mode: "slider",
            },
          },
        },

        {
          name: "hours",
          selector: {
            number: {
              min: 1,
              max: 48,
              mode: "slider",
            },
          },
        },

        {
          name: "refresh_minutes",
          selector: {
            number: {
              min: 5,
              max: 120,
              step: 5,
              mode: "slider",
            },
          },
        },

        {
          name: "show_precipitation",
          selector: {
            boolean: {},
          },
        },

        {
          name: "show_probability",
          selector: {
            boolean: {},
          },
        },

        {
          name: "icon_size",
          selector: {
            number: {
              min: 20,
              max: 64,
              step: 1,
              mode: "slider",
            },
          },
        },

        {
          name: "temperature_size",
          selector: {
            number: {
              min: 10,
              max: 24,
              step: 1,
              mode: "slider",
            },
          },
        },

        {
          name: "day_font_size",
          selector: {
            number: {
              min: 9,
              max: 20,
              step: 1,
              mode: "slider",
            },
          },
        },

        /* -----------------------------------------------------------
         * ACTIONS
         * Kept at the bottom of the editor.
         * Uses Home Assistant's native ui_action selector.
         * --------------------------------------------------------- */

        {
          title: "Actions",
          name: "",
          type: "expandable",
          schema: [
            {
              name: "tap_action",
              selector: {
                ui_action: {},
              },
            },

            {
              name: "hold_action",
              selector: {
                ui_action: {},
              },
            },

            {
              name: "double_tap_action",
              selector: {
                ui_action: {},
              },
            },
          ],
        },
      ],

      computeLabel: (schema) => {
        const labels = {
          entity: "Weather entity",
          name: "Title",
          hide_header: "Hide header",
          hide_title: "Hide title",

          forecast_type: "Forecast type",
          weather_icon_style: "Weather icon style",

          wave_height_entity:
            "Surf / wave height entity",

          ocean_temperature_entity:
            "Ocean temperature entity",

          uv_index_entity:
            "UV index entity",

          layout: "Layout",
          days: "Number of days",
          hours: "Number of hours",

          refresh_minutes:
            "Refresh interval",

          show_precipitation:
            "Show precipitation",

          show_probability:
            "Show precipitation probability",

          icon_size:
            "Weather icon size",

          temperature_size:
            "Temperature size",

          day_font_size:
            "Day / time font size",

          tap_action:
            "Tap action",

          hold_action:
            "Hold action",

          double_tap_action:
            "Double tap action",
        };

        return (
          labels[schema.name] ||
          schema.name
        );
      },
    };
  }

  static getStubConfig() {
    return {
      entity: "weather.home",
      name: "Daily Forecast",

      hide_header: false,
      hide_title: false,

      forecast_type: "daily",
      weather_icon_style: "mdi",

      wave_height_entity: "",
      ocean_temperature_entity: "",
      uv_index_entity: "",

      days: 9,
      hours: 24,

      layout: "horizontal",

      refresh_minutes: 30,

      show_precipitation: true,
      show_probability: true,

      icon_size: 32,
      temperature_size: 14,
      day_font_size: 12,

      tap_action: {
        action: "none",
      },

      hold_action: {
        action: "none",
      },

      double_tap_action: {
        action: "none",
      },
    };
  }

  setConfig(config) {
    this.config = {
      entity: "weather.home",
      name: "Daily Forecast",

      hide_header: false,
      hide_title: false,

      forecast_type: "daily",
      weather_icon_style: "mdi",

      wave_height_entity: "",
      ocean_temperature_entity: "",
      uv_index_entity: "",

      days: 9,
      hours: 24,

      layout: "horizontal",

      refresh_minutes: 30,

      show_precipitation: true,
      show_probability: true,

      icon_size: 32,
      temperature_size: 14,
      day_font_size: 12,

      tap_action: {
        action: "none",
      },

      hold_action: {
        action: "none",
      },

      double_tap_action: {
        action: "none",
      },

      ...config,
    };

    this._lastRefresh = 0;
  }

  updated(changedProps) {
    super.updated(changedProps);

    if (
      changedProps.has("hass") &&
      this.hass &&
      this.config
    ) {
      const now = Date.now();

      const refreshMs =
        Number(
          this.config.refresh_minutes || 30
        ) *
        60 *
        1000;

      if (
        !this.forecast.length ||
        now - this._lastRefresh > refreshMs
      ) {
        this._loadForecast();
      }
    }
  }

  async _loadForecast() {
    if (
      !this.hass ||
      !this.config?.entity
    ) {
      return;
    }

    this.loading = true;
    this.error = null;

    try {
      const forecastType =
        this.config.forecast_type ===
        "hourly"
          ? "hourly"
          : "daily";

      const response =
        await this.hass.connection.sendMessagePromise(
          {
            type: "call_service",
            domain: "weather",
            service: "get_forecasts",
            target: {
              entity_id:
                this.config.entity,
            },
            service_data: {
              type: forecastType,
            },
            return_response: true,
          }
        );

      const entityResponse =
        response?.response?.[
          this.config.entity
        ] ||
        response?.[
          this.config.entity
        ];

      const forecast =
        entityResponse?.forecast ||
        response?.forecast ||
        [];

      const count =
        forecastType === "hourly"
          ? Number(
              this.config.hours || 24
            )
          : Number(
              this.config.days || 9
            );

      this.forecast =
        Array.isArray(forecast)
          ? forecast.slice(0, count)
          : [];

      this._lastRefresh =
        Date.now();

      if (!this.forecast.length) {
        this.error =
          `No ${forecastType} forecast data available.`;
      }
    } catch (err) {
      console.error(
        "Day Forecast Card:",
        err
      );

      this.error =
        err?.message ||
        "Unable to load weather forecast.";
    } finally {
      this.loading = false;
    }
  }

  render() {
    if (
      !this.hass ||
      !this.config
    ) {
      return html``;
    }

    const weatherState =
      this.hass.states[
        this.config.entity
      ];

    if (!weatherState) {
      return html`
        <ha-card>
          <div class="error-card">
            Weather entity not found:
            ${this.config.entity}
          </div>
        </ha-card>
      `;
    }

    const condition =
      weatherState.state;

    const currentTemp =
      weatherState.attributes
        ?.temperature;

    const modeClass =
      this._isNight()
        ? "night-mode"
        : "day-mode";

    const actionsEnabled =
      this._hasAnyAction();

    return html`
      <ha-card
        class="${modeClass} ${
          actionsEnabled
            ? "tap-enabled"
            : ""
        }"
        @click=${actionsEnabled
          ? this._handleCardClick
          : null}
        @pointerdown=${actionsEnabled
          ? this._handlePointerDown
          : null}
        @pointerup=${actionsEnabled
          ? this._handlePointerUp
          : null}
        @pointerleave=${actionsEnabled
          ? this._handlePointerLeave
          : null}
        @pointercancel=${actionsEnabled
          ? this._handlePointerCancel
          : null}
        @keydown=${actionsEnabled
          ? this._handleKeyDown
          : null}
        tabindex="${actionsEnabled
          ? "0"
          : "-1"}"
        role="${actionsEnabled
          ? "button"
          : "article"}"
      >

        ${
          !this.config.hide_header
            ? html`
                <div class="header">

                  <div class="header-left">

                    ${
                      !this.config
                        .hide_title
                        ? html`
                            <div
                              class="title"
                            >
                              ${this.config.name}
                            </div>
                          `
                        : ""
                    }

                    <div
                      class="condition"
                    >
                      ${this._formatCondition(
                        condition
                      )}
                    </div>

                    ${this._renderOceanInfo()}

                  </div>

                  ${
                    currentTemp !==
                      undefined &&
                    currentTemp !== null
                      ? html`
                          <div
                            class="current-temp"
                            style="
                              font-size:${this.config.temperature_size + 10}px;
                            "
                          >
                            ${this._formatTemperature(
                              currentTemp,
                              weatherState
                                .attributes
                                ?.temperature_unit
                            )}
                          </div>
                        `
                      : ""
                  }

                </div>
              `
            : ""
        }

        ${
          this.loading &&
          !this.forecast.length
            ? html`
                <div class="loading">

                  <ha-circular-progress
                    active
                  ></ha-circular-progress>

                  <span>
                    Loading forecast…
                  </span>

                </div>
              `
            : ""
        }

        ${
          this.error &&
          !this.forecast.length
            ? html`
                <div
                  class="forecast-error"
                >
                  ${this.error}
                </div>
              `
            : ""
        }

        ${
          this.forecast.length
            ? html`
                <div
                  class="forecast-container"
                >
                  <div
                    class="${this._getLayoutClass()}"
                  >
                    ${this.forecast.map(
                      (
                        item,
                        index
                      ) =>
                        this._renderForecastItem(
                          item,
                          index
                        )
                    )}
                  </div>
                </div>
              `
            : ""
        }

      </ha-card>
    `;
  }

  /* ============================================================
   * ACTION HANDLING
   * ========================================================== */

  _hasAction(action) {
    return (
      action &&
      typeof action === "object" &&
      action.action &&
      action.action !== "none"
    );
  }

  _hasAnyAction() {
    return (
      this._hasAction(
        this.config?.tap_action
      ) ||
      this._hasAction(
        this.config?.hold_action
      ) ||
      this._hasAction(
        this.config?.double_tap_action
      )
    );
  }

  _handlePointerDown(event) {
    if (
      event.pointerType ===
      "mouse"
    ) {
      if (
        event.button !== 0
      ) {
        return;
      }
    }

    this._holdTimer =
      setTimeout(() => {
        this._holdTimer = null;

        this._ignoreNextClick =
          true;

        this._executeAction(
          this.config?.hold_action
        );
      }, this._holdDelay);
  }

  _handlePointerUp() {
    this._clearHoldTimer();
  }

  _handlePointerLeave() {
    this._clearHoldTimer();
  }

  _handlePointerCancel() {
    this._clearHoldTimer();
  }

  _clearHoldTimer() {
    if (
      this._holdTimer
    ) {
      clearTimeout(
        this._holdTimer
      );

      this._holdTimer = null;
    }
  }

  _handleCardClick(event) {
    if (
      this._ignoreNextClick
    ) {
      this._ignoreNextClick =
        false;

      return;
    }

    const now =
      Date.now();

    const timeSinceLastTap =
      now -
      this._lastTapTime;

    if (
      timeSinceLastTap <=
      this._doubleTapDelay
    ) {
      this._lastTapTime = 0;

      this._ignoreNextClick =
        true;

      this._executeAction(
        this.config?.double_tap_action
      );

      event.preventDefault();
      event.stopPropagation();

      return;
    }

    this._lastTapTime = now;

    /*
     * Delay the normal tap slightly so that
     * a second tap can be detected.
     */
    setTimeout(() => {
      if (
        this._lastTapTime ===
        now
      ) {
        this._lastTapTime = 0;

        this._executeAction(
          this.config?.tap_action
        );
      }
    }, this._doubleTapDelay);
  }

  _handleKeyDown(event) {
    if (
      event.key !== "Enter" &&
      event.key !== " "
    ) {
      return;
    }

    event.preventDefault();

    this._executeAction(
      this.config?.tap_action
    );
  }

  async _executeAction(
    action
  ) {
    if (
      !this._hasAction(action)
    ) {
      return;
    }

    try {
      switch (
        action.action
      ) {
        case "more-info":
          this._executeMoreInfo(
            action
          );
          break;

        case "navigate":
          this._executeNavigate(
            action
          );
          break;

        case "url":
          this._executeUrl(
            action
          );
          break;

        case "call-service":
        case "perform-action":
          await this._executeService(
            action
          );
          break;

        case "toggle":
          await this._executeToggle(
            action
          );
          break;

        case "none":
        default:
          break;
      }
    } catch (err) {
      console.error(
        "Day Forecast Card action error:",
        err
      );
    }
  }

  _executeMoreInfo(action) {
    const entityId =
      action.entity ||
      this.config.entity;

    if (!entityId) {
      return;
    }

    this.dispatchEvent(
      new CustomEvent(
        "hass-more-info",
        {
          bubbles: true,
          composed: true,
          detail: {
            entityId,
          },
        }
      )
    );
  }

  _executeNavigate(action) {
    const path =
      action.navigation_path;

    if (!path) {
      return;
    }

    history.pushState(
      null,
      "",
      path
    );

    window.dispatchEvent(
      new Event(
        "location-changed"
      )
    );
  }

  _executeUrl(action) {
    const url =
      action.url_path;

    if (!url) {
      return;
    }

    window.open(
      url,
      "_blank",
      "noopener,noreferrer"
    );
  }

  async _executeService(
    action
  ) {
    let service =
      action.service ||
      action.perform_action;

    if (!service) {
      return;
    }

    /*
     * Accept both:
     *
     * light.turn_on
     *
     * and
     *
     * { domain: "light", service: "turn_on" }
     */
    if (
      typeof service ===
      "object"
    ) {
      const domain =
        service.domain;

      const serviceName =
        service.service;

      if (
        !domain ||
        !serviceName
      ) {
        return;
      }

      await this.hass.callService(
        domain,
        serviceName,
        {
          ...(action.data ||
            {}),
          ...(action.service_data ||
            {}),
          ...(action.target
            ? {
                target:
                  action.target,
              }
            : {}),
        }
      );

      return;
    }

    if (
      typeof service !==
      "string"
    ) {
      return;
    }

    const parts =
      service.split(".");

    if (
      parts.length !== 2
    ) {
      console.warn(
        "Day Forecast Card: Invalid service/action."
      );

      return;
    }

    const domain =
      parts[0];

    const serviceName =
      parts[1];

    const serviceData = {
      ...(action.data ||
        {}),
      ...(action.service_data ||
        {}),
    };

    /*
     * Merge target into the normal
     * Home Assistant service call.
     */
    if (
      action.target
    ) {
      Object.assign(
        serviceData,
        action.target
      );
    }

    await this.hass.callService(
      domain,
      serviceName,
      serviceData
    );
  }

  async _executeToggle(
    action
  ) {
    const entityId =
      action.entity ||
      this.config.entity;

    if (!entityId) {
      return;
    }

    const entity =
      this.hass.states[
        entityId
      ];

    if (!entity) {
      return;
    }

    const domain =
      entityId.split(".")[0];

    if (
      domain === "light" ||
      domain === "switch" ||
      domain === "fan" ||
      domain === "input_boolean" ||
      domain === "automation" ||
      domain === "script"
    ) {
      await this.hass.callService(
        domain,
        "toggle",
        {
          entity_id:
            entityId,
        }
      );
    }
  }

  /* ============================================================
   * FORECAST
   * ========================================================== */

  _getLayoutClass() {
    const layout =
      this.config.layout ===
      "vertical"
        ? "vertical-layout"
        : "horizontal-layout";

    if (
      this.config.forecast_type ===
      "hourly"
    ) {
      return `${layout} hourly-layout`;
    }

    return layout;
  }

  _renderForecastItem(
    item,
    index
  ) {
    const isHourly =
      this.config.forecast_type ===
      "hourly";

    const temperature =
      this._getHourlyTemperature(
        item
      );

    const low = isHourly
      ? temperature
      : this._getLow(item);

    const high = isHourly
      ? temperature
      : this._getHigh(item);

    const probability =
      item.precipitation_probability;

    const precipitation =
      item.precipitation;

    const temperatureUnit =
      this.hass.states[
        this.config.entity
      ]?.attributes
        ?.temperature_unit || "°";

    const dayName =
      isHourly
        ? this._getHourName(
            item.datetime
          )
        : this._getDayName(
            item.datetime,
            index
          );

    const minTemp =
      this._getForecastMin();

    const maxTemp =
      this._getForecastMax();

    const range =
      this._getTemperatureRange(
        low,
        high,
        minTemp,
        maxTemp
      );

    return html`
      <div
        class="forecast-item"
      >

        <div
          class="day-name"
          style="
            font-size:${this.config.day_font_size}px;
          "
        >
          ${dayName}
        </div>

        <div
          class="icon"
          style="
            --mdc-icon-size:${this.config.icon_size}px;
            --weather-icon-size:${this.config.icon_size}px;
          "
        >
          ${this._renderWeatherIcon(
            item.condition
          )}
        </div>

        <div
          class="apple-temp-row"
          style="
            font-size:${this.config.temperature_size}px;
          "
        >
          <span
            class="low"
          >
            ${this._formatTemperature(
              low,
              temperatureUnit
            )}
          </span>

          <div
            class="temp-track"
          >
            <div
              class="temp-range"
              style="
                left:${range.left}%;
                width:${range.width}%;
              "
            ></div>
          </div>

          ${
            !isHourly
              ? html`
                  <span
                    class="high"
                  >
                    ${this._formatTemperature(
                      high,
                      temperatureUnit
                    )}
                  </span>
                `
              : ""
          }
        </div>

        ${
          this.config
            .show_probability &&
          probability !==
            undefined &&
          probability !== null
            ? html`
                <div
                  class="rain-probability"
                >
                  ${Math.round(
                    Number(
                      probability
                    )
                  )}%
                </div>
              `
            : ""
        }

        ${
          this.config
            .show_precipitation &&
          precipitation !==
            undefined &&
          precipitation !== null
            ? html`
                <div
                  class="rain"
                >
                  ${this._formatPrecipitation(
                    precipitation
                  )}
                </div>
              `
            : ""
        }

      </div>
    `;
  }

  _getHourlyTemperature(item) {
    const value =
      item.temperature ??
      item.temp ??
      item.temperature_high ??
      item.temphigh;

    return Number(value);
  }

  _getHourName(datetime) {
    if (!datetime) {
      return "";
    }

    const date =
      new Date(datetime);

    if (
      Number.isNaN(
        date.getTime()
      )
    ) {
      return "";
    }

    return date.toLocaleTimeString(
      undefined,
      {
        hour: "numeric",
        minute: "2-digit",
      }
    );
  }

  /* ============================================================
   * WEATHER ICONS
   * ========================================================== */

  _renderWeatherIcon(
    condition
  ) {
    if (
      this.config
        .weather_icon_style ===
      "google"
    ) {
      return this._renderGoogleWeatherIcon(
        condition
      );
    }

    return html`
      <ha-icon
        icon="${this._getWeatherIcon(
          condition
        )}"
      ></ha-icon>
    `;
  }

  _renderGoogleWeatherIcon(
    condition
  ) {
    const c =
      String(
        condition || ""
      ).toLowerCase();

    switch (c) {
      case "sunny":
        return this._googleSunnyIcon();

      case "clear-night":
        return this._googleClearNightIcon();

      case "partlycloudy":
        return this._googlePartlyCloudyIcon();

      case "cloudy":
        return this._googleCloudyIcon();

      case "fog":
        return this._googleFogIcon();

      case "rainy":
        return this._googleRainIcon(false);

      case "pouring":
        return this._googleRainIcon(true);

      case "lightning":
        return this._googleLightningIcon(false);

      case "lightning-rain":
        return this._googleLightningIcon(true);

      case "snowy":
        return this._googleSnowIcon(false);

      case "snowy-rainy":
        return this._googleSnowIcon(true);

      case "hail":
        return this._googleHailIcon();

      case "windy":
      case "windy-variant":
        return this._googleWindIcon();

      default:
        return this._googleCloudyIcon();
    }
  }

  _googleSunnyIcon() {
    return html`
      <svg
        class="google-weather-icon"
        viewBox="0 0 64 64"
        aria-hidden="true"
      >
        <g
          stroke="#f9c74f"
          stroke-width="4"
          stroke-linecap="round"
        >
          <line x1="32" y1="4" x2="32" y2="12" />
          <line x1="32" y1="52" x2="32" y2="60" />
          <line x1="4" y1="32" x2="12" y2="32" />
          <line x1="52" y1="32" x2="60" y2="32" />
          <line x1="12" y1="12" x2="18" y2="18" />
          <line x1="46" y1="46" x2="52" y2="52" />
          <line x1="52" y1="12" x2="46" y2="18" />
          <line x1="18" y1="46" x2="12" y2="52" />
        </g>

        <circle
          cx="32"
          cy="32"
          r="14"
          fill="#f9c74f"
        />
      </svg>
    `;
  }

  _googleClearNightIcon() {
    return html`
      <svg
        class="google-weather-icon"
        viewBox="0 0 64 64"
        aria-hidden="true"
      >
        <path
          d="M42 10c-5 2-9 7-9 13 0 9 7 16 16 16 2 0 4-.4 6-1.2C51 47 43 53 34 53 21 53 11 43 11 30 11 19 18 10 29 7c4-1 9 0 13 3z"
          fill="#f9c74f"
        />

        <circle cx="49" cy="15" r="2" fill="#fff" />
        <circle cx="55" cy="25" r="1.5" fill="#fff" />
        <circle cx="41" cy="8" r="1.5" fill="#fff" />
      </svg>
    `;
  }

  _googlePartlyCloudyIcon() {
    return html`
      <svg
        class="google-weather-icon"
        viewBox="0 0 64 64"
        aria-hidden="true"
      >
        <circle
          cx="26"
          cy="25"
          r="13"
          fill="#f9c74f"
        />

        <g
          stroke="#f9c74f"
          stroke-width="3"
          stroke-linecap="round"
        >
          <line x1="26" y1="5" x2="26" y2="10" />
          <line x1="26" y1="40" x2="26" y2="45" />
          <line x1="6" y1="25" x2="11" y2="25" />
          <line x1="41" y1="25" x2="46" y2="25" />
        </g>

        <path
          d="M18 48h31c7 0 11-4 11-10 0-6-5-10-11-10-1 0-2 0-3 .4C44 22 39 18 33 18c-8 0-14 6-14 14 0 1 0 2 .3 3.2C14 35.8 10 40 10 44c0 2 1 4 2 5z"
          fill="#f4f6f8"
        />

        <path
          d="M18 48h31c7 0 11-4 11-10"
          fill="none"
          stroke="#d8dde3"
          stroke-width="2"
        />
      </svg>
    `;
  }

  _googleCloudyIcon() {
    return html`
      <svg
        class="google-weather-icon"
        viewBox="0 0 64 64"
        aria-hidden="true"
      >
        <path
          d="M14 47h36c7 0 11-4 11-10 0-6-5-11-11-11-1 0-2 0-3 .4C45 20 40 16 34 16c-8 0-14 6-14 14 0 1 .1 2 .3 3.1C15 33.8 10 38 10 42.5 10 45 11 46 14 47z"
          fill="#e9edf1"
        />

        <path
          d="M14 47h36c7 0 11-4 11-10"
          fill="none"
          stroke="#c9d0d8"
          stroke-width="2"
        />
      </svg>
    `;
  }

  _googleRainIcon(
    pouring = false
  ) {
    const drops =
      pouring
        ? [
            [19, 48, 8],
            [29, 50, 10],
            [39, 48, 8],
            [49, 50, 10],
          ]
        : [
            [22, 48, 7],
            [34, 51, 8],
            [46, 48, 7],
          ];

    return html`
      <svg
        class="google-weather-icon"
        viewBox="0 0 64 64"
        aria-hidden="true"
      >
        <path
          d="M12 39h39c6 0 10-4 10-9s-4-10-10-10c-1 0-2 .1-3 .4C46 14 41 10 35 10c-8 0-14 6-14 14 0 1 .1 2 .3 3C15 27.7 10 32 10 36c0 1 1 2 2 3z"
          fill="#dfe5ea"
        />

        ${drops.map(
          ([x, y, h]) => html`
            <path
              d="M${x} ${y}
                 C${x - 3} ${y + 4}
                 ${x - 3} ${y + h}
                 ${x} ${y + h}
                 C${x + 3} ${y + h}
                 ${x + 3} ${y + 4}
                 ${x} ${y}Z"
              fill="#4aa3df"
            />
          `
        )}
      </svg>
    `;
  }

  _googleLightningIcon(
    withRain = false
  ) {
    return html`
      <svg
        class="google-weather-icon"
        viewBox="0 0 64 64"
        aria-hidden="true"
      >
        <path
          d="M11 34h39c6 0 10-4 10-9s-4-10-10-10c-1 0-2 .1-3 .4C46 9 41 6 35 6c-8 0-14 6-14 14 0 1 .1 2 .3 3C15 24.7 10 29 10 33c0 .5.3.8 1 1z"
          fill="#dfe5ea"
        />

        <path
          d="M35 29h9L38 38h7L30 56l4-13h-7z"
          fill="#f9c74f"
        />

        ${
          withRain
            ? html`
                <path
                  d="M17 46c-2 3-2 6 0 6s2-3 0-6z"
                  fill="#4aa3df"
                />

                <path
                  d="M52 46c-2 3-2 6 0 6s2-3 0-6z"
                  fill="#4aa3df"
                />
              `
            : ""
        }
      </svg>
    `;
  }

  _googleSnowIcon(
    withRain = false
  ) {
    return html`
      <svg
        class="google-weather-icon"
        viewBox="0 0 64 64"
        aria-hidden="true"
      >
        <path
          d="M11 36h40c6 0 10-4 10-9s-4-10-10-10c-1 0-2 .1-3 .4C46 11 41 8 35 8c-8 0-14 6-14 14 0 1 .1 2 .3 3C15 26.7 10 31 10 35c0 .5.3.8 1 1z"
          fill="#dfe5ea"
        />

        <g
          stroke="#7fc8e8"
          stroke-width="2"
          stroke-linecap="round"
        >
          <line x1="19" y1="47" x2="19" y2="55" />
          <line x1="15" y1="51" x2="23" y2="51" />
          <line x1="16" y1="48" x2="22" y2="54" />
          <line x1="22" y1="48" x2="16" y2="54" />

          <line x1="34" y1="47" x2="34" y2="55" />
          <line x1="30" y1="51" x2="38" y2="51" />
          <line x1="31" y1="48" x2="37" y2="54" />
          <line x1="37" y1="48" x2="31" y2="54" />
        </g>

        ${
          withRain
            ? html`
                <path
                  d="M49 47c-2 3-2 6 0 6s2-3 0-6z"
                  fill="#4aa3df"
                />
              `
            : ""
        }
      </svg>
    `;
  }

  _googleFogIcon() {
    return html`
      <svg
        class="google-weather-icon"
        viewBox="0 0 64 64"
        aria-hidden="true"
      >
        <path
          d="M12 30h38c6 0 10-4 10-9s-4-10-10-10c-1 0-2 .1-3 .4C46 5 41 2 35 2c-8 0-14 6-14 14 0 1 .1 2 .3 3C15 20.7 10 25 10 29c0 .5.8 1 2 1z"
          fill="#e5e9ed"
        />

        <g
          stroke="#aeb7c0"
          stroke-width="3"
          stroke-linecap="round"
        >
          <line x1="10" y1="39" x2="54" y2="39" />
          <line x1="16" y1="47" x2="48" y2="47" />
          <line x1="12" y1="55" x2="42" y2="55" />
        </g>
      </svg>
    `;
  }

  _googleHailIcon() {
    return html`
      <svg
        class="google-weather-icon"
        viewBox="0 0 64 64"
        aria-hidden="true"
      >
        <path
          d="M11 37h40c6 0 10-4 10-9s-4-10-10-10c-1 0-2 .1-3 .4C46 12 41 9 35 9c-8 0-14 6-14 14 0 1 .1 2 .3 3C15 27.7 10 32 10 36c0 .5.3.8 1 1z"
          fill="#dfe5ea"
        />

        <circle
          cx="19"
          cy="49"
          r="4"
          fill="#8fc8e5"
        />

        <circle
          cx="33"
          cy="53"
          r="4"
          fill="#8fc8e5"
        />

        <circle
          cx="47"
          cy="48"
          r="4"
          fill="#8fc8e5"
        />
      </svg>
    `;
  }

  _googleWindIcon() {
    return html`
      <svg
        class="google-weather-icon"
        viewBox="0 0 64 64"
        aria-hidden="true"
      >
        <path
          d="M8 25h35c5 0 8-3 8-7 0-3-2-6-5-6-3 0-5 2-5 5"
          fill="none"
          stroke="#aeb7c0"
          stroke-width="4"
          stroke-linecap="round"
        />

        <path
          d="M8 36h43c4 0 7 3 7 7s-3 7-7 7c-3 0-5-2-5-5"
          fill="none"
          stroke="#aeb7c0"
          stroke-width="4"
          stroke-linecap="round"
        />

        <path
          d="M8 47h23"
          fill="none"
          stroke="#aeb7c0"
          stroke-width="4"
          stroke-linecap="round"
        />
      </svg>
    `;
  }

  _getWeatherIcon(
    condition
  ) {
    const icons = {
      "clear-night":
        "mdi:weather-night",

      cloudy:
        "mdi:weather-cloudy",

      fog:
        "mdi:weather-fog",

      hail:
        "mdi:weather-hail",

      lightning:
        "mdi:weather-lightning",

      "lightning-rain":
        "mdi:weather-lightning-rain",

      partlycloudy:
        "mdi:weather-partly-cloudy",

      pouring:
        "mdi:weather-pouring",

      rainy:
        "mdi:weather-rainy",

      snowy:
        "mdi:weather-snowy",

      "snowy-rainy":
        "mdi:weather-snowy-rainy",

      sunny:
        "mdi:weather-sunny",

      windy:
        "mdi:weather-windy",

      "windy-variant":
        "mdi:weather-windy-variant",
    };

    return (
      icons[condition] ||
      "mdi:weather-cloudy"
    );
  }

  /* ============================================================
   * OCEAN / UV
   * ========================================================== */

  _renderOceanInfo() {
    const waveEntity =
      this.config.wave_height_entity
        ? this.hass.states[
            this.config
              .wave_height_entity
          ]
        : null;

    const oceanEntity =
      this.config
        .ocean_temperature_entity
        ? this.hass.states[
            this.config
              .ocean_temperature_entity
          ]
        : null;

    const uvEntity =
      this.config
        .uv_index_entity
        ? this.hass.states[
            this.config
              .uv_index_entity
          ]
        : null;

    if (
      !waveEntity &&
      !oceanEntity &&
      !uvEntity
    ) {
      return "";
    }

    const waveValue =
      waveEntity?.state;

    const waveUnit =
      waveEntity?.attributes
        ?.unit_of_measurement ||
      "";

    const oceanValue =
      oceanEntity?.state;

    const oceanUnit =
      oceanEntity?.attributes
        ?.unit_of_measurement ||
      "";

    const uvValue =
      uvEntity
        ? Number(
            uvEntity.state
          )
        : NaN;

    const uvCategory =
      this._getUVCategory(
        uvValue
      );

    return html`
      <div
        class="ocean-info"
      >

        ${
          waveEntity
            ? html`
                <div
                  class="ocean-item"
                >
                  <ha-icon
                    icon="mdi:waves"
                  ></ha-icon>

                  <span>
                    🌊 Surf:
                    ${waveValue}
                    ${waveUnit}
                  </span>
                </div>
              `
            : ""
        }

        ${
          oceanEntity
            ? html`
                <div
                  class="ocean-item"
                >
                  <ha-icon
                    icon="mdi:thermometer-water"
                  ></ha-icon>

                  <span>
                    🌡️Ocean:
                    ${oceanValue}
                    ${oceanUnit}
                  </span>
                </div>
              `
            : ""
        }

        ${
          uvEntity
            ? html`
                <div
                  class="ocean-item uv-item"
                >
                  <ha-icon
                    icon="${this._getUVIcon(
                      uvValue
                    )}"
                  ></ha-icon>

                  <span>
                    UV ${uvValue}

                    ${
                      uvCategory
                        ? html`
                            <span
                              class="uv-category"
                            >
                              — ${uvCategory}
                            </span>
                          `
                        : ""
                    }
                  </span>
                </div>
              `
            : ""
        }

      </div>
    `;
  }

  _getUVCategory(uv) {
    if (
      Number.isNaN(uv)
    ) {
      return "";
    }

    if (uv <= 3) {
      return "☀️ Low - No protection needed";
    }

    if (uv <= 6) {
      return "🕶️ Moderate - Stay in shade, use SPF 30";
    }

    if (uv <= 8) {
      return "🧴 High - SPF 30+, Wear a hat and sunglasses";
    }

    if (uv <= 11) {
      return "⛱️ Very High - SPF 50+, Protective clothing";
    }

    return "⛱️⛱️ Extreme - Avoid sun exposure, SPF 50+";
  }

  _getUVIcon(uv) {
    if (
      Number.isNaN(uv)
    ) {
      return "mdi:weather-sunny";
    }

    if (uv <= 3) {
      return "mdi:white-balance-sunny";
    }

    if (uv <= 6) {
      return "mdi:weather-sunny";
    }

    if (uv <= 8) {
      return "mdi:weather-sunny-alert";
    }

    if (uv <= 11) {
      return "mdi:sun-alert";
    }

    return "mdi:sun-wireless-outline";
  }

  /* ============================================================
   * FORMATTING / TEMPERATURE
   * ========================================================== */

  _getDayName(
    datetime,
    index
  ) {
    if (index === 0) {
      return "Today";
    }

    if (!datetime) {
      return "";
    }

    const date =
      new Date(datetime);

    if (
      Number.isNaN(
        date.getTime()
      )
    ) {
      return "";
    }

    return date.toLocaleDateString(
      undefined,
      {
        weekday: "short",
      }
    );
  }

  _getLow(item) {
    const value =
      item.templow ??
      item.temperature_low ??
      item.min_temp ??
      item.temperature;

    return Number(value);
  }

  _getHigh(item) {
    const value =
      item.temphigh ??
      item.temperature_high ??
      item.max_temp ??
      item.temperature;

    return Number(value);
  }

  _getForecastMin() {
    const values =
      this.forecast
        .map((item) => {
          if (
            this.config
              .forecast_type ===
            "hourly"
          ) {
            return this._getHourlyTemperature(
              item
            );
          }

          return this._getLow(item);
        })
        .filter((value) =>
          Number.isFinite(
            value
          )
        );

    return values.length
      ? Math.min(...values)
      : 0;
  }

  _getForecastMax() {
    const values =
      this.forecast
        .map((item) => {
          if (
            this.config
              .forecast_type ===
            "hourly"
          ) {
            return this._getHourlyTemperature(
              item
            );
          }

          return this._getHigh(item);
        })
        .filter((value) =>
          Number.isFinite(
            value
          )
        );

    return values.length
      ? Math.max(...values)
      : 1;
  }

  _getTemperatureRange(
    low,
    high,
    minTemp,
    maxTemp
  ) {
    if (
      !Number.isFinite(low) ||
      !Number.isFinite(high) ||
      maxTemp <= minTemp
    ) {
      return {
        left: 0,
        width: 100,
      };
    }

    const total =
      maxTemp - minTemp;

    const left =
      ((low - minTemp) /
        total) *
      100;

    const right =
      ((high - minTemp) /
        total) *
      100;

    return {
      left: Math.max(
        0,
        Math.min(
          100,
          left
        )
      ),

      width: Math.max(
        2,
        Math.min(
          100 - left,
          right - left
        )
      ),
    };
  }

  _formatTemperature(
    value,
    unit
  ) {
    if (
      value ===
        undefined ||
      value === null ||
      !Number.isFinite(
        Number(value)
      )
    ) {
      return "—";
    }

    return `${Math.round(
      Number(value)
    )}${unit || "°"}`;
  }

  _formatPrecipitation(
    value
  ) {
    if (
      value ===
        undefined ||
      value === null ||
      !Number.isFinite(
        Number(value)
      )
    ) {
      return "";
    }

    const unit =
      this.hass.states[
        this.config.entity
      ]?.attributes
        ?.precipitation_unit ||
      "";

    return `${value}${unit}`;
  }

  _formatCondition(
    condition
  ) {
    if (!condition) {
      return "";
    }

    const labels = {
      "clear-night":
        "Clear",

      cloudy:
        "Cloudy",

      fog:
        "Fog",

      hail:
        "Hail",

      lightning:
        "Lightning",

      "lightning-rain":
        "Thunderstorms",

      partlycloudy:
        "Partly Cloudy",

      pouring:
        "Heavy Rain",

      rainy:
        "Rain",

      snowy:
        "Snow",

      "snowy-rainy":
        "Snow & Rain",

      sunny:
        "Sunny",

      windy:
        "Windy",

      "windy-variant":
        "Windy",
    };

    return (
      labels[condition] ||
      String(condition)
        .replace(
          /[-_]/g,
          " "
        )
        .replace(
          /\b\w/g,
          (letter) =>
            letter.toUpperCase()
        )
    );
  }

  _isNight() {
    const sun =
      this.hass.states[
        "sun.sun"
      ];

    return (
      sun?.state ===
      "below_horizon"
    );
  }

  getCardSize() {
    if (
      this.config
        ?.forecast_type ===
      "hourly"
    ) {
      return this.config
        ?.layout === "vertical"
        ? Math.min(
            Number(
              this.config
                ?.hours || 24
            ) + 2,
            20
          )
        : 4;
    }

    return this.config
      ?.layout === "vertical"
      ? Math.min(
          Number(
            this.config
              ?.days || 9
          ) + 2,
          20
        )
      : 4;
  }
}

if (
  !customElements.get(
    "day-forecast-card"
  )
) {
  customElements.define(
    "day-forecast-card",
    DayForecastCard
  );
}

window.customCards =
  window.customCards || [];

if (
  !window.customCards.some(
    (card) =>
      card.type ===
      "day-forecast-card"
  )
) {
  window.customCards.push({
    type: "day-forecast-card",
    name: "Day Forecast",
    description:
      "Daily or hourly weather forecast with Apple Weather style temperature ranges, ocean conditions, UV index, Google Weather icons, and full-card tap, hold, and double-tap actions.",
    preview: true,
  });
}
