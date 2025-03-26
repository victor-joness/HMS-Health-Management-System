import { PaymentMethodEnum, TransactionStatusEnum, TransactionTypeEnum } from "@/utils/Enum";

export interface Transaction {
    Id: number; // Identificador único da transação
    FinanceId: number; // ID do funcionário financeiro responsável
    Amount: number; // Valor da transação
    FromAccountId: number;
    ToAccountId: number;
    Type: TransactionTypeEnum;
    Category: string; // Categoria da transação (ex: 'Salário', 'Aluguel', 'Investimento')
    PaymentMethod: PaymentMethodEnum; // Método de pagamento
    Status: TransactionStatusEnum;
    Description?: string; // Descrição opcional
    TransactionDate: string; // Data da transação (ISO 8601, ex: '2025-03-26T14:00:00Z')
    FromUserId: number;
    ToUserId: number;
    TaxAmount?: number;
    Notes?: string; // Campo adicional para observações extras
    IsRecurring?: boolean; // Indica se a transação é recorrente (ex: assinatura mensal)
    DueDate?: string; // Data de vencimento, caso a transação envolva algum pagamento futuro
    PaidAt?: string; // Data de pagamento, se aplicável
    DeletionDate: string | null,
    ModifiedDate: string | null,
    CreationDate: string
  }