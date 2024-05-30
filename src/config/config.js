const configAPI = {
  localUrl: import.meta.env.VITE_LOCAL_URL,
  renderUrl: import.meta.env.VITE_RENDER_URL,
  dockerUrl: import.meta.env.VITE_DOCKER_URL
}

export default configAPI.localUrl;