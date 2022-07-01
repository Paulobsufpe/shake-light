
'use strict'

import React, { useEffect, useState } from "react";
import {
  StyleSheet, SafeAreaView, View, Text, 
  Image, Pressable, TouchableOpacity, Platform,
  StatusBar
} from "react-native";
import Torch from "react-native-torch";
import RNShake from "react-native-shake";

import img_light_on from "./assets/icons/eco-light.png";
import img_light_off from "./assets/icons/eco-light-off.png";

const App = () => {

  const [lightOn, setLightOn] = useState(false)

  const safeAreaStyles = [styles.container, lightOn ? styles.containerToLight : null]
  const textStyles = [styles.text, { textAlign: "center" }, !lightOn ? { color: "lightgray" } : null]
  const buttonStyles = [styles.text, styles.textButton, lightOn ? styles.textButtonOff : null]

  const toggleLight = () => {
    setLightOn(state => !state)
  }

  useEffect(() => {
    Torch.switchState(lightOn)
    // console.log("LOG: lightOn = " + lightOn)
  }, [lightOn])

  useEffect(() => {
    const subsc = RNShake.addListener(() => {
      toggleLight()
    })

    return () => subsc.remove()
  })

  return <SafeAreaView style={safeAreaStyles}>
    <StatusBar backgroundColor={'pink'} barStyle="dark-content" hidden={false} />
    <View>
      <Text style={[textStyles, {fontSize: 26}]}>
        Bem vinde!
      </Text>
      <Text style={textStyles}>
        Chacoalhe o celular ou toque na lâmpada para {lightOn ? "apagar" : "acender"}.
      </Text>
      <TouchableOpacity onPress={toggleLight}>
        <Image
          source={lightOn ? img_light_on : img_light_off}
          style={[
            styles.img,
            !lightOn ? styles.imgLightOff : null,
            {
              minHeight: 50,
              minWidth: 50,
              marginVertical: 30,
              height: 180,
              width: 180
            }
          ]}
        />
      </TouchableOpacity>
      <Pressable onPress={toggleLight}>
        <Text style={buttonStyles}>
          {lightOn ? "Apagar" : "Acender"}
        </Text>
      </Pressable>
    </View>
  </SafeAreaView>
}

const backColorDark = '#181818'
const backColorLight = '#fbfbfb'
const foreColorDark = 'lightgray'
const foreColorLight = 'black'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backColorDark, //'#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerToLight: {
    backgroundColor: backColorLight
  },
  img: {
    resizeMode: "contain",
    alignSelf: "center",
    padding: 10
  },
  imgLightOff: {
    tintColor: foreColorDark
  },
  text: {
    fontSize: 24,
    fontFamily: "monospace",
    fontWeight: "bold",
    color: foreColorLight,
    marginVertical: 10,
    alignSelf: "center",
    maxWidth: 300
  },
  textButton: {
    fontSize: 20,
    fontWeight: "normal",
    padding: 10,
    borderRadius: 25,
    backgroundColor: foreColorDark,
    marginVertical: 10,
    marginHorizontal: 20,
    textAlign: "center"
  },
  textButtonOff: {
    backgroundColor: backColorDark,
    color: backColorLight
  },
  textButtonPress: {
    fontWeight: "bold",
    borderColor: "green"
  }
});

export default App;
