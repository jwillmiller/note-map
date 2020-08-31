export const ADD_NOTE = 'ADD_NOTE';
export const REMOVE_NOTE = 'REMOVE_NOTE';
export const UPDATE_NOTE_POS = 'UPDATE_NOTE_POS';
export const UPDATE_NOTE_TEXT = 'UPDATE_NOTE_TEXT';
export const UPDATE_NOTE_TITLE = 'UPDATE_NOTE_TITLE';
export const UPDATE_MAP_CENTER = 'UPDATE_MAP_CENTER';
export const UPDATE_MAP_ZOOM = 'UPDATE_MAP_ZOOM';

export function addNote(lat, lng ) {
    return { type: ADD_NOTE, lat: lat, lng: lng };
}

export function removeNote(id) {
    return { type: REMOVE_NOTE, id: id};
}

export function updateNotePosition(id, lat, lng) {
    return { type: UPDATE_NOTE_POS, id: id, lat: lat, lng: lng };
}

export function updateNoteContent(id, text) {
    return { type: UPDATE_NOTE_CONTENT, id: id, text: text };
}

export function updateNoteTitle(id, title) {
    return { type: UPDATE_NOTE_TITLE, id: id, title: title };
}

export function updateNoteText(id, text) {
    return { type: UPDATE_NOTE_TEXT, id: id, text: text };
}

export function updateMapCenter(lat, lng) {
    return { type: UPDATE_MAP_CENTER, lat: lat, lng: lng };
}

export function updateMapZoom(zoom) {
    return { type: UPDATE_MAP_ZOOM, zoom: zoom };
}