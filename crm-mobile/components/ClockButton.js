import { Button } from 'react-native';


export default function ClockButton({ isClockedIn, onPress }) {
  return (
    <Button
      title={isClockedIn ? 'Clock Out' : 'Clock In'}
      onPress={onPress}
      color={isClockedIn ? 'red' : 'green'}
    />
  );
}


