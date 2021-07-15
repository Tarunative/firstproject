import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Animated,
  StatusBar,
  ImageBackground,
  Platform,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import * as Styles from '../../../styles/Index';
//import {images} from '../../../constants/images';
import * as constant from '../../../constants/sizes';
import OnBoardingScreen1img from '../Images/OnBoardingScreen1img.png';
import OnBoardingScreen1img2 from '../Images/OnBoardingScreenimg2.png';
const tempArray = [
  {id: 1, img: OnBoardingScreen1img2},
  {id: 2, img: OnBoardingScreen1img},
  {id: 3, img: images.welcome2},
];

const Welcome = ({navigation}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollX = new Animated.Value(0);
  const position = Animated.divide(scrollX, constant.SCREEN_WIDTH);
  const slidesRef = useRef(null);

  const viweableItemsChanged = useRef(({viewableItems}) => {
    console.log('#. viweableItemsChanged() : ', viewableItems[0].index);
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

  const renderItem = ({item}) => {
    return (
      <View style={Styles.Containers.welcomeScrollView}>
        <Image
          source={item.img}
          style={Styles.ImageStyles.welcomeScreenImage}
          resizeMode="cover"
        />
      </View>
    );
  };

  const nextClick = () => {
    if (currentIndex < 4) {
      slidesRef.current.scrollToIndex({
        index: currentIndex < 4 ? currentIndex + 1 : currentIndex,
      });
    } else {
      navigation.navigate('Login');
    }
  };

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <ImageBackground
      source={images.backgroundImg}
      style={Styles.ImageStyles.backgroungImage}
      resizeMode="cover">
      <StatusBar barStyle="light-content" />
      <Image
        source={images.logo}
        style={Styles.ImageStyles.welcomeScreenLogo}
        resizeMode="contain"
      />

      <FlatList
        style={{marginTop: '10%'}}
        horizontal
        data={tempArray}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator
        pagingEnabled
        bounces={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        scrollEventThrottle={32}
        onViewableItemsChanged={viweableItemsChanged}
        viewabilityConfig={viewConfig}
        ref={slidesRef}
      />

      <View style={Styles.Containers.WelcomeViewContent}>
        <Text
          style={{...Styles.TextStyles.welcomeText1, ...{textAlign: 'center'}}}>
          {currentIndex === 0
            ? 'How to use the app?'
            : currentIndex === 1
            ? 'Voting Bar & 6 hr timer'
            : currentIndex === 2
            ? 'Can challenge other users'
            : currentIndex === 3
            ? 'Gift of appreciation for users'
            : 'Purchase Coins'}
        </Text>
        <Text style={Styles.TextStyles.welcomeText2}>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
          rebum
        </Text>

        <View style={Styles.Containers.rowDirection1}>
          {currentIndex >= 0 ? (
            <TouchableOpacity
              style={Styles.ButtonStyles.welcomeButton1}
              onPress={() =>
                slidesRef.current.scrollToIndex({
                  index: currentIndex > 0 ? currentIndex - 1 : currentIndex,
                })
              }>
              <Text style={Styles.TextStyles.welcomeText3}>Pervious</Text>
            </TouchableOpacity>
          ) : (
            <View style={Styles.Containers.emptyContainer} />
          )}
          <View style={Styles.Containers.scrollIndicator}>
            {tempArray.map((_, ind) => {
              let opacity = position.interpolate({
                inputRange: [ind - 1, ind, ind + 1], // each dot will need to have an opacity of 1 when position is equal to their index (i)
                outputRange: [0.4, 1, 0.4], // when position is not i, the opacity of the dot will animate to 0.3
                extrapolate: 'clamp', // this will prevent the opacity of the dots from going outside of the outputRange (i.e. opacity will not be less than 0.3)
              });
              return (
                <Animated.View
                  key={ind}
                  style={{
                    ...Styles.Containers.indicatorView,
                    ...{opacity},
                  }}
                />
              );
            })}
          </View>
          {currentIndex >= 0 ? (
            <TouchableOpacity
              style={Styles.ButtonStyles.welcomeButton1}
              onPress={() => nextClick()}>
              <Text style={Styles.TextStyles.welcomeText3}>Next</Text>
            </TouchableOpacity>
          ) : (
            <View style={Styles.Containers.emptyContainer} />
          )}
        </View>
      </View>
    </ImageBackground>
  );
};

export default Welcome;
