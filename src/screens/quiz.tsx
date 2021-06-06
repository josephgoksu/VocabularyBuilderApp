import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Card,
  Divider,
  Icon,
  Button,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { iVocabulary } from '../store/reducers';

import _ from 'lodash';
import { correctAnswer, wrongAnswer } from '../store/actions';

interface QuizProps {
  route: {
    params: {
      category: string;
    };
  };
}

export const QuizScreen: React.FC<QuizProps> = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [answerStatus, setanswerStatus] = React.useState(false);

  const navigateBack = () => {
    navigation.goBack();
  };

  const { vocabulary } = useSelector((state: { vocabulary: iVocabulary[] }) => ({
    vocabulary: state.vocabulary,
  }));

  const quizCategory = vocabulary.filter((value) => {
    return value.type == props.route.params.category;
  });

  // const [questions, setquestions] = React.useState(quizCategory);

  const learnedQuestions = quizCategory.filter((value) => {
    return value.learned !== true;
  });

  const unlearnedQuestions = quizCategory.filter((value) => {
    return value.learned !== false;
  });

  const questions = _.shuffle(unlearnedQuestions);
  const pickedQuestion = questions[0];
  console.log('👀 pickedQuestion', pickedQuestion);

  const restOfQuestions = _.drop(unlearnedQuestions);
  console.log('👀 restOfQuestions', restOfQuestions);

  const BackAction = () => <TopNavigationAction icon={BackIcon} onPress={navigateBack} />;

  const BackIcon = (props: any) => <Icon {...props} name="arrow-back" />;

  const Header = (props) => (
    <View {...props}>
      <Text category="h2">{questions[0].word}</Text>
      {/* <Text category="h6">{questions[0].definition}</Text> */}
    </View>
  );

  const Answers = [
    <Button
      style={styles.footerControl}
      size="small"
      status="basic"
      onPress={() => {
        setanswerStatus(true);
        dispatch(correctAnswer(pickedQuestion));
      }}>
      {pickedQuestion.definition}
    </Button>,
    <Button
      style={styles.footerControl}
      size="small"
      status="basic"
      onPress={() => {
        setanswerStatus(false);
        dispatch(wrongAnswer(pickedQuestion));
      }}>
      {restOfQuestions[1].definition}
    </Button>,
    <Button
      style={styles.footerControl}
      size="small"
      status="basic"
      onPress={() => {
        setanswerStatus(false);
        dispatch(wrongAnswer(pickedQuestion));
      }}>
      {restOfQuestions[2].definition}
    </Button>,
    <Button
      style={styles.footerControl}
      size="small"
      status="basic"
      onPress={() => {
        setanswerStatus(false);
        dispatch(wrongAnswer(pickedQuestion));
      }}>
      {restOfQuestions[3].definition}
    </Button>,
  ];

  const Footer = (props) => (
    <View {...props} style={[props.style, styles.footerContainer]}>
      {_.shuffle(Answers)}
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <TopNavigation
        title={`Quiz for ${props.route.params.category.toUpperCase()}`}
        alignment="center"
        accessoryLeft={BackAction}
      />

      <Divider />

      <Layout style={styles.container}>
        <Card
          disabled={true}
          style={styles.card}
          status={answerStatus ? 'success' : 'danger'}
          header={(props) => Header(props)}
          footer={(props) => Footer(props)}>
          {questions[0].inSentence ? (
            <React.Fragment>
              <Text category="s1">In Sentence Example</Text>
              <Text category="s1">{questions[0].inSentence}</Text>
            </React.Fragment>
          ) : (
            <Text category="s1"></Text>
          )}
        </Card>

        <Text category="h3">Learned {learnedQuestions.length}</Text>
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 30,
    marginTop: 50,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    margin: 2,
  },
  footerContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  footerControl: {
    marginHorizontal: 2,
    marginVertical: 5,
  },
});
