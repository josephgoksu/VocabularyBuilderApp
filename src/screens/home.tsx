import React, { useEffect } from 'react';
import { Dimensions, SafeAreaView, StyleSheet, ViewProps } from 'react-native';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { Layout, List, Button, Icon, ListItem } from '@ui-kitten/components';
import { CustomTopNavigation } from '../components/topNavigation';
import { useNavigation } from '@react-navigation/native';
import { iVocabulary } from '../store/reducers';

import _ from 'lodash';
import { hasLaunched } from '../store/actions';

interface HomeProps {}

export const HomeScreen: React.FC<HomeProps> = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(hasLaunched());
  }, []);

  const { vocabulary } = useSelector((state: { vocabulary: iVocabulary[] }) => ({
    vocabulary: state.vocabulary,
  }));

  const categories = _.chain(vocabulary)
    .map(function (item) {
      return item.type;
    })
    .uniq()
    .value();

  const categoriesCount = _.countBy(vocabulary, (item) => {
    return item.type;
  });

  const renderItemAccessory = (props: ViewProps | undefined, item: string) => {
    return (
      <Button
        size="medium"
        onPress={() =>
          navigation.navigate('Quiz', {
            category: item,
          })
        }>
        Start Quiz
      </Button>
    );
  };

  const renderItemIcon = (props: ViewProps | undefined) => (
    <Icon {...props} name="chevron-right-outline" />
  );

  const renderItem = ({ item, index }) => {
    return (
      <ListItem
        title={`${item.toUpperCase()} - ${categoriesCount[`${item}`]}`}
        accessoryLeft={renderItemIcon}
        accessoryRight={(props) => renderItemAccessory(props, item)}
      />
    );
  };

  return (
    <Layout style={{ flex: 1 }}>
      <SafeAreaView>
        <CustomTopNavigation />

        {/* <View style={[styles.textContainer]}>
          <Text style={styles.text} category="h4">
            Practice daily to learn better!
          </Text>
          <View>
            <Text style={styles.text} category="h2">
              practice
            </Text>
          </View>
        </View> */}
        <List style={styles.container} data={categories} renderItem={renderItem} />
      </SafeAreaView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    maxHeight: Dimensions.get('window').height,
  },
  textContainer: {
    paddingVertical: 5,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    margin: 2,
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
  },
});
