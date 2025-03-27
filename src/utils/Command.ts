export const Command = {
  call_to: 'am start -a android.intent.action.CALL -d tel:',
  accept_call: 'input keyevent KEYCODE_HEADSETHOOK',
  end_call: 'input keyevent KEYCODE_ENDCALL',
  enable_hotspot: 'service call tethering 4 null s16 random',
  turn_on_flash: 'flash on',
  turn_off_flash: 'flash off',
};
