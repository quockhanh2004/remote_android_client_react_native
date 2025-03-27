/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState, forwardRef} from 'react';

import {TextInput, StyleSheet, Pressable} from 'react-native';
import {Colors, View, Icon, Typography, Card, Image} from 'react-native-ui-lib';

interface InputViewProps {
  bgColor?: string;
  borderColor?: string;
  placeholderTextColor?: string;
  style?: any;
  radius?: number;
  onFocus?: (focused: boolean) => void;
  onPressIn?: () => void;
  onSubmitEditing?: () => void;
  inputStyle?: any;
  placeholder?: string;
  multiline?: boolean;
  value?: string;
  onChangeText?: (text: string) => void;
  maxLength?: number;
  error?: string;
  renderLeft?: React.ReactNode;
  renderRight?: React.ReactNode;
  keyboardType?:
    | 'default'
    | 'email-address'
    | 'numeric'
    | 'phone-pad'
    | 'number-pad';
  flex?: boolean;
  iconLeft?: string;
  iconLeftGroup?: string;
  iconLeftColor?: string;
  onPressLeft?: () => void;
  iconRight?: string;
  iconRightGroup?: string;
  iconRightColor?: string;
  onPressRight?: () => void;
  letterSpacing?: number;
  description?: string;
  defaultValue?: string;
  onBlur?: () => void;
  textContentType?: string;
  disabled?: boolean;
  title?: string;
  required?: boolean;
  returnKeyType?: 'done' | 'go' | 'next' | 'search' | 'send';
  eyePassword?: boolean;
  withColon?: boolean;
  bold?: boolean;
  maxHeight?: number;
  borderB?: boolean;
  typography?: any;
  showClear?: boolean;
  styleIcon?: any;
  enableShadow?: boolean;
  borderWidth?: number;
  onKeyPress?: (event: any) => void;
  width?: string | number;
}

const InputView = forwardRef<TextInput, InputViewProps>(
  (
    {
      bgColor,
      borderColor,
      placeholderTextColor = Colors.gray,
      style,
      radius = 10,
      onFocus,
      onPressIn,
      onSubmitEditing,
      inputStyle,
      placeholder,
      multiline,
      value, // nhớ truyền value vào nhé :))
      onChangeText,
      maxLength,
      error,
      renderLeft,
      renderRight,
      keyboardType,
      flex,
      iconLeft,
      iconLeftGroup,
      iconLeftColor = Colors.gray,
      onPressLeft,
      iconRight,
      iconRightGroup,
      iconRightColor,
      onPressRight,
      letterSpacing,
      description,
      defaultValue = '',
      onBlur,
      textContentType,
      disabled = false,
      title = '',
      required = false,
      returnKeyType = 'done',
      eyePassword = false,
      withColon = false,
      bold = false,
      maxHeight,
      borderB = false,
      typography = Typography.text,
      showClear = false,
      styleIcon,
      enableShadow,
      borderWidth,
      onKeyPress,
      ...props
    },
    inputRef: any,
  ) => {
    const [showPassword, setShowPassword] = useState(eyePassword);
    // const [isFocus, setIsFocus] = useState(false);

    const toggleEye = () => setShowPassword(p => !p);

    const onClear = () => {
      inputRef?.current?.clear?.();
      onChangeText?.('');
    };

    // const handleFocus = () => {
    //   setIsFocus(true);
    //   onFocus?.(true);
    // };

    // const handleBlur = () => {
    //   setIsFocus(false);
    //   onBlur?.();
    // };

    const renderLeftComponent = () =>
      !!iconLeft && (
        <View style={styleIcon}>
          <Pressable onPress={onPressLeft}>
            <Icon
              size={16}
              assetName={iconLeft}
              assetGroup={iconLeftGroup}
              tintColor={iconLeftColor}
            />
          </Pressable>
        </View>
      );

    const renderRightComponent = () =>
      !!iconRight && (
        <View style={styleIcon}>
          <Pressable onPress={onPressRight}>
            <Icon
              size={16}
              assetName={iconRight}
              assetGroup={iconRightGroup}
              tintColor={iconRightColor}
            />
          </Pressable>
        </View>
      );

    return (
      // <WrapInput
      //   title={title}
      //   withColon={withColon}
      //   required={required}
      //   error={error}
      //   description={description}
      //   isFocus={isFocus}
      //   enableShadow={enableShadow}
      //   {...props}>

      // </WrapInput>
      // </View>
      <View style={{borderRadius: 12, maxHeight: maxHeight}}>
        <Card
          flex={flex}
          row
          centerH
          centerV
          style={style}
          border={borderB ? 0 : 1}
          borderB={borderB}
          gap-10
          enableShadow={enableShadow}
          backgroundColor={bgColor}
          borderColor={borderColor}
          borderWidth={borderWidth}
          borderRadius={radius}
          width={props.width}>
          {renderLeft || renderLeftComponent()}
          <TextInput
            ref={inputRef}
            editable={!disabled}
            multiline={multiline}
            defaultValue={defaultValue}
            value={value}
            onChangeText={onChangeText}
            style={[
              styles.input,
              styles.content_regular,
              inputStyle,
              typography,
              {
                borderRadius: radius,
                letterSpacing,
              },
            ]}
            maxLength={maxLength}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            // onFocus={handleFocus}
            // onBlur={handleBlur}
            onPressIn={onPressIn}
            onSubmitEditing={onSubmitEditing}
            keyboardType={keyboardType}
            secureTextEntry={showPassword}
            returnKeyType={returnKeyType}
            textContentType={textContentType}
            onKeyPress={onKeyPress}
          />
          {showClear && !!value && (
            <Pressable onPress={onClear} style={styleIcon}>
              <Image
                marginR-12
                width={18}
                height={18}
                assetName="ic_cancel"
                assetGroup="icons"
              />
            </Pressable>
          )}
          {eyePassword && (
            <Pressable onPress={toggleEye} style={styleIcon}>
              <Image
                marginR-12
                width={20}
                height={16}
                assetName={showPassword ? 'ic_eye' : 'ic_eye_hide'}
                assetGroup="icons"
                tintColor={Colors.grey40}
              />
            </Pressable>
          )}
          {!!error && <Icon normal assetName={'error'} marginR-12 />}
          {renderRight || renderRightComponent()}
        </Card>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  input: {
    flex: 1,
    color: '#2D3339',
  },
  content_regular: {
    color: '#2D3339',
    fontSize: 14,
    fontFamily: 'Inter',
    fontWeight: '400',
  },
});

export default InputView;
