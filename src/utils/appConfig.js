export const PADDING_OFFSET_X = 20 // in pixels
export const PADDING_OFFSET_Y = 0 // in pixels

export const ParticlesConfig = {
  // Simple: moving lines and dots
  simple: {
    particles: {
      number: {
        value: 50,
      },
      size: {
        value: 3,
      },
    },
  },

  // Bubbles
  bubbles: {
    particles: {
      number: {
        value: 160,
        density: {
          enable: false,
        },
      },
      size: {
        value: 3,
        random: true,
        anim: {
          speed: 4,
          size_min: 0.3,
        },
      },
      line_linked: {
        enable: false,
      },
      move: {
        random: true,
        speed: 1,
        direction: 'top',
        out_mode: 'out',
      },
    },
  },

  // Snow
  snow: {
    particles: {
      number: {
        value: 160,
        density: {
          enable: false,
        },
      },
      size: {
        value: 10,
        random: true,
      },
      move: {
        direction: 'bottom',
        out_mode: 'out',
      },
      line_linked: {
        enable: false,
      },
    },
  },

  // Nightsky
  nightsky: {
    particles: {
      number: {
        value: 60,
        density: {
          enable: true,
          value_area: 1500,
        },
      },
      line_linked: {
        enable: true,
        opacity: 0.02,
      },
      move: {
        direction: 'right',
        speed: 0.05,
      },
      size: {
        value: 1,
      },
      opacity: {
        anim: {
          enable: true,
          speed: 1,
          opacity_min: 0.05,
        },
      },
    },
    retina_detect: true,
  },
}
