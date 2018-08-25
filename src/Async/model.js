import { makeSharedModuleKeyName } from 'simpler-redux'
import * as sharedAsync from '../SharedModel/Async'

export const reducerKey = 'async'

const asyncModuleOptions = {
  // If this is changed then the view prop keys need to be changed. So don't change it once it is defined.
  id: 'AsyncModule',
  filter: data => data
}

export const initialState = {
  ...sharedAsync.getInitialState(asyncModuleOptions)
}

export const selectors = {
  ...sharedAsync.getSelectors(reducerKey, asyncModuleOptions)
}

const runSharedFunction = (store, sharedFunctions, functionKey, asyncModuleOptions) =>
  sharedFunctions[makeSharedModuleKeyName(functionKey, asyncModuleOptions)](store, reducerKey, asyncModuleOptions) 

const sharedAsyncServiceFunctions = sharedAsync.getServiceFunctions(reducerKey, asyncModuleOptions)

export const serviceFunctions = {
  ...sharedAsyncServiceFunctions,
  clear: store => sharedAsync.externalServiceFunctions.setData(store, reducerKey, asyncModuleOptions, []),
  componentDidMount: store => runSharedFunction(store, sharedAsyncServiceFunctions, 'onGet', asyncModuleOptions),
  onConstructor: () => console.log('onConstructor'),
  componentWillUnmount: () => console.log('onComponentWillUnmount'),
  onRender: () => console.log('onRender')
}

export const isDynamicReducer = true
