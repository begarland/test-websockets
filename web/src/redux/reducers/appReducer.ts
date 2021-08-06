import { appState, IAppState } from '../store/templates/appState'

export default (state: IAppState = appState, action) => {
  switch (action.type) {
    default: {
      return state
    }
  }
}
