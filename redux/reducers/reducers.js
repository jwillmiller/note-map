import { ADD_NOTE, REMOVE_NOTE, UPDATE_NOTE_POS, UPDATE_MAP_CENTER, UPDATE_MAP_ZOOM, UPDATE_NOTE_TEXT, UPDATE_NOTE_TITLE } from '../actions/actions';

const initialState = {
  notes: [],
  center: [37.78, -122.43],
  zoom: 11
};

function rootReducer(state = initialState, action) {
    switch(action.type) {
        case ADD_NOTE:
            return {
                ...state,
                notes: [
                    ...state.notes,
                    {
                        lat: action.lat,
                        lng: action.lng,
                        title: "Note " + state.notes.length.toString(),
                        text: "",
                    }
                ]
            };

        case REMOVE_NOTE:
            return {
                ...state,
                notes: state.notes.filter((note, idx) => idx !== action.id)
            };

        case UPDATE_NOTE_POS:
            let notesCopy = [...state.notes];
            let noteToChange = {...notesCopy[action.id]};
            noteToChange.lat = action.lat;
            noteToChange.lng = action.lng;
            notesCopy[action.id] = noteToChange;

            return {
                ...state,
                notes: notesCopy
            };

        case UPDATE_NOTE_TEXT:
            let notesCopy1 = [...state.notes];
            let noteToChange1 = {...notesCopy1[action.id]};
            noteToChange1.text = action.text;
            notesCopy1[action.id] = noteToChange1;

            return {
                ...state,
                notes: notesCopy1
            };

        case UPDATE_NOTE_TITLE:
            let notesCopy2 = [...state.notes];
            let noteToChange2 = {...notesCopy2[action.id]};
            noteToChange2.title = action.title;
            notesCopy2[action.id] = noteToChange2;

            return {
                ...state,
                notes: notesCopy2
            };

        case UPDATE_MAP_CENTER:
            return {
                ...state,
                center: [action.lat, action.lng]
            };

        case UPDATE_MAP_ZOOM:
            return {
                ...state,
                zoom: action.zoom
            };

        default:
            return state;
    };
}

export default rootReducer;