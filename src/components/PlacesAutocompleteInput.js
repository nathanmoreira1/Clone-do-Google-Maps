//libs
import PlacesAutocomplete from "react-places-autocomplete"
//images
import pin from "../images/pin.png"

export const PlacesAutocompleteInput = ({ value, onChange, onSelect, styles, placeholder, inputClassName, resultOfSearchClassName }) => {

    return (
        <div>
            <PlacesAutocomplete value={value} onChange={onChange} onSelect={onSelect}>
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <>
                        <input {...getInputProps({ placeholder: placeholder, className: inputClassName })} />
                        {loading ? null : null}
                        <div className={resultOfSearchClassName}>
                            {suggestions.map((suggestion, i) => {
                                let style = {
                                    ...styles,
                                    opacity: suggestion.active ? "0.8" : "1",
                                    cursor: suggestion.active ? "pointer" : "normal"
                                }
                                return (
                                    <div key={i} {...getSuggestionItemProps(suggestion, { style })}>
                                        <img src={pin} />
                                        <p>{suggestion.description}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </>
                )}
            </PlacesAutocomplete>
        </div>
    )
}