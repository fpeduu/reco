export interface IUserInput {
  value: number,
  reason: string,
  installment: number,
}

export interface UserInputMessageProps {
  value: number,
  reason: string,
  installment: number,
}

export interface UserInputProps {
  title?: string,
  divida: number,
  showReason: boolean,
  confirmText?: string,
  onCancel?: () => void,
  containerStyles?: string,
  onConfirm: (userInput: UserInputMessageProps) => void;
}