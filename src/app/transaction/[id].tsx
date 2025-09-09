// import { useLocalSearchParams } from 'expo-router'
import { useState } from "react";
import { Alert, View } from "react-native";
import { Button } from "@/components/Button";
import { CurrencyInput } from "@/components/CurrencyInput";
import { Input } from "@/components/Input";
import { PageHeader } from "@/components/PageHeader";
import { TransactionType } from "@/components/TransactionType";
import { TransactionType as TransactionTypeEnum } from "@/enums/transaction-type";
import { useTransactionsDatabase } from "@/database/use-transactions-database";
import { router, useLocalSearchParams } from "expo-router";

export default function Transaction() {
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState(TransactionTypeEnum.Input);
  const [isCreating, setIsCreating] = useState(false);
  const [observation, setObservation] = useState("");

  const params = useLocalSearchParams<{ id: string }>();
  const transactionsDatabase = useTransactionsDatabase();

  async function handleCreate() {
    try {
      if (amount <= 0) {
        return Alert.alert("Atenção", "Preencha o valor");
      }

      setIsCreating(true);

      await transactionsDatabase.create({
        target_id: Number(params.id),
        amount: type === TransactionTypeEnum.Output ? amount * -1 : amount,
        observation,
      });

      Alert.alert("Sucesso", "Transação salva com sucesso", [
        {
          text: "Ok",
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar a transação.");
      console.log(error);
    } finally {
      setIsCreating(false);
    }
  }

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <PageHeader
        title="Nova Transação"
        subtitle="A cada valor guardado você fica mais próximo da sua meta. Se esforce para guardar e evitar retirar."
      />

      <View style={{ marginTop: 32, gap: 24 }}>
        <TransactionType selected={type} onChange={setType} />
        <CurrencyInput
          label="Valor (R$)"
          value={amount}
          onChangeValue={setAmount}
        />
        <Input
          label="Motivo (opcional)"
          placeholder="Ex: Investir em CDB de 110% no banco XPTO"
          value={observation}
          onChangeText={setObservation}
        />
        <Button
          title="Salvar"
          onPress={handleCreate}
          isProcessing={isCreating}
        />
      </View>
    </View>
  );
}
