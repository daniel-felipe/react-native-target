import { useLocalSearchParams } from 'expo-router'
import { View } from 'react-native'

import { List } from '@/components/List'
import { PageHeader } from '@/components/PageHeader'
import { Progress } from '@/components/Progress'
import { Transaction, type TransactionProps } from '@/components/Transaction'
import { TransactionType } from '@/enums/transaction-type'

const details = {
  current: 'R$ 580,00',
  target: 'R$ 1790,00',
  percentage: 25,
}

const transactions: TransactionProps[] = [
  {
    id: '1',
    value: 'R$ 100,00',
    date: '2023-10-01',
    description: 'Compra de café',
    type: TransactionType.Output,
  },
  {
    id: '2',
    value: 'R$ 200,00',
    date: '2023-10-02',
    description: 'Venda de produto',
    type: TransactionType.Input,
  },
  {
    id: '3',
    value: 'R$ 50,00',
    date: '2023-10-03',
    description: 'Pagamento de serviço',
    type: TransactionType.Output,
  },
]

export default function InProgress() {
  const params = useLocalSearchParams<{ id: string }>()

  return (
    <View style={{ flex: 1, padding: 24, gap: 32 }}>
      <PageHeader title="Apple Watch" rightButton={{ icon: 'edit', onPress: () => {} }} />

      <Progress data={details} />

      <List
        title="Transações"
        data={transactions}
        renderItem={({ item }) => <Transaction data={item} onRemove={() => {}} />}
      />
    </View>
  )
}
