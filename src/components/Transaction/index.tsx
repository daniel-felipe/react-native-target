import { MaterialIcons } from '@expo/vector-icons'
import { Text, TouchableOpacity, View } from 'react-native'

import { TransactionType } from '@/enums/transaction-type'
import { colors } from '@/theme'
import { styles } from './styles'

export type TransactionProps = {
  id: string
  value: string
  date: string
  description?: string
  type: TransactionType
}

type Props = {
  data: TransactionProps
  onRemove: () => void
}

export function Transaction({ data, onRemove }: Props) {
  return (
    <View style={styles.container}>
      <MaterialIcons
        name={data.type === TransactionType.Input ? 'arrow-upward' : 'arrow-downward'}
        size={20}
        color={data.type === TransactionType.Input ? colors.blue[500] : colors.red[400]}
      />

      <View style={styles.info}>
        <Text style={styles.value}>{data.value}</Text>
        <Text style={styles.description} numberOfLines={1}>
          {data.date} {data.description && ` • ${data.description}`}
        </Text>
      </View>

      <TouchableOpacity activeOpacity={0.8} onPress={onRemove}>
        <MaterialIcons name="close" size={18} color={colors.gray[500]} />
      </TouchableOpacity>
    </View>
  )
}
