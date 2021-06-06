import { adjectives } from './vocab/adjectives';
import { adverbs } from './vocab/adverbs';
import { idioms } from './vocab/idioms';
import { verbs } from './vocab/verbs';
import * as _ from 'lodash';
import { iAction, iActionTypes } from '../iAction';
import { custom } from './vocab/custom';

const initializeState = (vocabularies: iVocabulary[]) => {
  var newArr = _.map(vocabularies, function (element) {
    return _.extend({}, element, { learned: false });
  });

  return newArr;
};

export interface iVocabulary {
  type: string;
  word: string;
  definition: string;
  inSentence: string;
  synonyms: string | string[];
  antonyms: string | string[];
  learned?: boolean;
}

const initialState: iVocabulary[] = [];

export const vocabularyReducer = (state = initialState, action: iAction) => {
  switch (action.type) {
    case iActionTypes['persist/PERSIST']: {
      let newState: iVocabulary[] = [];

      if (action?.payload?.auth.hasLaunched == null) {
        newState = initializeState([...verbs, ...adverbs, ...adjectives, ...idioms]);
      }

      return newState;
    }

    // case iActionTypes.HAS_LAUNCHED: {
    //   let newState: iVocabulary[] = [];
    //   console.log(
    //     '👀 LOGGING ~ file: vocabulary.ts ~ line 35 ~ vocabularyReducer ~ action.payload',
    //     action.payload,
    //   );

    //   if (!action.payload.hasLaunched) {
    //     newState = initializeState([...verbs, ...adverbs, ...adjectives, ...idioms]);
    //   }

    //   return newState;
    // }

    case iActionTypes.LEARNED_CHANGE:
      for (let index = 0; index < state.length; index++) {
        if (action.payload.word == state[index].word) {
          state[index].learned = action.payload.hasLearned;
        }
      }
      return state;

    case iActionTypes.ADD_VOCAB:
      const newState = state;
      newState.push(action.payload);

      return newState;

    case iActionTypes.REMOVE_VOCAB:
      return state.filter(function (obj) {
        return obj.word !== action.payload.word;
      });

    case iActionTypes.CORRECT_ANSWER:
      for (let index = 0; index < state.length; index++) {
        if (action.payload.word == state[index].word) {
          state[index].learned = true;
        }
      }

      return state;

    case iActionTypes.WRONG_ANSWER:
      for (let index = 0; index < state.length; index++) {
        if (action.payload.word == state[index].word) {
          state[index].learned = false;
        }
      }

      return state;

    default:
      return state;
  }
};
