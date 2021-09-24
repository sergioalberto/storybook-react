module.exports = {
  ci: {
    collect: {
      staticDistDir: './build',
    },
    upload: {
      target: 'temporary-public-storage',
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        'uses-rel-preload': 'on',
        'uses-rel-preconnect': 'off',
      },
    },
  },
};

