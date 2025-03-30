import {Assets} from 'react-native-ui-lib';

export const AssetsInit = () => {
  Assets.loadAssetsGroup('icons', {
    ic_call: require('../assets/icons/ic_call.png'),
    ic_contact: require('../assets/icons/ic_contact.png'),
    ic_deny_call: require('../assets/icons/ic_deny_call.png'),
    ic_eye_hide: require('../assets/icons/ic_eye_hide.png'),
    ic_eye: require('../assets/icons/ic_eye.png'),
    ic_flash_off: require('../assets/icons/ic_flash_off.png'),
    ic_flash: require('../assets/icons/ic_flash.png'),
    ic_phone: require('../assets/icons/ic_phone.png'),
    ic_hotspot: require('../assets/icons/ic_hotspot.png'),
    ic_backspace: require('../assets/icons/ic_backspace.png'),
    ic_add: require('../assets/icons/ic_add.png'),
    ic_cancel: require('../assets/icons/ic_cancel.png'),
    ic_mute: require('../assets/icons/ic_mute.png'),
    ic_play_pause: require('../assets/icons/ic_play_pause.png'),
    ic_stop: require('../assets/icons/ic_stop.png'),
    ic_volume_up: require('../assets/icons/ic_volume_up.png'),
    ic_volume_down: require('../assets/icons/ic_volume_down.png'),
    ic_next_track: require('../assets/icons/ic_next_track.png'),
    ic_prev_track: require('../assets/icons/ic_prev_track.png'),
    ic_qr: require('../assets/icons/ic_qr.png'),
    ic_spotify: require('../assets/icons/ic_spotify.png'),
  });
};
