/* Modules */
import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';

/* Services */
import { rankingService as rank } from '../services';

/* Theme Settings */
const theme = {
    container:                'aph autocomplete',
    containerOpen:            'react-autosuggest__container--open',
    input:                    'aph form__control autocomplete__input text-center',
    inputOpen:                'react-autosuggest__input--open',
    inputFocused:             'react-autosuggest__input--focused',
    suggestionsContainer:     'aph autocomplete__list',
    suggestionsContainerOpen: 'react-autosuggest__suggestions-container--open',
    suggestionsList:          'aph list',
    suggestion:               'aph autocomplete__list__item text-black',
    suggestionFirst:          'react-autosuggest__suggestion--first',
    suggestionHighlighted:    'react-autosuggest__suggestion--highlighted',
    sectionContainer:         'react-autosuggest__section-container',
    sectionContainerFirst:    'react-autosuggest__section-container--first',
    sectionTitle:             'react-autosuggest__section-title'
};

/* Values */
let ranking = [];

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
    const inputValue  = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : ranking.filter(ranked =>
        ranked.team.toLowerCase().slice(0, inputLength) === inputValue
    );
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.team;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
    <div>
        {suggestion.team}
    </div>
);

/* Componet it self */
export default class Autocomplete extends Component {
    /* Constructor */
    constructor(props) {
        super(props);

        // Autosuggest is a controlled component.
        // This means that you need to provide an input value
        // and an onChange handler that updates this value (see below).
        // Suggestions also need to be provided to the Autosuggest,
        // and they are initially empty because the Autosuggest is closed.
        this.props = props;
        this.state = {
            value      : this.props.value,
            suggestions: [],
        };

        this.cleanValue = this.cleanValue.bind(this);
    }

    /* Will mount */
    componentWillMount() {
        rank
        .db
        .onSnapshot((rankSnapshot) => {
            let rank = [];

            rankSnapshot.forEach((doc) => {
                rank.push(Object.assign(doc.data(), { team: doc.id }));
            });

            ranking = rank;
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value === this.state.value) {
            return;
        }

        this.setState({
            ...this.state,
            value: nextProps.value,
        });
    }

    /* On change */
    onChange = (event, { newValue }) => {
        this.setState({
            ...this.state,
            value: newValue
        });

        if (this.props.callback) {
            this.props.callback(newValue);
        }
    };

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: getSuggestions(value)
        });
    };

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    //
    cleanValue = () => {
        this.setState({
            ...this.state,
            value: '',
        });

        this.props.callback('');
    }

    render() {
        const { value, suggestions } = this.state;

        // Autosuggest will pass through all these props to the input.
        const inputProps = {
            value,
            placeholder: (this.props.placeholder || ''),
            disabled   : this.props.disabled,
            onChange   : this.onChange,
        };

        // Finally, render it!
        return (
            <div className={`aph form__control-with-icon form__control-with-icon--${this.props.id.toLowerCase()}`}>
                <Autosuggest
                    id={this.props.id}
                    theme={theme}
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                    inputProps={inputProps}
                />
                {
                    (this.props.disabled || !this.state.value) ?
                        ('')
                        :
                        (
                            <button className="aph form__control-with-icon__button"
                                    type="button"
                                    tabIndex="-1"
                                    onClick={this.cleanValue}>
                                &times;
                            </button>
                        )
                }
            </div>
        );
    }
}
