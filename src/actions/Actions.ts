/*
 * Reducer actions related with App - Updated for Redux Toolkit
 */
export * from './index';

// Re-export specific actions for backward compatibility
export {
  setWarningVersion,
  setAdvancedFilterPersist as setAdvancedFilter,
  storeCarData,
  logout,
  resetCarData as reset,
  enableLoader,
  disableLoader,
  changeLayout,
} from './index';

// Legacy function wrappers for complex actions that used to dispatch sagas
export function requestAction(payload: any) {
  // This function is deprecated - use specific async thunks instead
  console.warn(
    'requestAction is deprecated. Use specific async thunks from apiThunks.ts',
  );
  return { type: 'DEPRECATED_REQUEST_ACTION', payload };
}

export function requestActionLatest(payload: any) {
  // This function is deprecated - use specific async thunks instead
  console.warn(
    'requestActionLatest is deprecated. Use specific async thunks from apiThunks.ts',
  );
  return { type: 'DEPRECATED_REQUEST_ACTION_LATEST', payload };
}

export function saveResponseGeneral(
  payload: { actionType: any },
  response: any,
) {
  // This function is deprecated - responses are handled automatically by async thunks
  console.warn(
    'saveResponseGeneral is deprecated. Responses are handled automatically by async thunks.',
  );
  return { type: 'DEPRECATED_SAVE_RESPONSE_GENERAL', payload, response };
}

export function saveResponsePresist(
  payload: { actionType: any },
  response: any,
) {
  // This function is deprecated - responses are handled automatically by async thunks
  console.warn(
    'saveResponsePresist is deprecated. Responses are handled automatically by async thunks.',
  );
  return { type: 'DEPRECATED_SAVE_RESPONSE_PRESIST', payload, response };
}

export function clearPresist() {
  // This function is deprecated - use specific reset actions instead
  console.warn(
    'clearPresist is deprecated. Use specific reset actions from slices.',
  );
  return { type: 'DEPRECATED_CLEAR_PRESIST' };
}
