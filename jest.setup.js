require('@testing-library/jest-dom')

// Polyfill for React.act compatibility
if (typeof global.React === 'undefined') {
  global.React = require('react')
}

// Mock React.act if not available
if (!global.React.act) {
  global.React.act = (callback) => {
    const result = callback()
    if (result && typeof result.then === 'function') {
      return result
    }
    return Promise.resolve()
  }
}