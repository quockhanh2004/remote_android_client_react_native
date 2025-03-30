export const Command = {
  call_to: 'am start -a android.intent.action.CALL -d tel:', //+ phone number
  accept_call: 'input keyevent KEYCODE_HEADSETHOOK',
  end_call: 'input keyevent KEYCODE_ENDCALL',
  enable_hotspot: 'service call tethering 4 null s16 random',
  turn_on_flash: 'flash on',
  turn_off_flash: 'flash off',
  volume_up: 'input keyevent 24',
  volume_down: 'input keyevent 25',
  mute_toggle: 'input keyevent 164',
  play_pause: 'input keyevent 85',
  stop_music: 'input keyevent 86',
  next_track: 'input keyevent 87',
  previous_track: 'input keyevent 88',
  battery_status: 'dumpsys battery',
  send_sms: 'am start -a android.intent.action.SENDTO -d sms:', //+ phone number
  body_sms: '--es sms_body ', //+ body sms
  footer_sms: ' --ez exit_on_sent true', //end command send sms
  get_list_app: 'cmd package list packages',
  launch_app: 'am start -n ', //+ pacakage name
  start_intent: 'am start -a android.intent.action.VIEW -d ',
};
