import { ActivityIndicator, type ActivityIndicatorProps, View } from 'react-native'

import { colors } from '@/theme/colors'
import { styles } from './styles'

export function Loading({ ...rest }: ActivityIndicatorProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={colors.blue[500]} {...rest} />
    </View>
  )
}
