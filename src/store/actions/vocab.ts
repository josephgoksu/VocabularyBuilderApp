import { iActionTypes } from '../iAction';
import { iVocabulary } from '../reducers';

interface iHasLearned {
  hasLearned: boolean;
  word: string;
}
export const changeHasLearned = (payload: iHasLearned) => ({
  type: iActionTypes.LEARNED_CHANGE,
  payload,
});

export const addVocab = (payload: iVocabulary) => ({
  type: iActionTypes.ADD_VOCAB,
  payload,
});

export const removeVocab = (payload: iVocabulary) => ({
  type: iActionTypes.REMOVE_VOCAB,
  payload,
});

export const correctAnswer = (payload: iVocabulary) => ({
  type: iActionTypes.CORRECT_ANSWER,
  payload,
});

export const wrongAnswer = (payload: iVocabulary) => ({
  type: iActionTypes.WRONG_ANSWER,
  payload,
});
