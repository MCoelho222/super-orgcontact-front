export default {

    namespaced: true,
    state() {
        return {
            sidebarWidth: 300,
            toggleSideBar: true // Controls the hide/show SideBar
        }
    },
    mutations: {
      // Controls the SWITCH to hide the SideBar
      controlSideBar(state) {
        if (state.toggleSideBar) {
          state.sidebarWidth = 60
          state.toggleSideBar = false
        } else {
          state.sidebarWidth = 310
          state.toggleSideBar = true
        }
      },
    },
    getters: {
      // Returns the style of the sidebar
      sidebar(state) {
          return `width: ${state.sidebarWidth}px; height: 100vh; display: flex; flex-direction: column; justify-content: space-between; transition: all 0.4s`
        },

      // Return the style of the main div depending on the style of the sidebar
      main(state) {
          return `width: calc(100% - ${state.sidebarWidth}px); height: 100%;`
      },
    }
}