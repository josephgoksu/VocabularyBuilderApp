import * as React from 'react';
import { Dimensions, Keyboard, KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import {
  Divider,
  Icon,
  Input,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
  Button,
  IndexPath,
  Select,
  SelectItem,
  Modal,
  Card,
} from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { addVocab } from '../store/actions';

interface AddWordProps {}

export const AddWordScreen: React.FC<AddWordProps> = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [category, setCategory] = React.useState('initialState');
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));

  const [visible, setVisible] = React.useState(false);

  const [word, setWord] = React.useState('');
  const [definition, setdefinition] = React.useState('');
  const [inSentence, setinSentence] = React.useState('');
  const [synonyms, setsynonyms] = React.useState('');
  const [antonyms, setantonyms] = React.useState('');

  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => <TopNavigationAction icon={BackIcon} onPress={navigateBack} />;

  const BackIcon = (props: any) => <Icon {...props} name="arrow-back" />;

  return (
    <KeyboardAvoidingView behavior="height" style={{ flex: 1, backgroundColor: 'white' }}>
      <TopNavigation title={`Custom`} alignment="center" accessoryLeft={BackAction} />

      <Divider />

      <Layout style={styles.container}>
        <View style={styles.subContainer}>
          <Text category="h5" status="basic">
            Add New One
          </Text>
        </View>

        {/* <View style={styles.subContainer}>
          <Select selectedIndex={selectedIndex} onSelect={(index) => setSelectedIndex(index)}>
            <SelectItem title="Verbs" />
            <SelectItem title="Adverbs" />
            <SelectItem title="Adjectives" />
            <SelectItem title="Idioms" key="idioms" />
            <SelectItem title="Custom" />
          </Select>
        </View> */}

        <View style={styles.subContainer}>
          <Input
            placeholder="Word or ..."
            value={word}
            onChangeText={(nextValue) => setWord(nextValue)}
          />
        </View>

        <View style={styles.subContainer}>
          <Input
            placeholder="Definition"
            value={definition}
            onChangeText={(nextValue) => setdefinition(nextValue)}
          />
        </View>

        <View style={styles.subContainer}>
          <Input
            placeholder="In Sentence"
            value={inSentence}
            onChangeText={(nextValue) => setinSentence(nextValue)}
          />
        </View>

        <View style={styles.subContainer}>
          <Input
            placeholder="Synonyms"
            value={synonyms}
            onChangeText={(nextValue) => setsynonyms(nextValue)}
          />
        </View>

        <View style={styles.subContainer}>
          <Input
            placeholder="Antonyms"
            value={antonyms}
            onChangeText={(nextValue) => setantonyms(nextValue)}
          />
        </View>

        <View style={styles.subContainer}>
          <Button
            size="medium"
            disabled={word.length < 1 || definition.length < 1 || inSentence.length < 1}
            onPress={() => {
              Keyboard.dismiss();

              dispatch(
                addVocab({
                  type: 'custom',
                  word,
                  definition,
                  inSentence,
                  synonyms,
                  antonyms,
                  learned: false,
                }),
              );

              setVisible(true);
            }}>
            Save
          </Button>
        </View>

        <Modal
          visible={visible}
          style={{ width: 300 }}
          backdropStyle={styles.backdrop}
          onBackdropPress={() => {
            setVisible(false);
            navigation.goBack();
          }}>
          <Card disabled={true}>
            <View style={styles.subContainer}>
              <Text category="h5" status="basic">
                ✅
              </Text>
              <Text category="h5" status="basic">
                The word added!
              </Text>
            </View>
            <Button
              onPress={() => {
                setVisible(false);
                navigation.goBack();
              }}>
              OK
            </Button>
          </Card>
        </Modal>
      </Layout>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 50,
    marginTop: 50,
  },
  subContainer: {
    marginVertical: 15,
    width: 300,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
