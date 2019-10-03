const cleanPath = (...segments) =>
  segments.map(segment => segment.replace(/\/$/, '').replace(/^\//, '')).join('/')

export default cleanPath
